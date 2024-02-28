import axios from 'axios';

export const loginCall = async (user, dispatch) => {
  dispatch({ type: 'LOGIN_START' });
  try {
    const response = await axios.post('http://localhost:8080/api/auth/login', user);
    console.log('response =>', response);
    dispatch({ type: 'LOGIN_SUCCESS', payload: response.data });
  } catch (error) {
    dispatch({ type: 'LOGIN_ERROR', payload: error });
  }
};