import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import { Box, Flex } from 'webapps-components'
import TodoListContainer from './TodoListContainer'

// import Account from './Account'
import AccountSetup from './AccountSetup'

import PersonalInfoSetup from './PersonalInfo'

import StateSelect from './StateSelect'
import SubComponentTest from './SubComponentTest'

// import EmailInput from './EmailInput';
// import NumericInput from './NumericInput';
// import PhoneInput from './PhoneInput';
// import Password from './Password';
// import CngMaskedInput from './CngMaskedInput';
// import FormikNumericInput from './FormikNumericInput';
// import FA from 'react-fontawesome'

// const ssnMask = [/\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];


const state_options = [
  <option value="" key="">Select</option>,
  <option value="OH" key="1">Ohio</option>,
  <option value="IL" key="2">Illinois</option>,
]

class App extends Component {
  render() {
    return (
      <Box>
        <Flex mt={3} align="center" justify="center">
          <Box w="50vw">
            <TodoListContainer />
          </Box>
        </Flex>

        <Flex mt={3} align="center" justify="center">
          <Box w="75vw">
            <SubComponentTest />
          </Box>
        </Flex>


        {/* <Flex mt={3} align="center" justify="center">
          <Box w="50vw">
            <FormikNumericInput decimalPlaces="4" id="TestNum" value="12" />
          </Box>
        </Flex> */}

        <br />
        <br />
        <Flex mt={3} align="center" justify="center">
          <Box w="75vw">
            <AccountSetup />
          </Box>
        </Flex>

        <br />

        <br />
        <Flex mt={3} align="center" justify="center">
          <Box w="85vw">
            <PersonalInfoSetup />
          </Box>
        </Flex>

        <br />


        {/* <Flex mt={3} align="center" justify="center">
          <Box w="75vw">
            <Account />
          </Box>
        </Flex>

        <br />
        <br />
        <br />




        <br />
        <br />
        <Flex mt={1} align="center" justify="center">
          <Box w="50vw">
            <EmailInput id='emailInput' />
          </Box>
        </Flex>
        <br />
        <br />
        <Flex mt={1} align="center" justify="center">
          <Box w="50vw">
            <NumericInput type="tel" id='integerOnly' max="5" decimalPlaces="2" />
          </Box>
        </Flex>
        <br />

        <Flex mt={1} align="center" justify="center">
          <Box w="50vw">
            <PhoneInput type="id" />
            <PhoneInput type="phone" />
          </Box>
        </Flex>

        <br />

        <Flex mt={1} align="center" justify="center">
          <Box w="50vw">
            <CngMaskedInput />
          </Box>
        </Flex>

        <br />
        <br />
        <br /> */}

        {/* <Flex mt={3} align="center" justify="center">
          <Box w="50vw">
            <Password 
              id="password_testing" 
              name="password_testing" 
              fontSize="3" />

              <Password
                            id="password2" 
                            name="password2"
                          />
          </Box>
        </Flex> */}


      </Box>
    );
  }
}

export default App;
