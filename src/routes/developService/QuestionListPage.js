import {List,Card} from 'antd'
import { Component } from 'react';
import styles from './QuestionListPage.less'

const data = [{titel:'提示：VPN建立怎么办',anser:'检查有无移动数据'},{titel:'提示：VPN建立怎么办',anser:'检查有无移动数据'},{titel:'提示：VPN建立怎么办',anser:'检查有无移动数据'}]
class QuestionListPage extends Component{


    render(){

        return(
            <div style={{width:'100%'}}>
            <div className={styles.cardtitel} style={{ background: '#F3F3F3',width:'80%' ,margin:'auto'}}>
            <Card title='常见问题'    bordered={false}  >
                <List
                dataSource={data}
                itemLayout="horizontal"
                renderItem ={(item,index) =>

                    <List.Item>
                          <List.Item.Meta
                          title={<span style={{fontWeight:'blod',fontSize:'1.1em'}}>{index+1}.{item.titel}</span>}
                          description={<span>答：{item.anser}</span>}
                          />
                 </List.Item>
                }
                >


                </List>
            </Card>
            </div>
            </div>
        )
    }
}

export default QuestionListPage;