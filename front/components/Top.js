import Reat, {useState, useCallback} from 'react';
import {Form,Input} from 'antd';

import {useDispatch, useSelector} from 'react-redux';

import {ADD_MEMO_REQUEST} from '../reducers/memo'

import {shopNitification} from './Content';

const style = {
  position:"fixed",
  top:0,
  left:0,
  right:0,
  height:"10%",
  padding:"30px 128px",
}

const Top = () => {

  const dispatch = useDispatch();
  const {me} = useSelector(state => state.user);
  const [text, setText] = useState("");
  const onChangeText = useCallback( e => setText(e.target.value),[]);
  const onSubmit = useCallback( e => {
    e.preventDefault();
    dispatch({
      type:ADD_MEMO_REQUEST,
      data:text,
    })
    setText("");
    shopNitification("info","등록성공", "할 일을 합시다")
  },[text]);

  return (
    <div style={style}>
      <Form onSubmit={onSubmit}>
        { me && <Input placeholder="xxx xxx xx xxx!" value={text} onChange={onChangeText}/>}
      </Form>
    </div>
  )
}

export default Top
