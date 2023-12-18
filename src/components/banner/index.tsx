import { Component } from 'react'
import { View, Image, Swiper, SwiperItem } from '@tarojs/components'
import './index.scss'

interface BannerProps {
  list: [],
}

export default class Banner extends Component<BannerProps, {}> {

  static options = {
    addGlobalClass: true,
  }

  render() {
    const { list } = this.props
    return (
      <View>
        {list.length > 0 && <Swiper
          className='swiper'
          circular
          indicatorDots
          autoplay>
          {list.map((item, index) => {
            return <SwiperItem key={index}>
              <View className='swiper-item'>
                <Image className='swiper-image' mode='aspectFill' src={item.logo} />
                {item.alt && <View className='swiper-text'>{item.alt}</View>}
              </View>
            </SwiperItem>
          })}
        </Swiper>}
      </View>
    )
  }
}
