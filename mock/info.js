
import { parse } from 'url';
import Mock from "mockjs";
import { SIGABRT } from 'constants';
let basicInfos = {
    id: '999',
    type: '企业',
    account: '111',
    password: '123456789',
    organization: '江南皮革厂(假的)',
    fullName: '黄鹤',
    idCard: '0000001231231231230000',
    mobilePhone: '999999999',
    telephone: '415',
    email: 'jiangnanpige@wangyi.com',
    address: '浙江省温州市主街66号',
    introduce: '原价100多200多的皮包现在统统20块',
    businessLicense: '2333333',
}
let basicInfoList = [{
    id: '1',
    type: '1',//企业
    account: '111',
    password: '111',
    organization: '江南皮革厂',
    fullName: '黄鹤',
    idCard: '0000001231231231230000',
    mobilePhone: '999999999',
    telephone: '415',
    email: 'jiangnanpige@wangyi.com',
    address: '浙江省温州市主街66号',
    introduce: '原价100多200多的皮包现在统统20块',
    businessLicense: '666RST'

},
{
    id: '0',
    type: '0',//个人
    account: '000',
    password: '000',
    username: '黄鹤',
    idCard: '111111111111111111',
    fullName: '黄.酷炫狂霸.脸若刀削面.鹤',
    telephone: '666666',
    mobilePhone: '10001245654',
    address: '浙江省温州市江南区666号',
    email: 'huanghe@qq.com',
},
{
    id: '2',
    type: '2',//公安机关
    account: '222',
    password: '222',
    organization: '中h人民共和国',
    fullName: 'zjm',
    idCard: '0000000000000',
    mobilePhone: '12456789456123',
    directorPhone: '3333333333333',
    email: 'ha@ze.com',

}
]

export const getBasicInfoList = (req, res,u) => {
    let url = u;
    if (!url || Object.prototype.toString.call(url) !== '[object String]') {
      url = req.url; // eslint-disable-line
    }
    const params = parse(url, true).query;
    //const newLists = [];

    console.log('urlparam!!!: ', params);
    console.log('url: ', req.url);
    basicInfoList.forEach(function (key) {
      if (params.id==key.id) {
        basicInfos=key;
       } else {
           console.log('no match, something wrong');
        }
    });
    

    res.send({ status: 'success' });
    


}
export const updatePass = (req, res) => {

    console.log('新密码', req.body);
    basicInfoList.map(function (key) {
        if(req.body.id==key.id){
            key.password=req.body.password;
            basicInfos=key;
        }
        return key;
    })
    //console.log('info list: ', basicInfoList);
    res.send({ status: 'success' });
}

export const getBasicInfos = (req, res) => {
    // console.log("aaaa", basicInfos)

    if (res && res.json) {
        res.json(basicInfos);
    } else {
        return basicInfos;
    }
};

export const readAccount = (req, res) => {
    let userAccount = req.body;
    let userInf = {};
    //console.log('登录拿到值', userAccount);
    basicInfoList.forEach(function (key) {
        console.log('kacc', key.account);
        console.log('uacc', userAccount.account);
        if (key.account === userAccount.account && key.password === userAccount.password) {
            res.send({ status: 'success' });
            if (key.type === '0') {
                userInf = {
                    id: key.id,
                    type: '个人',
                    account: key.account,
                    password: key.password,
                    username: key.username,
                    idCard: key.idCard,
                    fullName: key.fullName,
                    telephone: key.telephone,
                    mobilePhone: key.mobilePhone,
                    address: key.address,
                    email: key.email,
                }

            } else if (key.type === '1') {
                userInf = {
                    id: key.id,
                    type: '企业',
                    account: key.account,
                    password: key.password,
                    organization: key.organization,
                    idCard: key.idCard,
                    fullName: key.fullName,
                    telephone: key.telephone,
                    mobilePhone: key.mobilePhone,
                    address: key.address,
                    email: key.email,
                    introduce: key.introduce,
                    businessLicense: key.businessLicense,
                }

            } else if (key.type === '2') {
                userInf = {
                    id: key.id,
                    type: "公安机关",
                    account: key.account,
                    password: key.password,
                    organization: key.organization,
                    idCard: key.idCard,
                    fullName: key.fullName,
                    mobilePhone: key.mobilePhone,
                    directorPhone: key.directorPhone,
                    email: key.email,
                }

            } else {
                return
            }

key=userInf;
basicInfos=key;
        } else {
            console.log('账户不存在或账户密码不正确');
        }
    });

    //basicInfos = userInf;
}

export const setBasicInfos = (req, res) => {
    // basicInfoList.forEach(function (key) {
    //     if(req.body.id==key.id){
    //         key=req.body;
    //         basicInfos=key;
    //     }
    // })

    basicInfoList = basicInfoList.map(key => {
        if(req.body.id==key.id){
            key=req.body;
            basicInfos=key;
        }
        return key
    })

    //basicInfos = req.body;

    //console.log('BasicINFO', basicInfos);
    res.send({ status: 'success' });

};

