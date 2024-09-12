const axios = require("axios");
const fs = require("fs");
const isURL = (u) => /^http(|s):\/\//.test(u);
const mimeDB = require("mime-db");
const convertHMS = (value) =>
    new Date(value * 1000).toISOString().slice(11, 19);
exports.handleEvent = async function (o) {
    try {
        const str = this.extractUrls(o.event.body);

        let send = (msg, tid_, typ = typeof tid_ == "object") =>
            new Promise((r) =>
                o.api.sendMessage(
                    msg,
                    typ ? tid_.event.threadID : tid_ || o.event.threadID,
                    (err, res) => r(res || err),
                    typ
                        ? tid_.event.messageID
                        : tid_
                            ? undefined
                            : o.event.messageID,
                ),
            );
        const head = (app) => `[  ${app} - DownLoad  ]\n`;
        if (isURL(str)) {
            const isProfile =
                /^https:\/\/(?:(www|m|mbasic|mobile|web)\.)?facebook\.com\/(?!(?:watch|photo|groups|share|stories|reel|videos|pages|story.php|permalink.php))(?:(?!profile\.php\?id=\d+\?)[^\/?]+|profile\.php\?id=\d+\?(?!id=).*|\profile\.php\?id=\d+$)\/?\??[^\/?]*$/.test(
                    str,
                );

            const isFbURL =
                /\b(?:https?:\/\/(?:www\.)?(?:facebook\.com|mbasic\.facebook\.com|m\.facebook\.com|mobile\.facebook\.com|fb\.watch|web\.facebook)[^\s]*)\b/g.test(
                    str,
                );

            const isInstagramURL =
                /(https:\/\/www\.instagram\.com\/(stories|p|reel|tv)\/[a-zA-Z0-9_\-\/?=]+)(?=\s|$)/g.test(
                    str,
                );

            const isThreadsURL =
                /https:\/\/www\.threads\.net\/[^/]+\/post\/([^/?]+)/.test(str);

            const tiktokRegex =
                /(?:https:\/\/(?:www\.)?tiktok\.com\/(?:@[\w\d.]+\/(?:video|photo)\/(\d+))|(https:\/\/(?:vt|vm)\.tiktok\.com\/[\w\d]+))/.test(
                    str,
                );

            const douyinRegex =
                /(?:https:\/\/(?:www\.)?(?:iesdouyin|douyin)\.com\/(?:share\/(?:video|photo|note)\/(\d+)|video\/(\d+))|(https:\/\/v\.douyin\.com\/[\w\d]+))/.test(
                    str,
                );

            const isPinterest =
                /(?:https?:\/\/(?:www\.)?pinterest\.com\/pin\/|https?:\/\/pin\.it\/)([^\/\?]+)/.test(
                    str,
                );

            if (isFbURL && !isProfile) {
                const url = o.event.body.match(
                    /\b(?:https?:\/\/(?:www\.)?(?:facebook\.com|mbasic\.facebook\.com|m\.facebook\.com|mobile\.facebook\.com|fb\.watch|web\.facebook)[^\s]*)\b/g,
                )[0];
                const res = (
                    await axios.get(
                        `https://bacninh.me/api/facebook/?url=${encodeURIComponent(
                            url,
                        )}`,
                    )
                ).data;
                let attachment = [];
                if (res.attachments && res.attachments.length > 0) {
                    if (res.queryStorieID) {
                        const match = res.attachments.find(
                            (item) => item.id == res.queryStorieID,
                        );
                        if (match) {
                            if (match.type === "Video") {
                                const videoUrl = match.url.sd || match.url.hd;
                                attachment.push(
                                    await streamURL(videoUrl, "mp4"),
                                );
                            } else if (match.type === "Photo") {
                                attachment.push(
                                    await streamURL(match.url, "jpg"),
                                );
                            }
                        }
                    } else {
                        for (const attachmentItem of res.attachments) {
                            if (attachmentItem.type === "Video") {
                                const videoUrl =
                                    attachmentItem.url.sd ||
                                    attachmentItem.url.hd;
                                attachment.push(
                                    await streamURL(videoUrl, "mp4"),
                                );
                            } else if (attachmentItem.type === "Photo") {
                                attachment.push(
                                    await streamURL(attachmentItem.url, "jpg"),
                                );
                            }
                        }
                    }
                    o.api.sendTypingIndicator(true, o.event.threadID);
                    send({
                        body: `📝 Tiêu Đề: ${res.message || "Không Có Tiêu Đề"}\n`,
                        attachment,
                    });
                    o.api.sendTypingIndicator(false, o.event.threadID);
                }
            } else if (tiktokRegex || douyinRegex) {
                const url = tiktokRegex
                    ? o.event.body.match(
                        /(?:https:\/\/(?:www\.)?tiktok\.com\/(?:@[\w\d.]+\/(?:video|photo)\/(\d+))|(https:\/\/(?:vt|vm)\.tiktok\.com\/[\w\d]+))/,
                    )[0]
                    : o.event.body.match(
                        /(?:https:\/\/(?:www\.)?(?:iesdouyin|douyin)\.com\/(?:share\/(?:video|photo|note)\/(\d+)|video\/(\d+))|(https:\/\/v\.douyin\.com\/[\w\d]+))/,
                    )[0];
                const dungdeanhbucboi = tiktokRegex ? "TikTok" : "Douyin";
                const res = await tiktok(url);
                const b = Array.isArray(res.link) ? res.link : [res.link]
                const opa = res.title
                const c = await Promise.all(b.map(async (url) => await getStreamFromURL(url)));
                let callback = async () => {
                    send({
                        body: `📝 Tiêu Đề: ${opa || "Không Có Tiêu Đề"}`,
                        attachment: await streamURL(res.mp3, "mp3"),
                    });
                };

                o.api.sendTypingIndicator(true, o.event.threadID);
                send({
                    body: `📝 Tiêu Đề: ${opa || "Không Có Tiêu Đề"}\n📌 Thả Cảm Xúc Để Tải Nhạc`,
                    attachment: c,
                }).then((res) => {
                    res.name = this.config.name;
                    res.callback = callback;
                    res.o = o;
                    global.client.handleReaction.push(res);
                });
                o.api.sendTypingIndicator(false, o.event.threadID);

            }
        }
    } catch (e) {
        console.log(e);
    }
};
exports.run = () => { };
exports.config = {
    name: "autodown",
    version: "1",
    hasPermssion: 0,
    credits: "Công Nam",
    description: "",
    commandCategory: "No prefix",
    usages: [],
    cooldowns: 3,
};

