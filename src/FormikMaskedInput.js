import React from 'react'
import MaskedInput from 'react-text-mask'

const phoneMask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
const ssnMask = [/\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
const dateMask = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];

 const ssnRegex = /^(\d{3}-\d{2}-\d{4})$/;
 const phoneRegex = /^$|[0-9]{10}|[(]{1}\d{3}[)]{1}[ ]{1}-?\d{3}-?\d{4}/;
//  const dateRegex = /^(\d{2}\/\d{2}\/\d{4})$/;

class FormikMaskedInput extends React.Component {
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
    
    handleBlur = event => {
        if(this.props.field){
            this.props.field.onBlur(event);
        }
        else {
            this.props.onBlur(this.props.id, true)
        }
    }

    handleChange = event => {
        if (event.target.value) {
            // const value = FormikMaskedInput.removeFormatting(event.target.value);

            let isValid;
            if (this.props.type === 'id') {
                isValid= ssnRegex.test(event.target.value);
            }
            else if(this.props.type === 'phone') {
                isValid= phoneRegex.test(event.target.value);
            }
            else {
                isValid = true;
            }


            this.setState(state => ({
                valid: isValid
            }));
        }
        else {
            this.setState(state => ({ valid: true }));
        }

        if(this.props.field){
            this.props.field.onChange(event)
        }   
        else{
            this.props.onChange(this.props.id, event.target.value)
        }
    }


    // handleChange = event => {   
    //     console.log('phone')                         
    //     if(this.props.field){
    //         this.props.field.onChange(event)
    //     }   
    //     else{
    //         this.props.onChange(this.props.id, event.target.value)
    //     }
    // }

    render() {
        const { valid } = this.state;
    
        return (
            <MaskedInput 
                id={this.props.id}
                name={this.props.field ? this.props.field.name : this.props.name}
                mask={this.props.type === 'id' ? ssnMask : this.props.type === 'phone' ? phoneMask : dateMask}
                // value={this.props.value}
                onChange={this.handleChange} 
                className={valid ? 'masked-input' : 'masked-input invalid-input'} 
            />
        )
    }

}


export default FormikMaskedInput;