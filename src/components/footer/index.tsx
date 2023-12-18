import { Component } from 'react'
import Taro from '@tarojs/taro'
import { View, Image, Button } from '@tarojs/components'
import Version from '../../version'
import './index.scss'
import { AtModal, AtModalAction, AtModalContent, AtModalHeader } from 'taro-ui'

interface FooterProps {
  address: string,
  copyright: string,
  cellphone: string,
  qrcode: string,
}

export default class Footer extends Component<FooterProps, {}> {

  static options = {
    addGlobalClass: true,
  }

  state = {
    isOpened: false,
  }

  phoneCall = () => {
    if (this.props.cellphone) {
      Taro.makePhoneCall({
        phoneNumber: this.props.cellphone
      })
    } else if (this.props.qrcode) {
      this.setState({
        isOpened: true,
      })
    }
  }

  handleClose = () => {
    this.setState({
      isOpened: false,
    })
  }

  showPath = () => {
    let a = Taro.getCurrentPages(),
    r = a[a.length - 1],
    g = r.route,
    v = Version;
    let fullLink = g || '';
    if (r.options) {
      fullLink += "?";
      for (let i in r.options) {
        fullLink += '&' + i + '=' + r.options[i];
      }
    }
    let u = ["该小程序由安企CMS(AnQiCMS)开发并提供技术支持，联系微信：websafety","小程序版本号：" + v, "页面路径", fullLink];
    Taro.showModal({
      title: "小程序信息",
      content: u.join("\n"),
      confirmText: "确定",
      showCancel: !1,
      success: function() {
        Taro.setClipboardData({
          data: fullLink
        });
      }
    });
  }

  render() {
    const { address, copyright, qrcode } = this.props
    const {isOpened} = this.state

    return (
      <View className='footer'>
        {address && <View className='footer-text'>地址：{address}</View>}
        {copyright && <View className='footer-text'>{copyright}</View>}
        <View className='footer-service' onLongClick={this.showPath}>安企CMS(AnQiCMS)提供技术支持</View>
        <View className='fixed-fab' onClick={this.phoneCall}>
          <Image mode='aspectFit' className='fab-icon' src='/assets/phone.png' />
        </View>
        <AtModal isOpened={isOpened} onClose={this.handleClose}>
          <AtModalHeader>扫一扫添加微信</AtModalHeader>
          <AtModalContent>
            <Image className='qrcode' mode='widthFix' src={qrcode || ''} />
          </AtModalContent>
          <AtModalAction> <Button onClick={this.handleClose}>确定</Button> </AtModalAction>
        </AtModal>
      </View>
    )
  }
}
