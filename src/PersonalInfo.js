import React from 'react'
import {withFormik, Form, Field} from 'formik'
import Yup from 'yup'

// import styled from 'styled-components'
import media from 'styled-media-query'

import { Box, Flex, Label, OrangeButton, baseStyles } from 'webapps-components';
import FormikInput from './FormikInput';
import FormikNumericInput from './FormikNumericInput';
import FormikSelect from './FormikSelect'
import FormikMaskedInput from './FormikMaskedInput'

import StateSelect from './StateSelect'


baseStyles();

const Wrapper = Box.extend.attrs({
    p: 1,
}) `

    ${media.lessThan('medium')`
        flex-direction: column;
    `};

    ${media.between('medium', 'large')`
        flex-direction: row;
    `};

`

const NoMarginLabel = Label.extend`
    margin: 0;
`

const Small = Label.extend`
    font-size: .65rem;
    color: grey;
    display: inline;
`

const TopSmall = Label.extend`
    /* margin-top: 8px;*/
    margin-bottom: .55rem; 
    font-size: .65rem;
    color: grey;    
`

const TwoLineLabel = Label.extend`
    margin-top: 1.5rem;
`

const InputFeedback = ({ error }) =>
    error ? (
        <Small className="input-feedback">{error}</Small>
    ) : null;


const DisplayFormikState = props =>
    <div style={{ margin: '1rem 0' }}>        
        <pre
            style={{
                background: '#f6f8fa',
                fontSize: '.65rem',
                padding: '.5rem',
            }}
        >
            <strong>props</strong> = {JSON.stringify(props, null, 2)}
        </pre>
    </div>;





