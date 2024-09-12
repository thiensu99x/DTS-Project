module.exports.config = {
  name: "mp3",
  version: "1.0.1",
  hasPermssion: 0,
  credits: "dtai",
  description: "Chuyển đổi video sang âm thanh mp3",
  commandCategory: "Không cần dấu lệnh",
  usages: "Đổi từ video thành âm thanh",
  cooldowns: 5
};

module.exports.run = async function() {};

module.exports.handleEvent = async function ({ api, event }) {
  const { threadID, type, messageReply, messageID } = event;
  const axios = require("axios");
  const fs = require("fs");
  const { execFile } = require('child_process');
  const ffmpegPath = require('ffmpeg-static');

  if (type !== "message_reply" || !messageReply.attachments || messageReply.attachments.length === 0) return;
  
  const attachment = messageReply.attachments[0];
  if (attachment.type !== 'video') return;

  const videoUrl = attachment.url;
  const inputFileName = `${__dirname}/cache/video.mp4`;
  const outputFileName = `${__dirname}/cache/audio.mp3`;

  async function downloadAndConvert() {
    const { data } = await axios.get(videoUrl, { responseType: 'arraybuffer' });
    fs.writeFileSync(inputFileName, Buffer.from(data));

    return new Promise((resolve, reject) => {
      execFile(ffmpegPath, ['-i', inputFileName, '-q:a', '0', '-map', 'a', outputFileName], (error) => {
        if (error) {
          console.error(error);
          return reject(error);
        }
        fs.unlinkSync(inputFileName);
        resolve(fs.createReadStream(outputFileName));
      });
    });
  }

  if (event.body.toLowerCase() === "mp3") {
    try {
      const audioStream = await downloadAndConvert();
      api.sendMessage({ body: "Đã chuyển đổi video thành âm thanh", attachment: audioStream }, threadID, () => {
        fs.unlinkSync(outputFileName);
      }, messageID);
    } catch (error) {
      api.sendMessage("Đã xảy ra lỗi trong quá trình chuyển đổi.", threadID, messageID);
    }
  }
}
