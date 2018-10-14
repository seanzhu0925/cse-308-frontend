import { parse } from 'url';
import Mock from "mockjs";

const Random = Mock.Random;

let serviceList = [];
for (let i = 0; i < 100; i++) {
    serviceList.push(Mock.mock({
        'id': '@increment',
        'chineseName': '@cname',
        'englishName': '@first',
        'serviceType': /0|1/,
        'status': /0|1/,
        'amApproveRecord': {
            approvalStatus: /0|1|2|3/,
        },
        'runStatus': /0|1/,
        'requestMode': /WebService|HTTP|RestFul/,
        'transmitMode': /GET|POST/,
        'paramMode': /KeyValue|InputBuffer/,
        'sysRecordTime': '@datetime',
        'serviceDescription': Random.cword(10, 100),
        serviceAddress: Random.url('http'),
        busAddressTest: Random.url('http'),
        busAddressFormal: Random.url('http'),
        domain: Random.cword(20),
    }))
}

let appList = [];
for (let i = 0; i < 50; i++) {
    appList.push(Mock.mock({
        'id': '@increment',
        'appName': '@first',
        'appType': Random.integer(1, 10).toString(),
        'packageName': 'com.qq.john',
        'sysRecordTime': '2018-01-01 00:00:00',
        'appStatus': Random.integer(0, 2).toString(),
        'appIntroduction': Random.cword(10, 30),
        'developer': '@cname',
        'contactPhone': '13111111111'
    }))
}

export const queryServiceList = (req, res, u) => {

    let url = u;
    if (!url || Object.prototype.toString.call(url) !== '[object String]') {
        url = req.url; // eslint-disable-line
    }

    const params = parse(url, true).query;

    const { current, pageSize, chineseName, status, serviceType, approvalStatus } = params;

    let newList = [];
    for (let i = 0; i < serviceList.length; i++) {
        let flag = true;
        for (let key of ['chineseName', 'status', 'serviceType']) {
            if (serviceList[i][key].search(params[key] || '') < 0) {
                flag = false
            }
        }
        if (flag) {
            newList.push(serviceList[i]);
        }
    }

    const result = {
        total: newList.length,
        rows: newList.slice((current - 1) * pageSize, current * pageSize)
    }
    if (res && res.json) {
        res.json(result);
    } else {
        return result;
    }
}

export const queryAppListByServiceId = (req, res, u) => {
    let url = u;
    if (!url || Object.prototype.toString.call(url) !== '[object String]') {
        url = req.url; // eslint-disable-line
    }

    const params = parse(url, true).query;

    const { current, pageSize, serviceId } = params;
    const result = {
        total: appList.length,
        rows: appList.slice((current - 1) * pageSize, current * pageSize)
    }
    if (res && res.json) {
        res.json(result);
    } else {
        return result;
    }

}

export const updateServiceStatus = (req, res) => {
    const data = req.body;
    serviceList = serviceList.map(item => {
        if (item.id == data.id) {
            item.serviceType = data.serviceType,
                item.status = '1'
        }
        return item
    })
    res.send({
        status: 'success'
    })
}

export const updateRunStatus = (req, res) => {
    const data = req.body;
    serviceList = serviceList.map(item => {
        if (item.id == data.id) {
            item.runStatus = data.runStatus
        }
        return item
    })
    res.send({
        status: 'success'
    })
}

export const queryServiceById = (req, res, u) => {
    let url = u;
    if (!url || Object.prototype.toString.call(url) !== '[object String]') {
        url = req.url; // eslint-disable-line
    }

    const params = parse(url, true).query;
    const { id } = params;
    let result = null;
    serviceList.forEach(item => {
        if (item.id == id) {
            result = item;
        }
    })
    if (res && res.json) {
        res.json(result);
    } else {
        return result;
    }
}

export const saveService = (req, res) => { //unshift
    const data = req.body;
    data.id = parseInt(Math.random() * 1000 + 100);
    data.status = '0';
    data.serviceType = '0'
    serviceList.unshift(data)
    res.send({
        status: 'success'
    })
}