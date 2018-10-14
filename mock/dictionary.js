import { parse } from 'url';
import Mock from "mockjs";

const Random = Mock.Random;

let appCategory = [{
    id: '1',
    text: '应用类',
    children: [{
        id: '11',
        text: '权限类',
    }, {
        id: '12',
        text: '图书阅读',
    }, {
        id: '13',
        text: '实用工具',
    }, {
        id: '14',
        text: '办公软件',
    }]
}, {
    id: '2',
    text: '终端类',
    children: [{
        id: '21',
        text: '平板'
    }, {
        id: '22',
        text: '手机'
    }]
}, {
    id: '3',
    text: '应用权限类',
    children: [{
        id: '31',
        text: '地州市通用'
    }, {
        id: '32',
        text: '警种专业'
    }, {
        id: '33',
        text: '全省通用',
        children:[{
            id:'331',
            text:'第三层'
        }]
    }]
}];


export const queryAppCategory = (req, res, u) => {

    let url = u;
    if (!url || Object.prototype.toString.call(url) !== '[object String]') {
        url = req.url; // eslint-disable-line
    }

    const params = parse(url, true).query;

    const { englishName } = params;

    const result = {
        rows: appCategory
    }
    if (res && res.json) {
        res.json(result);
    } else {
        return result;
    }
}