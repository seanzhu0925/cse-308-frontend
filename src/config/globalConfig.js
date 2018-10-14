export const config = {
    globalPagination: {
        defaultCurrent: 1,
        defaultPageSize: 10,
        current: 1,
        pageSize: 10,
        pageSizeOptions: ['10', '20', '30'],
        showSizeChanger: true,
        total: 0,
        showTotal: (total, range) => `显示${range[0]}-${range[1]}条记录，总共${total}条记录`,
    },
    // serverUrl: 'http://192.168.43.184:8080',
    serverUrl: 'http://127.0.0.1:8089',
    serverName: 'api',
    // serverName: 'appmanage',
    upload: {
        uploadAction: '/sysAttachment/save',
        deleteAction: '/sysAttachment/delete',
        previewAction: '/sysAttachment/imgShowById',
    },
    
}