const PersonalInfoForm = ({
        values,
        touched,
        errors,
        isSubmitting,

        setFieldValue,
        setFieldTouched
    }) => {

    return (
        <Wrapper bg="silver">
            <Form>

                <Box>
                    <h3>Personal Information</h3>
                    <h5>All fields are required unless otherwise noted.</h5>
                </Box>

                <Flex className="wrap-flex" direction={['column', 'row']}>
                    <Box w={[1,1 / 2]} mr={1}>
                        <Label color="black">
                            Street Address 
                            <Small ml={1}>P.O. boxes can't be accepted</Small> 
                        </Label>
                        
                        <FormikInput 
                            id="address"  
                            name="address___"
                            placeholder="Address"

                            onChange={setFieldValue}
                            onBlur={setFieldTouched}
                            
                            data-test="address" 

                            value={values.address}                            
                            invalid={touched.address && errors.address}                        
                            disabled={isSubmitting}
                        />
                            
                        <InputFeedback error={touched.address && errors.address} />
                    </Box>


                    <Box w={[1, 1 / 4]} mr={1}>
                        <Label color="black">
                            Apt. or Suite #   
                            <Small ml={1}>(Optional)</Small>
                        </Label>

                        <Field 
                            id="address2"
                            

                            component={FormikInput}
                            name="address2"

                            data-test="last_name" 
                            
                            value={values.address2}
                            invalid={touched.address2 && errors.address2}
                            disabled={isSubmitting}
                        />

                        <InputFeedback error={touched.address2 && errors.address2} />
                    </Box>

                    <Box w={[1, 1 / 4]}>
                        <Label color="black">City</Label>
                        <Field 
                            id="city"
                            name="city"
                            placeholder="City"

                            component={FormikInput}

                            data-test="city" 
                                
                            value={values.city}
                            invalid={touched.city && errors.city}
                            disabled={isSubmitting}
                        />

                        <InputFeedback error={touched.city && errors.city} />
                    </Box>

                </Flex>


                <Flex className="wrap-flex" direction={['column', 'row']} mt={2}>

                    <Box w={[1, 1 / 4]} mr={1}>
                        <TwoLineLabel color="black">Zip code</TwoLineLabel>
                        
                        <Field 
                            id="zip_code"  
                            name="zip_code"
                            placeholder="Zip"

                            component={FormikNumericInput}
                            onChange={setFieldValue}
                            onBlur={setFieldTouched}

                            max="5"
                            
                            data-test="zip_code" 

                            value={values.zip_code}                            
                            invalid={touched.zip_code && errors.zip_code}                        
                            disabled={isSubmitting}
                        />
                            
                        <InputFeedback error={touched.zip_code && errors.zip_code} />
                    </Box>


                    <Box w={[1, 1 / 4]} mr={1}>
                        <TwoLineLabel color="black">
                            State of residence  
                        </TwoLineLabel>

                        <Field w={1/2}
                            id="state_of_residence"
                            name="state_of_residence"
                            disabled="true"

                            component={FormikInput}                             
                            data-test="state_of_residence" 
                                
                            value={values.state_of_residence}
                            invalid={touched.state_of_residence && errors.state_of_residence}
                        />

                        <InputFeedback error={touched.state_of_residence && errors.state_of_residence} />

                    </Box>

                    <Box w={[1, 1 / 4]} mr={1} >
                        <TwoLineLabel color="black">Own or Rent</TwoLineLabel>
                        <Field 
                            id="ownership_type"  
                            name="ownership_type"
                        
                            options={ownership_options}
                            component={FormikSelect}
                            onChange={setFieldValue}
                            onBlur={setFieldTouched}
                            
                            data-test="ownership_type" 

                            value={values.ownership_type}
                            invalid={touched.ownership_type && errors.ownership_type}
                            disabled={isSubmitting}                       
                         />
                            
                       <InputFeedback error={touched.ownership_type && errors.ownership_type} />
                    </Box>

                    <Box w={[1, 1 / 4]}>
                        <NoMarginLabel color="black"> Time at current residence</NoMarginLabel>
                    
                        <Flex>
                            <Box w={[1, 1 / 2]} mr={1} >
                                <TopSmall mt={1}>Years</TopSmall>
                                <Field
                                    id="years_at_address"  
                                    name="years_at_address"

                                    component={FormikNumericInput}
                                    onChange={setFieldValue}
                                    onBlur={setFieldTouched}
                                    
                                    data-test="years_at_address" 
                                    max="3"

                                    value={values.years_at_address}
                                    invalid={touched.years_at_address && errors.years_at_address}
                                    disabled={isSubmitting}                       
                                /> 
                                    
                            <InputFeedback error={touched.years_at_address && errors.years_at_address} />
                            </Box>

                            <Box w={[1, 1 / 2]} >
                                <TopSmall mt={1}>Months (0-11)</TopSmall>
                                <Field
                                    id="months_at_address"  
                                    name="months_at_address"

                                    component={FormikNumericInput}
                                    onChange={setFieldValue}
                                    onBlur={setFieldTouched}
                                    
                                    data-test="months_at_address" 
                                    max="2"

                                    value={values.months_at_address}
                                    invalid={touched.months_at_address && errors.months_at_address}
                                    disabled={isSubmitting}                       
                                /> 
                                    
                                <InputFeedback error={touched.months_at_address && errors.months_at_address} />
                            </Box>



                        </Flex>
                     </Box>

                </Flex>
          
                
                <Flex className="wrap-flex" direction={['column', 'row']} mt={2}>
                    <Box w={[1, 1 / 2]} mr={1}>
                        <Label color="black">Primary phone &Dagger; </Label>

                        <Field
                            id="primary_phone"  
                            name="primary_phone"

                            component={FormikMaskedInput}
                            type="phone"
                            onChange={setFieldValue}
                            onBlur={setFieldTouched}
                            
                            data-test="primary_phone" 

                            value={values.primary_phone}
                            invalid={touched.primary_phone && errors.primary_phone}
                            disabled={isSubmitting}                       
                        /> 
                            
                        <InputFeedback error={touched.primary_phone && errors.primary_phone} />
                    </Box>

                    <Box w={[1, 1 / 2]}>
                        <Label color="black">Secondary phone
                            <Small ml={1}>(Optional)</Small>
                        </Label>

                        <Field
                            id="secondary_phone"  
                            name="secondary_phone"

                            component={FormikMaskedInput}
                            type="phone"
                            onChange={setFieldValue}
                            onBlur={setFieldTouched}
                            
                            data-test="secondary_phone" 

                            value={values.secondary_phone}
                            invalid={touched.secondary_phone && errors.secondary_phone}
                            disabled={isSubmitting}                       
                        /> 
                            
                        <InputFeedback error={touched.secondary_phone && errors.secondary_phone} />
                    </Box>
                </Flex>


                <Flex className="wrap-flex" direction={['column', 'row']} mt={2}>
                    <Box w={[1, 1 / 4]} mr={1}>
                        <Label color="black">Identification type </Label>

                        <Field
                            id="identification_type"  
                            name="identification_type"

                            component={FormikSelect}
                            onChange={setFieldValue}
                            onBlur={setFieldTouched}

                            options={identification_type_options}
                            
                            data-test="identification_type" 

                            value={values.identification_type}
                            invalid={touched.identification_type && errors.identification_type}
                            disabled={isSubmitting}                       
                        /> 
                            
                        <InputFeedback error={touched.identification_type && errors.identification_type} />
                    </Box>

                    <Box mt={2} w={1}>



                        <Field name="id_control"
                            component={StateSelect} 
                            options={state_options} 
                            value={values.id_control}

                            onChange={setFieldValue}
                            onBlue={setFieldTouched}
                            // onChange={(result) => {
                            // //    console.log('CHANGE', result) 
                            //     // setFieldValue();
                            //     console.log(values.id_control.id_state, result.identification_state);
                            
                            // }}
                            // onChange={this.stateSelect}

                            // identification_number={values.id_control.id_number} 
                            // identification_state={values.id_control.id_state}
                        />

                    </Box>

                    {/* <Box w={[1, 1 / 4]} mr={1}>
                        <Label color="black">Identification state</Label>

                        <Field
                            id="identification_state"  
                            name="identification_state"

                            // changeMe={handleStateChange}
                            component={FormikSelect}
                            // handleChange={this.handleStateChange}
                            // //onChange={setFieldValue}
                            // onBlur={setFieldTouched}

                            type="state_selection"
                            parent={this}

                            options={state_options}
                            
                            data-test="identification_state" 

                            value={values.identification_state}
                            invalid={touched.identification_state && errors.identification_state}
                            disabled={isSubmitting}                       
                        />

                        <InputFeedback error={touched.identification_state && errors.identification_state} />
                    </Box>

                    <Box w={[1, 1 / 2]}>
                        <Label color="black">Identification number</Label>

                        <Field
                            id="identification_number"  
                            name="identification_number"

                            component={FormikInput}
                            onChange={setFieldValue}
                            onBlur={setFieldTouched}
                            
                            data-test="identification_number" 

                            value={values.identification_number}
                            invalid={touched.identification_number && errors.identification_number}
                            disabled={isSubmitting}                       
                        /> 
                            
                        <InputFeedback error={touched.identification_number && errors.identification_number} />
                    </Box> */}
                </Flex>

                <Flex className="wrap-flex" direction={['column', 'row']} mt={2}>
                    <Box w={[1, 1 / 4]} mr={1}>
                        <Label color="black">Social Security number </Label>

                        <Field
                            id="social"  
                            name="social"

                            type="id"
                            component={FormikMaskedInput}
                            onChange={setFieldValue}
                            onBlur={setFieldTouched}
                            
                            data-test="social" 

                            value={values.social}
                            invalid={touched.social && errors.social}
                            disabled={isSubmitting}                       
                        /> 
                            
                        <InputFeedback error={touched.social && errors.social} />
                    </Box>

                    <Box w={[1, 1 / 4]} mr={1}>
                        <Label color="black">Confirm SSN</Label>

                        <Field
                            id="confirm_social"  
                            name="confirm_social"

                            type="id"
                            component={FormikMaskedInput}
                            onChange={setFieldValue}
                            onBlur={setFieldTouched}
                            
                            data-test="confirm_social" 

                            value={values.confirm_social}
                            invalid={touched.confirm_social && errors.confirm_social}
                            disabled={isSubmitting}                       
                        /> 
                            
                        <InputFeedback error={touched.confirm_social && errors.confirm_social} />
                    </Box>

                    <Box w={[1, 1 / 4]}>
                        <Label color="black">Date of birth
                            <Small ml={1}>(mm/dd/yyyy)</Small>
                        </Label>

                        <Field
                            id="date_of_birth"  
                            name="date_of_birth"

                            component={FormikMaskedInput}
                            type="date"
                            onChange={setFieldValue}
                            onBlur={setFieldTouched}
                            
                            data-test="date_of_birth" 

                            value={values.date_of_birth}
                            invalid={touched.date_of_birth && errors.date_of_birth}
                            disabled={isSubmitting}                       
                        /> 
                            
                        <InputFeedback error={touched.date_of_birth && errors.date_of_birth} />
                    </Box>
                </Flex>

                {/* <Flex>
                    <Box w={1}>


                        <StateSelect options={state_options} value={values.id_control}
                            // identification_number={values.id_control.id_number} 
                            // identification_state={values.id_control.id_state}
                        />

                    </Box>
                </Flex> */}


                <Flex mt={2}>
                    <OrangeButton disabled={isSubmitting}>Submit</OrangeButton>
                </Flex>

                <DisplayFormikState {...{values, errors, touched}} />

            </Form>

            <Box>
                <Flex className="wrap-flex" direction={['column', 'row']}>
                    <Box w={[1, 1/2]} border="solid 1px">Top/Left</Box>
                    <Box w={[1, 1/2]} border="solid 1px">Bottom/Right</Box>
                </Flex>
            </Box>

        </Wrapper>

    )
}

