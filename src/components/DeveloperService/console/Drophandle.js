import { Dropdown,Button,Icon,Menu ,Checkbox} from 'antd';
import {styles} from './Drophandle.less'
const CheckboxGroup = Checkbox.Group;


const Drophandle = ({onChange,dataSource,columns,styles,dropchange}) =>{
    const plainOptions = [];
    if (columns==null||columns==undefined){
        return <div></div>
    }

    let columslists = [...columns];
    if (columns.length>1){
        columns.map(function(item){
            plainOptions.push(item.title);
        })
    }
    const menu = (
        <Menu>
        <div className={styles.downtype}>
        <CheckboxGroup onChange={dropchange} defaultValue={plainOptions} options={plainOptions}  />
        </div>
        </Menu>
      );

    return (<Dropdown  overlay={menu}><Button><Icon type='bars'/><Icon type='down'/></Button></Dropdown>);
}

export default Drophandle;