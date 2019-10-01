import React, {useState, useCallback, useEffect} from 'react';
import {Form, Input, Button, Alert, notification} from 'antd'
import {useDispatch, useSelector} from 'react-redux';
import {shopNitification} from './Content';

import {LOG_IN_REQUEST, SIGN_UP_REQUEST} from '../reducers/user';


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
  const {signupError,signedup, isSigningUp, loginError, isLoggingIn} = useSelector(state => state.user);



  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const onChangeId = useCallback(e=>setId(e.target.value),[]);
  const onChangePassword = useCallback(e=>setPassword(e.target.value),[]);

  const onLogin = useCallback( e => {
    e.preventDefault();
    if(!id.trim() || !password.trim()){
      return shopNitification("error","로그인 실패","빈 값이 있습니다.");
    }
    dispatch({
      type:LOG_IN_REQUEST,
      data:{userId:id, password}
    })
  },[id, password]);




  const [sId, setSid] = useState('');
  const [nickname, setNickname] = useState('');
  const [sPassword, setSpassword] = useState('');
  const [sPasswordCheck, setSpasswordCheck] = useState('');
  const onSChangeId = useCallback(e=>setSid(e.target.value),[]);
  const onSChangeNickname = useCallback(e=>setNickname(e.target.value),[]);
  const onSChangePassowrd = useCallback(e=>setSpassword(e.target.value),[]);
  const onSChangePasswordCheck = useCallback(e=>setSpasswordCheck(e.target.value),[]);
  const onSignup = useCallback( e => {
    e.preventDefault();
    if(!sId.trim() || !nickname.trim() || !sPassword.trim() || !sPasswordCheck.trim()){
      return shopNitification("error","회원가입 실패","빈 값이 있습니다.");
    }
    if(sPassword.trim() !== sPasswordCheck.trim()){
      return shopNitification("error","회원가입 실패","비밀번호가 일치하지 않습니다.");
    }
    dispatch({
      type:SIGN_UP_REQUEST,
      data:{userId:sId,nickname,password:sPassword}
    });

  },[sId,nickname,sPassword,sPasswordCheck]);



  useEffect(()=>{
    if(signupError){
      setSid('');
      setNickname('');
      setSpassword('');
      setSpasswordCheck('');
      return shopNitification("error","회원가입 실패",signupError);
    }
    if(signedup){
      setSid('');
      setNickname('');
      setSpassword('');
      setSpasswordCheck('');
      return shopNitification("success","회원가입 성공","회원가입을 축하드립니다~");
    }
    if(loginError){
      setId('');
      setPassword('');
      return shopNitification("error","로그인 실패",loginError);
    }
  },[signupError, notification, signedup, loginError])


  return(
    <div style={divStyle}>
      <Alert style={{width:"48%", marginBottom:"44px"}} message="로그인" type="info" />
      <Form onSubmit={onLogin} >
        <Input style={marginStyle} placeholder="아이디를 입력하세요." value={id} onChange={onChangeId}/>
        <Input style={marginStyle} type="password" placeholder="비밀번호를 입력하세요." value={password} onChange={onChangePassword}/>
        <Button htmlType="submit" type="primary" style={{...marginStyle, marginBottom:"64px"}} loading={isLoggingIn}>로그인</Button>
      </Form>
      <Alert style={{width:"48%", marginBottom:"44px"}} message="회원가입" type="success" />
      <Form onSubmit={onSignup} >
        <Input style={marginStyle} placeholder="아이디" value={sId} onChange={onSChangeId} />
        <Input style={marginStyle} placeholder="닉네임" value={nickname} onChange={onSChangeNickname} />
        <Input style={marginStyle} placeholder="비밀번호" value={sPassword} onChange={onSChangePassowrd} />
        <Input style={marginStyle} placeholder="비밀번호 확인" value={sPasswordCheck} onChange={onSChangePasswordCheck} />
        <Button htmlType="submit" type="primary" style={{...marginStyle, marginBottom:"44px"}} loading={isSigningUp}>회원가입</Button>
      </Form>
    </div>
  )
}

export default LogInForm
