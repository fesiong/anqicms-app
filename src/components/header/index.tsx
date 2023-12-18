import { Component } from 'react'
import Taro from '@tarojs/taro'
import { View, Image, Button } from '@tarojs/components'
import './index.scss'
import { AtModal, AtModalAction, AtModalContent, AtModalHeader } from 'taro-ui'

interface HeaderProps {
  logo: string,
  headerText: string,
  cellphone: string,
  qrcode: string,
}

export default class Header extends Component<HeaderProps, {}> {

  static options = {
    addGlobalClass: true,
  }

  state = {
    isOpened: false,
  }

  gotoHome = () => {
    Taro.navigateTo({
      url: '/pages/index/index'
    })
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
  render() {
    const { logo, headerText, cellphone, qrcode } = this.props
    const {isOpened} = this.state
    return (
      <View className='header'>
        <View className='header-logo' onClick={this.gotoHome}><Image className='logo' mode='aspectFill' src={logo}/></View>
        <View className='header-text'>{headerText}</View>
        <View className='header-contact' onClick={this.phoneCall}>
          <View className='mobile-tips'>联系电话：</View>
          <View className='mobile'>{cellphone}</View>
        </View>
        <AtModal isOpened={isOpened} onClose={this.handleClose}>
          <AtModalHeader>扫一扫添加微信</AtModalHeader>
          <AtModalContent>
            <Image mode='widthFix' src={qrcode || ''} />
          </AtModalContent>
          <AtModalAction> <Button onClick={this.handleClose}>确定</Button> </AtModalAction>
        </AtModal>
      </View>
    )
  }
}
