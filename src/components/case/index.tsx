import { Component } from 'react'
import { Block, View, Image } from '@tarojs/components'
import { AtLoadMore } from 'taro-ui'
import Empty from '../empty'
import './index.scss'
import {getImageUrl, navigate} from '@/utils'

interface CaseProps {
  cases: any[],
  loading?: boolean,
}

export default class Case extends Component<CaseProps, {}> {

  static options = {
    addGlobalClass: true,
  }

  gotoCase = (e) => {
    navigate({
      url: '/pages/case/index?id=' + e
    })
  }

  render() {
    const { cases, loading } = this.props

    return (
      <Block>
        {cases.length > 0 && <View className='article-list'>
            {cases.map((item, index) => {
              return <View className='article-item' key={index} onClick={this.gotoCase.bind(this, item.id)}>
                <View className='item-content'>
                  <View className='item-content-title'>{item.title}</View>
                  {item.description && <View className='item-content-desc'>{item.description}</View>}
                </View>
                {item.logo && <View className='item-thumb'>
                  <Image mode='aspectFill' className='item-thumb-info' src={getImageUrl(item.logo)}/>
                </View>}
              </View>
            })}
          </View>}
          {loading && <AtLoadMore status='loading' />}
          {(!cases.length && !loading) && <Empty title='该分类下没有案例' />}
      </Block>
    )
  }
}
