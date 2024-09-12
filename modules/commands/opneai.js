module.exports.config = {
  name: "openai",
  version: "beta",
  hasPermssion: 0,
  credits: "....",
  description: "",
  commandCategory: "No prefix",
  usages: "noprefix",
  cooldowns: 0
};

module.exports.handleEvent = function({ api, event, Threads }){
  var { threadID, messageID } = event;
  if ((event.body == 'hey ai') || (event.body == 'Hey ai')) {
        api.sendMessage('Bắt đầu nhận lệnh. Reply từ đây.', event.threadID, (err, res)=> {
            global.client.handleReply.push({
                name: this.config.name, messageID: res.messageID
            });
        }, event.messageID);
    };
}

module.exports.run = function({ api, event, client, __GLOBAL }) { }
module.exports.handleReply = function({ handleReply, api, event }){
  const { threadID, messageID } = event;
  let
    $ = require('axios').get;

    let
    send = msg=>api.sendMessage(msg, event.threadID, (err, res)=>global.client.handleReply.push({
        name: this.config.name, messageID: res.messageID
    }), event.messageID),
    err = $=>send($.message),
    url = o=>`https://caochungdat.me/docs/search/openai/${o[0]}/${encodeURI(o[1])}`,
    type = event.body.startsWith('vẽ') || event.body.startsWith('Vẽ') || event.body.startsWith('draw') || event.body.startsWith('Draw')?1: 2;

    $(url([type, event.body.replace(/\//g, '\\u002f')])).then($1=>type == 1?($($1.data, {
        responseType: 'stream'
    }).then($=>send({
            attachment: $.data
        })).catch(err)): send($1.data)).catch(err);
}
// tôi là Chung Đạt