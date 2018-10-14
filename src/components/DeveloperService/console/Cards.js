import { Component } from 'react';
import { Card, Icon,Row, Col, Slider,List, Avatar } from 'antd';

import styles from './Cards.less';
import { Link } from 'dva/router';





const Cards =({cardlist,handleTab,addComponent}) =>{
  
    let child = [];
    let type ='';
    let titel='';
    let url = '';
    let urlname = '';
    let icon = '';
    let isdiplay = false;
    //let styleelement = {};
    let titelcolor = ''; 
    if (cardlist.length>0){
    cardlist.map(function(item){
        child = item.child;
        type = item.type;
        titel = item.titel;
        url = item.url;
        urlname = item.urlname;
        icon = item.icon;
        isdiplay = item.isdiplay;
     //   styleelement = item.styleelement;
        titelcolor = item.titelcolor;
    })
  }
  //onClick={handleTab.bind(this,{key:'/console/dtxq'}   
    if (type === 'photocard'){
        let size = child.length;
        let colsize = 24/size;
        let imgurl = "../../../assets/index-bg.png";      
        let htmldiv  = child.map(
        card =>
            <Col span={24/size} key={card.id}>
            <div className={styles.photoli} align='center'>
            
            <li><img src={card.imgurl} style = {{width:'100px',height:'100px'}}></img></li>
           
            <li><a href={card.url}>{card.urlname}</a></li>
          
            </div>
            </Col>);
     
        return (<div className={styles.cardtitel}>
            <Card   title ={<div className='titeliconw'><span><Icon type="android-o" /></span><span>{titel}</span></div>} extra={<a onClick={handleTab.bind(this,{key:'/console/yygk'})}>更多>></a>}  >
                {htmldiv}
         </Card>
         </div>);

    }else if (type==="appcase"){
        let titelcards = child;
        return (
            <div className={styles.cardplafam}>
            <Card title={<div className='titeliconw'><span><Icon type="area-chart" /></span><span>{titel}</span></div>}>                    
            <List
            itemlayout="horizontal"
            dataSource={titelcards}
            renderItem={item => (
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar><Icon type={item.imgurl}/></Avatar>}
                  itemlayout = "vertical"
                  description={<div className='tab'><span style={{color:'#727176'}}>{item.title}  :</span><span ></span>   {item.value}</div>}
                />
              </List.Item>
            )}
          />
          </Card>
          </div>
        )
    }else if (type === "plafamcase"){
        let titelcards = child;
        return  (
            <div className={styles.cardapp}>
          <Card title={<div className='titeliconw'><span><Icon type="flag" /></span><span>{titel}</span></div>} extra={<a onClick={addComponent.bind(this,{url:'/console/ptgg',titel: '动态公告'})}>更多>></a>}>                    
            <List
            itemlayout="horizontal"
            dataSource={titelcards}
            renderItem={item => (
              <List.Item>
                <List.Item.Meta
                //  avatar={<Avatar src={require('../../../assets/index-bg.png')}/>}
                itemlayout = "vertical"
                  title = {<div className='tab'><span style={{fontSize:10,backgroundColor:'#D4DADA'}}>标题：  </span><span style={{color:'#727176'}}>{item.title}</span></div>}
                  description={<div className='tab'><span style={{fontSize:10,backgroundColor:'#D4DADA'}} >内容：  </span><span style={{color:'#727176'}}>{item.content}</span></div>}
                />
              </List.Item>
            )}
          />
          </Card>
          </div>
        )
    }

   return  (<div></div>);
}



export default Cards;
