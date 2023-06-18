import { AddOutlined } from '@mui/icons-material'
import { IconButton} from '@mui/material'
import React from 'react'
import { TaskLayout } from '../layout/TaskLayout'
import { NothingSelectedView } from '../views/NothingSelectedView'
import { NoteView } from '../views/NoteView'
import { useDispatch, useSelector } from 'react-redux'
import { startNewNote } from '../../store/task/thunks'

export const HomePage = () => {

  const dispatch = useDispatch();
  const { isSaving,active } = useSelector(state => state.task)

  const onClickNewNote = () => {
    dispatch(startNewNote());
  }

  return (
    <>
      <TaskLayout>
        {
          (!!active)
          ? <NoteView />
          : <NothingSelectedView />
        }
        <IconButton
          size='large'
          sx={{
            color:'white',
            backgroundColor:'error.main',
            ':hover':{backgroundColor:'error.main',opacity:0.9},
            position:'fixed',
            right:50,
            bottom:50,
           
          }}
          disabled={isSaving}
          onClick={onClickNewNote}>
          <AddOutlined sx={{fontSize:30}} />
        </IconButton>
      </TaskLayout>
    </>
  )
}
