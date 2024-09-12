module.exports.config = {
  name: "pack",
  version: "1.0.3",
  hasPermssion: 2,
  credits: "đức tài",
  description: "check thông tin package và cài đặt từ GitHub",
  commandCategory: "admin",
  usages: "pack + tên package cần tra",
  cooldowns: 2,
};

module.exports.run = async ({ api, event, args }) => {
  const axios = require('axios');
  const npmRegistryURL = 'https://registry.npmjs.org/';

  var packageName = args.join(" ");

  if (!packageName) {
    return api.sendMessage("Vui lòng nhập tên package cần tra!", event.threadID, event.messageID);
  }

  async function getPackageInfo(packageName) {
    try {
      const response = await axios.get(`${npmRegistryURL}${packageName}`);
      const packageData = response.data;

      if (packageData.error) {
        return api.sendMessage(`Package "${packageName}" không tồn tại trên npm.`, event.threadID, event.messageID);
      }

      const latestVersion = packageData['dist-tags'].latest;
      const versionData = packageData.versions[latestVersion];
      const publisher = versionData.maintainers[0];
      const packageUrl = packageData.repository.url.replace(/^git\+/, '').replace(/\.git$/, '');

      api.sendMessage(
        `Package: ${packageName} ✅,
Tên Package: ${packageData.name},
Phiên Bản: ${latestVersion},
Thời Gian Publish Package: ${packageData.time[packageData['dist-tags'].latest]},
Tên Người Publish Package: ${publisher.name},
Email Người Publish: ${packageData.maintainers[0].email},
------------------------------
Link Source Package: ${packageData.bugs.url},
Trang Chủ: ${packageData.homepage},
Hỗ Trợ Các Dạng: ${packageData.keywords},
------------------------------
Dung Lượng Package: ${versionData.dist.unpackedSize},
Tổng File: ${versionData.dist.fileCount},
Publish Package Lần Cuối: ${packageData.time[latestVersion]}
------------------------------
DownLoad Source: ${packageData.repository.url},
Install Package: npm i ${packageName} 
------------------------------
Thả ❤️ để cài đặt pack về hệ thống!`, 
        event.threadID, 
        (error, info) => {
          if (!error) {
            global.client.handleReaction.push({
              name: this.config.name,
              messageID: info.messageID,
              packageName,
              packageVersion: latestVersion,
              packageUrl,
              authorID: event.senderID
            });
          }
        },
        event.messageID
      );

    } catch (error) {
      return api.sendMessage(`Lỗi khi lấy thông tin về package ${packageName}.\n------------------------------\n${error.message}`, event.threadID, event.messageID);
    }
  }

  getPackageInfo(packageName);
};

module.exports.handleReaction = async ({ api, event, handleReaction }) => {
  if (event.reaction !== '❤️') return;

  const { packageName, packageVersion, packageUrl, authorID } = handleReaction;

  if (event.userID !== authorID) return;

  const fs = require('fs-extra');
  const path = require('path');
  const simpleGit = require('simple-git');
  const packageDir = path.resolve('node_modules', packageName);
  const git = simpleGit();

  const downloadAndInstall = async () => {
    try {
      await git.clone(packageUrl, packageDir);
      updatePackageJson(packageName, packageVersion, packageUrl);
      api.sendMessage(`Package ${packageName} đã được tải xuống và cài đặt thành công!`, event.threadID);
    } catch (error) {
      api.sendMessage(`Lỗi khi cài đặt package ${packageName} từ GitHub:\n${error.message}`, event.threadID);
    }
  };

  const updatePackageJson = (name, version, url) => {
    const packageJsonPath = path.resolve('package.json');
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

    packageJson.dependencies = packageJson.dependencies || {};
    packageJson.dependencies[name] = `${url}#${version}`;

    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2), 'utf8');
  };

  if (fs.existsSync(packageDir)) {
    try {
      await fs.remove(packageDir);
      downloadAndInstall();
    } catch (err) {
      api.sendMessage(`Lỗi khi xóa thư mục cũ của package ${packageName}:\n${err.message}`, event.threadID);
    }
  } else {
    downloadAndInstall();
  }
};