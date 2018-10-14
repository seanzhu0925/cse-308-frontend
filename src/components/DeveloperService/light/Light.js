import { Tag } from 'antd';

const Light = ({serverstate}) =>{

    function handerColor(){
       if (serverstate == '1'){
        return (<div>
            <Tag color="#fff" style={{backgroundColor:'red'}}>不可用</Tag>
            <Tag color="gray">延迟</Tag>
            <Tag color="gray">可用</Tag>
            </div>)
       }else if (serverstate == '2'){
        return (<div>
            <Tag color="gray" >不可用</Tag>
            <Tag color="#fff" style={{backgroundColor:'yellow'}}>延迟</Tag>
            <Tag color="gray">可用</Tag>
            </div>)
       }else if (serverstate == '3'){
        return (<div>
            <Tag color="gray" >不可用</Tag>
            <Tag color="gray" >延迟</Tag>
            <Tag color="gray" style={{backgroundColor:'green'}}>可用</Tag>
            </div>)
       }else{
        return (<div>
            <Tag color="gray">不可用</Tag>
            <Tag color="gray">延迟</Tag>
            <Tag color="gray">可用</Tag>
            </div>)
    }
}

    return (<div>
       
            {
                handerColor()
            }
        


        </div>)
}

export default Light;