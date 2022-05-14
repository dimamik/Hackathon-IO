import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MapContext } from '../../context/Context';
import { csRoundParams } from '../../types';
import './HomeScreen.css';

function HomeScreen() {
  const [idInput, setIdInput] = useState('');
  const navigate = useNavigate();
  const { mapState, setParams, setRoomId } = useContext(MapContext);

  const submitJoinId = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      // Join the game here

      const socket = mapState.socket;
      const roomID = idInput.replaceAll(' ', '');
      setRoomId(roomID);
      socket?.emit('join', {
        roomID,
      });

      socket?.on('round', (ev: csRoundParams) => {
        // teraz routuj do mapy
        setParams(ev);
        navigate('/board');
      });
    }
  };

  return (
    <div className="home-screen-container">
      <div className="title-container">【~~　ＶａｐｏｒＷＩＥＴ　~~】</div>
      <Link className="no-decor" to="/configuration">
        <div className="create-room-button">
          <div className="create-room-inner">[１]　Ｃｒｅａｔｅ　ｒｏｏｍ</div>
        </div>
      </Link>
      <div className="room-id-hint-container">【Ｏｒ　ｉｎｓｅｒｔ　ｒｏｏｍ　ｉｄ】</div>
      <div className="room-id-container">
        <div className="input-spacer"></div>
        <input
          className="room-id-input"
          placeholder="Type here ..."
          onChange={event => {
            setIdInput(event.target.value);
          }}
          onKeyUp={submitJoinId}
          type="text"></input>
        <div className="input-reset-container">
          <a className="no-decor">
            <div className="input-reset"></div>
          </a>
        </div>
        <div className="input-spacer"></div>
      </div>
      <br />
      &nbsp;
      <br />
    </div>
  );
}

export default HomeScreen;
