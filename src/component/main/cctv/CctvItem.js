import React, { Component } from 'react';
import Modal from 'react-responsive-modal';
import windowSize from 'react-window-size';
import axios from 'axios';


class CctvItem extends Component {
    state = {
        visible: false,
        img: false
    };

    async componentWillMount() {
        const { port, ip } = this.props;
        const res = await axios.get(`http://${ip}:${port}/img`);
        console.log(res);
        if (res.data) {
            this.setState({
                img: true
            })
        }
    }

    onCloseModal = () => {
        this.setState({
            visible: false
        });
    };

    render() {
        const { windowWidth, port, ip, name } = this.props;
        return (
            <div style={{ width: (windowWidth >= 720) ? 'calc(25% - 44px)' : 'calc(50% - 44px)',
                display: (this.state.img) ? "inline-block" : "none", margin: 20, cursor: "pointer" }}>
                <img style={{ width: '100%' }} src={`http://${ip}:${parseInt(port)+1}?action=stream`} alt=""
                     onClick={() => this.setState({ visible: true })}
                />
                <p>{name}</p>
                <Modal open={this.state.visible} onClose={this.onCloseModal}>
                    <img style={{ width: '100%' }} src={`http://${ip}:${parseInt(port)+1}?action=stream`} alt="" />
                </Modal>
            </div>
        )
    }
};

export default windowSize(CctvItem);
