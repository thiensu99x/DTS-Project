module.exports.config = {
	name: "menu2",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "",
	description: "Hướng dẫn cho người mới",
	usages: "[all/-a] [số trang]",
	commandCategory: "system",
	cooldowns: 5
};

module.exports.handleReply = async function ({ api, event, handleReply }) {
	let num = parseInt(event.body.split(" ")[0].trim());
	(handleReply.bonus) ? num -= handleReply.bonus : num;
	let msg = "";
	let data = handleReply.content;
	let check = false;
	if (isNaN(num)) msg = "𝗩𝘂𝗶 𝗹𝗼̀𝗻𝗴 𝗰𝗵𝗼̣𝗻 𝘀𝗼̂́";
	else if (num > data.length || num <= 0) msg = "𝗦𝗼̂́ 𝗯𝗮̣𝗻 𝗰𝗵𝗼̣𝗻 𝗸𝗵𝗼̂𝗻𝗴 𝗻𝗮̆̀𝗺 𝘁𝗿𝗼𝗻𝗴 𝗱𝗮𝗻𝗵 𝘀𝗮́𝗰𝗵, 𝘃𝘂𝗶 𝗹𝗼̀𝗻𝗴 𝘁𝗵𝘂̛̉ 𝗹𝗮̣𝗶";
	else {
		const { commands } = global.client;
		let dataAfter = data[num-=1];
		if (handleReply.type == "cmd_info") {
			let command_config = commands.get(dataAfter).config;
			msg += ` 『  ${command_config.commandCategory.toUpperCase()}   』   \n`;
			msg += `\nTên lệnh: ${dataAfter}`;
			msg += `\nMô tả: ${command_config.description}`;
			msg += `\nCách sử dụng: ${(command_config.usages) ? command_config.usages : ""}`;
			msg += `\nThời gian chờ: ${command_config.cooldowns || 5}s`;
			msg += `\nQuyền hạn: ${(command_config.hasPermssion == 0) ? "Người dùng" : (command_config.hasPermssion == 1) ? "Quản trị viên nhóm" : "Quản trị viên bot"}`;
			msg += `\n✎﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏`
			// msg += `\n\n» Module code by ${command_config.credits} «`;
		} else {
			check = true;
			let count = 0;
			msg += `» ${dataAfter.group.toUpperCase()} «\n`;

			dataAfter.cmds.forEach(item => {
				msg += `\n ${count+=1}. » ${item}: ${commands.get(item).config.description}`;
			})
			msg += `\n╭─────╮\n ${global.client.commands.size} 𝗟𝗲̣̂𝗻𝗵     \n╰─────╯ \n [💓] 𝐇𝐚̃𝐲 𝐫𝐞𝐩𝐥𝐲 (𝐩𝐡𝐚̉𝐧 𝐡𝐨̂̀𝐢) 𝐒𝐓𝐓 𝐧𝐞̂́𝐮 𝐦𝐮𝐨̂́𝐧 𝐱𝐞𝐦 𝐭𝐡𝐨̂𝐧𝐠 𝐭𝐢𝐧 𝐜𝐡𝐢 𝐭𝐢𝐞̂́𝐭 !`;
		}
	}
	const axios = require('axios');
	const fs = require('fs-extra');
	const img = ["https://i.imgur.com/bwRMCLA.mp4", "https://i.imgur.com/rs6iM8Q.mp4", "https://i.imgur.com/wN63PKH.mp4", "https://i.imgur.com/YkaQ3ie.mp4", "https://i.imgur.com/AVphhL6.mp4","https://i.imgur.com/9zpuQel.mp4","https://i.imgur.com/MmmCyS4.mp4","https://i.imgur.com/mSzC1y1.mp4","https://i.imgur.com/8OnpiFd.mp4","https://i.imgur.com/vz4MVML.mp4","https://i.imgur.com/HFoeVuS.mp4","https://i.imgur.com/qm6OwlQ.mp4","https://i.imgur.com/jgYrthb.mp4","https://i.imgur.com/bwRMCLA.mp4","https://i.imgur.com/GtfcSb5.mp4","https://i.imgur.com/q0H1PXr.mp4","https://i.imgur.com/1Dl5Y46.mp4","https://i.imgur.com/XGLcwT5.mp4"]
	var path = __dirname + "/cache/menu.mp4"
	var rdimg = img[Math.floor(Math.random() * img.length)]; 
	const imgP = []
	let dowloadIMG = (await axios.get(rdimg, { responseType: "arraybuffer" } )).data; 
	fs.writeFileSync(path, Buffer.from(dowloadIMG, "utf-8") );
	imgP.push(fs.createReadStream(path))
	var msgg = {body: msg, attachment: imgP}
	api.unsendMessage(handleReply.messageID);
	return api.sendMessage(msgg, event.threadID, (error, info) => {
		if (error) console.log(error);
		if (check) {
			global.client.handleReply.push({
				type: "cmd_info",
				name: this.config.name,
				messageID: info.messageID,
				content: data[num].cmds
			})
		}
	}, event.messageID);
}

