import React from 'react';
import { Route, Routes, Outlet } from 'react-router-dom'
import Layout from '@/layout/defaultLayout/layout';

export default function HomeModule() {
    return (
        <Layout>
            <Outlet></Outlet>
        </Layout>
    )
}