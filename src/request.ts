import Taro from '@tarojs/taro'
import appConfig from './config'
import Version from './version'
import type {Method} from '@tarojs/api'

export async function request(url, params: any = {}, method: Method = 'GET'){
  url = appConfig.apiUrl + url
  let header = {
		'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
		Token: appConfig.token,
    'Version': Version
  }

  return Taro.request({
    url: url,
    data: params,
    header: header,
		method: method || 'GET'
  }).then(async (res) => {
    const { code } = res.data
    if (code !== 0) {
			//此处应该拦截1001未登录状态，要求登录
      return Promise.reject(res.data)
    }

    return res.data
  }).catch((err) => {
    const defaultMsg = '请求异常'
    return Promise.reject({ message: defaultMsg, ...err })
  })
}


export async function get({ url = '', params = {}, options = {}}) {
	return request(url, params, 'GET')
}

export async function post({ url = '', body = {}, options = {}}) {
	return request(url, body, 'POST')
}
