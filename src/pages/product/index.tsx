import { Component } from 'react'
import Taro from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import { AtLoadMore } from 'taro-ui'
import Container from '@/components/container'
import RichHtml from '@/components/richhtml'
import Product from '@/components/product'
import {dateFormat, dateTimeFormat, navigate} from '@/utils'
import './index.scss'
import { getCurrentInstance } from '@tarojs/runtime'
import { getArchiveDetail, getArchiveList } from '@/api'

export default class ProductPage extends Component {

  state: {[key: string]: any} = {
    fetched: !1,
    product: {},
    related: [],
  }

  id = 0

  componentWillMount() {
    Taro.showShareMenu({
      withShareTicket: true,
      showShareItems: ['shareAppMessage','shareTimeline']
    });
    let params: any = getCurrentInstance().router?.params;
    this.id = params.id
  }

  componentDidMount() {
    getArchiveDetail({
      id: this.id || 0,
    }).then(res => {
      let product = res.data || {};
      product.formatDate = dateFormat(product.created_time)
      product.dateTime = dateTimeFormat(product.created_time)
      this.setState({
        fetched: !0,
        product: product,
      })
      Taro.setNavigationBarTitle({
        title: product.title
      })
      if (Taro.ENV_TYPE.SWAN === Taro.getEnv()) {
        swan.setPageInfo({
          title: product.seo_title || product.title,
          keywords: product.keywords || '',
          description: product.description || '',
          articleTitle: product.title,
          release_date: product.dateTime,
          // 单张图时值可以是字符串
          image: product.logo,
          success: function () {
            console.log('案例基础信息设置完成');
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

  gotoProduct = (e) => {
    navigate({
      url: '/pages/product/index?id=' + e
    })
  }

  onShareAppMessage(e) {
    return {
      title: this.state.product?.title || '',
      path: '/pages/product/index?id=' + this.id,
    }
  }

  onShareTimeline (e) {
    return {
      title: this.state.product?.title || '',
    }
  }

  render() {
    const { product, fetched, related } = this.state
    return (
      <Container showFooter>
        <View className='article'>
          {product.logo && <Image className='article-logo' src={product.logo} mode='widthFix' />}
          <View className='article-header'>
            <View className='article-title'>{product.title}</View>
            <View className='article-meta'>
              {product.category && <Text
                className='article-meta-item link'
                onClick={this.gotoCategory.bind(this, product.category.id)}
              >{product.category.title}</Text>}
              {product.tags && <Text
                className='article-meta-item'
              >{product.tags.join("、")}</Text>}
              {product.author && <Text
                className='article-meta-item'
              >{product.author}</Text>}
              <Text
                className='article-meta-item'
              >{product.formatDate}</Text>
            </View>
          </View>
          <View className='panel'>
          <View className='panel-title'><Text className='title-text'>产品详情</Text></View>
          </View>
          <View className='article-content'>
            {fetched ?
              <RichHtml fullscreen={false} bgColor='#ffffff' content={product.data?.content || ''} />
              :
              <AtLoadMore
                status='loading'
              />
            }
          </View>
          <View className='panel'>
            <View className='panel-title'><Text className='title-text'>相关产品</Text></View>
            <View className='panel-content no-padding'>
              {related.length && <Product products={related} column={2} />}
            </View>
          </View>
        </View>
      </Container>
    )
  }
}
