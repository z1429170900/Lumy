import React from 'react';
import styleClass from './homeLayout.module.less';

function TabelBox(props: any) {
    return (
        <div className={styleClass['table-box']}>
            {props.children}
        </div>
    )
}

export default TabelBox