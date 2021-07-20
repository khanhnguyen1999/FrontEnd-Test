import React, { useState } from 'react'
import {
  Grid,
  TextField,
  Button,
} from '@material-ui/core'
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

// redux 
import { useDispatch } from 'react-redux'
import { asyncHandleLogin } from 'actions/auth.action'
import { useToasts } from 'react-toast-notifications'
import { useHistory, Link } from 'react-router-dom'


import { Formik, Form, FormikProps } from 'formik'
import * as Yup from 'yup'

import useStyles from './style'

import { actLoginSuccess } from 'actions/auth.action';

import { authService } from 'services';

interface ISignUpForm {
  email: string,
}


interface IFormStatus {
  message: string
  type: string
}

interface IFormStatusProps {
  [key: string]: IFormStatus
}

const formStatusProps: IFormStatusProps = {
  success: {
    message: 'Signed up successfully.',
    type: 'success',
  },
  duplicate: {
    message: 'Email-id already exist. Please use different email-id.',
    type: 'error',
  },
  error: {
    message: 'Something went wrong. Please try again.',
    type: 'error',
  },
}
const Login: React.FunctionComponent = () => {
  const classes = useStyles()
  const { addToast } = useToasts()
  const history = useHistory()
  const [displayFormStatus, setDisplayFormStatus] = useState(false)
  const [formStatus, setFormStatus] = useState<IFormStatus>({
    message: '',
    type: '',
  })
  const dispatch = useDispatch()


  // useNotAuth()
  const onSubmit = async (values: ISignUpForm) => {
    const dataLogin = {
      email: values.email,
    }
    const res: any = await dispatch(asyncHandleLogin(dataLogin));

    if (!res.ok) {
      addToast(res.res, { appearance: 'error' })
      return;
    }
    authService.setSession(res.res)

    dispatch(actLoginSuccess(res.res))
  }

  return (
    <div className={classes.root}>
      <Formik
        initialValues={{
          email: '',
        }}
        onSubmit={(values: ISignUpForm) => {
          onSubmit(values)
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string()
            .email()
            .required('Enter valid email-id'),
        })}
      >
        {(props: FormikProps<ISignUpForm>) => {
          const {
            values,
            touched,
            errors,
            handleBlur,
            handleChange,
            isSubmitting,
          } = props
          return (
            <Container component="main" maxWidth="xs">
              <CssBaseline />
              <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Sign in
                </Typography>
                <Form>
                  <Grid
                    container
                    justify="space-around"
                    direction="row"
                  >
                    <Grid
                      item
                      lg={10}
                      md={10}
                      sm={10}
                      xs={10}
                      className={classes.textField}
                    >
                      <TextField
                        name="email"
                        id="email"
                        label="Email Login."
                        value={values.email}
                        type="text"
                        helperText={
                          errors.email && touched.email
                            ? errors.email
                            : 'Enter your email...'
                        }
                        error={
                          errors.email && touched.email
                            ? true
                            : false
                        }
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </Grid>
                    <Grid
                      item
                      lg={10}
                      md={10}
                      sm={10}
                      xs={10}
                      className={classes.submitButton}
                    >
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="secondary"
                      >
                        Submit
                      </Button>
                      {displayFormStatus && (
                        <div className="formStatus">
                          {formStatus.type === 'error' ? (
                            <p
                              className={
                                classes.errorMessage
                              }
                            >
                              {formStatus.message}
                            </p>
                          ) : formStatus.type ===
                            'success' ? (
                            <p
                              className={
                                classes.successMessage
                              }
                            >
                              {formStatus.message}
                            </p>
                          ) : null}
                        </div>
                      )}
                    </Grid>
                  </Grid>
                  <Grid item
                    className={
                      classes.signup
                    }>
                    <Link to="/register">
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Form>
              </div>
            </Container>
          )
        }}
      </Formik>
    </div>
  )
}

export default Login