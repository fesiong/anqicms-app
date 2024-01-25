import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { WebView } from '@tarojs/components'
import './index.scss'
import { getCurrentInstance } from '@tarojs/runtime'

export default class BrowserPage extends Component {

  state = {
    url: ''
  }

  componentWillMount () {
    Taro.showShareMenu({
      withShareTicket: true,
      showShareItems: ['shareAppMessage','shareTimeline']
    });
    let params: any = getCurrentInstance().router?.params;
    this.setState({
      url: params.url
    })
  }

  loadError() {
    Taro.showToast({
      icon: "none",
      title: '页面加载失败',
    })
  }

  loadSuccess(e) {
    console.log(e)
  }

  onShareAppMessage(e) {
    return {
      path: '/pages/browser/index?url=' + this.state.url,
    }
  }

  onShareTimeline (e) {
    return {
    }
  }

  render () {
    const { url } = this.state
    return (
      <WebView onError={this.loadError} onLoad={this.loadSuccess} src={url} />
    )
  }
}

