import { Component } from 'react';
import { connect } from 'dva';

import AppResource from './AppResource';


const data = [{
    title: '四川新一代移动警务移动应用开发规范（试行）',
    url:''
},{
    title: 'Racing car sprays burning fuel into crowd1.',
    url:''
 },
 {
    title: 'Racing car sprays burning fuel into crowd2.',
    url:''
 }
    
  ];

class AppResourcePage extends Component{

    componentDidMount(){
        alert(1)
    }

    

    render(){
        return (<div style={{width:'80%',marginLeft:'5%',marginTop:'3%'}}
            ><AppResource list={data}/></div>)
    }
}


export default AppResourcePage;