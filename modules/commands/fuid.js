module.exports.config = {
  name: "uid1",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Mirai Team",
  description: "Lấy ID người dùng",
  commandCategory: "Nhóm",
  cooldowns: 0
};

module.exports.run = async function({ api, event, args }) {
    const axios = global.nodemodule['axios']; 
    if(event.type == "message_reply") { 
    uid = event.messageReply.senderID;
    const { createReadStream } = global.nodemodule["fs-extra"];
    const path = require("path");
    const audioPath = path.join(__dirname, "modules", "commands","cache","introdaiphatthanh.mp3");
    return api.sendMessage({ attachment: createReadStream(audioPath), body: `➜ Uid của bạn đây: ${uid}` }, event.threadID, event.messageID);
  }
    if (!args[0]) {
      return api.sendMessage(`${event.senderID}`, event.threadID, event.messageID);
    } else {
    if (args[0].indexOf(".com/") !== -1) {
        const res_ID = await api.getUID(args[0]);  
        return api.sendMessage(`${res_ID}`, event.threadID, event.messageID);
    } else {
      for (var i = 0; i < Object.keys(event.mentions).length; i++) {
        api.sendMessage(`➜ Tên: ${Object.values(event.mentions)[i].replace('@', '')}\n➜ UID: ${Object.keys(event.mentions)[i]}`, event.threadID);
      }
      return;
    }
  }
}