export const config = {
    equipment: {
        warntype: [
            {
                key: '1',
                name: '一般'
            },
            {
                key: '2',
                name: '紧急'
            }
        ],
        type: [
            {
                key: '1',
                name: '类型1'
            },
            {
                key: '2',
                name: '类型2'
            }
        ]
    },
    pic: {
        host: 'http://127.0.0.1'
    }
}

export const setImgHost = (host) => {
    config.pic.host = host;
}