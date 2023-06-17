import { useDispatch, useSelector } from 'react-redux'
import { Link as RouterLink } from 'react-router-dom'
import { Alert, Button, Grid, Link, TextField, Typography } from '@mui/material'

import { Google } from '@mui/icons-material'
import { AuthLayout } from '../layout/AuthLayout'
import { useForm } from '../../hooks/useForm'
import { checkingAuthentication,startGoogleSignIn, startLoginWithEmailPassword } from '../../store/auth/thunks'
import { useMemo } from 'react'
import { loginWithEmailPassword } from '../../firebase/providers'

export const LoginPage = () => {
  const dispatch = useDispatch();
  const {status,errorMessage} = useSelector(state=> state.auth)
  const isAuthenticating = useMemo(()=> status === 'checking', [status]);
  
  
  const {email, password, onInputChange} = useForm({
    email:'',
    password:'',
  });

  const onSubmit = (event) => {
    event.preventDefault();
    dispatch(startLoginWithEmailPassword({email,password}));
  }

  const onGoogleSignIn =()=> {
    dispatch(startGoogleSignIn(email,password));
  }

  return (
    <AuthLayout title='Login'>
      <form onSubmit={onSubmit} className='animate__animated animate__fadeIn animate__faster' >
          <Grid container> 
            <Grid item xs={12} sx={{mt:2}}>
              <TextField
                label='Email'
                type="email"
                placeholder='Enter Email'
                fullWidth 
                name="email"
                value={email}
                onChange={onInputChange}/>
            </Grid>

            <Grid item xs={12} sx={{mt:2}}>
              <TextField
                label='Password'
                type="password"
                placeholder='Enter Password'
                fullWidth 
                name="password"
                value={password}
                onChange={onInputChange}/>
            </Grid>

            <Grid container spacing={2} sx={{mb:2,mt:1}}>
              <Grid 
                item
                xs={12}
                display={ !! errorMessage ? '' : 'none'}>
                <Alert severity='error'>{errorMessage}</Alert>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button 
                  type='submit' 
                  variant='contained' 
                  fullWidth
                  disabled={isAuthenticating}>
                  Login
                </Button>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button 
                  variant='contained' 
                  fullWidth
                  onClick={onGoogleSignIn}
                  disabled={isAuthenticating}>
                  <Google />
                  <Typography sx={{ml:1}}>Google</Typography>
                </Button>
              </Grid>
            </Grid>
            <Grid container direction='row' justifyContent='end'>
              <Link component={RouterLink} color='inherit' to='/auth/registered'> 
                Create Account
              </Link>
            </Grid>
          </Grid>
      </form>
    </AuthLayout>

  )
}
