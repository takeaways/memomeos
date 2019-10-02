import Reat,{useEffect, useState, useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {List, notification, Icon, Input} from 'antd';


import LogInForm from './LogInForm';
import EditInput from './EditInput';

import {LOAD_MAIN_MEMO_REQUEST,DELETE_MEMO_REQUEST} from '../reducers/memo';
import {LOG_OUT_REQUEST} from '../reducers/user';


notification.config({
  duration:1
})

const style = {
  position:"fixed",
  top:"10%",
  bottom:"10%",
  left:0,
  right:0,
  width:"100%",
  overflow:"scroll",
  textAlign:"center"
}

export const shopNitification = (type, title, content) => {
  notification[type]({
    message:title,
    description:content
  });
};


const Content = () => {

  const dispatch = useDispatch();

  const {memos, deletedMemo, editedMemo} = useSelector(state => state.memo);
  const {me} = useSelector(state => state.user);

  const onLogOut = useCallback( () => {
    dispatch({
      type:LOG_OUT_REQUEST
    })
  },[])

  useEffect(()=>{
    if(me){
      dispatch({
        type:LOAD_MAIN_MEMO_REQUEST,
      })
    }
    if(deletedMemo){ shopNitification("success","메모삭제", "메모를 삭제했습니다.") }
    if(editedMemo){ shopNitification("success","메모수정", "메모를 수정했습니다.") }
  },[me && me.id, deletedMemo && deletedMemo === true , editedMemo && editedMemo===true]);




  return (
    <div style={style}>
      {me ? <List
        header={<div>{`${me && me.nickname}님의 기록~`} <Icon title="로그아웃" type="unlock" style={{fontSize:'1.3rem',cursor:"pointer"}} onClick={onLogOut}/> </div>}
        footer={<div>{`남은 할 일 ${memos.length}`}</div>}
        size="small"
        bordered
        dataSource={memos}
        renderItem={ (item, i)  => <List.Item key={item.id}><EditInput memo={item}/> </List.Item>}
        /> : <LogInForm/>}
    </div>
  )
}

export default Content
