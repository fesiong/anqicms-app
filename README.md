# 安企CMS(AnQiCMS)默认小程序

说明：该小程序源码同时支持百度智能小程序，微信小程序，支付宝小程序，头条小程序等，下面以百度小程序为例子展开配置说明  

## 安装方法  
1. 从github的[Release](https://github.com/fesiong/anqicms-app/releases) 中下载小程序代码，并解压。
2. 打开小程序源码根目录下的config.js，将 `http://127.0.0.1:8001` 替换为你的域名。
3. 进入小程序源码，并用百度开发者工具打开预览
4. 点击百度开发者工具->项目信息，填写appid
5. 到百度小程序后台，添加站点域名为请求域名。
6. 在百度开发者工具提交发布。
7. 到百度小程序后台->开发管理中，将刚提交上来的小程序代码提交审核。

## 开发者工具使用
请自行熟悉，这里不做详细解答

## 技术支持
微信: websafety  
网站：[安企CMS](https://www.anqicms.com)  

参与讨论：请添加我的微信进微信群讨论

## 其它操作(不用操作)

修改编译产出文件 dist/common.js，在开头添加一行
```js
var config = require('./config');
```
修改
```js
{appid:"",token:"",apiUrl:"http://127.0.0.1:8001/api",ossUrl:"http://127.0.0.1:8001"}
```
为 
```js
config
```