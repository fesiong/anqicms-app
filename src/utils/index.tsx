import Taro from "@tarojs/taro"
import { getCurrentPages } from "@tarojs/taro"

export * from "./globalData";

function padZero(str, num = 2){
  return String(str).padStart(num, "0")
}

export function dateFormat(t, full = true) {
  let date = new Date(t*1000)
  let dateStr = padZero(date.getMonth()+1) + "-" + padZero(date.getDate())
  if(full){
    dateStr = date.getFullYear() + "-" + dateStr
  }

  return dateStr;
}

export function dateTimeFormat(t, full = true) {
  let date = new Date(t*1000)
  let timeStr = padZero(date.getHours()) + ":" + padZero(date.getMinutes()) + ":" + padZero(date.getSeconds())
  let dateStr = date.getFullYear() + "-" + padZero(date.getMonth()+1) + "-" + padZero(date.getDate())

  return dateStr + " " + timeStr
}

export function navigate(t) {
  (getCurrentPages() || []).length >= 5 ? Taro.redirectTo(t) : Taro.navigateTo(t)
}

export function getImageUrl(imageUrl, type = '') { //type = "thumb|''"
  if (!imageUrl) {
    //default
    imageUrl = '/assets/default.png'
  } else if (imageUrl.indexOf('http') === -1) {
    //这不是一个远程地址
    if (type == 'thumb') {
      if (imageUrl.indexOf('thumb_') != -1) {
        //不需要处理
      } else {
        let lastSep = imageUrl.lastIndexOf("/");
        imageUrl = imageUrl.substr(0, lastSep) + "/thumb_" + imageUrl.substr(lastSep + 1)
      }
    } else {
      imageUrl = imageUrl.replace('thumb_', '')
    }
    imageUrl = imageUrl
  }
  return imageUrl
};
