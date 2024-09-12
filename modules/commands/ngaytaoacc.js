module.exports.config = {
	name: "ngaytaoacc",
	version: "0.0.1",
	hasPermssion: 0,
	credits: "ErikaOwO",
	description: "check ngày acc fb được tạo",
	commandCategory: "Công cụ",
	usages: "ngaytaoacc",
	cooldowns: 5
};

module.exports.run = async function({ api, event, args, Currencies }) {
try {
  const axios = require('axios')
  let uid = event.senderID;
  const resp = (await axios.get('https://golike.com.vn/func-api.php?user=' + uid)).data
  return api.sendMessage(`[⚜️]➜ Bạn đã tham gia Facebook vào lúc: ${resp.data.date}`, event.threadID, event.messageID)
} catch(e){
console.log(e)
}
}