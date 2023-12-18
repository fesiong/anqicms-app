const globalData = {}

export function setGlobal (key, val) {
  globalData[key] = val
}

export function getGlobal (key) {
  return globalData[key]
}

export function getNextNumber() {
  if(!globalData['counterNumber']){
    globalData['counterNumber'] = 1
  }else{
    globalData['counterNumber']++
  }

  return globalData['counterNumber']
}