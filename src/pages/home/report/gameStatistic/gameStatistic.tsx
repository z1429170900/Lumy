import React from 'react';
import HomeLayout from '@/layout/homeLayout/homeLayout';
import SearchBox from '@/layout/homeLayout/searchBox';
import TabelBox from '@/layout/homeLayout/tableBox';
import SearchItem from '@/component/searchItem/searchItem';
import { Input, Table } from 'antd';

const { Column } = Table;

function gameStatisticPage() {
    const data = [
        {
            age: 18,
            address: "三界镇",
            key: 1
        }
    ]

    return (
        <HomeLayout>
            <SearchBox>
                <SearchItem label='usage：'><Input placeholder="Basic usage" /></SearchItem>
            </SearchBox>
            <TabelBox>
                <Table dataSource={data} bordered>
                    <Column title="Age" dataIndex="age" key="age" />
                    <Column title="Address" dataIndex="address" key="address" />
                </Table>
            </TabelBox>
        </HomeLayout>
    )
}

export default gameStatisticPage