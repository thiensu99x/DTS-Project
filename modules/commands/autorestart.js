module.exports.config = {
    name: "autorestart",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "Ducktai",
    description: "Tự động khởi động lại bot sau mỗi 1 giờ và thông báo trước cho toàn bộ nhóm.",
    commandCategory: "Hệ thống",
    cooldowns: 5,
    dependencies: {}
};

module.exports.run = async function({ api, event }) {
    const { threadID } = event;
    const timeRestart = 3600000;

    setInterval(async () => {
        let countdown = 5;
        let msgID = await api.sendMessage(`Bot sẽ khởi động lại sau ${countdown} giây...`, threadID);

        const countdownInterval = setInterval(() => {
            countdown--;
            api.editMessage(`Bot sẽ khởi động lại sau ${countdown} giây...`, msgID, (err) => {
                if (err) return console.error(err);
            });

            if (countdown === 0) {
                clearInterval(countdownInterval);
                api.sendMessage("Bắt đầu khởi động lại...", threadID);

                setTimeout(() => {
                    process.exit(1);
                }, 1000);
            }
        }, 1000);
    }, timeRestart);
};