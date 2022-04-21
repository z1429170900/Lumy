import React from 'react';
import styleClass from './homeLayout.module.less';

function SearchBox(props: any) {
    return (
        <div className={styleClass['search-box']}>
            {props.children}
        </div>
    )
}

export default SearchBox