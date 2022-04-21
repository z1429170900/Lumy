/**
 * 获取地址最后一位
 * @param str url地址
 * @returns 
 */
export function getPath(str: string) {
    let list = str.split("/");
    return list[list.length - 1];
}