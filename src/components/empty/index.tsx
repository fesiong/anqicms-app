import { Component } from 'react'
import { View, Text, Image } from '@tarojs/components'
import './index.scss'

interface EmptyProps {
  image?: string,
  title?: string,
  description?: string,
}

export default class Empty extends Component<EmptyProps, {}> {

  static options = {
    addGlobalClass: true,
  }

  render() {
    const { image, title, description } = this.props

    return (
      <View className='empty'>
        {image && <Image mode='widthFix' src={image} />}
        <Text className='image-text2'>{title || '没有内容'}</Text>
        {description && <Text className='image-text2'>{description}</Text>}
      </View>
    )
  }
}
