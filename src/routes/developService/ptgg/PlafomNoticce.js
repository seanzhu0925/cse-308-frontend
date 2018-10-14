import React from 'react';
import { Menu, Layout,List ,Divider,Button,Spin} from 'antd';
import styles from './PlafomNoticce.less'
import request from '../../../utils/request';
import querystring from 'querystring';


const { Content, Header, Footer,Sider } = Layout;

const data = [{
   title: '移动门户网站应用更名',
   content:'dsadsadasadsd测试数据测试',
   creattime:'2017-02-03'
},
{
    title: '移动门户网站应用更名1',
   content:'dsadsadasadsd测试数据测试',
   creattime:'2017-01-03'
 },
 {
    title: '移动门户网站应用更名2',
   content:'dsadsadasadsd测试数据测试',
   creattime:'2017-01-01'
 },
    
    
  ];

export default class PlafomNoticce extends React.PureComponent {
    constructor(props){
        super(props)
        this.state =({
            loading: true,
            loadingMore: false,
            showLoadingMore: true,
            data: [],
        })
    }
    
    componentDidMount() {
        this.getData((res) => {
           
            this.setState({
              loading: false,
              data: res ,
            });
          });
        }
      getData = (callback) => {
        const params = '1'
      const res =   request(`/api/app/testList?${querystring.stringify(params)}`)
      res.then((result) => {
          console.log(result)
         callback(result)
      }).catch((err) => {
          
      })
      
     /* if (res.Promise)
          
      }*/
    }
      onLoadMore = () => {
        this.setState({
          loadingMore: true,
        });
        this.getData((res) => {
          const data = this.state.data.concat(res);
          this.setState({
            data,
            loadingMore: false,
          }, () => {
            // Resetting window's offsetTop so as to display react-virtualized demo underfloor.
            // In real scene, you can using public method of react-virtualized:
            // https://stackoverflow.com/questions/46700726/how-to-use-public-method-updateposition-of-react-virtualized
            window.dispatchEvent(new Event('resize'));
          });
        });
      }
      
    render() {
   
        const { loading, loadingMore, showLoadingMore, data } = this.state;
        console.log(data,"da")
        const loadMore = showLoadingMore ? (
          <div style={{ textAlign: 'center', marginTop: 12, height: 32, lineHeight: '32px' }}>
            {loadingMore && <Spin />}
            {!loadingMore && <Button onClick={this.onLoadMore}>loading more</Button>}
          </div>
        ) : null;
        return (
            <Layout  style={{ color: '#FFF',width:'100%'}}>
                <Header style={{ backgroundColor: '#6a9dd2', padding: 0,color: '#FFF',fontSize: 40,textAlign: 'center',boxSizing:'border-box',position:'fixed',left:'0',right:'0',zIndex:'9999',boxShadow:'0 2px 4px 0 rgba(0, 0, 0, 0.20)'}} >             
                 平台动态                     
                </Header>
                <Layout  style={{ backgroundColor: '#F0F2F5', padding: 0,color: '#FFF',width:'100%',margin:'auto',marginTop:'2%' }}>
                
              
                <Content style={{ width: '70%',marginLeft:'1%',margin:'auto'}}>
                <div style={{width:'60%',margin:'auto',marginTop:'3%'}}>
                <List
                className="demo-loadmore-list"
                loading={loading}
                itemLayout="horizontal"
                loadMore={loadMore}
                dataSource={data}
                renderItem={item => (
                  <List.Item actions={[<span>{item.date}</span>]}>
                    <List.Item.Meta
                     
                      title={<a href="https://ant.design">{item.title}</a>}
                      description={item.content}
                    />
                   
                  </List.Item>
                )}
              />
              </div>
                </Content>
              
               </Layout>
            </Layout>
        );
    }
}
 