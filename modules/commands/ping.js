module.exports.config = {
	name: "ping",
	version: "1.0.5",
	hasPermssion: 1,
	credits: "Mirai Team",
	description: "tag toàn bộ thành viên",
	commandCategory: "Hệ thống admin-bot",
	usages: "[Text]",
	cooldowns: 5
};

module.exports.run = async function({ api, event, args }) {
	try {
		const botID = api.getCurrentUserID();
		var listAFK, listUserID;
		global.moduleData["afk"] && global.moduleData["afk"].afkList ? listAFK = Object.keys(global.moduleData["afk"].afkList || []) : listAFK = []; 
		listUserID = event.participantIDs.filter(ID => ID != botID && ID != event.senderID);
		listUserID = listUserID.filter(item => !listAFK.includes(item));
		var body = (args.length != 0) ? args.join(" ") : "𝐃𝐚̣̂𝐲 𝐓𝐮̛𝐨̛𝐧𝐠 𝐓𝐚́𝐜 Đ𝐢 𝐍𝐚̀𝐨", mentions = [], index = 0;
		for(const idUser of listUserID) {
			body = "‎" + body;
			mentions.push({ id: idUser, tag: "‎", fromIndex: index - 1 });
			index -= 1;
		}
		let msg={ body, mentions };
        if(event.type == 'message_reply'){
            let
            url = event.messageReply.attachments[0].url,
            base = (await require('axios').get(url, {
                responseType: 'arraybuffer',
            })).data,
            formUrl = new URL(url),
            path = './cache/1.'+event.messageReply.attachments[0].type=='audio'?'mp3':formUrl.pathname.split('.').pop();
            
            require('fs').writeFileSync(path, base);
            
            msg.attachment=require('fs').createReadStream(path);
        }
		return api.sendMessage(msg, event.threadID, event.messageID);

	}
	catch (e) { return console.log(e); }
  }