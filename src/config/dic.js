export const dic = {
    approvalType: [{
        key: '0',
        name: '应用创建审批'
    }, {
        key: '1',
        name: '试用发布审批'
    }, {
        key: '2',
        name: '试用更新审批',
    }, {
        key: '3',
        name: '正式发布审批'
    }, {
        key: '4',
        name: '正式更新审批'
    }],
    approvalStatus: [{
        key: '0',
        name: '新创建，未审核'
    }, {
        key: '1',
        name: '审核通过'
    }, {
        key: '2',
        name: '未提交修改申请'
    }, {
        key: '3',
        name: '修改申请已提交'
    }],
    shelfMode:[{
        key: '1',
        name: '测试'
    },{
        key: '2',
        name: '小范围试用'
    },{
        key: '3',
        name: '大范围试用'
    },{
        key: '4',
        name: '正式'
    }],
    appComponent: {
        isDefault: [{
            key: '0',
            name: '默认'
        },{
            key: '1',
            name: '普通'
        }],
        isOff: [{
            key: '0',
            name: '未注销'
        },{
            key: '1',
            name: '已注销'
        }],
    },
    appManage:{
        appStatus:  [{
            key: '0',
            name: '正常'
        },{
            key: '1',
            name: '冻结'
        },{
            key: '2',
            name: '废弃'
        }],
    },
    feedback:{
        workStatus:  [{
            key: '0',
            name: 'in work'
        },{
            key: '1',
            name: 'available'
        },{
            key: '2',
            name: '失效'
        }],
        roleStatus:  [{
            key: '0',
            name: 'No'
        },{
            key: '1',
            name: 'Yes'
        },],
    }
}