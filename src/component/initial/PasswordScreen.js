import React, {Component, Fragment} from 'react';
import { Steps } from 'antd';
import StepOneScreen from "./password/StepOneScreen";
import StepTwoScreen from "./password/StepTwoScreen";
import StepThreeScreen from "./password/StepThreeScreen";


const Step = Steps.Step;


class PasswordScreen extends Component {
    state = {
      current: 0
    };

    render() {
        return (
            <Fragment>
                <Steps style={{ width: 350 }} size="small" current={this.state.current}>
                    <Step key="First" />
                    <Step key="Second" />
                    <Step key="Last" />
                </Steps>
                {
                    (() => {
                        switch (this.state.current) {
                            case 0:
                                return <StepOneScreen />
                                break;
                            case 1:
                                return <StepTwoScreen />
                                break;
                            case 2:
                                return <StepThreeScreen />
                                break;
                            default:
                                return <StepOneScreen />
                                break;
                        }
                    })()
                }
                <button onClick={() => this.setState({ current: this.state.current += 1 })}>next</button>
            </Fragment>
        )
    }
}

export default PasswordScreen;
