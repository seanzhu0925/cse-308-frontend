

 //列  字典数据
export function ColumsPlusByDictiry(dictiorydata =[],title,dataIndex){   
    if (title,dataIndex){
    let  htmlaction = {
        title: title,
        dataIndex: dataIndex,
        render: (text, record) => (
           <div>
                {
                    dictiorydata.map(function(item){
                       
                        if (item.key == text){
                            return item.value
                        }             
                    })
                }
           </div>
           
        )
       
    }
    return htmlaction;
}
   

}
    
    