import React,{useState, useCallback, useEffect} from 'react';
import {Input, Icon} from 'antd';
import moment from 'moment';
import {useDispatch, useSelector} from 'react-redux';
moment.locale('ko');

import {LOAD_MAIN_MEMO_REQUEST, DELETE_MEMO_REQUEST} from '../reducers/memo';


const EditInput = ({memo}) => {

  const dispatch = useDispatch();

  const {memos} = useSelector(state => state.memo);
  const {me} = useSelector(state => state.user);

  const [edit, setEdit] = useState(false);
  const onToggleEdit = useCallback(() => {
    return setEdit(pre => !pre);
  },[]);



  const onDelete = (id) => () => {
    dispatch({
      type:DELETE_MEMO_REQUEST,
      data:id
    })
  }



  return (
    <div style={{display:'flex',justifyContent:"space-between", width:"100%"}}>
      <div style={{width:"70%"}}>
        {edit
          ?<Input value={memo.content} />
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
