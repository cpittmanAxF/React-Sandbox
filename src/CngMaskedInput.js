import React from 'react';
import MaskedInput from 'react-maskedinput'
import InputMask from 'react-input-mask'


class CngMaskedInput extends React.Component {

    state = {
        valid: true,
    }

    static removeFormatting = (inputValue) => {
        if (inputValue) {
            return inputValue.replace(/[ ()-/_]/g, '');
        }
        return;
    }

    handleChange(event) {
        console.log(CngMaskedInput.removeFormatting(event.target.value));
    }


    render() {

        return (
            <div>
                <MaskedInput mask="111-11-1111" className="masked-input" onChange={this.handleChange} />
                <InputMask mask="999-99-9999" maskChar="*" className="masked-input" />
            </div>
        )
    }
}



export default CngMaskedInput;