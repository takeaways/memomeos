import Reat from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {List, notification, Icon} from 'antd';

import LogInForm from './LogInForm';


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

  const {memos} = useSelector(state => state.memo);
  const {me} = useSelector(state => state.user);



  return (
    <div style={style}>
      {me ? <List
        header={<div>홍길동님의 부지런하게 일하세요~</div>}
        footer={<div>XXX XXX XX XX</div>}
        size="small"
        bordered
        dataSource={memos}
        renderItem={ (item, i)  => <List.Item key={item}>
          <div style={{display:'flex',justifyContent:"space-between", width:"100%"}}>
            <div>
              <span style={{fontSize:"1.3rem"}}>{i+1} ) {item}</span>
            </div>
            <div>
              <Icon type="edit" title="수정" style={{cursor:"pointer", padding:"3px",fontSize:"1.3rem",verticalAlign:'middle'}}/>
              <Icon type="delete" title="삭제" style={{cursor:"pointer",padding:"3px",fontSize:"1.3rem",verticalAlign:'middle'}}/>
            </div>
          </div>
        </List.Item>}
      /> : <LogInForm/>}
    </div>
  )
}

export default Content
