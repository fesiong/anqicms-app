import { Component } from 'react'
import Taro from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { AtDivider, AtLoadMore } from 'taro-ui'
import Container from '@/components/container'
import RichHtml from '@/components/richhtml'
import Product from '@/components/product'
import Article from '@/components/article'
import {dateFormat, dateTimeFormat, navigate} from '@/utils'
import './index.scss'
import { getCurrentInstance } from '@tarojs/runtime'
import { getArchiveList, getCategoryDetail, getCategoryList } from '@/api'
import Case from '@/components/case'

export default class CategoryPage extends Component {

  id = 0
  page = 1

  state: {[key: string]: any} = {
    category: {},
    subCategories: [],
    list: [],
    total: 0,
    fetched: !1,
    loading: !1,
    finished: !1,
  }

  componentWillMount() {
    let params: any = getCurrentInstance().router?.params;
    this.id = params.id
  }

  componentDidMount() {
    getCategoryDetail({
      id: this.id,
    }).then(res => {
      let category = res.data || {};
      category.formatDate = dateFormat(category.created_time)
      category.dateTime = dateTimeFormat(category.created_time)
      this.setState({
        fetched: !0,
        category: category
      })
      Taro.setNavigationBarTitle({
        title: category.title
      })
      if (Taro.ENV_TYPE.SWAN === Taro.getEnv()) {
        swan.setPageInfo({
          title: category.seo_title || category.title,
          keywords: category.keywords || '',
          description: category.description || '',
          articleTitle: category.title,
          release_date: category.dateTime,
          // 单张图时值可以是字符串
          image: category.logo,
          success: function () {
            console.log('分类基础信息设置完成');
          }
        })
      }
    }).catch(err => {
      console.log(err)
      Taro.showToast({
        icon: 'none',
        title: '获取分类信息失败'
      })
    })
    this.page = 1
    this.setState({
      list: [],
      loading: !1,
      finished: !1
    }, () => {
      this.getDatas()
    });
    getCategoryList({
      parentId: this.id,
    }).then(res => {
      this.setState({
        subCategories: res.data || [],
      })
    })
  }

  onPullDownRefresh() {
    this.page = 1
    this.setState({
      list: [],
      loading: !1,
      finished: !1
    }, () => {
      this.getDatas()
    })
  }

  onReachBottom() {
    this.getDatas()
  }

  getDatas() {
    let { list, finished, loading } = this.state
    if (finished || loading) {
      return
    }
    this.setState({
      loading: !0,
    })
    getArchiveList({
      type: "page",
      page: this.page,
      limit: 10,
      categoryId: this.id,
    }).then(res => {
      Taro.stopPullDownRefresh()
      let data = res.data || [];
      this.setState({
        list: list.concat(data),
        total: res.total,
        finished: data.length == 0,
        loading: !1,
      })
      this.page++
    })
  }

  changeCategory = (e) => {
    navigate({
      url: '/pages/category/index?id=' + e
    })
  }

  render() {
    const { list, total, category, subCategories, fetched, finished, loading } = this.state
    return (
      <Container showFooter>
        <View className='article'>
          {category.logo && <Image className='article-logo' src={category.logo} mode='widthFix' />}
          {fetched ?
            <View className='article-header'>
              <View className='article-title text-center'>{category.title}</View>
              <View className='article-meta'>
                {subCategories.length > 0 && <View className='at-row at-row--wrap sub-categories'>
                  {subCategories.map((item, index) => {
                    return <View className='at-col at-col-4' key={index}>
                      <View className='sub-category-item' onClick={this.changeCategory.bind(this, item.id)}>{item.title}</View>
                    </View>
                  })}
                </View>}
                <Text className='article-meta-item'>共{total}篇{category.module_id == 2 ? '产品' : '文章'}</Text>
              </View>
            </View>
            :
            <AtLoadMore
              status='loading'
            />
          }
          {category.content?.length > 0 && <View className='article-content'>
            <RichHtml fullscreen={false} bgColor='#ffffff' content={category.content} />
          </View>}
        </View>
        {category.module_id == 3 && <Case cases={list} loading={loading} />}
        {category.module_id == 2 && <Product products={list} column={2} loading={loading} />}
        {category.module_id < 2 && <Article articles={list} loading={loading} />}
        {finished && <AtDivider className='divider' content='没有更多了' />}
        {loading && <AtDivider className='divider' content='加载中...' />}
        {(!loading && !finished) && <AtDivider className='divider' content='滚动加载更多' />}
      </Container>
    )
  }
}
