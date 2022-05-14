import React, { useContext } from 'react';
import { MapContext } from '../context/Context';
import './HomeScreen.css'

function HomeScreen() {
  return (
    <div className='home-screen-container'>
      <div className='title-container'>
      【~~　ＶａｐｏｒＷＩＥＴ　~~】
      </div>
      <a href='#' className='no-decor'>
        <div className='create-room-button'>
          <div className='create-room-inner'>
            [１]　Ｃｒｅａｔｅ　ｒｏｏｍ
          </div>
        </div>
      </a>
      <div className='room-id-hint-container'>
      【Ｏｒ　ｉｎｓｅｒｔ　ｒｏｏｍ　ｉｄ】
      </div>
      <div className='room-id-container'>
        <div className='input-spacer'>
        </div>
        <input className='room-id-input' placeholder='Type here ...' type='text'></input>
        <div className='input-reset-container'>
          <a className='no-decor'>
            <div className='input-reset'>

            </div>
          </a>
        </div>
        <div className='input-spacer'>
        </div>
      </div>
      <br/>
      &nbsp;
      <br/>
    </div>
  );
}

export default HomeScreen;
