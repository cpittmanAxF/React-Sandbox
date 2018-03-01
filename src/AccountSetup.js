import React from 'react'
import {withFormik, Form, Field} from 'formik'
import Yup from 'yup'

import { Box, Flex, Label, OrangeButton } from 'webapps-components';
import FormikInput from './FormikInput';
// import FormikNumericInput from './FormikNumericInput';
import FormikSelect from './FormikSelect'

const Wrapper = Box.extend.attrs({
    p: 1,
}) ``


const Small = Label.extend`
    font-size: .65rem;
    margin: 0;
`

const TwoLineLabel = Label.extend`
    margin-top: 1rem;
`

const InputFeedback = ({ error }) =>
    error ? (
        <Small className="input-feedback">{error}</Small>
    ) : null;

const DisplayFormikState = props =>
    <div style={{ margin: '1rem 0' }}>
        {/* <h3 style={{ fontFamily: 'monospace' }}>Properties</h3> */}
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



const AccountForm = ({
        values,
        touched,
        errors,
        isSubmitting,

        setFieldValue,
        setFieldTouched
    }) => {

    return (
        <Wrapper bg="tan">
            <Form>

                <Box>
                    <h3>Account Setup</h3>
                    <h5>All fields are required unless otherwise noted.</h5>
                </Box>

                <Flex direction={['column', 'row']}>
                    <Box w={[1, 1 / 2]} mr={2}>
                        <Label>First name</Label>
                        <FormikInput 
                            id="first_name"  
                            name="first_name"
                            placeholder="First name"

                            onChange={setFieldValue}
                            onBlur={setFieldTouched}
                            
                            data-test="first_name" 

                            value={values.first_name}                            
                            invalid={touched.first_name && errors.first_name}                        
                            disabled={isSubmitting}
                        />
                            
                        <InputFeedback error={touched.first_name && errors.first_name} />
                    </Box>

                    <Box w={1 / 2} ml={2} mr={2}>
                        <Label>Last name</Label>
                        <Field 
                            id="last_name"
                            name="last_name"
                            placeholder="Last name"

                            component={FormikInput}

                            data-test="last_name" 
                            
                            value={values.last_name}
                            invalid={touched.last_name && errors.last_name}
                            disabled={isSubmitting}
                        />

                        <InputFeedback error={touched.last_name && errors.last_name} />
                    </Box>
                </Flex>

                <Flex mt={2}>
                    <Box w={1 / 2} mr={2}>
                        <Label>Email</Label>
                        <Small>This will also be your login username</Small>
                        <Field 
                            id="email" 
                            name="email"
                            placeholder="Email address"

                            component={FormikInput}

                            data-test="email" 

                            value={values.email}
                            invalid={touched.email && errors.email}
                            disabled={isSubmitting}                            
                        />

                        <InputFeedback error={touched.email && errors.email} />

                    </Box>

                    <Box w={1 / 2} ml={2} mr={2}>
                        <Flex>
                            <Box w={1 / 2} mr={2}>
                                <TwoLineLabel>Create password</TwoLineLabel>
                                <Field 
                                    id="password" 
                                    name="password" 
                                    type="password"
                                    placeholder="Password"
                                    
                                    component={FormikInput}

                                    data-test="password"
                                    
                                    value={values.password}
                                    invalid={touched.password && errors.password} 
                                    disabled={isSubmitting}
                                />

                                <InputFeedback error={touched.password  && errors.password} />

                            </Box>

                            <Box w={1 / 2} ml={2}>
                                <TwoLineLabel>Confirm password</TwoLineLabel>
                                <Field 
                                    id="confirm_password" 
                                    name="confirm_password"
                                    type="password"
                                    placeholder="Confirm password"

                                    component={FormikInput}

                                    data-test="confirm_password"

                                    value={values.confirm_password}
                                    invalid={touched.confirm_password && errors.confirm_password}
                                    disabled={isSubmitting}
                                />

                                <InputFeedback error={touched.confirm_password  && errors.confirm_password} />
                            </Box>
                        </Flex>
                    </Box>
                </Flex>

                <Flex mt={2}>
                    <Box w={1 / 2} mr={2}>
                        <Label>Security question</Label>
                        <FormikSelect 
                            id="security_question"  
                            name="security_question"
                            placeholder="Select"

                            fontSize="14px"
                            options={options}

                            onChange={setFieldValue}
                            onBlur={setFieldTouched}
                            
                            data-test="security_question" 

                            value={values.security_question}
                            invalid={touched.security_question && errors.security_question}
                            disabled={isSubmitting}                       
                        >
                            
                        </FormikSelect>
                            
                        <InputFeedback error={touched.security_question && errors.security_question} />
                    </Box>

                    <Box w={1 / 2} ml={2} mr={2}>
                        <Label>Security answer</Label>
                        <Field 
                            id="security_question_answer"
                            name="security_question_answer"

                            placeholder="Answer"
                            data-test="security_question_answer" 
                            
                            component={FormikInput}
                            value={values.security_question_answer}
                            invalid={touched.security_question_answer && errors.security_question_answer}
                            disabled={isSubmitting}
                        />

                        <InputFeedback error={touched.security_question_answer && errors.security_question_answer} />
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
        first_name: Yup.string()
            .min(2, "Name must be longer than that")
            .required('First name is required.'),
        last_name: Yup.string()
            .min(2, "Name must be longer than that")
            .required('Last name is required.'),
        
        email: Yup.string()
            .email('Invalid email address')
            .required('Email is required!'),
        password: Yup.string()
            .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d$@$!#%&()*+,\-.:;<=>?`^[\]{}|~]{8,64}$/, 'Invalid password format')
            .required('Password is required!'),
        confirm_password: Yup.string().test('password-match', 'Passwords must match', function(confirm) { 
                return confirm === this.parent.password;
            })
            .required('Confirmation required')
            .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d$@$!#%&()*+,\-.:;<=>?`^[\]{}|~]{8,64}$/, 'Invalid password format'),
        security_question: Yup.number()
            .required("Security question is required!"),
        security_question_answer: Yup.string()
            .required("Security question answer is required!")
            .min(2, "You answer need to be longer than that."),
    }),

    mapPropsToValues: ({ account, options }) => ({
        ...account, ...options
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

    // displayName: 'Account Setup',
})(AccountForm)



const options = [
    <option value="" key="">Select</option>,
    <option value="1" key="1">What was the name of your first pet?</option>,
    <option value="2" key="2">Who was your first kiss?</option>,
    <option value="3" key="3">What is your dream job?</option>,
    <option value="4" key="4">Where did you meet your spouse?</option>,
    <option value="5" key="5">What is your sibling's nickname?</option>
  ]

class AccountSetup extends React.Component {
    

    render() {
        return (
            <FormikApp account={{
                    first_name: '', 
                    last_name: '', 
                    email:'', 
                    password: '', 
                    confirm_password: '', 
                    security_question: '',
                    security_question_answer: '',                    
                }}/>
        )
    }
}




export default AccountSetup