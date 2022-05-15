import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MapContext } from '../../context/Context';
import { scRoundParams } from '../../types';
import './HomeScreen.css';
import reset from '../../assets/images/reset.jpeg';

function HomeScreen() {
  const [idInput, setIdInput] = useState('');
  const navigate = useNavigate();
  const { mapState, setParams, setRoomId, setShouldShowModal, setPlayerID } =
    useContext(MapContext);

  const submitJoinId = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      // Join the game here

      const socket = mapState.socket;
      const roomID = idInput.replaceAll(' ', '');
      setRoomId(roomID);
      socket?.emit('join', {
        roomID,
      });

      // drugi gracz dostaje socket
      socket?.on('round', (ev: scRoundParams) => {
        // teraz routuj do mapy
        setParams(ev, false);
        setPlayerID(1);
        // setShouldShowModal(false)
        navigate('/board');
      });
    }
  };

  return (
    <div className="home-screen-container">
      <div className="title-container">【~~　ＶａｐｏｒＷＩＥＴ　~~】</div>
      <Link className="no-decor" to="/configuration">
        <div className="create-room-button">
          <button type="button" className="create-room-inner">
            [１]　Ｃｒｅａｔｅ　ｒｏｏｍ
          </button>
        </div>
      </Link>
      <div className="room-id-hint-container">【Ｏｒ　ｉｎｓｅｒｔ　ｒｏｏｍ　ｉｄ】</div>
      <div className="room-id-container">
        <div className="input-spacer"></div>
        <input
          className="room-id-input"
          placeholder="T y p e   h e r e ..."
          onChange={event => {
            setIdInput(event.target.value);
          }}
          onKeyUp={submitJoinId}
          type="text"></input>
        <div className="input-reset-container">
          <img src={reset} className="confirmImg"></img>
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
