const chalk = require('chalk');
const logDts = console.log;

function randomColor() {
  let color = "";
  for (let i = 0; i < 3; i++) {
    let sub = Math.floor(Math.random() * 256).toString(16);
    color += (sub.length == 1 ? "0" + sub : sub);
  }
  return "#" + color;
};

module.exports = (data, option) => {
  let dtsLog = "";
  switch (option) {
    case "warn":
    case "error":
      dtsLog = chalk.bold.hex("#ff0000").bold('[ LỖI ] » ');
      break;
    default:
      dtsLog = chalk.bold.hex(randomColor()).bold(`${option} » `);
      break;
  }
  logDts(dtsLog + data);
}

module.exports.loader = (data, option) => {
  let getLog = "";
  switch (option) {
    case "warn":
      getLog = chalk.bold.hex(randomColor()).bold("《 DTS PROJECT 》» ") + chalk.bold.hex("#8B8878").bold(data);
      break;
    case "error":
      getLog = chalk.bold.hex(randomColor()).bold("《 DTS PROJECT 》» ") + chalk.bold.hex(randomColor()).bold(data);
      break;
    default:
      getLog = chalk.bold.hex(randomColor()).bold("《 DTS PROJECT 》» ") + chalk.bold.hex(randomColor()).bold(data);
      break;
  }
  logDts(getLog);
}