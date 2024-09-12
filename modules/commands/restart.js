module.exports.config = {
    name: "restart",
    version: "2.0.2",
    hasPermssion: 2,
    credits: "Mirai Team mod by Jukie",
    description: "Khởi động lai bot",
    commandCategory: "Hệ thống admin-bot",
    usages: "restart",
    cooldowns: 5,
    dependencies: { }
}
 
module.exports.run = async function({ api, args, Users, event}) {
const { threadID, messageID } = event;
const axios = global.nodemodule["axios"];

const moment = require("moment-timezone");
    var gio = moment.tz("Asia/Ho_Chi_Minh").format("HH");
    var phut = moment.tz("Asia/Ho_Chi_Minh").format("mm");
    var giay = moment.tz("Asia/Ho_Chi_Minh").format("ss");
const fs = require("fs");
    let name = await Users.getNameUser(event.senderID)
  if (event.senderID != 100006272490820) return api.sendMessage(`Tuổi?`, event.threadID, event.messageID)
if(args.length == 0) api.sendMessage(`Đã nhận lệnh khởi động từ Admin vui lòng đợi`,event.threadID, () =>process.exit(1))
else{    
let time = args.join(" ");
setTimeout(() =>
api.sendMessage(`Bot sẽ khởi động lại sáu: ${gio}s\n[⏰] Bây giờ là: ${gio}:${phut}:${giay} `, threadID), 0)
setTimeout(() =>
api.sendMessage("Đang bắt đầu quá trình khởi động lại",event.threadID, () =>process.exit(1)), 1000*`${time}`);
}
}