function streamURL(url, type) {
    return axios
        .get(url, {
            responseType: "arraybuffer",
        })
        .then((res) => {
            const path = __dirname + `/cache/${Date.now()}.${type}`;
            fs.writeFileSync(path, res.data);
            setTimeout((p) => fs.unlinkSync(p), 1000 * 60, path);
            return fs.createReadStream(path);
        });
}

function getExtFromMimeType(mimeType = "") {
    return mimeDB[mimeType]
        ? (mimeDB[mimeType].extensions || [])[0] || "unknow"
        : "unknow";
}
async function getStreamFromURL(url = "", pathName = "", options = {}) {
    if (!options && typeof pathName === "object") {
        options = pathName;
        pathName = "";
    }
    try {
        if (!url || typeof url !== "string")
            throw new Error(`The first argument (url) must be a string`);
        const response = await axios({
            url,
            method: "GET",
            responseType: "stream",
            ...options,
        });
        if (!pathName)
            pathName =
                await utils.randomString(10) +
                (response.headers["content-type"]
                    ? "." +
                    await getExtFromMimeType(response.headers["content-type"])
                    : ".noext");
        response.data.path = pathName;
        return response.data;
    } catch (err) {
        throw err;
    }
}
async function tiktok(url) {
    const a = await axios({
        method: 'post',
        url: 'https://www.tikwm.com/api/',
        data: {
            url: url,
            count: 15,
            cursor: 0,
            hd: 1
        },
        headers: {
            'content-type': 'application/json',
        },
    });

    const videoUrl = a.data.data.play;
    const imageUrl = a.data.data.images || [];
    const audioUrl = a.data.data.music_info.play;
    const link = imageUrl.length === 0 ? videoUrl : imageUrl;
    const title = a.data.data.title
    const result = {
        link: link,
        mp3: audioUrl,
        title: title
    };
    return result;
}
this.handleReaction = async (o) => {
    let s = o.handleReaction;
    if (s.o.event.senderID == o.event.userID) s.callback(o);
};
this.extractUrls = function (text) {
    const urlRegex =
        /(\bhttps?:\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi;
    const urls = text?.match(urlRegex);
    return urls || [];
};