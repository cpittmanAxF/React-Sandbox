import React from 'react'
import { Input } from 'webapps-components'

const numberRegEx = /^[0-9\b]+$/;
const decimalRegEx = /^[0-9.\b]+$/;

class FormikNumericInput extends React.Component {
    state = {
        inputValue: ''
    }

    handleBlur = event => {
        if(this.props.field){
            this.props.field.onBlur(event);
        }
    }

    handleChange = event => {   
           
        // this.props.field.onChange(event);
        if (event.target.value === '') {
            if(this.props.field){
                this.props.field.onChange(event);
            }
            this.setState({ inputValue: event.target.value })
        }
        else if (!this.props.decimalPlaces) {
            if (numberRegEx.test(event.target.value)
                && event.target.value.length <= (this.props.max ? this.props.max : 10)) {
                    if(this.props.field){
                        this.props.field.onChange(event);
                    }
                    this.setState({ inputValue: event.target.value })
            }
        }
        else if (decimalRegEx.test(event.target.value)
            && (event.target.value.length <= (this.props.max ? this.props.max : 10))
            && (event.target.value.split('.').length < 2
                || (event.target.value.split('.').length === 2 && event.target.value.split('.')[1].length <= this.props.decimalPlaces))) {
                    if(this.props.field){
                        this.props.field.onChange(event);
                    }
                    this.setState({ inputValue: event.target.value })

        }
    }

    componentDidMount = () => {
        if(this.props.value){
            this.setState({inputValue: this.props.value});
        }
    }

    render() {
        const { inputValue } = this.state;

        

        return (
            <Input 
                id={this.props.id} 
                onChange={this.handleChange} 
                onBlur={this.handleBlur} 
                value={inputValue} 
                type={this.props.type} 
                invalid={this.props.invalid} 
            />
        )
    }

}


export default FormikNumericInput;