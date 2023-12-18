import { Component } from 'react'
import Taro from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import Container from '@/components/container'
import Product from '@/components/product'
import Article from '@/components/article'
import Case from '@/components/case'
import Banner from '@/components/banner'
import './index.scss'
import { getArchiveList, getBannerList, getCategoryList, getIndexTdkSetting, getSystemSetting } from '@/api'
import { getGlobal, setGlobal } from '@/utils'
import { AtList, AtListItem } from 'taro-ui'

export default class IndexPage extends Component {

  state: {[key: string]: any} = {
    banners: [],
    pageConfig: {},
    categories: [],
    articles: [],
    products: [],
    cases: [],
    setting: {},
  }

  componentDidMount() {
    // setting
    let setting = getGlobal("setting");
    if (!setting) {
      // 从服务器读取
      getSystemSetting({}).then(res => {
        setting = res.data || {};
        this.setState({
          setting: res.data || {},
        })
        Taro.setNavigationBarTitle({
          title: setting.SiteName,
        })
        setGlobal("setting", res.data || null)
      })
    } else {
      Taro.setNavigationBarTitle({
        title: setting.SiteName,
      })
      this.setState({
        setting: setting,
      })
    }
    // 获取tdk
    let pageConfig: any = getGlobal("indextdk");
    if (pageConfig) {
      this.setState({
        pageConfig: pageConfig,
      });
    } else {
      getIndexTdkSetting({}).then(res => {
        setGlobal("indextdk", res.data || null)
        pageConfig = res.data || {};
        this.setState({
          pageConfig: pageConfig,
        });
        if (Taro.ENV_TYPE.SWAN === Taro.getEnv()) {
          swan.setPageInfo({
            title: pageConfig.SeoTitle,
            keywords: pageConfig.SeoKeywords,
            description: pageConfig.SeoDescription,
            success: function () {
              console.log('首页关键词首次配置成功');
            }
          })
        }
      })
    }
    // 获取banner
    let banners = getGlobal("banners");
    if (banners) {
      this.setState({
        banners: banners,
      })
    } else {
      getBannerList({}).then(res => {
        setGlobal('banners', res.data || null);
        this.setState({
          banners: res.data || [],
        })
      })
    }
    // 获取分类
    let categories = getGlobal("categories");
    if (categories) {
      this.setState({
        categories: categories,
      })
    } else {
      getCategoryList({
        parentId: 0,
      }).then(res => {
        setGlobal("categories", res.data || null);
        this.setState({
          categories: res.data || [],
        })
      })
    }
    // 获取文章
    getArchiveList({moduleId: 1, limit: 6}).then(res => {
      this.setState({
        articles: res.data || [],
      })
    })
    // 获取产品
    getArchiveList({moduleId: 2, limit: 4}).then(res => {
      this.setState({
        products: res.data || [],
      })
    })
    // 尝试获取案例
    getArchiveList({moduleId: 3, limit: 4}).then(res => {
      this.setState({
        cases: res.data || [],
      })
    })
  }

  gotoProduct = (e) => {
    Taro.navigateTo({
      url: '/pages/product/index?id=' + e
    })
  }

  gotoArticle = (e) => {
    Taro.navigateTo({
      url: '/pages/article/index?id=' + e
    })
  }

  gotoCase = (e) => {
    Taro.navigateTo({
      url: '/pages/case/index?id=' + e
    })
  }

  gotoCategory = (e) => {
    Taro.navigateTo({
      url: '/pages/category/index?id=' + e
    })
  }

  render() {
    const { banners, categories, articles, products, cases } = this.state

    return (
      <Container showFooter>
        <Banner list={banners}/>
        {(products.length > 0) && <View className='panel'>
          <View className='panel-title'><Text className='title-text'>推荐产品</Text></View>
          <View className='panel-content no-padding'>
            <Product products={products} column={2} />
          </View>
        </View>}
        {articles.length > 0 && <View className='panel'>
          <View className='panel-title'><Text className='title-text'>热门文章</Text></View>
          <View className='panel-content no-padding'>
            <Article articles={articles} />
          </View>
        </View>}
        {cases.length > 0 && <View className='panel'>
          <View className='panel-title'><Text className='title-text'>案例分享</Text></View>
          <View className='panel-content no-padding'>
            <Case cases={cases} />
          </View>
        </View>}
        {categories.length > 0 && <AtList>
          {categories.map((category: any) => {
            return <AtListItem title={category.title} onClick={this.gotoCategory.bind(this, category.id)} arrow='right' />
          })}
        </AtList>}
      </Container>
    )
  }
}
