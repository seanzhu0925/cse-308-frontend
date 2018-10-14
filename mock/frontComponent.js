
import { parse } from 'url';
import Mock from "mockjs";

const Random = Mock.Random;

const frontComponentList = [];
for (let i = 0; i < 20; i++) {
    frontComponentList.push(Mock.mock({
        'id': '@increment',
        'name': Random.cword(3, 10),
    }))
}


export const queryFrontComponentList = (req, res) => {
    if (res && res.json) {
        res.json(frontComponentList);
    } else {
        return frontComponentList;
    }
}