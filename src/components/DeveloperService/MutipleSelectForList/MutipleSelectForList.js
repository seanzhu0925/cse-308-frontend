import { Component } from 'react';
import { Transfer } from 'antd';


class MutipleSelectForList extends Component{
    state = {
        mockData: [],
        targetKeys: [],
      }
      
      
      getMock = () => {
        const targetKeys = [];
        const mockData = [];
        for (let i = 0; i < 20; i++) {
          const data = {
            key: i.toString(),
            title: `content${i + 1}`,
            description: `description of content${i + 1}`,
            chosen: Math.random() * 2 > 1,
          };
          if (data.chosen) {
            targetKeys.push(data.key);
          }
          mockData.push(data);
        }
        this.setState({ mockData, targetKeys });
      }
     
      render() {
        return (
          <Transfer
            dataSource={this.props.dataSource}
            titles= {this.props.titles}
            targetKeys={this.props.targetKeys}
            showSearch
            filterOption={this.props.filterOption}  
            onChange={this.props.handleChange}
            render={item => item.title}
            listStyle = {{width:'35%',backgroundColor:'#8C8C8C'}}
          />
        );
      }               
}



export default MutipleSelectForList;