import React from 'react';
import { Input } from 'webapps-components';

const emailRegEx = /^\S+@\S+\.\S+$/;

class EmailInput extends React.Component {
    state = {
        valid: true,
        hasFocus: false,
    }

    handleEmailChange = event => {
        const isValid = emailRegEx.test(event.target.value);

        if (event.target.value) {
            this.setState(state => ({
                valid: isValid
            }));
        }
        else {
            this.setState(state => ({ valid: true }));
        }

        if (this.props.handleChange) {
            this.props.handleChange(event.target.value, isValid);
        }
    }

    render() {
        const { valid, hasFocus } = this.state;

        return (
            <Input id={this.props.id}
                onFocus={() => this.setState(state => ({ hasFocus: true }))}
                onBlur={() => this.setState(state => ({ hasFocus: false }))}
                onChange={this.handleEmailChange}
                invalid={!valid && !hasFocus} />



        )
    }
}

export default EmailInput;