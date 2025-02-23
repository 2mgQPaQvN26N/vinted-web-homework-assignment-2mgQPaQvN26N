import React from 'react';

import '../assets/scss/container.scss';
const Container = ({children}) => {
    return (
        <div className='container'>
            {children}
        </div>
    );
}

export default Container;