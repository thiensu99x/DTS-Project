module.exports.config = {
  name: "spamtag",
  version: "1.0.0",
  hasPermssion: 2,
  credits: "ntuan", // tôn trọng nhau tí đê, hở tí là thay cre edit thay cc
  description: "spamtag",
  commandCategory: "spam",
  usages: "",
  cooldowns: 1,
}

module.exports.run = async function ({ api, event, args }) {
  try {
    const { sendMessage: tdung, getUserInfo } = api;
    const { threadID, messageID, senderID } = event;
    const botID = api.getCurrentUserID();
    const listUserID = event.participantIDs.filter(ID => ID != botID && ID != event.senderID);
    var timedelay = 0.1; // thời gian gửi 1 tin nhắn
    let slsp = 9999; // số lần spam
    var nd = (args.length != 0) ? args.join(" ") : "Đjtme ảo ma Canada mafia Argentina Malaysia California Australia Austria Venezuela Romania Lazada Sri Lanka Sakura Haibara Edogawa Conan Naruto Nami Roronoa Zoro Sạnji Kaido Shanks nhảy chachacha Chaien đấm Nobita và làm Shizuka nhòe đi Mascara ,argentina.malaysia ,california ,australia ,austria ,venezuela Romania,sri lanka,mandagasca, africa, asia, arabia, russia, zambia, tunisia, uganda, tonga, tanzania, syria, serbia, slovenia, samoa, saint lucia, panama, ngga à nhầm nigeria, nicaragua, namibia, new caledonia, micronesia, indonesia, malaysia, lithuania, libya, latvia, kennys à nhầm kenya, malta, mongolia, moldova, mauritania, jamaica, guyana, estonia, gambia, ghana, grenada, guatemala, guinea, ethiopia, eritrea, dominica, cuba, crotia, colombia, coasta rica, myanmar, cambochina nhầm cambodia, canada, burma, bulgaria, botswana, bolivia, china, andorra, armenia, angola, india, korea, gặp Uchiha Madara đấm nhau với Hashirama Tobirama AyAlaba madarona trap mother f-Úm bala alaba trapTa cùng khiêu vũ như điệu mamboĐeo cái túi chéo tưởng anh yang hồNhưng sự thật anh đang muốn nhảy như điệu tanggoKhoan, dừng khoảng chừng là hai giâyĐể nó biết ông chủ chính là ai đâyHater mây mờ cho nó phơi thây Bên trong quan tài sống lại vài con dơi bayCó chuyện đúng vậy thưa ngài, đời con nó chưa dài Hai cọc đang cầm trong phòng thu ra bàiNóng dần ở trong này tua tiệc qua ngàyĐúng vậy thưa ngài trong phòng thu ra bàiLạy chúa master Hổ quanh đang góp beatAnh đang đưa mấy đứa em lên trên top hit Không đùa vì tụi tao là tụi tao còn tụi mày là tụi màyAlo alo đang ở đâu vậy?Lúc mà tao được đề cao thì mày ở đâu vậy?Cố vượt qua nhưng chẳng được la là bởi vì sao vậy?Gói vào bao là những vì sao tao chỉ muốn che đậyLà bởi vì đây là chốn nào đây nên tao phải quay lạiDòng thời gian để nó trôi đưa tao về ngây dạiSao người ta giờ chỉ cắm mặt zô những đồ gây hạiNếu được đưa ra quyết định như rút đôi bàn tay lại Thì ngôi nhà xinh của anh và em sẽ kịp thời xây lại Rồi nói thật đi ở trong lòng em vẫn đang có ai không?Tình cảm mà anh hằng mơ tại sao mất đi một gram hồng?Cuộc sống dường như đang dối lừa ta đó em có tin không tròn nội tiếp tam giác, xĩu đường tròn ngoại tiếp tam giác với tam giác có các cạnh lần lượt là 3, 4, 5 (dm), xĩu nghiêng trái 50%, xĩu nghiêng phải 50%, di chuyển 1 dặm về phía Đông rồi xĩu, di chuyển 50% của 1 dặm về phía Tây rồi xĩu, di chuyển 1 dặm + 50% về phía Nam rồi xĩu, xĩu margin-left 50%, margin-right 50%, margin-bottom 50%, xĩu từ trên cao rơi xuống ở độ cao 7600m với vận tốc 240km/h, xĩu với vận tốc xấp xỉ vận tốc ánh sáng làm cơ thể rút ngắn lại và cân nặng";
    var body = "‎" + nd;
    var mentions = [];
    var index = 0;

    for (const idUser of listUserID) {
      body = "‎" + body;
      mentions.push({ id: idUser, tag: "‎", fromIndex: index - 1 });
      index -= 1;
    }

    for (let i = 1; i < slsp; i++) {
      tdung({ body, mentions }, threadID);
      await new Promise(resolve => setTimeout(resolve, timedelay * 1000));
    }
  } catch (e) {
    console.log(e);
  }
}