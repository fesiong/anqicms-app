import { Component } from 'react'
import Taro from '@tarojs/taro'
import { View, Image, Text, Button } from '@tarojs/components'
import { AtLoadMore, AtModal, AtModalAction, AtModalContent, AtModalHeader } from 'taro-ui'
import Container from '@/components/container'
import RichHtml from '@/components/richhtml'
import Banner from '@/components/banner'
import Cell from '@/components/cell'
import {dateFormat, dateTimeFormat} from '@/utils'
import './index.scss'
import { getContactSetting, getPageDetail } from '@/api'
import { getGlobal, setGlobal } from '@/utils'

export default class AboutPage extends Component {

  state: {[key: string]: any} = {
    swiper: [],
    contact: {},
    fetched: !1,
    isOpened: false,
    page: {}
  }

  componentDidMount () {
    Taro.showShareMenu({
      withShareTicket: true,
      showShareItems: ['shareAppMessage','shareTimeline']
    });
    getPageDetail({
      filename: "contact",
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
      if(Taro.ENV_TYPE.SWAN === Taro.getEnv()){
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
      Taro.showToast({
        icon: 'none',
        title: '获取页面信息失败'
      })
    })

    let contact = getGlobal("contact")
    if (!contact) {
      getContactSetting({}).then(res => {
        this.setState({
          contact: res.data || {}
        })
        setGlobal("contact", res.data || null)
      })
    } else {
      this.setState({
        contact: contact,
      })
    }
  }

  phoneCall = () => {
    const {contact} = this.state;
    if (contact.Cellphone) {
      Taro.makePhoneCall({
        phoneNumber: contact.Cellphone
      })
    } else if (contact.Qrcode) {
      this.setState({
        isOpened: true,
      })
    }
  }

  copyWechat = () => {
    const {contact} = this.state;
    Taro.setClipboardData({
      data: contact.Wechat,
    }).then(res => {
      Taro.showToast({
        icon: 'none',
        title: '微信已复制'
      })
    })
  }

  handleClose = () => {
    this.setState({
      isOpened: false,
    })
  }

  onShareAppMessage(e) {
    return {
      title: this.state.page?.title || '',
      path: '/pages/contact/index',
    }
  }

  onShareTimeline (e) {
    return {
      title: this.state.page?.title || '',
    }
  }

  render () {
    const { page, fetched, contact, swiper, isOpened } = this.state
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
        <View className='panel'>
          <View className='panel-title'><Text className='title-text'>联系我们</Text></View>
          <View className='panel-content no-padding'>
            {contact.Address && <Cell title='地址' value={contact.Address} />}
            {contact.Cellphone && <Cell title='电话' value={contact.Cellphone} onClick={this.phoneCall}/>}
          </View>
        </View>
        <AtModal isOpened={isOpened} onClose={this.handleClose}>
          <AtModalHeader>扫一扫添加微信</AtModalHeader>
          <AtModalContent>
            <Image className='qrcode' mode='widthFix' src={contact.Qrcode || ''} />
          </AtModalContent>
          <AtModalAction> <Button onClick={this.handleClose}>确定</Button> </AtModalAction>
        </AtModal>
      </Container>
    )
  }
}
