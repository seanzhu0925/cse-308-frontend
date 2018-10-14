import React, { Component } from 'react';
import { Icon } from 'antd';
import styles from './SliderArrows.less'
export default class SliderArrows extends Component {
  constructor(props) {
    super(props);
  }

  handleArrowClick(option) {
    this.props.turn(option);
  }

  render() {
    return (
      <div className={styles.arrow}>
        <ul style={{ listStyle: 'none',height:40 }}>
          <li style={{ height: 20,marginTop:1 }}>
            <span onClick={this.handleArrowClick.bind(this, -1)}>
              <Icon type="up" style={{ height: 10,fontSize:16 }}  />
            </span>
          </li>
          <li style={{ height: 20 ,marginTop:1}}>
            <span onClick={this.handleArrowClick.bind(this, 1)}>
            <Icon type="down" style={{ height: 10 ,fontSize:16}}  />
          </span>
          </li>
        </ul>
      </div>
    );
  }
}