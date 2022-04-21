import React from 'react';
import styleClass from './searchItem.module.less';

interface ItemInput {
    label?: string | undefined,
    children?: any
}

function searchItem(props: ItemInput) {
    return (
        <div className={styleClass['search-item']}>
            <label>{props.label}</label>
            {props.children}
        </div>
    )
}

export default searchItem