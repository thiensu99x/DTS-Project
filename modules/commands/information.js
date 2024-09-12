module.exports.config = {
    name: 'information',
    version: '1.1.1',
    hasPermssion: 0,
    credits: 'DC-Nam',
    description: 'Xem thông tin người dùng Facebook',
    commandCategory: 'Thông tin',
    usages: '[...|tag|reply|uid|username]',
    cooldowns: 2
};
const {
    get
} = require('axios');
const {
    image
} = require('image-downloader');
const {
    createReadStream
} = require('fs-extra');
module.exports.run = async function({
    api, event, args, Threads, Currencies
}) {
    try {      
        var uqID = event.type == 'message_reply' ? event.messageReply.senderID: Object.keys(event.mentions).length != 0 ? Object.keys(event.mentions)[0]: !!args[0] && !!args[0] ? args[0]: event.senderID;
        uqID = await get(`https://golike.com.vn/func-api.php?user=${uqID}`);
        const {threadInfo = {adminIDs: []}} = await Threads.getData(event.threadID) || {};
        const ban = global.data.userBanned.has(uqID.data.data.uid) ?  "Đang bị cấm" : "Không bị cấm";
        var permission;
        if (global.config.ADMINBOT.includes(uqID.data.data.uid)) permission = `Quản Trị Viên Bot`; else if (threadInfo.adminIDs.some(i => i.id == uqID.data.data.uid)) permission = `Quản Trị Viên Nhóm`; else permission = `Thành Viên Nhóm`;
        const ciesData = await Currencies.getData(uqID.data.data.uid);
        const userInfo = await api.getUserInfo(uqID.data.data.uid);
        const j = ['LV7LWgAp', 'E9gyMUNp', 'EcjJtpcF'];
        const res = await get(`https://nguyenmanh.name.vn/api/fbInfo?id=${uqID.data.data.uid}&apikey=vqOzbhZs`);
        const {_id,id,name,firstName,vanity,birthday,follow,thumbSrc,profileUrl,gender,hometown,location,relationship,love,website,about,quotes} = res.data.result || {};
        const dest = `${__dirname}/cache/test.png`;
        await image({
            url: thumbSrc, dest
        });
        api.sendMessage({
            body: `
=== 𝗜𝗡𝗙𝗢 𝗨𝗦𝗘𝗥 𝗙𝗔𝗖𝗘𝗕𝗢𝗢𝗞 ===
━━━━━━━━━━━━━━━━━━
➜ Tên: ${firstName}
➜ Tên đầy đủ: ${name}
➜ Giới tính: ${gender}
➜ Ngày sinh: ${birthday}
➜ Đến từ: ${hometown}
➜ Sống tại: ${location}
➜ Mối quan hệ: ${relationship} ${!relationship || !love ? '': 
`với ${love}`
}
➜ Trang Web: ${website}
➜ Mã ID: ${id}
➜ Tên ID: ${vanity}
➜ Liên kết TCN: ${profileUrl}
➜ Có ${localeNum(follow)} người theo dõi
➜ Tham gia facebook vào: ${uqID.data.data.date}
➜ Trạng thái: ${userInfo[uqID.data.data.uid].isFriend ? 'có': 'không'} kết bạn với bot
➜ Tổng tin nhắn: ${localeNum(ciesData.exp)}
➜ Money trên bot: ${localeNum(ciesData.money)}
➜ Chức vụ trong nhóm: ${permission}
➜ Kiểm tra cấm: ${ban} dùng bot
`.replace(/null|undefined/g, 'Không có dữ liệu!').replace(/private/g, 'Riêng Tư!'), attachment: createReadStream(dest)
        }, event.threadID, event.messageID);
    }catch(e) {
        api.sendMessage(`${e}`, event.threadID, event.messageID);
    };
};
function localeNum(a){
    return (a.toLocaleString()).replace(/\,/g, '.');
};
