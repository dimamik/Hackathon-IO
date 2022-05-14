import { MapContext } from '../../context/Context';
import React, { useContext } from 'react';


function Turn() {
  const {mapState} = useContext(MapContext);

  if(mapState.isMyMove){
    return <div>【Ｙｏｕｒ　ｔurn】</div>;  
  }
  else{
    return <div>【Ｅｎｅｍｙ　ｔｕｒｎ】</div>;
  }
}

export default Turn;
