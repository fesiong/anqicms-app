import React, { Component } from 'react'
import { View } from '@tarojs/components'
import Header from '../header'
import Footer from '../footer'
import './index.scss'
import { getGlobal, setGlobal } from '@/utils'
import { getContactSetting, getSystemSetting } from '@/api'

interface ContainerProps {
  showHeader?: boolean,
  showFooter?: boolean,
  children: React.ReactNode,
}

export default class Container extends Component<ContainerProps, {}> {

  static options = {
    addGlobalClass: true,
  }

  state: {[key: string]: any} = {
    setting: {},
    contact: {},
  }

  componentDidMount() {
    let setting = getGlobal("setting")
    let contact = getGlobal("contact")
    if (!setting) {
      // 从服务器读取
      getSystemSetting({}).then(res => {
        this.setState({
          setting: res.data || {},
        })
        setGlobal("setting", res.data || null)
      })
    } else {
      this.setState({
        setting: setting,
      })
    }
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

  render() {
    const { showHeader, showFooter, children } = this.props
    const { setting, contact } = this.state

    return (
      <View className='container network-theme'>
        {showHeader && <Header logo={setting.SiteLogo} headerText={setting.SiteName} cellphone={contact.Cellphone} qrcode={contact.Qrcode}/>}
        {children}
        {showFooter && <Footer address={contact.Address} copyright={setting.SiteCopyright} cellphone={contact.Cellphone} qrcode={contact.Qrcode}/>}
      </View>
    )
  }
}
