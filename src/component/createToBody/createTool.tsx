import React from 'react'
import TabTextMenu from "./tabTextMenu/tabTextMenu";
import ReactDOM from 'react-dom';

type createOption = {
    x: number,
    y: number,
    tabId: number | null,
    notKeep?: boolean, // 使用完后是否销毁 true销毁 false保留
    parentNode?: Element | null | undefined // 选择插入的节点 默认body
}

interface CusHTMLElement extends HTMLElement {
    customKeep?: boolean,
    customType?: string
}

class CreateTool {
    public createList: Array<CusHTMLElement> = [];
    public zindex: number = 1000;
    constructor() {
        window.addEventListener("click", () => {
            let temp = [];
            for (let i=0; i<this.createList.length; i++) {
                if (this.createList[i].customKeep) { // 缓存的留下 不缓存的销毁
                    this.createList[i].style.display = "none";
                    temp.push(this.createList[i])
                } else {
                    document.querySelector('.root-niuyou-app')?.removeChild(this.createList[i]);
                }
            }
            this.createList = temp;
        })
    }
    public createTabMenu(option:createOption) {
        let parentNode = option.parentNode || document.querySelector('.root-niuyou-app') || document.body; // 因为主题色的缘故 只能放在.root-niuyou-app内
        // 先判断是否已存在于页面
        let tabMenu = this.createList.filter((item:CusHTMLElement) => {
            return item.customType === "createTabMenu"
        })
        tabMenu.forEach((item) => {parentNode.removeChild(item)})
        this.createList = this.createList.filter((item) => {
            return item.customType !== "createTabMenu"
        })
        // if (tabMenu.length) {
        //     tabMenu[0].style.top = option.y + "px";
        //     tabMenu[0].style.left = option.x + "px";
        //     tabMenu[0].style.display = "block";
        //     tabMenu[0].style.zIndex = this.getIndex();
        //     return;
        // }
        // 已存在 直接显示
        // 开始创建元素
        let div:CusHTMLElement = document.createElement('div');
        // if (!option.notKeep) {
        //     div.customKeep = true; // 不销毁
        // }
        div.customType = "createTabMenu";
        div.className = "create-to-body"; // 定位于页面
        div.style.top = option.y + "px";
        div.style.left = option.x + "px";
        div.style.zIndex = this.getIndex();
        ReactDOM.render(<TabTextMenu tabId={option.tabId} />, div);
        parentNode.appendChild(div);
        this.createList.push(div);
    }
    public getIndex():string {
        this.zindex ++;
        return this.zindex + "";
    }
}

export default CreateTool