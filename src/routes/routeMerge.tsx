import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import CommonRoute from '@/routes/common/common';
import Login from '@/pages/login/login';
import Page404 from '@/pages/404/404';
import reducers from '@/store/reducers';
import { ThemeType } from '@/store/themeAction';
import { createStore } from 'redux';
import { connect, Provider } from 'react-redux';
import { ConfigProvider } from 'antd';
import './app.less';

import MainPage from '@/pages/home/main/main';
import OtherPage from '@/pages/home/other/other';
import GameStatistic from '@/pages/home/report/gameStatistic/gameStatistic';
import UserStatistic from '@/pages/home/report/userStatistic/userStatistic';
import Account from '@/pages/home/system/account/account';
import Role from '@/pages/home/system/role/role';

export const store = createStore(reducers)

interface RouteMergeInput {
    store: ThemeType
}

function RouteMerge(e: RouteMergeInput) {
    return (
        <div data-dark-theme={e.store.theme} className="root-niuyou-app">
            <Router basename="/">
                <Routes>
                    <Route path="/" element={<Login />}></Route>
                    <Route path="home" element={<CommonRoute />}>
                        <Route path="" element={<Navigate to="main" />}></Route>
                        <Route path="main" element={<MainPage />}></Route>
                        <Route path="other" element={<OtherPage />}></Route>
                        <Route path="gameStatistic" element={<GameStatistic />}></Route>
                        <Route path="userStatistic" element={<UserStatistic />}></Route>
                        <Route path="account" element={<Account />}></Route>
                        <Route path="role" element={<Role />}></Route>
                    </Route>
                    <Route path="404" element={<Page404 />}></Route>
                    <Route path="*" element={<Navigate to="/404"/>} />
                </Routes>
            </Router>
        </div>
    )
}

const ConnectRoute = connect(
    (state: ThemeType) => {
        return {
            store: {
                theme: state.theme
            }
        }
    }
)(RouteMerge);

function AntConfigProvider(e: RouteMergeInput) {
    return (
        <ConfigProvider prefixCls={e.store.theme}>
            <ConnectRoute></ConnectRoute>
        </ConfigProvider>
    )
}

const ConnectAntConfigProvider = connect(
    (state: ThemeType) => {
        return {
            store: {
                theme: state.theme
            }
        }
    }
)(AntConfigProvider);

export default function Views() {
    return (
        <Provider store={store}>
            <ConnectAntConfigProvider></ConnectAntConfigProvider>
        </Provider>
    )
}