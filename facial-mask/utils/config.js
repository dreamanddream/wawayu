var app = getApp();
module.exports = {
  pageSize: 20,
  apiList: {
    getToken: app.globalData.subDomain + '/xcx/getAccessToken',
    getBanner: app.globalData.subDomain + '/xcx/getBanners',
    addressList: app.globalData.subDomain + '/xcx/getAreas',
    personRegister: app.globalData.subDomain + '/xcx/login',
    personLogin: app.globalData.subDomain + 'xcx/login',
    getStores: app.globalData.subDomain + '/xcx/getStores',
    getStoreDetail: app.globalData.subDomain + '/xcx/getStoreDetail',
    getPersonnel: app.globalData.subDomain + '/xcx/getPersonnel',
    getPersonnelTime: app.globalData.subDomain +'/xcx/getPersonnelTime',
    getTags: app.globalData.subDomain +'/xcx/getTags',
    getComments: app.globalData.subDomain +'/xcx/getComments',
    // 核对订单
    settlement: app.globalData.subDomain +'/xcx/settlement',
    // 个人设置信息
    get_conf: app.globalData.subDomain + '/xcx/get_conf',
    // 绑定手机号
    bindTelphone: app.globalData.subDomain +'/xcx/bindTelphone',
    // 发送验证码
    send_code: app.globalData.subDomain + '/xcx/send_code',
    // 获取积分和余额
    get_money: app.globalData.subDomain +'/xcx/get_money',
    // 积分规则单页面
    integral: app.globalData.subDomain +"/xcx/page",
    // 获取积分兑换的优惠券
    get_coupon: app.globalData.subDomain +'/xcx/get_coupon',
    // 获取我的优惠券
    get_mycoupon: app.globalData.subDomain +'/xcx/get_mycoupon',
    // 积分兑换
    receive_coupon: app.globalData.subDomain + '/xcx/receive_coupon',
    // 获取积分记录明细
    get_exp_log: app.globalData.subDomain +'/xcx/get_exp_log',
    // 我的历史评价--未完成
    get_history_comments: app.globalData.subDomain +'/xcx/get_history_comments',
    // 我的余额记录
    get_money_log: app.globalData.subDomain +'/xcx/get_money_log',
    // 设置性别
    set_sex: app.globalData.subDomain +'/xcx/set_sex',
    // 设置年龄
    set_age: app.globalData.subDomain +'/xcx/set_age',
    // 获取风格定位
    get_style: app.globalData.subDomain +'/xcx/get_style',
    // 设置风格定位
    set_style: app.globalData.subDomain +'/xcx/set_style',
    // 获取职业属性
    get_vocation: app.globalData.subDomain +'/xcx/get_vocation',
    // 设置职业属性
    set_vocation: app.globalData.subDomain +'/xcx/set_vocation',
    login: app.globalData.subDomain +'/xcx/login',
    register: app.globalData.subDomain +'/xcx/registor',

    indexList: 'https://www.easy-mock.com/mock/5b46cf30129f22678069714d/project/project',
    mallName: 'https://api.it120.cc/' + app.globalData.subDomain + '/config/get-value',
    goodsList: 'https://api.it120.cc/' + app.globalData.subDomain + '/shop/goods/list'
  }
}