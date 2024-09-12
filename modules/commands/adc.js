module.exports.config = {
    name: "adc",
    version: "1.0.0",
    hasPermssion: 3,
    credits: "D-Jukie mod lại by DongDev",
    description: "Áp dụng code all link raw",
    commandCategory: "Admin",
    usages: "Thành viên không được dùng, đừng có mà tò mò",
    cooldowns: 0,
    usePrefix: false,
    images: [],
};

module.exports.run = async function({ api, event, args }) {
  if (!global.config.ADMC.includes(event.senderID))  api.sendMessage( "⚠️ Bạn không đủ quyền hạn để sử dụng lệnh này chỉ cho admin chạy bot dùng." , event.threadID, event.messageID);  
  var idad = global.config.ADMC;
  var name = global.data.userName.get(event.senderID);
  var threadInfo = await api.getThreadInfo(event.threadID);
  var nameBox = threadInfo.threadName;
  var time = require("moment-timezone").tz("Asia/Ho_Chi_Minh").format("HH:mm:ss | DD/MM/YYYY");
  if (!idad.includes(event.senderID)) return api.sendMessage("📌 Box : " + nameBox + "\n👤 " + name + " đã dùng lệnh " + this.config.name + "\n📎 Link Facebook : https://www.facebook.com/profile.php?id=" + event.senderID + "\n⏰ Time : " + time, idad);
    const axios = require('axios');
    const fs = require('fs');
    const request = require('request');
    const cheerio = require('cheerio');
    const { join, resolve } = require("path");
    const { senderID, threadID, messageID, messageReply, type } = event;
    var name = args[0];
    if (type == "message_reply") {
        var text = messageReply.body;
    }
    if(!text && !name)  return api.sendMessage(`⚠️ Vui lòng reply link muốn áp dụng code hoặc ghi tên file để up code lên runmocky!`,event.threadID, event.messageID)
        if (!text && name) {
        var data = fs.readFile(
            `${__dirname}/${args[0]}.js`,
            "utf-8",
            async (err, data) => {
            if (err) return api.sendMessage(`❎ Lệnh ${args[0]} không tồn tại trên hệ thống!`, threadID, messageID);
   const response = await axios.post("https://api.mocky.io/api/mock", {
      "status": 200,
      "content": data,
      "content_type": "application/json",
      "charset": "UTF-8",
      "secret": "Kaito Kid",
      "expiration": "never"
    });
    const link = response.data.link;
    return api.sendMessage(link, threadID, messageID);  
          });
        return
    }
    const urlR = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g
    const url = text.match(urlR);

    if (url) {
        axios.get(url[0]).then(i => {
            var data = i.data
            fs.writeFile(
                `${__dirname}/${args[0]}.js`,
                data,
                "utf-8",
                function (err) {
                    if (err) return api.sendMessage(`❎ Đã xảy ra lỗi khi áp dụng cod vào ${args[0]}.js`, threadID, messageID);
   api.sendMessage(`☑️ Đã áp dụng code vào ${args[0]}.js, sử dụng load để update modules mới!`, threadID, messageID);
                }
            );
        })
    }

    if (url[0].indexOf('buildtool') !== -1 || url[0].indexOf('tinyurl.com') !== -1) {
        const options = {
            method: 'GET',
            url: messageReply.body
        };
        request(options, function (error, response, body) {
            if (error) return api.sendMessage('⚠️ Vui lòng chỉ reply link raw (không chứa gì khác ngoài kink)', threadID, messageID);
            const load = cheerio.load(body);
            load('.language-js').each((index, el) => {
                if (index !== 0) return;
                var code = el.children[0].data
                fs.writeFile(`${__dirname}/${args[0]}.js`, code, "utf-8",
                    function (err) {
                        if (err) return api.sendMessage(`❎ Đã xảy ra lỗi khi áp dụng code mới cho "${args[0]}.js".`, threadID, messageID);
                        return api.sendMessage(`☑️ Đã thêm code này vào "${args[0]}.js", sử dụng load để update modules mới!`, threadID, messageID);
                    }
                );
            });
        });
        return
    }
    if (url[0].indexOf('drive.google') !== -1) {
      var id = url[0].match(/[-\w]{25,}/)
      const path = resolve(__dirname, `${args[0]}.js`);
      try {
        await utils.downloadFile(`https://drive.google.com/u/0/uc?id=${id}&export=download`, path);
        return api.sendMessage(`☑️ Đã thêm code này vào "${args[0]}.js" nếu xảy ra lỗi thì đổi file drive thành txt nhé!`, threadID, messageID);
      }
      catch(e) {
        return api.sendMessage(`❎ Đã xảy ra lỗi khi áp dụng code mới cho "${args[0]}.js".`, threadID, messageID);
       }
    }
}