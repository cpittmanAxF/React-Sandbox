import React from 'react'
import styled from 'styled-components'
import space from 'styled-system'
import { Flex, Box, Input, Checkbox, Label } from 'webapps-components'

const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d$@$!#%&()*+,\-.:;<=>?`^[\]{}|~]{8,64}$/;

const StyledLabel = Label.extend`
  cursor: pointer;
  font-size: 12px;
  vertical-align: middle;

  ${space};
`

const Wrapper = Flex.extend`
    flex-grow: 1;
    font-size: 12px;
`

class Password extends React.Component {
    state = {
        valid: true,
        reveal: false,
    }

    handleBlur = (event) => {
        console.log(event.target.value);
        let isValid = false;

        if (event.target.value) {
            isValid = regex.test(event.target.value);
        }

        this.setState(state => ({
            valid: isValid
        }));

        if (this.props.handleChange) {
            this.props.handleChange(event.target.value, isValid);
        }

    }

     handleChange = (event) => {
        console.log(event.target.checked);
        const checked = event.target.checked;
        console.log()
        this.setState(state => ({
            reveal: checked
        }));
    }

    componentDidMount = () => {
        if(this.props.defaultChecked){
            this.setState({reveal: true});
        }
    }

    render() {

        const { valid, reveal } = this.state;

        return (

            <Wrapper m={1} pb={2}>
                <Input pr={1} id={this.props.id} type={reveal ? 'text' : 'password'} onBlur={this.handleBlur} invalid={!valid} maxLength="64" />
                <StyledLabel ml={1} mr={1} mt={1} htmlFor="reveal_checkbox">
                    <Checkbox 
                        id={`${this.props.id}_reveal`}
                        defaultChecked={reveal}
                        onChange={this.handleChange} />

                        Check Change
                </StyledLabel>
            </Wrapper>

        )
    }

}

export default Password