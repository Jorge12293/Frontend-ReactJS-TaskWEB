import React from 'react'
import { AppRouter } from './app/router/AppRouter';
import { AppTheme } from './app/theme/AppTheme';

export const TaskApp = () =>{
    return (
        <>
            <AppTheme>
                <AppRouter/>
            </AppTheme>
        </>
    );
}