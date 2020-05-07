// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db=cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  console.log(wxContext.OPENID)
  const _id=event._id
  return db.collection("tags").doc(_id).update({
    data:{
      _openid: wxContext.OPENID,
      label:event.label,
      logoUrl:event.logoUrl,
      tagName:event.tagName
    }
  })
}