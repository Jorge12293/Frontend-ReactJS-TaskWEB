import { SaveAltOutlined } from '@mui/icons-material'
import { Button, Grid, TextField, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { ImageGallery } from '../components/ImageGallery'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from '../../hooks/useForm'
import { useMemo } from 'react'
import { setActiveNote } from '../../store/task/taskSlice'
import { startSaveNote } from '../../store/task/thunks'

import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';

export const NoteView = () => {
  const dispatch = useDispatch();
  const {active: note, messageSaved ,isSaving} = useSelector(state => state.task);
  const {body,title,date,onInputChange,formState} = useForm(note);   

  const dateString = useMemo(()=>{
    const newDate = new Date(date);
    return newDate.toUTCString();
  },[date]); 

  useEffect(()=>{
    dispatch(setActiveNote(formState))
  },[formState])

  useEffect(()=>{
    if(messageSaved.length > 0 ){
      Swal.fire('Note Update',messageSaved,'success');
    }
  },[messageSaved])

  const onSaveNote = () =>{
    dispatch(startSaveNote());
  }


  return (
    <Grid 
        container 
        direction='row' 
        justifyContent='space-between' 
        sx={{mb:1}}
        className='animate__animated animate__fadeIn animate__faster' >
        <Grid item>
            <Typography fontSize={39} fontWeight='light'>{dateString}</Typography>
        </Grid>
        <Grid item>
            <Button 
                color='primary' 
                sx={{padding:2}}
                disabled={isSaving}
                onClick={onSaveNote}>
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
                name='title'
                value={title}
                onChange={onInputChange}
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
                name='body'
                value={body}
                onChange={onInputChange}
            />
        </Grid>
        <ImageGallery />
    </Grid>
  )
}
