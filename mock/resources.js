
import { parse } from 'url';
import Mock from "mockjs";
import moment from 'moment';
import { SIGABRT } from 'constants';

var random =Mock.Random;

const sourceList = [];
// const ftype = ['doc','ppt','pptx','mp3','avi','dat','jpg','xls','pdf','html','pptx',];
const ftype = ['doc','ppt','mp3','avi','jpg','xls','pdf','html','zip',
'doc','ppt','mp3','avi','jpg','xls','pdf','html','zip',
'doc','ppt','mp3','avi','jpg','xls','pdf','html','zip',
'doc','ppt','mp3','avi','jpg','xls','pdf','html','zip'];


for (let i = 0; i < 30; i ++) {
    let index=random.integer(0,ftype.length);
    sourceList.push({
        id: i,
        dataName: random.csentence(0,50),
        fileName: random.csentence(0,50),
        fileType: ftype[i],
        type: 0,
        sysAcquisitionTime: moment().format('YYYY-MM-DD'),
  });
}


export const searchResource = (req, res, u) => {
    let url = u;
    if (!url || Object.prototype.toString.call(url) !== '[object String]') {
        url = req.url; // eslint-disable-line
    }
   
    const params = parse(url, true).query;
    let newLists = [];
   // console.log('params',params);
    // if(params.type==0){
    //     newLists=sourceList;
    // }else{
    sourceList.forEach(function (key) {
        if (!(params.dataName || params.type)) {
            newLists.push(key);
        } else if ((key.dataName).indexOf(params.dataName) != -1) {
            //console.log('key.type',key.type);
           // console.log('params.type',params.type);
            if (((key.type)==(params.type))|| !(params.type)||params.type==0) {//正确范围
                newLists.push(key);
            } else { }
        } else { }
    });
// }
    //res.send({ status: 'success' });
    res.send({ rows: newLists});
    rows: newLists;

}
export const getResource = (req, res, u) => {
    let url = u;
    if (!url || Object.prototype.toString.call(url) !== '[object String]') {
        url = req.url; // eslint-disable-line
    }
    const params = parse(url, true).query;
    console.log('params.content',params);
    //let newLists = [];
    sourceList.map(key => {
        // sourceList : sourceList.map(key => {
        if(key.fileType=='txt'){
            key.type=7;
        }else if(key.fileType=='doc'){
            key.type=4;
        }else if(key.fileType=='xls'){
            key.type=3;
        }else if(key.fileType=='ppt'){
            key.type=2;
        }else if(key.fileType=='html'){
            key.type=11;
        }else if(key.fileType=='zip'){
            key.type=5;
        }else if(key.fileType=='mp3'){
            key.type=9;
        }else if(key.fileType=='jpg'){
            key.type=8;
        }else if(key.fileType=='pdf'){
            key.type=6;
        }else if(key.fileType=='avi'){
            key.type=10;
        }else{
            //key.type=0;
        }
        return key
    });
    res.send({rows: sourceList});
 // res.json({total: sourceList.length}); 
  


}
