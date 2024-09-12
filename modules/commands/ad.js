module.exports.config = {
	name: "ad",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "Thiên Sứ",
	description: "Thông tin về admin",
	commandCategory: "Thông tin",
	cooldowns: 0
};

module.exports.run = ({ event, api }) => api.sendMessage(`\n★Thông Tin Admin Bot Này★\nADMIN NAME :Thiên Sứ\nBiệt Danh: Noah :>\nLink Facebook : https://www.facebook.com/ThienSu99x\nVài lời tới người dùng BOT: Vui lòng không spam khi sử dụng để tránh die bot.\nLưu ý : Đừng có dại dột mà add 2 bot kẻo bị phát hiện là bạn toang đó <3\nCảnh báo : Vui lòng không dùng bot với mục đích xấu hay cố ý report acc facebook\n=== ĐINH THIÊN SỨ ===`, event.threadID, event.messageID);