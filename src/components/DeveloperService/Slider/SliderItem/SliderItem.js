import React, { Component } from 'react';
import styles from './SliderItem.less';
export default class SliderItem extends Component {
  constructor(props) {
    super(props);
  }


  render() {
    let { count, item } = this.props;
    let height = 100 / count + '%';
    return (
      <li className={styles.slider_item} style={{height: height}} onClick={this.props.changeNoticeId.bind(this,item.id)}>
      <div style={{width:'100%',fontSize:12, display:'inline-block'}}>
      
        <div style={{float: 'left'}}>
          <span>{item.title}</span>
        </div>
        <div style={{float: 'right',marginRight:20}}>
            <span>发布时间：{item.sysRecordTime}</span>
        </div>
        </div>
        {/* <img src={item.src} alt={item.alt} /> */}
      </li>
    );
  }
}