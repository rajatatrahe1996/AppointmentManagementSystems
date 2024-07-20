import React from 'react'
import {Form, Input, message } from 'antd';
import '../styles/RegisterStyle.css'
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios'

export default function Register() {
const navigate = useNavigate();

  const onFinishHandler = async(value)=>{
     try{
      const res = await axios.post('/api/v1/user/register',value)
      if(res.data.success){
        alert("success")
        message.success("Register Successfully")
        navigate('/login')
      }else{
        alert("failed")
        message.error(res.data.message)
      } 
     }catch(error){

     }
  }
  return (
    <>
    <div className='form-container'>
      <Form layout='vertical' onFinish={onFinishHandler} className='register-form'>
        <h3 className='text-center'>Registraion Form</h3>
        <Form.Item label="Name" name="name">
          <Input type='text' required/>
        </Form.Item>
        <Form.Item label="Email" name="email">
          <Input type='email' required/>
        </Form.Item>
        <Form.Item label="Password" name="password">
          <Input type='password' required/>
        </Form.Item>
        <Link to="/login" className='m-4'>Already User Login Here</Link>
        <button className='btn btn-primary' type='submit'>Register</button>
      </Form>
    </div>
    </>
  )
}
