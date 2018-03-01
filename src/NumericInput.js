import React from 'react'
import { Input } from 'webapps-components'

const numberRegEx = /^[0-9\b]+$/;
const decimalRegEx = /^[0-9.\b]+$/;

class NumericInput extends React.Component {
    state = {
        inputValue: ''
    }


    handleChange = event => {
        // console.log(event.target.value.split('.'));
        if (event.target.value === '') {
            this.setState({ inputValue: event.target.value })
        }
        else if (!this.props.decimalPlaces) {
            if (numberRegEx.test(event.target.value)
                && event.target.value.length <= (this.props.max ? this.props.max : 10)) {
                this.setState({ inputValue: event.target.value })
            }
        }
        else if (decimalRegEx.test(event.target.value)
            && (event.target.value.length <= (this.props.max ? this.props.max : 10))
            && (event.target.value.split('.').length < 2
                || (event.target.value.split('.').length === 2 && event.target.value.split('.')[1].length <= this.props.decimalPlaces))) {

            this.setState({ inputValue: event.target.value })

        }
    }

    render() {
        const { inputValue } = this.state;

        if(this.props.value){
            this.setState({inputValue: this.props.value});
        }

        return (
            <Input externalLabel="Label" id={this.props.id} onChange={this.handleChange} value={inputValue} type={this.props.type} />
        )
    }

}


export default NumericInput;