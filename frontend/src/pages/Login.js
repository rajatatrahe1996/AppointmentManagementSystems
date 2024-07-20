import React from 'react'
import {Form, Input, message } from 'antd';
import '../styles/RegisterStyle.css'
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { showLoading, hiddenLoading } from '../redux/features/alertSlice';
export default function Register() {

const navigate = useNavigate();
const dispatch = useDispatch();

  const onFinishHandler = async(value)=>{
    try{
      dispatch(showLoading());
      const res = await axios.post('/api/v1/user/login',value);
      dispatch(hiddenLoading());
      if(res.data.success){
        localStorage.setItem("token",res.data.token);
        message.success("Login Successfully");
        navigate("/")
      }
    }catch(error){
      dispatch(hiddenLoading());
      console.log(error)
      message.error('Something went wrong')
    }
  }
  return (
    <>
    <div className='form-container'>
      <Form layout='vertical' onFinish={onFinishHandler} className='register-form'>
        <h3 className='text-center'>Login Page</h3>
        <Form.Item label="Email" name="email">
          <Input type='email' required/>
        </Form.Item>
        <Form.Item label="Password" name="password">
          <Input type='password' required/>
        </Form.Item>
        <Link to="/register" className='m-4'>Not a User Register Here</Link>
        <button className='btn btn-primary' type='submit'>Login</button>
      </Form>
    </div>
    </>
  )
}
