import React from 'react';
import error from '../../assets/pngtree-error-404-page-not-found-png-image_4584735.png'
const Error = () => {
    return (
        <div>
            <img src={error} alt="" />

            <h2 className='text-blue-400 font-medium'>404 Page Note Found</h2>
        </div>
    );
};

export default Error;