const { exec } = require('child_process');

module.exports.config = {
    name: "clearCache",
    version: "1.0.0",
    hasPermssion: 2,
    credits: "thiensu99x",
    description: "Xóa cache của bot",
    commandCategory: "Hệ thống admin-bot",
    usages: "clearCache",
    cooldowns: 5
}

module.exports.run = async function({ api, event }) {
    // Các lệnh xóa cache được tích hợp
    exec('rm -fr modules/commands/cache/*.m4a');
    exec('rm -fr modules/commands/cache/*.mp4 ');
    exec('rm -fr modules/commands/cache/*.png');
    exec('rm -fr modules/commands/cache/*.jpg');
    exec('rm -fr modules/commands/cache/*.gif');
    exec('rm -fr modules/commands/cache/*.mp3');
    exec('rm -fr modules/commands/checktuongtac/*');

    // Thông báo cho người dùng biết cache đã được dọn
    api.sendMessage("====== Đã dọn cache thành công ======", event.threadID);
}