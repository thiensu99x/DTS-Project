module.exports.config = {
	name: "rip",
	version: "1.0.1",
	hasPermssion: 0,
	credits: "Bin Nèe",// Đổi credits con cặc
	description: "rip",
	commandCategory: "hành động",
	usages: "rip",
	cooldowns: 5,
	dependencies: {
	  "fs-extra": "",
	  "axios": "",
	  "canvas" :"",
	  "jimp": "",
	  "node-superfetch": ""
	}
};

module.exports.circle = async (image) => {
	  const jimp = global.nodemodule['jimp'];
  	image = await jimp.read(image);
  	image.circle();
  	return await image.getBufferAsync("image/png");
};

module.exports.run = async ({ event, api, args, Users }) => {
try {
  const Canvas = global.nodemodule['canvas'];
  const request = global.nodemodule["node-superfetch"];
  const jimp = global.nodemodule["jimp"];
  const fs = global.nodemodule["fs-extra"];
  var path_rip = __dirname+'/cache/rip.png'; 
  var id = Object.keys(event.mentions)[0] || event.senderID;
  const canvas = Canvas.createCanvas(500, 670);
	const ctx = canvas.getContext('2d');
	const background = await Canvas.loadImage('https://i.imgur.com/drIE0ve.jpeg');
  
	var avatar = await request.get(`https://graph.facebook.com/${id}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`);
	avatar = await this.circle(avatar.body);
	ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
	ctx.drawImage(await Canvas.loadImage(avatar), 50, 210, 150, 150);
	const imageBuffer = canvas.toBuffer();
	fs.writeFileSync(path_rip,imageBuffer);
	 api.sendMessage({attachment: fs.createReadStream(path_rip, {'highWaterMark': 128 * 1024}), body: "..."}, event.threadID, () => fs.unlinkSync(path_rip), event.messageID);
}
catch(e) {api.sendMessage(e.stack, event.threadID )}
}