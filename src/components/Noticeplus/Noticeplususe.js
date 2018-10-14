import { Button, notification } from 'antd';

const openNotification = (message,description) => {
  notification.open({
    message: message,
    description: description,
  });
  return  ;
};

