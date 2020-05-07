// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db=cloud.database();
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const _id=event._id
  return db.collection("note").doc(_id).update({
    data:{
      love:event.love
    }
  })
}