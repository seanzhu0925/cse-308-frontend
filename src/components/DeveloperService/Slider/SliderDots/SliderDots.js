import React, { Component } from 'react';
import styles from './SliderDots.less';
export default class SliderDots extends Component {
  constructor(props) {
    super(props);
  }

  handleDotClick(i) {
    var option = i - this.props.nowLocal;
    this.props.turn(option);
  }

  render() {
    let dotNodes = [];
    let { count, nowLocal } = this.props;
    for(let i = 0; i < count; i++) {
      dotNodes[i] = (
        <span
          key={'dot' + i}
          className={styles.slider-dot + (i === this.props.nowLocal?styles.slider-dot-selected:"")}
          onClick={this.handleDotClick.bind(this, i)}>
        </span>
      );
    }
    return (
      <div className={styles.slider-dots-wrap}>
        {dotNodes}
      </div>
    );
  }
}