import { parse } from 'url';
import moment from 'moment';
import Mock from "mockjs";

const appStore = [];
const editionStore = [];

//获取n位随机数,随机来源chars
var nums = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
var words = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
var chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
function generateNum(n) {
  var res = "";
  for (var i = 0; i < n; i++) {
    var id = Math.ceil(Math.random() * 9);
    res += nums[id];
  }
  return res;
}
function generateWord(n) {
  var res = "";
  for (var i = 0; i < n; i++) {
    var id = Math.ceil(Math.random() * 25);
    res += words[id];
  }
  return res;
}
function generateMixed(n) {
  var res = "";
  for (var i = 0; i < n; i++) {
    var id = Math.ceil(Math.random() * 35);
    res += chars[id];
  }
  return res;
}

function createApp() {
  let id = generateNum(10);
  let r = Math.floor(Math.random() * 3);
  let app = {};
  app.id = generateNum(10);
  app.appName = '应用' + id;
  app.appIntroduction = generateMixed(500)
  app.appType = Mock.mock(/11|12|13|21|22|31|32|331/);
  app.terminalType = Math.floor(Math.random() * 3);
  app.appStatus = Math.floor(Math.random() * 3);
  app.contactName = '联系人' + r;
  app.contactPhone = '联系人' + r + '手机号';
  app.developerType = Math.floor(Math.random() * 3);
  app.developer = '开发商' + r;
  return app;
}

function createEdition(app) {
  let id = generateNum(10);
  let edition = {};
  edition.appId = app.id;
  edition.appName = app.appName;
  edition.id = generateNum(10);
  edition.appType = Math.floor(Math.random() * 4);
  edition.appStatus = Math.floor(Math.random() * 3);
  edition.title = generateWord(10);
  edition.content = generateWord(500);
  edition.version = generateMixed(10);
  edition.internalVersion = generateNum(10);
  edition.preview = '../src/assets/emblem.png';
  edition.sysModifyTime = '2017-10-01 14:10';
  edition.entryCode = Mock.mock(/11|12|13|21|22|31|32|331/);
  return edition;
}

export function appList(req, res) {
  if (appStore.length == 0) {
    for (let i = 0; i < 25; i++) {
      appStore.push(createApp());
    }
  }
  let page = req.query.current - 1;
  let size = req.query.pageSize;
  let start = page * size;
  let end = page * size + size * 1 > appStore.length ? appStore.length : page * size + size * 1;
  let apps = [];
  for (let i = start; i < end; i++) {
    apps.push(appStore[i]);
  }
  return res.json({ total: appStore.length, rows: apps });
}

export const saveApp = (req, res) => {
  const data = req.body;
  data.id = parseInt(Math.random() * 1000 + 100);
  appStore.push(data);
  res.send({
    status: 'success'
  })
}

export function appEditionList(req, res) {
  let page = req.query.current - 1;
  let size = req.query.pageSize;
  let searchId = req.query.searchId;
  let editions = editionStore.filter(item => item.appId === searchId);
  if (editions.length == 0) {
    let app = appStore.filter(item => item.id === searchId);
    for (let i = 0; i < 3; i++) {
      let edition = createEdition(app[0]);
      editions.push(edition);
      editionStore.push(edition);
    }
  }
  return res.json({ total: editions.length, rows: editions });
}

export default {
  appList,
  appEditionList,
};
