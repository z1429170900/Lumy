import React from 'react';
import styleClass from './homeLayout.module.less';

interface HomeLayoutInput {
    children: any
}

function HomeLayout(props: HomeLayoutInput) {
    return (
        <div className={styleClass['home-layout']}>
            {props.children}
        </div>
    )
}

export default HomeLayout