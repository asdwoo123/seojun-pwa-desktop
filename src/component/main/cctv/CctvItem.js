import React, { Component } from 'react';
import Modal from 'react-responsive-modal';
import windowSize from 'react-window-size';


class CctvItem extends Component {
    state = {
      visible: false
    };

    onCloseModal = () => {
        this.setState({
            visible: false
        });
    };

    render() {
        const { windowWidth } = this.props;
        return (
            <div style={{ width: (windowWidth >= 720) ? 'calc(25% - 44px)' : 'calc(50% - 44px)', backgroundColor: 'rgb(35, 45, 91)',
                display: "inline-block", margin: 20, cursor: "pointer" }}>
                <img style={{ width: '100%' }} src="/img-placeholder.3.jpg" alt=""
                     onClick={() => this.setState({ visible: true })}
                />
                <Modal open={this.state.visible} onClose={this.onCloseModal}>
                    <img style={{ width: '100%' }} src="/img-placeholder.3.jpg" alt="" />
                </Modal>
            </div>
        )
    }
};

export default windowSize(CctvItem);
