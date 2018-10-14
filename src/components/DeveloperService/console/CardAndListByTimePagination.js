import { Pagination } from 'antd';
import {Component} from 'react';


class  CardsAndListByTime extends Component{
    constructor(props){
        super(props)
        this.state={           
              defaultCurrent: 1,
              defaultPageSize: 5,
              current: 1,
              pageSize: 5,
              pageSizeOptions: ['5', '10', '15'],
              showSizeChanger: true,
              total:0,
              datasorce: [],
              
          }
        }
    

    onPageChange(current,pageSize){
        this.setState({
            current: current,
            pageSize: pageSize,
        })
    }
    onShowSizeChange(current,pageSize){
        this.setState({
            pageSize : pageSize
        })
    }    
    

    onshowTotal(){
        let {total} = this.state;
        return `总共${total}条`;
    }
    render(){      
    return  <div><Pagination size="small" 
    total='0' 

    showSizeChanger showQuickJumper
    current={this.state.current} 
    onChange={this.onPageChange.bind(this)}
    pageSize = {this.state.pageSize}
    pageSizeOptions={this.state.pageSizeOptions}
    defaultCurrent = {this.state.defaultCurrent}
    defaultPageSize = {this.state.defaultPageSize}
    onShowSizeChange={this.onShowSizeChange.bind(this)}
    showTotal={this.onshowTotal.bind(this)}


    /></div>
    }
}

export default CardsAndListByTime;
