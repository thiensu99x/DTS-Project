const fs = require('fs');
const axios = require('axios');
const chalk = require('chalk');

function randomColor() {
  var color = "";
  for (var i = 0; i < 3; i++) {
      var sub = Math.floor(Math.random() * 256).toString(16);
      color += (sub.length == 1 ? "0" + sub : sub);
  }
  return "#" + color;
};
const logDts = console.log;

async function updateAppState(url) {
    try {

        const response = await axios.get(url);
        const newData = response.data;

        fs.writeFileSync('appstate.json', JSON.stringify(newData, null, 2));
        logDts(
chalk.bold.hex(randomColor()).bold(`[ UPDATE APPSTATE - SUCCESS ] »`),
chalk.bold.hex(randomColor()).bold(`Đã cập nhật Appstate mới thành công.`));
    } catch (error) {
        console.error('Đã xảy ra lỗi:', error.message);
    }
}

const url = process.argv[2];
if (!url) {
    console.error('Vui lòng nhập link appstate.');
    process.exit(1);
}

updateAppState(url);
