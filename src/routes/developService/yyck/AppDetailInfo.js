import { Component } from 'react';
import  styles from './AppDetailInfo.less'
import { Divider, Card, Row, Col,Tag } from 'antd';
import CommentList  from './CommentList';
import request from '../../../utils/request';
import querystring from 'querystring';

class AppDetailInfo extends Component{
    constructor(props){
        super(props)
        let {search} = this.props.location;
        let id = search.split('?');
        this.state={
            id:id,
            data:{},
            score:0,
            downcount:0,
            ratecount:0,

        }
    }
    componentDidMount(){
        this.getData((res) => {   
             this.setState({
               data: res.appinfo ,
               score: res.score,
               downcount: res.downcount,
               ratecount: res.ratecount,
             });
           });
         }
    

    getData = (callback) => {
        let {id} = this.state;
        const params = {id:id};
        const res =   request(`/api/app/appinfo?${querystring.stringify(params)}`)
        res.then((result) => {     
           callback(result)
        }).catch((err) => {        
        })     
      }

    render(){
    let {icon ,appinfo,preimglists=[],appversion,appservicetel,appsize,requesttime,type,appname} = this.state.data;
   
    let {score,downcount,ratecount,id} = this.state;
        return(
            <div className={styles.box} >
            <div className={styles.bg} ></div>               
                <Card style={{opacity:'0.9',width:'55%',height:'100%',margin:'auto'}} title={ <span><h2  style={{fontWeight:'bold'}}>APP 预览</h2></span>}>
                   
                <div className='titelapp' style={{margin:'auto'}}>
                <Row gutter={16} className={styles.rowstyle}>
                    <Col style={styles.colstyleicon} span={5}  style={{textAlign:'center'}}>
                <img style={{borderRadius:'20%'}} width='100%' height='100%' src={icon}/>
                    </Col>
                    <Col className={styles.colstyletext} span={19}>
                    <li style={{fontSize:'2em',fontWeight:'bold',color:'#1E1E1E'}}>{appname}</li>
                    <li><span style={{color:'#F3AB37'}}>5.0分</span><span style={{color:'#686763',marginLeft:'5%'}} >{ratecount}条评价</span>
                    <span style={{color:'#686763',marginLeft:'5%',marginTop:'20%'}}>版本号：{appversion}</span><span style={{color:'#686763',marginLeft:'5%'}}>下载{downcount}次</span>
                    </li>
                    <li><span style={{color:'#686763'}}>联系方式:{appservicetel}</span><span style={{color:'#686763',marginLeft:'5%'}} >{appsize}mb</span>
                    <span style={{color:'#686763',marginLeft:'5%',marginTop:'20%'}}>创建时间：{requesttime}</span>
                    </li>
                    <li>
                    <Tag color="#2db7f5"><span style={{fontWeight:'bold',fontSize:'1.5em'}}>{type}</span></Tag>
                    </li>
                    
                        </Col>
                </Row>
                </div>
                <Divider/>
                <li  style={{fontSize:'1.5em',color:'black'}}>应用截图</li>
                <li style={{marginTop:'2%'}}>
                    <Row gutter={16} style={{display:'flex',flexDirection:'row'}}>
                    {
                        preimglists.map(function(item,index){
                            return (
                                <Col key={index} span={8} style={{display:'flex'}}>
                                <img width='80%' height='90%' src={item}/>
                              </Col>
                            )
                        })
                    }
                        
                        
                    </Row>
                </li>
                <Divider/>
                <li  style={{fontSize:'1.5em',color:'black'}}>应用介绍</li>
                <li style={{marginTop:'2%'}}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{appinfo}
                </li>
                <Divider/>
                <li  style={{fontSize:'1.5em',color:'black'}}>评价列表</li>
                 <CommentList id={id}/>

                </Card>

                   
               
            
        </div>)
    }
}


export default AppDetailInfo;
