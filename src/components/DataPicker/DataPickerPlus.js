import { DatePicker, LocaleProvider } from 'antd';
import { Component } from 'react';
import moment from 'moment';
const RangePicker = DatePicker.RangePicker;

class DataPickerPlus extends Component {
  constructor(props){
      super(props)
      this.state={}
  }
  
  
  
  

  render() {
    return (
      <div>
      <RangePicker
      ranges={{ '今天': [moment(), moment()], '月底': [moment(), moment().endOf('month')] }}
      onChange={this.props.onChange}
      allowClear='true'
      
    />
    <br />
      </div>
    );
  }
}

export default DataPickerPlus;