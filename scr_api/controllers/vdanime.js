const { errorHandler } = require("../utils");
const fs = require('fs-extra');

exports.vdanime = async (req, res, next) => {
  try {
    // Đọc file và tách thành mảng các dòng
    var u = fs.readFileSync(__dirname + '/../vdanime.txt', 'utf-8').split('\n');
    
    // Lọc các liên kết có đuôi .mp4
    const mp4Links = u.filter(link => link.trim().endsWith('.mp4'));

    if (mp4Links.length === 0) {
      throw new Error('Không tìm thấy liên kết .mp4 nào');
    }

    // Chọn ngẫu nhiên một liên kết .mp4 từ danh sách đã lọc
    const data = mp4Links[Math.floor(Math.random() * mp4Links.length)].trim();

    // Trả về liên kết dưới dạng JSON
    res.json({ link: data });

  } catch (error) {
    errorHandler(error, res);
  }
};
