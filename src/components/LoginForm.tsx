import {  useSelector } from 'react-redux';
import { Alert, Button, CircularProgress, TextField } from '@mui/material';
import React from 'react';
import { RootState } from '../store';
import { loginUserThunk } from '../store/authSlice';
import { useAppDispatch } from '../hooks';

export const LoginForm = () => {
  const dispatch = useAppDispatch();
  const { isLoading, error } = useSelector((state: RootState) => state.auth);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    const form = e.target as HTMLFormElement
    e.preventDefault();
    const username = form.username.value
    const password = form.password.value
    
    try {
    dispatch(loginUserThunk({username, password}));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={e => handleSubmit(e)}>
      <TextField name="username" label="Username" required />
      <TextField name="password" label="Password" type="password" required />
      <Button type="submit" disabled={isLoading}>
        {isLoading ? <CircularProgress size={24} /> : 'Login'}
      </Button>
      {error && <Alert severity="error">{error}</Alert>}
    </form>
  );
};