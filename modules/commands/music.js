module.exports.config = {
  name: "music",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "D-Jukie",
  description: "Phát video thông qua link YouTube hoặc từ khoá tìm kiếm",
  commandCategory: "Youtube",
  usages: "[searchVideos]",
  cooldowns: 5,
  dependencies: {
      "ytdl-core": "",
      "simple-youtube-api": ""
  },
  envConfig: {
      "YOUTUBE_API": "AIzaSyANZ2iLlzjDztWXgbCgL8Oeimn3i3qd0bE"
  }
};

module.exports.handleReply = async function ({
  api,
  event,
  handleReply
}) {
  const axios = global.nodemodule['axios'];
  const fs = global.nodemodule["fs-extra"];
  const request = global.nodemodule["request"];
  const res = await axios.get(`https://raw.githubusercontent.com/J-JRT/api1/mainV2/rapiapi.json`);
  const length_KEY = res.data.keyVideo.length
  const randomAPIKEY = res.data.keyVideo[Math.floor(Math.random() * length_KEY)]
  const {
      createReadStream,
      createWriteStream,
      unlinkSync,
      statSync
  } = global.nodemodule["fs-extra"];
  try {
      var options = {
                method: 'GET',
                url: 'https://ytstream-download-youtube-videos.p.rapidapi.com/dl',
                params: {id: `${handleReply.link[event.body - 1]}`, geo: 'DE'},
                headers: {
                  'x-rapidapi-host': 'ytstream-download-youtube-videos.p.rapidapi.com',
                  'x-rapidapi-key': `${randomAPIKEY}`
                }
              };
      const data = await axios.request(options);
      path1 = __dirname + `/cache/${event.senderID}.mp3`
      const getms = (await axios.get(`${data.data.link["18"]}`, {
          responseType: "arraybuffer"
      })).data;
      fs.writeFileSync(path1, Buffer.from(getms, "utf-8"));
      api.unsendMessage(handleReply.messageID)
      if (fs.statSync(__dirname + `/cache/${event.senderID}.mp3`).size > 104000000) return api.sendMessage('𝐊𝐡𝐨̂𝐧𝐠 𝐭𝐡𝐞̂̉ 𝐠𝐮̛̉𝐢 𝐯𝐢𝐝𝐞𝐨 𝐯𝐢̀ 𝐝𝐮𝐧𝐠 𝐥𝐮̛𝐨̛̣𝐧𝐠 𝐥𝐨̛́𝐧 𝐡𝐨̛𝐧 𝟐𝟓𝐦𝐛', event.threadID, () => unlinkSync(__dirname + `/cache/${event.senderID}.mp3`), event.messageID);
      else return api.sendMessage({
          body: `${data.data.title}`,
          attachment: fs.createReadStream(__dirname + `/cache/${event.senderID}.mp3`)
      }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/${event.senderID}.mp3`), event.messageID)
  } catch {
      return api.sendMessage('𝐊𝐡𝐨̂𝐧𝐠 𝐭𝐡𝐞̂̉ 𝐱𝐮̛̉ 𝐥𝐲́ 𝐲𝐞̂𝐮 𝐜𝐚̂̀𝐮 𝐜𝐮̉𝐚 𝐛𝐚̣𝐧', event.threadID, event.messageID);
  }
  return api.unsendMessage(handleReply.messageID);
}
module.exports.run = async function ({
  api,
  event,
  args
}) {
  const axios = global.nodemodule['axios'];
  const fs = global.nodemodule["fs-extra"];
  const request = global.nodemodule["request"];
  const ytdl = global.nodemodule["ytdl-core"];
  const YouTubeAPI = global.nodemodule["simple-youtube-api"];
  const res = await axios.get(`https://raw.githubusercontent.com/J-JRT/api1/mainV2/rapiapi.json`);
  const length_KEY = res.data.keyVideo.length
  const randomAPIKEY = res.data.keyVideo[Math.floor(Math.random() * length_KEY)]
  const {
      createReadStream,
      createWriteStream,
      unlinkSync,
      statSync
  } = global.nodemodule["fs-extra"];
  const youtube = new YouTubeAPI(global.configModule[this.config.name].YOUTUBE_API);
  const keyapi = global.configModule[this.config.name].YOUTUBE_API
  if (args.length == 0 || !args) return api.sendMessage('» 𝐏𝐡𝐚̂̀𝐧 𝐭𝐢̀𝐦 𝐤𝐢𝐞̂́𝐦 𝐤𝐡𝐨̂𝐧𝐠 𝐭𝐡𝐞̂̉ 𝐛𝐨̉ 𝐭𝐫𝐨̂́𝐧𝐠', event.threadID, event.messageID);
  const keywordSearch = args.join(" ");
  if (args.join(" ").indexOf("https://") == 0) {
      var url = args.join(" ")
      var urlsplit = url.split(/^.*(youtu.be\/|v\/|embed\/|watch\?|youtube.com\/user\/[^#]*#([^\/]*?\/)*)\??v?=?([^#\&\?]*).*/);
      const linkUrlSing = urlsplit[3]
      var options = {
                    method: 'GET',
                    url: 'https://ytstream-download-youtube-videos.p.rapidapi.com/dl',
                    params: {id: `${linkUrlSing}`, geo: 'DE'},
                    headers: {
                      'x-rapidapi-host': 'ytstream-download-youtube-videos.p.rapidapi.com',
                      'x-rapidapi-key': `${randomAPIKEY}`
                    }
                  };
      const data = await axios.request(options);
      path1 = __dirname + `/cache/${event.senderID}.mp3`
      const getms = (await axios.get(`${data.data.link["18"]}`, {
          responseType: "arraybuffer"
      })).data;
      fs.writeFileSync(path1, Buffer.from(getms, "utf-8"));
      if (fs.statSync(__dirname + `/cache/${event.senderID}.mp3`).size > 104000000) return api.sendMessage('𝐊𝐡𝐨̂𝐧𝐠 𝐭𝐡𝐞̂̉ 𝐠𝐮̛̉𝐢 𝐯𝐢𝐝𝐞𝐨 𝐯𝐢̀ 𝐝𝐮𝐧𝐠 𝐥𝐮̛𝐨̛̣𝐧𝐠 𝐥𝐨̛́𝐧 𝐡𝐨̛𝐧 𝟐𝟓𝐦𝐛', event.threadID, () => unlinkSync(__dirname + `/cache/${event.senderID}.mp3`), event.messageID);
      else return api.sendMessage({
          body: `» ${data.data.title} «`,
          attachment: fs.createReadStream(__dirname + `/cache/${event.senderID}.mp3`)
      }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/${event.senderID}.mp3`), event.messageID)
  } else {
      try {
          var link = [],
              msg = "",
              num = 0,
              numb = 0;
          var imgthumnail = [];
          var results = await youtube.searchVideos(keywordSearch, 6);
          for (let value of results) {
              if (typeof value.id == 'undefined') return;
              link.push(value.id);
              var idd = value.id;
              let datab = (await axios.get(`https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=${value.id}&key=${keyapi}`)).data;
              let gettime = datab.items[0].contentDetails.duration;
              let timeee = (gettime.slice(2));
              let timee = timeee.replace('S', '')
              let time = timee.replace('M', ':')
              let datac = (await axios.get(`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${value.id}&key=${keyapi}`)).data;
              let channel = datac.items[0].snippet.channelTitle;
              let folderthumnail = __dirname + `/cache/${numb+=1}.png`;
              let linkthumnail = `https://img.youtube.com/vi/${value.id}/maxresdefault.jpg`;
              let getthumnail = (await axios.get(`${linkthumnail}`, {
                  responseType: 'arraybuffer'
              })).data;
              fs.writeFileSync(folderthumnail, Buffer.from(getthumnail, 'utf-8'));

              imgthumnail.push(fs.createReadStream(__dirname + `/cache/${numb}.png`));
              num = num+=1
              if (num == 1) var num1 = "⓵"
              if (num == 2) var num1 = "⓶" 
              if (num == 3) var num1 = "⓷" 
              if (num == 4) var num1 = "⓸" 
              if (num == 5) var num1 = "⓹" 
              if (num == 6) var num1 = "⓺"
              msg += (`${num1} ${value.title}\n[⏰] 𝐓𝐢𝐦𝐞: ${time}\n[📻] 𝐊𝐞̂𝐧𝐡: ${channel}\n---------------------------\n`);
          }
          var body = `»🔎 𝐂𝐨́ ${link.length} 𝐝𝐚𝐧𝐡 𝐬𝐚́𝐜𝐡 𝐭𝐫𝐮̀𝐧𝐠 𝐯𝐨̛́𝐢 𝐭𝐮̛̀ 𝐤𝐡𝐨𝐚́ 𝐭𝐢̀𝐦 𝐤𝐢𝐞̂́𝐦 𝐜𝐮̉𝐚 𝐛𝐚̣𝐧:\n\n${msg}\n» 𝐇𝐚̃𝐲 𝐫𝐞𝐩𝐥𝐲 (𝐩𝐡𝐚̉𝐧 𝐡𝐨̂̀𝐢 𝐭𝐡𝐞𝐨 𝐬𝐨̂́ 𝐭𝐡𝐮̛́ 𝐭𝐮̛̣) 𝐜𝐡𝐨̣𝐧 𝐦𝐨̣̂𝐭 𝐭𝐫𝐨𝐧𝐠 𝐧𝐡𝐮̛̃𝐧𝐠 𝐭𝐢̀𝐦 𝐤𝐢𝐞̂́𝐦 𝐭𝐫𝐞̂𝐧`

          return api.sendMessage({
                  attachment: imgthumnail,
                  body: body
              }, event.threadID, (error, info) => global.client.handleReply.push({
                  name: this.config.name,
                  messageID: info.messageID,
                  author: event.senderID,
                  link
              }),
              event.messageID);
      } catch (error) {
          const fs = global.nodemodule["fs-extra"];
          const axios = global.nodemodule["axios"];
          var link = [],
              msg = "",
              num = 0,
              numb = 0;
          var imgthumnail = []
          var results = await youtube.searchVideos(keywordSearch, 6);
          for (let value of results) {
              if (typeof value.id == 'undefined') return;
              link.push(value.id);
              var idd = value.id;
              let folderthumnail = __dirname + `/cache/${numb+=1}.png`;

              let linkthumnail = `https://img.youtube.com/vi/${value.id}/hqdefault.jpg`;

              let getthumnail = (await axios.get(`${linkthumnail}`, {
                  responseType: 'arraybuffer'
              })).data;
              let datab = (await axios.get(`https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=${value.id}&key=${keyapi}`)).data;
              let gettime = datab.items[0].contentDetails.duration;
              let timeee = (gettime.slice(2));
              let timee = timeee.replace('S', '')
              let time = timee.replace('M', ':')

              let datac = (await axios.get(`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${value.id}&key=${keyapi}`)).data;
              let channel = datac.items[0].snippet.channelTitle;
              fs.writeFileSync(folderthumnail, Buffer.from(getthumnail, 'utf-8'));
              imgthumnail.push(fs.createReadStream(__dirname + `/cache/${numb}.png`));
              num = num+=1
              if (num == 1) var num1 = "⓵"
              if (num == 2) var num1 = "⓶"
              if (num == 3) var num1 = "⓷"
              if (num == 4) var num1 = "⓸"
              if (num == 5) var num1 = "⓹"
              if (num == 6) var num1 = "⓺"
              msg += (`${num1} ${value.title}\n[⏰] 𝐓𝐢𝐦𝐞: ${time}\n[📻] 𝐊𝐞̂𝐧𝐡: ${channel}\n---------------------------\n`);
          }
          var body = `»🔎 𝐂𝐨́ ${link.length} 𝐝𝐚𝐧𝐡 𝐬𝐚́𝐜𝐡 𝐭𝐫𝐮̀𝐧𝐠 𝐯𝐨̛́𝐢 𝐭𝐮̛̀ 𝐤𝐡𝐨𝐚́ 𝐭𝐢̀𝐦 𝐤𝐢𝐞̂́𝐦 𝐜𝐮̉𝐚 𝐛𝐚̣𝐧:\n\n${msg}\n» 𝐇𝐚̃𝐲 𝐫𝐞𝐩𝐥𝐲 (𝐩𝐡𝐚̉𝐧 𝐡𝐨̂̀𝐢 𝐭𝐡𝐞𝐨 𝐬𝐨̂́ 𝐭𝐡𝐮̛́ 𝐭𝐮̛̣) 𝐜𝐡𝐨̣𝐧 𝐦𝐨̣̂𝐭 𝐭𝐫𝐨𝐧𝐠 𝐧𝐡𝐮̛̃𝐧𝐠 𝐭𝐢̀𝐦 𝐤𝐢𝐞̂́𝐦 𝐭𝐫𝐞̂𝐧`
          return api.sendMessage({
                  attachment: imgthumnail,
                  body: body
              }, event.threadID, (error, info) => global.client.handleReply.push({
                  name: this.config.name,
                  messageID: info.messageID,
                  author: event.senderID,
                  link
              }),
              event.messageID);
      }
  }
  for (let ii = 1; ii < 7; ii++) {
      unlinkSync(__dirname + `/cache/${ii}.png`)
  }
}