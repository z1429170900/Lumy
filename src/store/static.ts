import CreateTool from '@/component/createToBody/createTool'
// 公共的全局属性（静态）
// 存放在这里的属性=存window
interface StaticData {
    tabsHistory: Array<string>,
    createTool: CreateTool | null
}

const staticData:StaticData = {
    tabsHistory: [], // 标签栏跳转记录
    createTool: null
}

export default staticData