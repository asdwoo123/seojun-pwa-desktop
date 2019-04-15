import React, {Component, Fragment} from 'react';
import ProjectList from "./ProjectList";
import RegisterScreen from "./RegisterScreen";
import { Icon } from 'antd';
import { NavBar } from 'antd-mobile';
import { Dialog, Slide } from '@material-ui/core';


function Transition(props) {
    return <Slide direction="up" {...props} />
}

class ProjectSettingScreen extends Component {
    state = {
        open: false
    };

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    render() {
        const pLeft = {
            paddingLeft: 24,
            marginTop: 10
        };
        const { project } = this.props.locale;
        const { windowWidth } = this.props;
        if (windowWidth >= 720) {
            return (
                <div style={{ display: 'flex', width: '100%', height: '100%', justifyContent: 'center',
                    alignItems: 'center', backgroundColor: 'rgb(13, 24, 58)', flexDirection: 'column'}}>
                    <h1 style={{ color: 'white', marginBottom: 50 }}>{project[0]}</h1>
                    <div style={{ display: 'flex', backgroundColor: 'rgb(13, 24, 58)'}}>
                        <ProjectList project={project} windowWidth={windowWidth} />
                        <RegisterScreen project={project} />
                    </div>
                </div>
            )
        } else {
            return (
                <div>
                    <NavBar
                    mode="dark"
                    rightContent={[
                        <Icon type="file-add" style={{ fontSize: '18px' }} onClick={this.handleClickOpen}/>
                    ]}
                    >
                        {project[0]}
                    </NavBar>
                    <ProjectList project={project} windowWidth={windowWidth} />
                    <Dialog
                    fullScreen
                        open={this.state.open}
                            onClose={this.handleClose}
                            TransitionComponent={Transition} >
                        <Fragment>
                            <NavBar
                                icon={<Icon type="left" />}
                                onLeftClick={this.handleClose}
                            >
                                {project[7]}
                            </NavBar>
                            <RegisterScreen project={project} />
                        </Fragment>
                    </Dialog>
                </div>
            )
        }
    }
}

export default ProjectSettingScreen;

