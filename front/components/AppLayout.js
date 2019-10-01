import React from 'react';
import {Menu} from 'antd';

const style = {
  position:"fixed",
  height:"100%",
  width:"100%",
  margin:0,
  padding:0,
  top:0,
  bottom:0,
  left:0,
  right:0,
  display:"flex",
  justifyContent:"center",
  alignItems:"center"
}

const AppLayout = ({children})=>{
  return(
    <div style={style}>
      {children}
    </div>
  )
}

export default AppLayout;
