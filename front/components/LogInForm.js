import React, {useState, useCallback} from 'react';
import {Form, Input, Button, Alert} from 'antd'
import {useDispatch, useSelector} from 'react-redux';
import {shopNitification} from './Content';

import {LOG_IN_REQUEST} from '../reducers/user';


const divStyle = {
  backgroundColor:"#e3e3e3",
  textAlign:"center",
  height:"100%",
  justifySelf:"center",
  alignSelf:"center"
}

const marginStyle = {
  marginBottom:"3px",
  width:"51%"
}




const LogInForm = () => {

  const dispatch = useDispatch();

  const onLogin = useCallback( e => {
    e.preventDefault();
    shopNitification("info","로그인 하기","잠시만 기다려 주세요~");
    dispatch({
      type:LOG_IN_REQUEST
    })
  },[]);

  const onSignup = useCallback( e => {
    e.preventDefault();
    shopNitification("info","회원가입 하기","축하합니다~")
  },[])




  return(
    <div style={divStyle}>
      <Alert style={{width:"48%", marginBottom:"44px"}} message="로그인" type="info" />
      <Form onSubmit={onLogin} >
        <Input style={marginStyle} placeholder="아이디를 입력하세요."/>
        <Input style={marginStyle} placeholder="비밀번호를 입력하세요."/>
        <Button htmlType="submit" type="primary" style={{...marginStyle, marginBottom:"64px"}}>로그인</Button>
      </Form>
      <Alert style={{width:"48%", marginBottom:"44px"}} message="회원가입" type="success" />
      <Form onSubmit={onSignup} >
        <Input style={marginStyle} placeholder="아이디"/>
        <Input style={marginStyle} placeholder="닉네임"/>
        <Input style={marginStyle} placeholder="비밀번호"/>
        <Input style={marginStyle} placeholder="비밀번호 확인"/>
        <Button htmlType="submit" type="primary" style={{...marginStyle, marginBottom:"44px"}}>회원가입</Button>
      </Form>
    </div>
  )
}

export default LogInForm
