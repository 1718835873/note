// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db=cloud.database()
const _=db.command;
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  // const notes=db.collection("note");
  var _id=event._id
  // const note=event.note
  // console.log("id",id)
  return db.collection("note").doc(_id).update({ 
    data:{
      content: event.content,
      love: event.love,
      title:event.title
    }
  })
}