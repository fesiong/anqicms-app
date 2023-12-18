import { Component } from 'react'
import Taro from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtLoadMore } from 'taro-ui'
import Container from '@/components/container'
import RichHtml from '@/components/richhtml'
import Article from '@/components/article'
import {dateFormat, dateTimeFormat, navigate} from '@/utils'
import './index.scss'
import { getCurrentInstance } from '@tarojs/runtime'
import { getArchiveDetail, getArchiveList } from '@/api'

export default class ArticlePage extends Component {

  state: {[key: string]: any} = {
    fetched: !1,
    article: {},
    related: [],
  }

  id = 0

  componentWillMount() {
    let params: any = getCurrentInstance().router?.params;
    this.id = params.id
  }

  componentDidMount() {
    getArchiveDetail({
      id: this.id || 0,
    }).then(res => {
      let article = res.data || {};
      article.formatDate = dateFormat(article.created_time)
      article.dateTime = dateTimeFormat(article.created_time)
      this.setState({
        fetched: !0,
        article: article,
      })
      Taro.setNavigationBarTitle({
        title: article.title
      })
      if (Taro.ENV_TYPE.SWAN === Taro.getEnv()) {
        swan.setPageInfo({
          title: article.seo_title || article.title,
          keywords: article.keywords || '',
          description: article.description || '',
          articleTitle: article.title,
          release_date: article.dateTime,
          // 单张图时值可以是字符串
          image: article.logo,
          success: function () {
            console.log('文章基础信息设置完成');
          }
        })
      }
    })
    // 相关
    getArchiveList({
      type: 'related',
      id: this.id,
      limit: 6,
    }).then(res => {
      this.setState({
        related: res.data || [],
      })
    })
  }

  gotoCategory = (e) => {
    navigate({
      url: '/pages/category/index?id=' + e
    })
  }

  gotoArticle = (e) => {
    navigate({
      url: '/pages/article/index?id=' + e
    })
  }

  render() {
    const { article, fetched, related } = this.state
    return (
      <Container showFooter>
        <View className='article'>
          <View className='article-header'>
            <View className='article-title'>{article.title}</View>
            <View className='article-meta'>
              {article.category && <Text
                className='article-meta-item link'
                onClick={this.gotoCategory.bind(this, article.category.id)}
              >{article.category.title}</Text>}
              {article.tags && <Text
                className='article-meta-item'
              >{article.tags.join("、")}</Text>}
              {article.author && <Text
                className='article-meta-item'
              >{article.author}</Text>}
              <Text
                className='article-meta-item'
              >{article.formatDate}</Text>
            </View>
          </View>
          <View className='article-content'>
            {fetched ?
              <RichHtml fullscreen={false} bgColor='#ffffff' content={article.data?.content || ''} />
              :
              <AtLoadMore
                status='loading'
              />
            }
          </View>
          <View className='panel'>
            <View className='panel-title'><Text className='title-text'>相关文章</Text></View>
            <View className='panel-content no-padding'>
              {related.length > 0 && <Article articles={related} />}
            </View>
          </View>
        </View>
      </Container>
    )
  }
}

