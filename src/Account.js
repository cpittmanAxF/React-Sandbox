import React from 'react'
// import EmailInput from './EmailInput';
import Password from './Password'
import { Box, Flex, Input, Label, OrangeButton } from 'webapps-components';

import { withFormik, Form, Field } from 'formik';
import Yup from 'yup';

const Wrapper = Box.extend.attrs({
    p: 1,
}) ``

const Small = Label.extend`
    font-size: .65rem;
`

const formikEnhancer = withFormik({
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
            // .min(8, 'Password must be at least 8 characters')
            // .max(64, 'Password must not be longer than 64 characters')
            .required('Password is required!'),
        confirm_password: Yup.string().test('password-match', 'Passwords must match', function(confirm) { 
                return confirm === this.parent.password;
            })
            .required('Confirmation required')
            .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d$@$!#%&()*+,\-.:;<=>?`^[\]{}|~]{8,64}$/, 'Invalid password format'),
            // .min(8, 'Password must be at least 8 characters')
            // .max(64, 'Password must not be longer than 64 characters')
          password2: Yup.string()
            .required("Required field")
    }),

    mapPropsToValues: ({ account }) => ({
        ...account,
    }),
    
    handleSubmit: (payload, { setSubmitting }) => {
        alert(payload);
        setSubmitting(false);
    },


    displayName: 'Account Setup',
});

const InputFeedback = ({ error }) =>
    error ? (
        <Small className="input-feedback">{error}</Small>
    ) : null;

const DisplayFormikState = props =>
    <div style={{ margin: '1rem 0' }}>
        <h3 style={{ fontFamily: 'monospace' }} />
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






const AccountForm = props => {
    const {
        values,
        touched,
        errors,
        dirty,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        handleEmailValidation,
    } = props;


    return (
        <Wrapper bg="ivory">
            <Form>

                <Box>
                    <h3>Account Setup</h3>
                    <h5>All fields are required unless otherwise noted.</h5>
                </Box>

                <Flex>
                    <Box w={1 / 2} mr={2}>
                        <Label>First name</Label>
                        <Field id="first_name"  name="first_name"
                            // value={values.first_name}
                            // onChange={handleChange}
                            // onBlur={handleBlur}
                            // error={touched.first_name && errors.first_name}
                            // invalid={touched.first_name && errors.first_name}
                            component={Input}
                            // {...props}
                            data-test="first_name" />

                        <InputFeedback error={errors.first_name} />
                    </Box>

                    <Box w={1 / 2} ml={2} mr={2}>
                        <Label>Last name</Label>
                        <Input id="last_name"
                            value={values.last_name}
                            error={touched.last_name && errors.last_name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            invalid={touched.last_name && errors.last_name}
                            {...props}
                            data-test="last_name" />

                        <InputFeedback error={touched.last_name && errors.last_name} />
                    </Box>
                </Flex>

                <Flex mt={3}>
                    <Box w={1 / 2} mr={2}>
                        <Label>Email</Label>
                        <Small>This will also be your login username</Small>
                        <Field 
                            id="email" 
                            name="email"
                            value={values.email}
                            error={touched.email && errors.email}
                            invalid={touched.email && errors.email}

                            onChange={handleChange}
                            onBlur={handleBlur}
                            

                            // onChange={handleEmailValidation}
                            // onBlur={handleEmailValidation}
                            
                            // {...props}
                            component={Input}
                            data-test="email" />

                        <InputFeedback error={touched.email && errors.email} />

                    </Box>

                    <Box w={1 / 2} ml={2} mr={2}>
                        <Flex>
                            <Box w={1 / 2} mr={2}>
                                <Label mb='12px'>Create password</Label>
                                <Field 
                                    id="password" 
                                    name="password" 
                                    type="password"
                                    value={values.password}
                                    error={touched.password && errors.password}
                                    invalid={touched.password && errors.password}

                                    onChange={handleChange}
                                    onBlur={handleBlur}                                    
                                    
                                    component={Input}
                                    data-test="password"
                                    // handleChange={this.handlePasswordValidation} 
                                    />

                                <InputFeedback error={touched.password  && errors.password} />

                            </Box>

                            <Box w={1 / 2} ml={2}>
                                <Label mb='12px'>Confirm password</Label>
                                <Field 
                                    id="confirm_password" 
                                    name="confirm_password"
                                    type="password"
                                    value={values.confirm_password}
                                    error={touched.confirm_password && errors.confirm_password}
                                    invalid={touched.confirm_password && errors.confirm_password}

                                    onChange={handleChange}
                                    onBlur={handleBlur}                                    

                                    component={Input}
                                    // onChange={this.handleInputChange} 
                                    />

                                <InputFeedback error={touched.confirm_password  && errors.confirm_password} />
                            </Box>
                        </Flex>
                    </Box>
                </Flex>

                <Flex mt={3}>
                    <Box w={1 / 2} mr={2}>
                        <Label>Password Control</Label>
                        <Password
                            id="password2" 
                            name="password2"
                            defaultChecked="true"
                          />
                    </Box>

                </Flex>


                <Flex mt={3}>
                    <Box w={1 / 2} mr={2}>
                        <Label>Security question</Label>
                        <Input id="security_question" onChange={this.handleInputChange} />
                    </Box>

                    <Box w={1 / 2} ml={2} mr={2}>
                        <Label>Security answer</Label>
                        <Input id="security_question_answer" onChange={this.handleInputChange} />
                    </Box>
                </Flex>

                <Flex mt={3} justify={'flex-end'}>
                    <Box>
                        <OrangeButton disabled={isSubmitting}>Submit</OrangeButton>
                    </Box>
                </Flex>

                <DisplayFormikState {...props} />

            </Form>
        </Wrapper>

    )



}




const EnhancedAccountForm = formikEnhancer(AccountForm);



class Account extends React.Component {

    
    render() {


        return (

            <EnhancedAccountForm account={{ 
                first_name: '', 
                last_name: '', 
                email: '',
                password: '', 
                confirm_password: '',
                password2: ''
            }}  />

        )
    }

}

export default Account;