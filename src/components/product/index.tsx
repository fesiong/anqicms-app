import { Component } from 'react'
import { Block, View, Image } from '@tarojs/components'
import { AtLoadMore } from 'taro-ui'
import Empty from '../empty'
import './index.scss'
import {getImageUrl, navigate} from '@/utils'

interface ProductProps {
  products: any[],
  loading?: boolean,
  column: number,
}

export default class Product extends Component<ProductProps, {}> {

  static options = {
    addGlobalClass: true,
  }

  gotoProduct = (e) => {
    navigate({
      url: '/pages/product/index?id=' + e
    })
  }

  render() {
    const { products, loading, column } = this.props

    return (
      <Block>
        {products.length > 0 && <View className='product-list'>
          {products.map((item, index) => {
            return <View className={'product-item column-' + column} key={index} onClick={this.gotoProduct.bind(this, item.id)}>
              <View className='inner'>
                <View className='product-image'>
                  <Image className='image-item' mode='aspectFill' src={getImageUrl(item.logo)} />
                </View>
                <View className='product-meta'>
                  <View className='product-title'>{item.title}</View>
                </View>
              </View>
            </View>
          })}
        </View>}
        {loading && <AtLoadMore status='loading' />}
        {!products.length && !loading && <Empty title='该分类下没有产品' />}
      </Block>
    )
  }
}
