module.exports = new Module ({
    name: 'note',
    version: '2.0.5',
    hasPermssion: 3,
    credits: 'Công Nam',
    description: 'tạo, áp dụng văn bản',
    commandCategory: 'Công cụ',
    cooldowns: 3
});

function Module (info) {
    axios = require('axios'),
    fse = require('fs-extra'),
    web = 'https://Ghi-Chu.nambsls.repl.co',
    this.config = info,
    this.language = require('./load.js').language,
    this.run = async function (bot) {
        const
        send = (t, _)=>bot.api.sendMessage(t, bot.event.threadID, _?_: undefined, bot.event.messageID),
        {
            args,
            type,
            senderID,
            messageReply
        } = bot.event,
        prefix = args.shift()[0],
        case_ = args.shift(),
        str = args.join(' '),
        input = str.split('|');

        switch (case_) {
            case 'text': case 't': {
                const data = type == 'message_reply'?messageReply.body: input.shift();

                axios.post(`${web}/create`, {
                    data, t_end_id: input[0], pw_id: input[1]
                }).then(res => send(res.data)).catch(err => send(err.response.data));
            };
                break;

                case 'file': case 'f': {
                    if (!new RegExp(global.config.ADMINBOT.join('|')).test(senderID)) return;
                    const p = `${__dirname}/${input[0]}`;
                    if (!fse.existsSync(p)) return send(`Không tìm thấy file: ${p}`)
                    const data = fse.readFileSync(p, 'utf-8');

                    axios.post(`${web}/create`, {
                        data, t_end_id: input[1], pw_id: input[2]
                    }).then(res => send(res.data)).catch(err => send(err.response.data));
                };
                    break;

                    case 'download': case 'd': {
                        if (!new RegExp(global.config.ADMINBOT.join('|')).test(senderID)) return;

                        const url = type == 'message_reply'?messageReply.args.filter(el => /https:\/\//.test(el))[0]: input.shift();

                        axios.post(url, {
                            pw_id: input[1] || 1
                        }).then(res => send(`➜ Thả cảm xúc vào tin nhắn này để xác nhận áp dụng Dữ Liệu mới vào: ${path = __dirname+`/${input[0]}`}`, (err, data)=>global.client.handleReaction.push({
                                name: info.name, messageID: data.messageID, author: senderID, data: res.data, path
                            }))).catch(err => send(err.response.data));
                    };
                        break;

                        default: send(`=== 『 GHI CHÚ 』 ===\n◆━━━━━━━━━━━━━━━━◆\n\n${new RegExp(global.config.ADMINBOT.join('|')).test(senderID)?`➜ [file/f] [path] [time(m,h,d)/...] [password/...]\n➜ [download/d] [url/reply url] [path] [password/...]\n`: ''}➜ [text/t] [text/reply text] [time(m,h,d)/...] [password/...]\n\n➜ Các thông số được cách nhau bằng "|"\n➜ VD: {comand} t Hello|1m|123 => nội dung "Hello" sau 1phút tự gỡ link password để truy cập "123"`)
                        };
                },
                this.handleReaction = function (bot) {
                    const
                    _ = bot.handleReaction;

                    if (bot.event.userID != _.author)return;
                    fse.writeFileSync(_.path, _.data, 'utf-8');
                    require('./cmd.js').loadCommand({
                        moduleList: [(p = _.path.split(/\/|\./), p[p.length-2])], threadID: bot.event.threadID, messageID: _.messageID, getText: bot.getText
                    });
            };
        };