module.exports.run = async function({ api, event, args }) {
	const { commands } = global.client;
	const { threadID, messageID } = event;
	const threadSetting = global.data.threadData.get(parseInt(threadID)) || {};
	const prefix = (threadSetting.hasOwnProperty("PREFIX")) ? threadSetting.PREFIX : global.config.PREFIX;
	const axios = require('axios');
	const fs = require('fs-extra');
	const imgP = []
	const img = ["https://i.imgur.com/bwRMCLA.mp4", "https://i.imgur.com/rs6iM8Q.mp4", "https://i.imgur.com/wN63PKH.mp4", "https://i.imgur.com/YkaQ3ie.mp4", "https://i.imgur.com/AVphhL6.mp4","https://i.imgur.com/9zpuQel.mp4","https://i.imgur.com/MmmCyS4.mp4","https://i.imgur.com/mSzC1y1.mp4","https://i.imgur.com/8OnpiFd.mp4","https://i.imgur.com/vz4MVML.mp4","https://i.imgur.com/HFoeVuS.mp4","https://i.imgur.com/qm6OwlQ.mp4","https://i.imgur.com/jgYrthb.mp4","https://i.imgur.com/bwRMCLA.mp4","https://i.imgur.com/GtfcSb5.mp4","https://i.imgur.com/q0H1PXr.mp4","https://i.imgur.com/1Dl5Y46.mp4","https://i.imgur.com/XGLcwT5.mp4","https://i.imgur.com/yIkrtwJ.mp4",
								"https://i.imgur.com/sXLPpEK.mp4",
								"https://i.imgur.com/FL5giD8.mp4",
								"https://i.imgur.com/DNOixJY.mp4",
								"https://i.imgur.com/MkckJzs.mp4",
								"https://i.imgur.com/lMuLeWw.mp4",
								"https://i.imgur.com/z7FFRdT.mp4",
								"https://i.imgur.com/v6YW8jw.mp4",
								"https://i.imgur.com/8prFZex.mp4",
								"https://i.imgur.com/ehm6LFq.mp4",
								"https://i.imgur.com/YfAz1yj.mp4",
								"https://i.imgur.com/QQRY3Zk.mp4",
								"https://i.imgur.com/gK8y8ek.mp4",
								"https://i.imgur.com/Y5hRZBr.mp4",
								"https://i.imgur.com/SPHMIxg.mp4",
								"https://i.imgur.com/1vaSksV.mp4",
								"https://i.imgur.com/Qk1wVum.mp4",
								"https://i.imgur.com/vaXJcOa.mp4",
								"https://i.imgur.com/ce83kHS.mp4",
								"https://i.imgur.com/13FYyFP.mp4",
								"https://i.imgur.com/bql3r81.mp4",
								"https://i.imgur.com/qlBs6QU.mp4",
								"https://i.imgur.com/hytj4xV.mp4",
								"https://i.imgur.com/bprNgcA.mp4",
								"https://i.imgur.com/lCNR2F8.mp4",
								"https://i.imgur.com/6Mw45Wc.mp4",
								"https://i.imgur.com/ByPGe8z.mp4",
								"https://i.imgur.com/iBzmU90.mp4",
								"https://i.imgur.com/xwotzq5.mp4",
								"https://i.imgur.com/2lbhYSO.mp4",
								"https://i.imgur.com/AzBPWbx.mp4",
								"https://i.imgur.com/yqPoTTD.mp4",
								"https://i.imgur.com/bj8JY1q.mp4",
								"https://i.imgur.com/OvmKQf0.mp4",
								"https://i.imgur.com/C0zaZZV.mp4",
								"https://i.imgur.com/Hia1kgw.mp4",
								"https://i.imgur.com/5NWlDqI.mp4",
								"https://i.imgur.com/DzVF3Xd.mp4",
								"https://i.imgur.com/0vm2yEs.mp4",
								"https://i.imgur.com/mBK4DL2.mp4",
								"https://i.imgur.com/iFlIy4X.mp4",
								"https://i.imgur.com/zfy4cdg.mp4",
								"https://i.imgur.com/EE9C4nn.mp4",
								"https://i.imgur.com/6iKWM6A.mp4",
								"https://i.imgur.com/xtL0vKD.mp",
								"https://i.imgur.com/MrWplR5.mp4",
								"https://i.imgur.com/38awhBh.mp4",
								"https://i.imgur.com/IybO14I.mp4",
								"https://i.imgur.com/RSsJj2x.mp4",
								"https://i.imgur.com/Jj4tvMG.mp4",
								"https://i.imgur.com/6S2iS5N.mp4",
								"https://i.imgur.com/iOowufh.mp4",
								"https://i.imgur.com/GOUVti8.mp4",
								"https://i.imgur.com/qv6Mula.mp4",
								"https://i.imgur.com/kHWvd6L.mp4",
								"https://i.imgur.com/4uqnBwh.mp4",
								"https://i.imgur.com/yxPxoTk.mp4",
								"https://i.imgur.com/3fYdzKi.mp4",
								"https://i.imgur.com/YKunVev.mp4",
								"https://i.imgur.com/txu2ZY9.mp4",
								"https://i.imgur.com/uHBhxJu.mp4",
								"https://i.imgur.com/XKaKER4.mp4",
								"https://i.imgur.com/mOJDMhl.mp4",
								"https://i.imgur.com/lwfD4r5.mp4",
								"https://i.imgur.com/jabz5y7.mp4",
								"https://i.imgur.com/h0866u4.mp4",
								"https://i.imgur.com/EgwySrT.mp4",
								"https://i.imgur.com/u3vpBd3.mp4",
								"https://i.imgur.com/OxcOwjr.mp4",
								"https://i.imgur.com/ZKpXq4m.mp4",
								"https://i.imgur.com/VY9w95O.mp4",
								"https://i.imgur.com/RR8jDqO.mp4",
								"https://i.imgur.com/PyWTHWL.mp4",
								"https://i.imgur.com/cQ1K2de.mp4",
								"https://i.imgur.com/U4TD4s5.mp4",
								"https://i.imgur.com/tVfyVUv.mp4",
								"https://i.imgur.com/zO36tlx.mp4",
								"https://i.imgur.com/g1BuXTQ.mp4",]
	var path = __dirname + "/cache/menu.mp4"
	var rdimg = img[Math.floor(Math.random() * img.length)]; 

		let dowloadIMG = (await axios.get(rdimg, { responseType: "arraybuffer" } )).data; 
				fs.writeFileSync(path, Buffer.from(dowloadIMG, "utf-8") );
				imgP.push(fs.createReadStream(path))
	const command = commands.values();
	var group = [], msg = "=====『 𝗠𝗘𝗡𝗨 𝗖𝗢𝗠𝗠𝗔𝗡𝗗 』=====\n";
	let check = true, page_num_input = "";
	let bonus = 0;

	for (const commandConfig of command) {
		if (!group.some(item => item.group.toLowerCase() == commandConfig.config.commandCategory.toLowerCase())) group.push({ group: commandConfig.config.commandCategory.toLowerCase(), cmds: [commandConfig.config.name] });
		else group.find(item => item.group.toLowerCase() == commandConfig.config.commandCategory.toLowerCase()).cmds.push(commandConfig.config.name);
	}

	if (args[0] && ["all", "-a"].includes(args[0].trim())) {
		let all_commands = [];
		group.forEach(commandGroup => {
			commandGroup.cmds.forEach(item => all_commands.push(item));
		});
		let page_num_total = Math.ceil(all_commands.length / 2222222222);
		if (args[1]) {
			check = false;
			page_num_input = parseInt(args[1]);
			if (isNaN(page_num_input)) msg = "Vui lòng chọn số";
			else if (page_num_input > page_num_total || page_num_input <= 0) msg = "Số bạn chọn không nằm trong danh sách, vui lòng thử lại";
			else check = true;
		}
		if (check) {
		index_start = (page_num_input) ? (page_num_input * 2222222222) - 2222222222 : 0;
			bonus = index_start;
			index_end = (index_start + 2222222222 > all_commands.length) ? all_commands.length : index_start + 2222222222;
			all_commands = all_commands.slice(index_start, index_end);
			all_commands.forEach(e => {
	msg += `\n${index_start+=1}. » ${e}: ${commands.get(e).config.description}`;
				})
				msg += `\n\n→ [📖] 𝗧𝗿𝗮𝗻𝗴 ${page_num_input || 1}/${page_num_total} `;
				msg += `\n→ [🎀] Đ𝗲̂̉ 𝘅𝗲𝗺 𝗰𝗮́𝗰 𝘁𝗿𝗮𝗻𝗴 𝗸𝗵𝗮́𝗰, 𝗱𝘂̀𝗻𝗴: ${prefix}𝗺𝗲𝗻𝘂 [𝘀𝗼̂́ 𝘁𝗿𝗮𝗻𝗴]`;
				msg += `\n→ [🧸] 𝗕𝗮̣𝗻 𝗰𝗼́ 𝘁𝗵𝗲̂̉ 𝗱𝘂̀𝗻𝗴 ${prefix}𝗺𝗲𝗻𝘂 𝗮𝗹𝗹 đ𝗲̂̉ 𝘅𝗲𝗺 𝘁𝐚̂́𝘁 𝗰𝗮̉ 𝗹𝗲̣̂𝗻𝗵`
				msg += `\n╭─────╮\n ${global.client.commands.size} 𝗟𝗲̣̂𝗻𝗵     \n╰─────╯ \n [💓] 𝐇𝐚̃𝐲 𝐫𝐞𝐩𝐥𝐲 (𝐩𝐡𝐚̉𝐧 𝐡𝐨̂̀𝐢) 𝐒𝐓𝐓 𝐧𝐞̂́𝐮 𝐦𝐮𝐨̂́𝐧 𝐱𝐞𝐦 𝐭𝐡𝐨̂𝐧𝐠 𝐭𝐢𝐧 𝐜𝐡𝐢 𝐭𝐢𝐞̂́𝐭 !`;
			}
			var msgg = {body: msg, attachment: imgP}
			return api.sendMessage(msgg, threadID, (error, info) => {
				if (check) {
					global.client.handleReply.push({
						type: "cmd_info",
						bonus: bonus,
						name: this.config.name,
						messageID: info.messageID,
						content: all_commands
					})
				}
			}, messageID)
		}

		let page_num_total = Math.ceil(group.length / 2222222222);
		if (args[0]) {
			check = false;
			page_num_input = parseInt(args[0]);
			if (isNaN(page_num_input)) msg = "𝗩𝘂𝗶 𝗹𝗼̀𝗻𝗴 𝗰𝗵𝗼̣𝗻 𝘀𝗼̂́";
					else if (page_num_input > page_num_total || page_num_input <= 0) msg = "𝗦𝗼̂́ 𝗯𝗮̣𝗻 𝗰𝗵𝗼̣𝗻 𝗸𝗵𝗼̂𝗻𝗴 𝗻𝗮̆̀𝗺 𝘁𝗿𝗼𝗻𝗴 𝗱𝗮𝗻𝗵 𝘀𝗮́𝗰𝗵, 𝘃𝘂𝗶 𝗹𝗼̀𝗻𝗴 𝘁𝗵𝘂̛̉ 𝗹𝗮̣𝗶";
			else check = true;
		}
		if (check) {
			index_start = (page_num_input) ? (page_num_input * 2222222222) - 2222222222 : 0;
			bonus = index_start;
			index_end = (index_start + 2222222222 > group.length) ? group.length : index_start + 2222222222;
			group = group.slice(index_start, index_end);
			group.forEach(commandGroup => msg += `\n${index_start+=1}. » ${commandGroup.group.toUpperCase()} `);
				msg += `\n\n→ [📖] 𝗧𝗿𝗮𝗻𝗴 ${page_num_input || 1}/${page_num_total} `;
				msg += `\n→ [🎀] Đ𝗲̂̉ 𝘅𝗲𝗺 𝗰𝗮́𝗰 𝘁𝗿𝗮𝗻𝗴 𝗸𝗵𝗮́𝗰, 𝗱𝘂̀𝗻𝗴: ${prefix}𝗺𝗲𝗻𝘂 [𝘀𝗼̂́ 𝘁𝗿𝗮𝗻𝗴]`;
				msg += `\n→ [🧸] 𝗕𝗮̣𝗻 𝗰𝗼́ 𝘁𝗵𝗲̂̉ 𝗱𝘂̀𝗻𝗴 ${prefix}𝗺𝗲𝗻𝘂 𝗮𝗹𝗹 đ𝗲̂̉ 𝘅𝗲𝗺 𝘁𝐚̂́𝘁 𝗰𝗮̉ 𝗹𝗲̣̂𝗻𝗵`
				msg += `\n╭─────╮\n ${global.client.commands.size} 𝗟𝗲̣̂𝗻𝗵     \n╰─────╯ \n [💓] 𝐇𝐚̃𝐲 𝐫𝐞𝐩𝐥𝐲 (𝐩𝐡𝐚̉𝐧 𝐡𝐨̂̀𝐢) 𝐒𝐓𝐓 𝐧𝐞̂́𝐮 𝐦𝐮𝐨̂́𝐧 𝐱𝐞𝐦 𝐭𝐡𝐨̂𝐧𝐠 𝐭𝐢𝐧 𝐜𝐡𝐢 𝐭𝐢𝐞̂́𝐭 !`;
		}
		var msgg = {body: msg, attachment: imgP}
		return api.sendMessage(msgg, threadID, async (error, info) => {
			global.client.handleReply.push({
				name: this.config.name,
				bonus: bonus,
				messageID: info.messageID,
				content: group
			})
		});
	}