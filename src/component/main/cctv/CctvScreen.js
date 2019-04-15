import React from 'react';
import CctvItem from "./CctvItem";


const CctvScreen = (props) => {
    const { windowWidth } = props;
    return (
        <div style={{ width: (windowWidth >= 720) ? 1400 : '100%' }}>
            {
                [1, 2, 3, 4, 5].map((item, index) => (
                    <CctvItem key={index} />
                ))
            }
        </div>
    )
};

export default CctvScreen;
