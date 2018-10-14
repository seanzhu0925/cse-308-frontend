import React, { PureComponent } from 'react';
import { Menu, Icon, Spin, Tag, Dropdown, Avatar, Divider, Tooltip } from 'antd';
import moment from 'moment';
import groupBy from 'lodash/groupBy';
import Debounce from 'lodash-decorators/debounce';
import { Link } from 'dva/router';
import NoticeIcon from '../NoticeIcon';
import HeaderSearch from '../HeaderSearch';
import styles from './index.less';

export default class GlobalHeader extends PureComponent {
  componentWillUnmount() {
    this.triggerResizeEvent.cancel();
  }
  // getNoticeData() {
  //   const { notices = [] } = this.props;
  //   if (notices.length === 0) {
  //     return {};
  //   }
  //   const newNotices = notices.map(notice => {
  //     const newNotice = { ...notice };
  //     if (newNotice.datetime) {
  //       newNotice.datetime = moment(notice.datetime).fromNow();
  //     }
  //     // transform id to item key
  //     if (newNotice.id) {
  //       newNotice.key = newNotice.id;
  //     }
  //     if (newNotice.extra && newNotice.status) {
  //       const color = {
  //         todo: '',
  //         processing: 'blue',
  //         urgent: 'red',
  //         doing: 'gold',
  //       }[newNotice.status];
  //       newNotice.extra = (
  //         <Tag color={color} style={{ marginRight: 0 }}>
  //           {newNotice.extra}
  //         </Tag>
  //       );
  //     }
  //     return newNotice;
  //   });
  //   return groupBy(newNotices, 'type');
  // }
  /* eslint-disable*/
  // @Debounce(600)
  triggerResizeEvent() {
    const event = document.createEvent('HTMLEvents');
    event.initEvent('resize', true, false);
    window.dispatchEvent(event);
  }
  render() {
    const {
      // currentUser,
      userinfo
    } = this.props;

    //const user = userinfo.userinfolist[0] == null ? {username:''} : userinfo.userinfolist[0];注释？？？
    return (
      <div className={styles.header}>
        <div className={styles.left}>
          <img src={ require('../../assets/emblem.png') }/>
          <img src={ require('../../assets/header.png') } style={{ marginLeft:20 }}/>
        </div>
        <div className={styles.right}>
          <ul className={styles.menuList}>
						{/* <li><Icon type="user" />{user.username}</li> 注释？？？ */}
						<li><Icon type="poweroff" />退出</li>
					</ul>
        </div>
      </div>
    );
  }
}
