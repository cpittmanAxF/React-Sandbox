import React from 'react'
import MaskedInput from 'react-text-mask'

const phoneMask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
const ssnMask = [/\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

 const ssnRegex = /^(\d{3}-\d{2}-\d{4})$/;
 const phoneRegex = /^$|[0-9]{10}|[(]{1}\d{3}[)]{1}[ ]{1}-?\d{3}-?\d{4}/;

class PhoneInput extends React.Component {
    state = {
        valid: true,
        invalidCss: 'invalid-input',
    }

    static removeFormatting = (inputValue) => {
        if (inputValue) {
            return inputValue.replace(/[ ()-/_]/g, '');
        }
        return;
    }

    handleChange = event => {
        if (event.target.value) {
            // const value = PhoneInput.removeFormatting(event.target.value);

            let isValid;
            if (this.props.type === 'id') {
                isValid= ssnRegex.test(event.target.value);
            }
            else {
                isValid= phoneRegex.test(event.target.value);
            }


            this.setState(state => ({
                valid: isValid
            }));
        }
        else {
            this.setState(state => ({ valid: true }));
        }
    }

    render() {
        const { valid } = this.state;

        return (
            <MaskedInput mask={this.props.type === 'id' ? ssnMask : phoneMask} onChange={this.handleChange} className={valid ? 'masked-input' : 'masked-input invalid-input'} />
        )
    }
}


export default PhoneInput;