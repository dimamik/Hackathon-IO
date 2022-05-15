import { MapContext } from '../../context/Context';
import React, { useContext } from 'react';

function Turn() {
  const { mapState } = useContext(MapContext);

  if(mapState.isMyMove){
    return <div className='hugeTitle'>【Ｙｏｕｒ　ｔｕｒｎ】</div>;  
  }
  else{
    return <div className='hugeTitle'>【Ｅｎｅｍｙ　ｔｕｒｎ】</div>;
  }
}

export default Turn;
