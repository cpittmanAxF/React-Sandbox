import React from 'react'
import { Select, Input, Flex, Box, Label } from 'webapps-components'

const Wrapper = Box.extend.attrs({
    p: 1,
}) ``

const InputFeedback = ({ error }) =>
    error ? (
        <Small className="input-feedback">Required field</Small>
    ) : null;

const Small = Label.extend`
    font-size: .65rem;
    color: grey;
    display: inline;
`

class StateSelect extends React.Component {
    state = {
        identification_state: '',
        identification_state_invalid: false,
        identification_number: '',
        identification_number_invalid: false,
        identification_pattern: '',
    }

    handleBlur = event => {
        // console.log('blur');
        if(this.props.field){
            this.props.field.onBlur(event);
        }
        else {
            this.props.onBlur(this.props.id, true)
        }
    }

    handleChange = event => {
        //console.log('chang')
        let regex;
        const selection = event.target.value;
        switch(selection) {
            case 'OH':            
                regex = /^([A-Za-z]{1}[0-9]{4,8}$)|(^[A-Za-z]{2}[0-9]{3,7}$)|(^[0-9]{8})$/;                
                break;
            case 'IL':
                regex = /^(\d{3})$/
                break;
            default:
                break;
        }

        this.setState(({
            identification_pattern: regex,
            identification_state: selection
        } ), function() { this.validateChange() });

        this.communicateChange(event);
    }

    validateChange = () => {
        let state_valid = true;
        let number_valid = true;

        if(this.state.identification_state) {
           state_valid = true;
        }

        if(this.state.identification_state && this.state.identification_number){
            console.log(this.state.identification_pattern)
            number_valid = this.state.identification_pattern.test(this.state.identification_number);
        }

        console.log(number_valid);

        this.setState(state => ({
            identification_state_invalid: !state_valid,
            identification_number_invalid: !number_valid
        }));

        // this.props.value.id_state = this.state.identification_state;
        // this.props.value.id_number = this.state.identification_number;
    }

    communicateChange = (event) => {
        if (event && this.props.onChange){

            if(this.props.field){
                this.props.field.onChange(event)
            }
            else {
                this.props.onChange(event);
            }            
        }
    }

    validateNumber = event => {
        const number = event.target.value;
        console.log(number);
        this.setState(state => ({
            identification_number: number,
        }), function() {this.validateChange()});

        this.communicateChange(event);
    }

    componentDidMount = () => {
        let id_state = undefined;
        if(this.props.value.id_state 
            && this.props.options.find(p => p.props.value === this.props.value.id_state)){
             id_state = this.props.values.id_state;
        }

        this.setState(state => ({
            identification_state: id_state,
            identification_number: this.props.value.id_number
        }), this.validateChange);
    }


    render() {
        const {
            identification_state, 
            identification_number, 
            identification_state_invalid, 
            identification_number_invalid
        } = this.state;

        return (
            // <Wrapper>
                <Flex>
                    
                    <Box  w={3/4} mr={1}>                
                        <Select
                            id="id_control.id_state"
                            name="id_control.id_state"
                            onBlur={this.handleBlur}
                            onChange={this.handleChange} 
                            invalid={identification_state_invalid || this.props.state_invalid}
                            disabled={this.props.disabled}   
                            // value={identification_state}
                            value={this.props.value.id_state}
                        >
                        {this.props.options}
                        </Select>

                        <InputFeedback error={identification_state_invalid} />
            
                    </Box>
            
                    <Box w={1/2}>
                        <Input 
                            id="id_control.id_number" 
                            name="id_control.id_number"
                            onChange={this.validateNumber}
                            onBlur={this.handleBlur}
                            // value={identification_number} 
                            value={this.props.value.id_number}
                            invalid={identification_number_invalid} 
                        />

                        <InputFeedback error={identification_number_invalid} />
                    </Box>

                    <Label>{identification_state} ?? {identification_number}</Label>

                </Flex>
            // </Wrapper>
        )
    }

}


export default StateSelect;