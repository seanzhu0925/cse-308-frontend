
import { parse } from 'url';
import Mock from "mockjs";

const Random = Mock.Random;

const terminalResourceList = [];
for (let i = 0; i < 20; i++) {
    terminalResourceList.push(Mock.mock({
        'id': '@increment',
        'resourceName': '@first',
        'desc':Random.cword(20,30)
    }))
}


export const queryTerminalResourceList = (req, res) => {
    if (res && res.json) {
        res.json(terminalResourceList);
    } else {
        return terminalResourceList;
    }
}