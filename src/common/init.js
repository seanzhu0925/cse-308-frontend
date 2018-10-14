import { queryAppCategory } from "../services/dictionary";
import { getAppCategoryById, getAppCategoryIdArr, formatDict } from "../utils/utils";

export let appCategory = [];

export default async function init(func) {
    //  const { rows } = await queryAppCategory();
    //  appCategory = rows;
    //  console.log(appCategory);
     func();
}

