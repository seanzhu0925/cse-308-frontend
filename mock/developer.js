import { parse } from 'url';
import moment from 'moment';
import Mock from 'mockjs';

var Random = Mock.Random;

const developerProblemListStoreStore = [];

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



function createDeveloperProblem() {
  let id = generateNum(10);
  let developerProblem = {};
  developerProblem.id = id;
  developerProblem.question = Random.cword(10);
  developerProblem.answer = Random.cword(20);
  developerProblem.answerPicture = generateNum(10);
  developerProblem.sysModifyIp = Math.floor(Math.random() * 256).toString()+"."+Math.floor(Math.random() * 256).toString()+"."+Math.floor(Math.random() * 256).toString()+"."+Math.floor(Math.random() * 256).toString();
  return developerProblem;
}



export function getDeveloperProblemList(req, res) {
  if (developerProblemListStoreStore.length == 0) {
    for (let i = 0; i < 25; i++) {
        developerProblemListStoreStore.push(createDeveloperProblem());
    }
  }
  let appTransfer = developerProblemListStoreStore;
  let page = req.query.current - 1;
  let size = req.query.pageSize;
  let start = page * size;
  let end = page * size + size * 1 > appTransfer.length ? appTransfer.length : page * size + size * 1;
  let ars = [];
  for (let i = start; i < end; i++) {
    ars.push(appTransfer[i]);
  }
  return res.json({ total: appTransfer.length, rows: ars });
}

export default {
    getDeveloperProblemList
};