// const handleStateChange  = event => {
//     console.log(PersonalInfoForm.values);    
// }

// const stateSelect = event => {
//     console.log(event.idState);
// }


const FormikApp = withFormik({
    validationSchema: Yup.object().shape({
        address: Yup.string()
            .min(2, "Name must be longer than that")
            .required('Address is required!'),
        address2: Yup.string(),
        city: Yup.string()
            .max(35, 'City cannot be longer than 35 characters')            
            .required('City is required!'),
        zip_code: Yup.string()
            .min(5, 'Invalid zip code format')
            .max(5, 'Invalid zip code format')
            .required('Zip code is required'),
        ownership_type: Yup.string()
            .required('Own or Rent is required!'),
        state_of_residence: Yup.string(),
            //.required('State is required'),
        years_at_address: Yup.number()
            .min(0, 'Months must be a positive number'),                 
        months_at_address: Yup.number()
            .min(0, 'Months must be between 0 and 11')
            .max(11, 'Months must be between 0 and 11'),
        primary_phone: Yup.string()
            .required('Required'),
        secondary_phone: Yup.string(),
        identification_type: Yup.string()
            .required('Required!'),
        // identification_state: Yup.string()
        //     .required('Required!'),
        // identification_number: Yup.string()
        //     .required('Required!'),
        id_control: Yup.object().shape({
            id_state: Yup.string().required("Identification state is required!"),
            id_number: Yup.string().required("Identification number is required!"),
            }),
        social: Yup.string()
            .required('Social Security number is required!'),
        confirm_social: Yup.string().test('social-match', 'Socials must match', function(confirm) { 
                return confirm === this.parent.social;
            })
            .required('Confirmation required!'),

    }),

    mapPropsToValues: ({ personalInfo, options }) => ({
        ...personalInfo, ...options
    }), 
    
    handleSubmit: (values, { setErrors, resetForm, setSubmitting }) => {
        console.log(values);
        setTimeout(() => {
            if (values.email === "andrew@test.io") {
              setErrors({ email: "That email is already taken" });
            } else {
              resetForm();
            }
            setSubmitting(false);
          }, 3000);
    },

    // validate: (values, props) => {
    //     console.log(values)
    // },

})(PersonalInfoForm)

const ownership_options = [
    <option value="" key="">Select</option>,
    <option value="O" key="1">Own</option>,
    <option value="R" key="2">Rent?</option>,
]
const identification_type_options = [
    <option value="" key="">Select</option>,
    <option value="D" key="1">Driver's license</option>,
    <option value="S" key="2">State-issued ID</option>,
]
  const state_options = [
    <option value="" key="">Select</option>,
    <option value="OH" key="1">Ohio</option>,
    <option value="IL" key="2">Illinois</option>,
]



  class PersonalInfoSetup extends React.Component {
    
    // state = {
    //     idPattern: '',
    // }

    // stateSelect = event => {
    //     console.log(event.id_State);
    // }

    render() {
        // const {idPattern} = this.state       

        return (
            <FormikApp personalInfo={{
                    address: '', 
                    address2: '', 
                    city:'',
                    zip_code: '',
                    state_of_residence: '',
                    ownership_type: '',
                    primary_phone: '',
                    secondary_phone: '',
                    identification_type: '',
                    identification_state: '',
                    identification_number: '',
                    social: '',
                    confirm_social: '',
                    id_control: {
                        id_state: '',
                        id_number: '',
                    },
                }}  
            />
        )
    }
}




export default PersonalInfoSetup