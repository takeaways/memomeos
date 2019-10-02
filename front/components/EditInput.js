import React,{useState, useCallback, useEffect,  memo } from 'react';
import {Form,Input, Icon, notification} from 'antd';
import moment from 'moment';
import {useDispatch, useSelector} from 'react-redux';
moment.locale('ko');

import {shopNitification} from './Content';
import {LOAD_MAIN_MEMO_REQUEST, DELETE_MEMO_REQUEST, EDIT_MEMO_REQUEST} from '../reducers/memo';


const EditInput = ({memo}) => {
  const dispatch = useDispatch();

  const {memos, deletedMemo, editedMemo} = useSelector(state => state.memo);
  const {me} = useSelector(state => state.user);

  const [edit, setEdit] = useState(false);
  const [text, setText] = useState(memo.content);
  const onToggleEdit = useCallback(() => {
    return setEdit(pre => !pre);
  },[]);

  const onChangeText = e=>setText(e.target.value);
  const onSubmitEdit = useCallback( e=> {
    e.preventDefault();
    dispatch({
      type:EDIT_MEMO_REQUEST,
      data:{
        id:memo.id,
        text,
      }
    })
  },[memo && memo.id,text]);


  const onDelete = useCallback((id) => () => {
    dispatch({
      type:DELETE_MEMO_REQUEST,
      data:id
    })
  },[]);

  useEffect(()=>{
    if(editedMemo){
      setEdit(false);
    }
  },[editedMemo && editedMemo===true])


  return (
    <div style={{display:'flex',justifyContent:"space-between", width:"100%"}}>
      <div style={{width:"70%"}}>
        {edit
          ?(
            <Form onSubmit={onSubmitEdit}>
              <Input value={text} onChange={onChangeText}/>
            </Form>
          )
          :<span style={{fontSize:"1.3rem",float:'left'}}>{memo.content}</span>
        }
      </div>
      <div style={{width:"30%"}}>
        <Icon type="edit" title="수정" onClick={onToggleEdit} style={{cursor:"pointer", padding:"3px",fontSize:"1.3rem",verticalAlign:'middle'}}/>
        <Icon type="delete" title="삭제" onClick={onDelete(memo.id)} style={{cursor:"pointer",padding:"3px",fontSize:"1.3rem",verticalAlign:'middle'}}/>
        <div>( { moment(memo.updatedAt).format('MMMM Do YYYY, h:mm:ss a')  } )</div>
      </div>
    </div>
  )
}

export default EditInput
