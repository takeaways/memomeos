import React,{useEffect} from 'react';
import styled from 'styled-components';
import {useDispatch, useSelector} from 'react-redux';
import Top from '../components/Top';
import Bottom from '../components/Bottom';
import Content from '../components/Content';

import {LOAD_USER_REQUEST} from '../reducers/user';

const Home = () => {

  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch({
      type:LOAD_USER_REQUEST
    })
  },[]);


  return (
    <div>
      <Top/>
      <Content/>
      <Bottom/>
    </div>
  )
}

export default Home;
