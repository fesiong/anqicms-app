import { Component } from 'react'
import Taro from '@tarojs/taro'
import { AtTabs } from 'taro-ui'
import Container from '@/components/container'
import Article from '@/components/article'
import './index.scss'
import { getArchiveList, getCategoryList } from '@/api'

const moduleId = 1;

export default class ArticlesPage extends Component {

  articleList: any[] = []

  state = {
    categories: [],
    currentId: 0,
    currentList: {
      page: 1,
      loading: !1,
      finished: !1,
      list: [],
    },
    pageConfig: {},
    fixed: !1,
  }

  componentWillMount() { }

  componentDidMount() {
    getCategoryList({
      moduleId: moduleId,
    }).then(res => {
      this.setState({
        categories: res.data || [],
      }, () => {
        this.getTabArticles(0)
      })
    });
  }

  clickTab = (e) => {
    if (e == this.state.currentId) {
      return
    }
    this.setState({
      currentId: e
    }, () => {
      this.getTabArticles(e)
    });
  }

  onPageScroll(e) {
    let top = e.scrollTop
    if (top > 150) {
      this.setState({
        fixed: !0
      })
    } else {
      this.setState({
        fixed: !1,
      })
    }
  }

  getTabArticles = (currentId) => {
    let currentCategory: any = this.state.categories[currentId]
    let currentList: any = this.articleList[currentId] || { list: [], page: 1 }
    if (currentList.loading || currentList.finished) {
      this.setState({
        currentList: currentList,
      })
      return
    }
    currentList.loading = !0
    this.setState({
      currentList: currentList,
    })

    getArchiveList({
      type: "page",
      categoryId: currentCategory.id,
      page: currentList.page,
      limit: 10,
    }).then(res => {
      let products = res.data || []
      currentList.page++
      currentList.loading = !1
      currentList.finished = products.length == 0
      currentList.total = res.total
      currentList.list = currentList.list.concat(products)
      this.articleList[currentId] = currentList
      this.setState({
        currentList: currentList
      })
    })
  }

  onReachBottom() {
    let { currentId } = this.state
    this.getTabArticles(currentId)
  }

  gotoArticle = (e) => {
    Taro.navigateTo({
      url: '/pages/article/index?id=' + e
    })
  }

  render() {
    const { currentId, currentList, categories, fixed } = this.state
    return (
      <Container showFooter>
        {categories.length > 0 && <AtTabs className={'tabs' + (fixed ? 'fixed-top' : '')} scroll current={currentId} tabList={categories} onClick={this.clickTab}>
        </AtTabs>}
        {currentList.list.length > 0 && <Article articles={currentList.list} loading={currentList.loading} />}
      </Container>
    )
  } a
}
