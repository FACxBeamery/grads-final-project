/* eslint-disable react/prop-types */
import React from 'react';
import { Redirect } from 'react-router-dom';

import LoadingPage from '../../pages/LoadingPage'

const LoadingPageOrRedirect = ({location, checkingIfAuthed}) => checkingIfAuthed 
      ? <LoadingPage />
      : (
        <Redirect
          push 
          to={{
            pathname: "/admin/login",
            // eslint-disable-next-line react/prop-types
            state: { from: location }
          }} 
        />
      )


export default LoadingPageOrRedirect;