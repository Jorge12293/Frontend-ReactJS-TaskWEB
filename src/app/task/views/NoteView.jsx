import { SaveAltOutlined } from '@mui/icons-material'
import { Button, Grid, TextField, Typography } from '@mui/material'
import React from 'react'
import { ImageGallery } from '../components/ImageGallery'

export const NoteView = () => {
  return (
    <Grid 
        container 
        direction='row' 
        justifyContent='space-between' 
        sx={{mb:1}}
        className='animate__animated animate__fadeIn animate__faster' >
        <Grid item>
            <Typography fontSize={39} fontWeight='light'>August 28, 2023</Typography>
        </Grid>
        <Grid item>
            <Button color='primary' sx={{padding:2}}>
                <SaveAltOutlined sx={{fontSize:30,mr:1}}/>
                Save
            </Button>
        </Grid>
        <Grid container>
            <TextField 
                type='text'
                variant='filled'
                fullWidth
                placeholder='Enter a title'
                label='title'
                sx={{border:'none',mb:1}}
            />
        </Grid>
        <Grid container>
            <TextField 
                type='text'
                variant='filled'
                fullWidth
                multiline
                placeholder='What happened today?'
                minRows={5}
            />
        </Grid>
        <ImageGallery />
    </Grid>
  )
}
