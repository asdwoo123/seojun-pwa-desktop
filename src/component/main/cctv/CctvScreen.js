import React from 'react';
import CctvItem from "./CctvItem";
import { connect } from 'react-redux';


const CctvScreen = (props) => {
    const { windowWidth, rsps, ip } = props;
    return (
        <div style={{ width: (windowWidth >= 720) ? 1400 : '100%', height: "100%" }}>
            {
                rsps.map((item, index) => (
                    <CctvItem key={index} port={item.port} ip={ip} />
                ))
            }
        </div>
    )
};

export default connect(
    (state) => ({
        rsps: state.socket.rsps,
        ip: state.socket.ip
    })
)(CctvScreen);
