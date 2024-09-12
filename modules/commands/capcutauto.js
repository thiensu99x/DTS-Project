module.exports.config = {
    name: "capcut",
    version: "1.0.1",
    hasPermssion: 0,
    credits: "dtai",
    description: "Thông Tin Mẫu Capcut",
    commandCategory: "Tiện ích",
    usages: "+link mẫu capcut",
    cooldowns: 5
};

module.exports.run = async function ({ api, event, args }) {
    console.log('Bắt đầu tải video capcut!');
};

module.exports.handleEvent = async function ({ api, event }) {
    const { body, senderID, threadID, messageID } = event;
    const axios = require("axios");

    const regex = /(https:\/\/www.capcut.com\/t\/[a-zA-Z0-9_-]+)|(https:\/\/www.capcut.com\/template-detail\/[a-zA-Z0-9_-]+)/g;
    const links = body.match(regex);

    if (!links || senderID == api.getCurrentUserID() || senderID == '') return api.sendMessage("Tiến hành down");

    for (const link of links) {
        try {
            const res = await axios.get(`http://127.0.0.1:8300/api/capcut?url=${link}`);
            const { title, description, usage, video } = res.data;

            await api.sendMessage({
                body: `📸==== [ 𝗖𝗔𝗣𝗖𝗨𝗧 ] ====📸
━━━━━━━━━━━━━━━━
📝 𝗧𝗶𝘁𝗹𝗲: ${title}
😻 𝗠𝗼̂ 𝘁𝗮̉: ${description}
🌸 𝗟𝘂̛𝗛̃𝗵 𝗱𝘂̀𝗻𝗴: ${usage}
🧸 𝗟𝗶𝗻𝗸 𝗰𝗮𝗽𝗰𝘂𝘁: ${link}
👉 𝗕𝗮̣𝗻 𝗺𝘂𝗼̂́𝗻 𝗲𝗱𝗶𝘁 𝘃𝗶𝗱𝗲𝗼 𝘁𝗵𝗶̀ 𝗮̂́𝗻 𝘃𝗼̂ 𝗹𝗶𝗻𝗸 𝗰𝗮𝗽𝗰𝘂𝘁 𝗼̛̉ 𝘁𝗿𝗲̂𝗻 đ𝗲̂̉ 𝗲𝗱𝗶𝘁 𝗻𝗵𝗮`,
                attachment: (await axios.get(video, { responseType: "stream" })).data
            }, event.threadID, event.messageID);
        } catch (error) {
            console.error('Error:', error);
        }
    }
};
