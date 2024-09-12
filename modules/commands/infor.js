const sendWaiting = false; // bật hoặc tắt gửi tin nhắn "đang tạo hình ảnh, vui ồng chờ đợi...";
const textWaiting = "Đang khởi tạo hình ảnh, vui lòng chờ đợi trong giây lát";
const fonts = "/cache/Play-Bold.ttf"
const downfonts = "https://drive.google.com/u/0/uc?id=1uni8AiYk7prdrC7hgAmezaGTMH5R8gW8&export=download"
const fontsLink = 28
const fontsInfo = 35
const colorName = "#00FFFF"

module.exports.config = {
  name: "infor",
  version: "2.0.0",
  hasPermssion: 0,
  credits: "Dũngkon",
  description: "Tạo card thông tin người dùng facebook",
  commandCategory: "Thông tin",
  usages: "infor",
  cooldowns: 10,
  dependencies: {
    canvas: "",
    axios: "",
    "fs-extra": "",
  },
};

module.exports.circle = async (image) => {
  const jimp = global.nodemodule["jimp"];
  image = await jimp.read(image);
  image.circle();
  return await image.getBufferAsync("image/png");
}
module.exports.run = async function ({ api, event, args, Users }) {
  let { senderID, threadID, messageID } = event;
  const { loadImage, createCanvas } = require("canvas");
  const request = require('request');
  const fs = global.nodemodule["fs-extra"];
  const axios = global.nodemodule["axios"];
  const Canvas = global.nodemodule["canvas"];
  let pathImg = __dirname + `/cache/1.png`;
  let pathAvata = __dirname + `/cache/2.png`;
  /*                 */
  if(event.type == "message_reply") { uid = event.messageReply.senderID }
    else uid = event.senderID;
    const res = await api.getUserInfoV2(uid); 
  let getAvatarOne = (await axios.get(`https://graph.facebook.com/${uid}/picture?height=1500&width=1500&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`, { responseType: 'arraybuffer' })).data;
  let bg = (
    await axios.get(encodeURI(`https://i.imgur.com/rqbC4ES.jpg`), {
      responseType: "arraybuffer",
    })
  ).data;
  fs.writeFileSync(pathAvata, Buffer.from(getAvatarOne, 'utf-8'));
  avataruser = await this.circle(pathAvata);
  fs.writeFileSync(pathImg, Buffer.from(bg, "utf-8"));

/*-----------------download----------------------*/
if(!fs.existsSync(__dirname+`${fonts}`)) { 
      let getfont = (await axios.get(`${downfonts}`, { responseType: "arraybuffer" })).data;
       fs.writeFileSync(__dirname+`${fonts}`, Buffer.from(getfont, "utf-8"));
    };
/*---------------------------------------------*/

  let baseImage = await loadImage(pathImg);
  let baseAvata = await loadImage(avataruser);
  let canvas = createCanvas(baseImage.width, baseImage.height);
  let ctx = canvas.getContext("2d");
  ctx.drawImage(baseImage, 0, 0, canvas.width, canvas.height);
  ctx.drawImage(baseAvata, 910, 465, 229, 229);
    var gender = res.gender == 'male' ? "Nam" : res.gender == 'female' ? "Nữ" : "Không công khai";
    var birthday = res.birthday ? `${res.birthday}` : "Không nhớ ngày sinh của mình hả??? ";
    var love = res.relationship_status ? `${res.relationship_status}` : "F.A mãi thế ? "
    var location = res.location.name ? `${res.location.name}` : "Không có nhà để ở à? "
    var hometown = res.hometown.name ? `${res.hometown.name}` : "Không có quê à?"
  Canvas.registerFont(__dirname+`${fonts}`, {
        family: "Lobster"
    });
  ctx.font = `${fontsInfo}px Lobster`;
  ctx.fillStyle = "#00FFFF";
  ctx.textAlign = "start";
  fontSize = 60;
  ctx.fillText(`Tên: ${res.name}`, 340, 560);
  ctx.fillText(`Giới tính: ${gender}`, 1245, 448);
  ctx.fillText(`Follow: ${res.follow}`, 1245, 505);
  ctx.fillText(`Mối quan hệ: ${love}`, 1245, 559);
  ctx.fillText(`Sinh nhật: ${birthday}`, 1245, 616);
  ctx.fillText(`Nơi ở: ${location}`, 1245, 668);
  ctx.fillText(`Quê hương: ${hometown}`, 1245, 723);
  ctx.font = `${fontsLink}px Lobster`;
  ctx.fillStyle = "#FFCC33";
  ctx.textAlign = "start";
  fontSize = 60;
  ctx.fillText(`→ UID: ${uid}`, 800, 728);
  ctx.beginPath();
  ctx.font = `${fontsLink}px Lobster`;
  ctx.fillStyle = "#00FF00";
  ctx.textAlign = "start";
  fontSize = 60;  
  ctx.fillText(`→ Profile: ${res.link}`, 41, 730);
  ctx.beginPath();
  const imageBuffer = canvas.toBuffer();
  fs.writeFileSync(pathImg, imageBuffer);
  fs.removeSync(pathAvata);
  
  return api.sendMessage(
    { attachment: fs.createReadStream(pathImg) },
    threadID,
    () => fs.unlinkSync(pathImg),
    messageID
  );
};

 
