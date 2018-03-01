import React from 'react'
import { Select } from 'webapps-components'

class FormikSelect extends React.Component {

    handleBlur = event => {
        if(this.props.field){
            this.props.field.onBlur(event);
        }
        else {
            this.props.onBlur(this.props.id, true)
        }
    }

    handleChange = event => {
        // console.log(this.props.parent);
        // this.props.parent.setState({idPattern: "1234"})
        if(this.props.field){
            this.props.field.onChange(event)
        }   
        else{
            // console.log(this.props);
            this.props.onChange(this.props.id, event.target.value)
        }
    }


    render() {

        return (
            <Select 
                id={this.props.id} 
                name={this.props.field ? this.props.field.name : this.props.name }
                onChange={this.handleChange} 
                onBlur={this.handleBlur} 
                value={this.props.value} 
                // type={this.props.type} 
                invalid={this.props.invalid}
                disabled={this.props.disabled}
                fontSize={this.props.fontSize}
                //{...this.props}
            >
            {this.props.options}
            </Select>
        )
    }

}


export default FormikSelect;