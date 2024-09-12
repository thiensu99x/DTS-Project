module.exports.config = {
  name: "lamnet",  
  version: "1.0.0", 
  hasPermssion: 0,
  credits: "Dũngkon // Mod By DaoTruong",
  description: "Làm nét ảnh", 
  commandCategory: "Tiện ích",
  usages: "reply",
  cooldowns: 5,
  usePrefix: true,
};
module.exports.run = async function({ api, event, args }) {
  const fs = global.nodemodule["fs-extra"];
  const axios = require('axios');
  const moment = require('moment');

  if (!event.messageReply || !event.messageReply.attachments || event.messageReply.attachments.length == 0) {
    return api.sendMessage('❎Bạn phải reply một ảnh để xử lý!', event.threadID, async (err, info) => {
      await new Promise(resolve => setTimeout(resolve, 5 * 1000));
      return api.unsendMessage(info.messageID);
	  }, event.messageID)
  }

  var attachments = event.messageReply.attachments;
  if (attachments.length > 10) return api.sendMessage('❎Bạn không thể xử lý quá 10 ảnh cùng một lúc!', event.threadID, async (err, info) => {
      await new Promise(resolve => setTimeout(resolve, 5 * 1000));
      return api.unsendMessage(info.messageID);
	  }, event.messageID)

  var processedImages = [];
  
  const totalStartTime = Date.now();
  const formattedStartTime = moment(totalStartTime).tz("Asia/Ho_Chi_Minh").format("HH:mm:ss || DD/MM/YYYY");
  api.sendMessage(`♻️Tiến Hành Tăng Độ Phân Giải!!\n⏰Bắt đầu: ${formattedStartTime}\n\n⚠️Vui lòng không spam lệnh cho tới khi bot sử lý xong ảnh!!!`, event.threadID, async (err, info) => {
      await new Promise(resolve => setTimeout(resolve, 5 * 1000));
      return api.unsendMessage(info.messageID);
	  }, event.messageID)
  
  for (var i = 0; i < attachments.length; i++) {
    var linkUp = attachments[i].url;
  
    try {
      const res = await axios.get(`https://api.sumiproject.net/imgur?link=${encodeURIComponent(linkUp)}`);
      const link = res.data.uploaded.image;
      var img = (await axios.get(`https://duongkum999.tech/upscale?url=${link}`, { responseType: "arraybuffer" })).data;
      var imagePath = __dirname + `/cache/lmnet${i}.png`;
      fs.writeFileSync(imagePath, Buffer.from(img, "utf-8"));
      processedImages.push(fs.createReadStream(imagePath));
    } catch(e) {
      return api.sendMessage(e, event.threadID, event.messageID);
    }
  }

  const totalEndTime = Date.now();
  const totalProcessTime = (totalEndTime - totalStartTime) / 1000; // total time in seconds

  api.sendMessage({ body: `✅Tất cả hình ảnh đã được xử lý thành công!\n⏰Tổng thời gian xử lý: ${totalProcessTime} giây
Link ảnh gốc: ${link}`, attachment: processedImages}, event.threadID, () => 
        processedImages.forEach((imagePath, i) => fs.unlinkSync(__dirname + `/cache/lmnet${i}.png`)), event.messageID);
}