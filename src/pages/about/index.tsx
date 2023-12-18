import { Component } from 'react'
import Taro from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { AtLoadMore } from 'taro-ui'
import Container from '@/components/container'
import RichHtml from '@/components/richhtml'
import Banner from '@/components/banner'
import {dateFormat, dateTimeFormat} from '@/utils'
import './index.scss'
import { getPageDetail } from '@/api'

export default class AboutPage extends Component {

  state: {[key: string]: any} = {
    swiper: [],
    fetched: !1,
    page: {}
  }

  componentDidMount() {
    getPageDetail({
      filename: "about",
    }).then(res => {
      let page = res.data || {};
      page.formatDate = dateFormat(page.created_time)
      page.dateTime = dateTimeFormat(page.created_time)
      this.setState({
        swiper: (page.images || []).map((item) => ({logo: item, alt: page.title})),
        fetched: !0,
        page: page
      })
      Taro.setNavigationBarTitle({
        title: page.title
      })
      if (Taro.ENV_TYPE.SWAN === Taro.getEnv()) {
        swan.setPageInfo({
          title: page.seo_title || page.title,
          keywords: page.keywords || '',
          description: page.description || '',
          articleTitle: page.title,
          release_date: page.dateTime,
          // 单张图时值可以是字符串
          image: page.logo,
          success: function () {
            console.log('页面基础信息设置完成');
          }
        })
      }
    }).catch(err => {
      console.log(err)
      Taro.showToast({
        icon: 'none',
        title: '获取页面信息失败'
      })
    })
  }

  render() {
    const { page, fetched, swiper } = this.state
    return (
      <Container showFooter>
        <View className='article'>
          {swiper.length > 0 && <Banner list={swiper}/>}
          <View className='article-content'>
              {fetched ?
                <RichHtml fullscreen={false} bgColor='#ffffff' content={page.content} />
                :
                <AtLoadMore
                  status='loading'
                />
              }
          </View>
        </View>
      </Container>
    )
  }
}

