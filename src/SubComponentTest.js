import React from 'react'
import {withFormik, Form, Field} from 'formik'
import Yup from 'yup'

// import styled from 'styled-components'
import media from 'styled-media-query'

import { Box, Flex, Label, OrangeButton, baseStyles } from 'webapps-components';
import FormikSelect from './FormikSelect'
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

// const NoMarginLabel = Label.extend`
//     margin: 0;
// `

const Small = Label.extend`
    font-size: .65rem;
    color: grey;
    display: inline;
`

// const TopSmall = Label.extend`
//     /* margin-top: 8px;*/
//     margin-bottom: .55rem; 
//     font-size: .65rem;
//     color: grey;    
// `

// const TwoLineLabel = Label.extend`
//     margin-top: 1.5rem;
// `

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


const MainForm = ({
        values,
        touched,
        errors,
        isSubmitting,

        setFieldValue,
        setFieldTouched
    }) => {

    return (
        <Wrapper bg="gold">
            <Form>

                <Box>
                    <h3>TEST</h3>                    
                </Box>

                <Flex className="wrap-flex" direction={['column', 'row']} mt={2}>
                    <Box w={[1, 1 / 4]} mr={1}>
                        <Label color="black">Identification type </Label>

                        <Field
                            id="identification_type"  
                            name="identification_type"

                            component={FormikSelect}

                            // onChange={setFieldValue}
                            // onBlur={setFieldTouched}

                            options={identification_type_options}
                            
                            data-test="identification_type" 

                            value={values.identification_type}
                            invalid={touched.identification_type && errors.identification_type}
                            disabled={isSubmitting}                       
                        /> 
                            
                        <InputFeedback error={touched.identification_type && errors.identification_type} />
                    </Box>

                    <Box mt={3} w={1}>



                        <Field name="id_control"
                            component={StateSelect} 
                            options={state_options} 
                            value={values.id_control}

                            onChange={setFieldValue}
                            onBlue={setFieldTouched}

                            state_invalid={(touched.id_control && touched.id_control.id_state) && (errors.id_control && errors.id_control.id_state)}

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

                </Flex>

                <Flex mt={2}>
                    <OrangeButton disabled={isSubmitting}>Submit</OrangeButton>
                </Flex>

                <DisplayFormikState {...{values, errors, touched}} />

            </Form>

        </Wrapper>

    )
}

const FormikApp = withFormik({
    validationSchema: Yup.object().shape({
        identification_type: Yup.string()
            .required('Required!'),
        id_control: Yup.object().shape({
            id_state: Yup.string().required("Identification state is required!"),
            id_number: Yup.string().required("Identification number is required!"),
            }),
    }),

    mapPropsToValues: ({ information }) => ({
        ...information
    }), 
    
    handleSubmit: (values, { setErrors, resetForm, setSubmitting }) => {
        console.log(values);
        setTimeout(() => {
            if (values.id_control.id_state === "OH") {
              setErrors({ email: "That email is already taken" });
            } else {
              resetForm();
            }
            setSubmitting(false);
          }, 3000);
    },

})(MainForm)

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



  class SubComponentTest extends React.Component {

    render() {
        return (
            <FormikApp information={{
                    identification_type: '',
                    id_control: {
                        id_state: '',
                        id_number: '',
                    },
                }}  
            />
        )
    }
}




export default SubComponentTest