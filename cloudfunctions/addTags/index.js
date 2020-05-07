// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db=cloud.database();
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  // const tagId=event.tagId
  return db.collection("tags").add({
    data:{
      tagId:event.tagId,
      tagName:event.tagName,
      logoUrl:event.logoUrl,
      label:event.num
    }
  })
}