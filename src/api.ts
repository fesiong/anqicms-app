import {get, post} from './request'


// 获取图片验证码
export async function getCaptcha(params, options = {}) {
	return get({
		url: '/captcha',
		params,
		options,
	});
}

// 登录
export async function apiLogin(body, options = {}) {
	return post({
		url: '/login',
		body,
		options,
	});
}

// 注册
export async function apiRegister(body, options = {}) {
	return post({
		url: '/register',
		body,
		options,
	});
}

// 获取用户信息
export async function getUserDetail(params, options = {}) {
	return get({
		url: '/user/detail',
		params,
		options,
	});
}

// 保存用户信息
export async function saveUserDetail(body, options = {}) {
	return post({
		url: '/user/detail',
		body,
		options,
	});
}

// 获取用户组列表
export async function getUserGroups(params, options = {}) {
	return get({
		url: '/user/groups',
		params,
		options,
	});
}

// 获取用户组详情
export async function getUserGroupDetail(params, options = {}) {
	return get({
		url: '/user/group/detail',
		params,
		options,
	});
}

// 修改用户密码
export async function updateUserPassword(body, options = {}) {
	return post({
		url: '/user/password',
		body,
		options,
	});
}

// 获取订单列表
export async function getOrders(params, options = {}) {
	return get({
		url: '/orders',
		params,
		options,
	});
}

// 创建订单
export async function createOrder(body, options = {}) {
	return post({
		url: '/order/create',
		body,
		options,
	});
}

// 获取订单地址
export async function getOrderAddress(params, options = {}) {
	return get({
		url: '/order/address',
		params,
		options,
	});
}

// 保存订单地址
export async function saveOrderAddress(body, options = {}) {
	return post({
		url: '/order/address',
		body,
		options,
	});
}

// 获取订单详情
export async function getOrderDetail(params, options = {}) {
	return get({
		url: '/order/detail',
		params,
		options,
	});
}

// 取消订单
export async function cancelOrder(body, options = {}) {
	return post({
		url: '/order/cancel',
		body,
		options,
	});
}

// 申请退款
export async function applyRefundOrder(body, options = {}) {
	return post({
		url: '/order/refund',
		body,
		options,
	});
}

// 确认完成订单
export async function finishedOrder(body, options = {}) {
	return post({
		url: '/order/finish',
		body,
		options,
	});
}

// 发起支付
export async function paymentOrder(body, options = {}) {
	return post({
		url: '/order/payment',
		body,
		options,
	});
}

// 获取微信二维码
export async function createWeappQrcode(body, options = {}) {
	return post({
		url: '/weapp/qrcode',
		body,
		options,
	});
}

// 获取积分记录
export async function getIntegralLogs(params, options = {}) {
	return get({
		url: '/integral/logs',
		params,
		options,
	});
}

// 检查文档支付情况
export async function checkArchiveOrder(params, options = {}) {
	return get({
		url: '/archive/order/check',
		params,
		options,
	});
}

// 检查订单支付情况
export async function checkPayment(params, options = {}) {
	return get({
		url: '/payment/check',
		params,
		options,
	});
}

// 发布文章
export async function publishArchive(body, options = {}) {
	return post({
		url: '/archive/publish',
		body,
		options,
	});
}

// 获取文档详情
export async function getArchiveDetail(params, options = {}) {
	return get({
		url: '/archive/detail',
		params,
		options,
	});
}

// 获取文档筛选项
export async function getArchiveFilters(params, options = {}) {
	return get({
		url: '/archive/filters',
		params,
		options,
	});
}

// 获取文档列表
export async function getArchiveList(params, options = {}) {
	return get({
		url: '/archive/list',
		params,
		options,
	});
}

// 获取文档参数
export async function getArchiveParams(params, options = {}) {
	return get({
		url: '/archive/list',
		params,
		options,
	});
}

// 获取分类详情
export async function getCategoryDetail(params, options = {}) {
	return get({
		url: '/category/detail',
		params,
		options,
	});
}

// 获取分类列表
export async function getCategoryList(params, options = {}) {
	return get({
		url: '/category/list',
		params,
		options,
	});
}

// 获取模型详情
export async function getModuleDetail(params, options = {}) {
	return get({
		url: '/module/detail',
		params,
		options,
	});
}

// 获取模型列表
export async function getModuleList(params, options = {}) {
	return get({
		url: '/module/list',
		params,
		options,
	});
}

// 获取评论列表
export async function getCommentList(params, options = {}) {
	return get({
		url: '/comment/list',
		params,
		options,
	});
}

// 获取联系方式
export async function getContactSetting(params, options = {}) {
	return get({
		url: '/setting/contact',
		params,
		options,
	});
}

// 获取系统配置
export async function getSystemSetting(params, options = {}) {
	return get({
		url: '/setting/system',
		params,
		options,
	});
}

// 获取首页TDK
export async function getIndexTdkSetting(params, options = {}) {
	return get({
		url: '/setting/index',
		params,
		options,
	});
}

// 获取留言表单字段
export async function getGuestbookFields(params, options = {}) {
	return get({
		url: '/guestbook/fields',
		params,
		options,
	});
}

// 获取友情链接列表
export async function getFriendlinkList(params, options = {}) {
	return get({
		url: '/friendlink/list',
		params,
		options,
	});
}

// 获取导航列表
export async function getNavList(params, options = {}) {
	return get({
		url: '/nav/list',
		params,
		options,
	});
}

// 获取下一篇文档
export async function getNextArchive(params, options = {}) {
	return get({
		url: '/archive/next',
		params,
		options,
	});
}

// 获取上一篇文档
export async function getPrevArchive(params, options = {}) {
	return get({
		url: '/archive/prev',
		params,
		options,
	});
}

// 获取页面详情
export async function getPageDetail(params, options = {}) {
	return get({
		url: '/page/detail',
		params,
		options,
	});
}

// 获取页面列表
export async function getPageList(params, options = {}) {
	return get({
		url: '/page/list',
		params,
		options,
	});
}

// 获取标签详情
export async function getTagDetail(params, options = {}) {
	return get({
		url: '/tag/detail',
		params,
		options,
	});
}

// 获取标签列表
export async function getTagList(params, options = {}) {
	return get({
		url: '/tag/list',
		params,
		options,
	});
}

// 获取标签的文档列表
export async function getTagArchiveList(params, options = {}) {
	return get({
		url: '/tag/data/list',
		params,
		options,
	});
}

// 获取banner图列表
export async function getBannerList(params, options = {}) {
	return get({
		url: '/banner/list',
		params,
		options,
	});
}

// 上传图片
export async function uploadAttachment(body, options = {}) {
	return post({
		url: '/attachment/upload',
		body,
		options,
	});
}

// 发布评论
export async function publishComment(body, options = {}) {
	return post({
		url: '/comment/publish',
		body,
		options,
	});
}

// 点赞评论
export async function praiseComment(body, options = {}) {
	return post({
		url: '/comment/praise',
		body,
		options,
	});
}

// 提交留言
export async function saveGuestbook(body, options = {}) {
	return post({
		url: '/guestbook.html',
		body,
		options,
	});
}
