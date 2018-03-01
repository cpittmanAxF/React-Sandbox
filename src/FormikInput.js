import React from 'react'
import { Input } from 'webapps-components'

class FormikInput extends React.Component {
    // state = {
    //     inputValue: ''
    // }

    handleBlur = event => {
        if(this.props.field){
            this.props.field.onBlur(event);
        }
        else {
            this.props.onBlur(this.props.id, true)
        }
    }

    handleChange = event => {                            
        if(this.props.field){
            this.props.field.onChange(event)
            // this.setState({inputValue: event.target.value})
        }   
        else{
            this.props.onChange(this.props.id, event.target.value)
        }
    }

    // componentDidMount = () => {
    //     if(this.props.value){
    //         this.setState({inputValue: this.props.value});
    //     }
    // }

    render() {
        // const { inputValue } = this.state;

        return (
            <Input 
                id={this.props.id} 
                name={this.props.field ? this.props.field.name : this.props.name }
                onChange={this.handleChange} 
                onBlur={this.handleBlur} 
                value={this.props.value} 
                type={this.props.type} 
                invalid={this.props.invalid}
                disabled={this.props.disabled}
                placeholder={this.props.placeholder}
            />
        )
    }

}


export default FormikInput;