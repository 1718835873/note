// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const tenpay = require('tenpay');
const config = {
  appid: 'wx26438c2d76113895',
  mchid: '1535066601',
  partnerKey: 'hangshoushanghaibeijing201906041',
  notify_url: 'https://www.janshu.com',
  spbill_create_ip: '127.0.0.1'
};

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  // 初始化
  const api = tenpay.init(config);

// 获取支付参数
  let result = await api.getPayParams({
    out_trade_no: '123456789',
    body: '商品简单描述',
    total_fee: 1,
    openid: wxContext.OPENID
  });
}