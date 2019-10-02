import React,{useEffect, useRef} from 'react';
import styled from 'styled-components';
import {useDispatch, useSelector} from 'react-redux';
import Top from '../components/Top';
import Bottom from '../components/Bottom';
import Content from '../components/Content';
import {shopNitification} from '../components/Content';
import {LOAD_MAIN_MEMO_REQUEST} from '../reducers/memo';
const Home = () => {
  const dispatch = useDispatch();
  const {logoutMessage, me} = useSelector(state => state.user);
  useEffect(()=>{
    if(logoutMessage) shopNitification("success","로그아웃", "로그아웃 했습니다.")
  },[logoutMessage]);

  return (
    <div>
      <Top/>
      <Content/>
      <Bottom/>
    </div>
  )
}

Home.getInitialProps = (context) => {
  context.store.dispatch({
      type:LOAD_MAIN_MEMO_REQUEST,
  })
}


export default Home;
