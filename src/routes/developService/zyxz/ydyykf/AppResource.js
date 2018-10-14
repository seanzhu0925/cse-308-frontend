
import { List } from 'antd';
import styles from './AppResource.less'

const AppResource = ({list}) =>{


    return (<div>
        <List
        loading={list!=null ? false: true}
        itemLayout="horizontal"
        dataSource={list}
        renderItem={item => (
          <List.Item actions={[<a herf={item.url}>下载资料</a>, <a>more</a>]}>
            <List.Item.Meta
              title={<div style={{fontWeight:'bold',marginTop:'1%'}}>{item.title}</div>}
             
            />
          </List.Item>
        )}
      />
        </div>)
}


export default AppResource;