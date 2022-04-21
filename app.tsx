import React from 'react';
import ReactDOM from 'react-dom';
import Views from './src/routes/routeMerge';
import CreateTool from './src/component/createToBody/createTool';
import staticData from './src/store/static';

staticData.createTool = new CreateTool(); // 页面元素弹出类
ReactDOM.render(<Views />, document.getElementById('app'));