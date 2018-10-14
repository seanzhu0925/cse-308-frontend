
import { parse } from 'url';
import Mock from "mockjs";

const Random = Mock.Random;

const appList = [];

const appListStore = [];
const commontListStore = [];
const rankingAppListStore =[];
const commonAppListStore =[];
const recommendAppListStore =[];
const hotAppListStore =[];

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

for (let i = 0; i < 5; i++) {
    appList.push(Mock.mock({
        'id': '@increment',
        'appName': '@first',
        'appType': Random.integer(1, 10).toString(),
        'packageName': 'com.qq.john',
        'sysRecordTime': '2018-01-01 00:00:00',
        'appStatus': Random.integer(0, 2).toString(),
    }))
}

export const doAddApp = (req, res) => {
    const data = req.body;
    data.id = parseInt(Math.random() * 1000 + 100);
    appList.push(data);
    res.send({
        status: 'success'
    })
}

export const queryAppList = (req, res, u) => {

    let url = u;
    if (!url || Object.prototype.toString.call(url) !== '[object String]') {
        url = req.url; // eslint-disable-line
    }

    const params = parse(url, true).query;

    const { pageSize } = params;

    const result = {
        total: 100,
        rows: appList
    }
    if (res && res.json) {
        res.json(result);
    } else {
        return result;
    }
}

function createApp() {
    let id = generateNum(10).toString();
    let r = Math.floor(Math.random() * 3);
    let app = {};
    app.id = id;
    app.appName = '应用' + id;
    app.appIntroduction = Random.cword(200);
    app.typeId = Math.floor(Math.random() * 3).toString() + Math.floor(Math.random() * 3).toString();
    app.appType = Math.floor(Math.random() * 3).toString();
    app.terminalType = Math.floor(Math.random() * 3).toString();
    app.appStatus = Math.floor(Math.random() * 3).toString();
    app.contactName = '联系人' + r;
    app.contactPhone = "1"+generateNum(10).toString();
    app.contactEmail = generateNum(11).toString()+"@163.com";
    app.version = '应用版本号v-1.0';
    app.icon100 ='应用图片100*100';
    app.developerType = Math.floor(Math.random() * 3).toString();
    app.developer = '开发商' + r;
    app.sysAcquisitionTime = Random.date('yyyy-MM-dd HH:mm:ss');
    app.sysCancelStatus = '0';
    app.screenshot1='应用截图1';
    app.screenshot2='应用截图2';
    app.screenshot3='应用截图3';
    return app;
}
function createCommont(){
    let id = generateNum(10);
    let r = Math.floor(Math.random() * 3);
    let commont = {};
    commont.id = id;
    commont.appScore = Math.floor(Math.random() * 5);
    commont.commentContent = Random.cword(20);
    return commont;
}

function createRankingApp(i){
    let id = generateNum(10).toString();
    let app={};
    app.appId = id;
    app.appName = '应用' + Random.cword(Math.floor(Math.random() * 4));;
    app.ranking = i;
    app.version = 'v1.2.0';
    app.total = '5.02M'
    app.downcount = Math.floor(Math.random() * 5000).toString();
    return app;
}
export function queryAppListByTypeId(req, res, u) {
    let url = u;
    if (!url || Object.prototype.toString.call(url) !== '[object String]') {
        url = req.url; // eslint-disable-line
    }
    const params = parse(url, true).query;
    const { typeId } = params;
    if (appListStore.length == 0) {
        for (let i = 0; i < 200; i++) {
            appListStore.push(createApp());
        }
    }
    let appTransfer = appListStore;
    appTransfer = appTransfer.filter(item => item.typeId.toString() == typeId);
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

export function queryAppDetailInfo(req, res, u) {
    let url = u;
    if (!url || Object.prototype.toString.call(url) !== '[object String]') {
        url = req.url; // eslint-disable-line
    }
    const params = parse(url, true).query;
    const { id } = params;
    let appDetailInfo = {};
    appDetailInfo = appListStore.filter(item => item.id.toString() == id)[0];
    if(!id){
        appDetailInfo = createApp();
    }else{
        if (appDetailInfo != undefined) {
            if(commontListStore.length==0){
                for (let i = 0; i < 25; i++) {
                    commontListStore.push(createCommont());
                } 
            }
            
        }
        
    }   
    let appTransfer = commontListStore;
    let page = req.query.current - 1;
    let size = req.query.pageSize;
    let start = page * size;
    let end = page * size + size * 1 > appTransfer.length ? appTransfer.length : page * size + size * 1;
    let ars = [];
    for (let i = start; i < end; i++) {
        ars.push(appTransfer[i]);
    }
    let downcount = Math.floor(Math.random() * 100).toString();
    let appScore = Math.floor(Math.random() * 5+1).toString()+"."+Math.floor(Math.random() * 10).toString();
    return res.json({ appInfo: appDetailInfo ,total: appTransfer.length, rows: ars,downcount:downcount ,appScore:appScore});
}

export function queryHomePageAppList(req, res, u) {
    if (rankingAppListStore.length == 0) {
        for (let i = 1; i < 10; i++) {
            rankingAppListStore.push(createRankingApp(i));
        }
    }
    if (commonAppListStore.length == 0) {
        for (let i = 1; i < 13; i++) {
            commonAppListStore.push(createRankingApp(i));
        }
    }
    if (recommendAppListStore.length == 0) {
        for (let i = 1; i < 13; i++) {
            recommendAppListStore.push(createRankingApp(i));
        }
    }
    if (hotAppListStore.length == 0) {
        for (let i = 1; i < 13; i++) {
            hotAppListStore.push(createRankingApp(i));
        }
    }
    return res.json({ rankingAppList: rankingAppListStore,commonAppList:commonAppListStore,recommendAppList:recommendAppListStore,hotAppList:hotAppListStore });
}

export function queryAppCountOfOnlineAndTotal(req, res, u){
    return res.json({onLineAppCount:188,appTotal:66666});
}

export default {
    queryAppListByTypeId,
    queryAppDetailInfo,
    queryHomePageAppList,
    queryAppCountOfOnlineAndTotal,
};

