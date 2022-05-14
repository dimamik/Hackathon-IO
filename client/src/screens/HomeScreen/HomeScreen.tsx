import { Link } from 'react-router-dom';
import reset from '../../assets/images/reset.jpeg'
import './HomeScreen.css';

function HomeScreen() {
  const submitJoinId = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      // Join the game here
      console.log('Joining game...');
    }
  };

  return (
    <div className="home-screen-container">
      <div className="title-container">【~~　ＶａｐｏｒＷＩＥＴ　~~】</div>
      <Link className="no-decor" to="/configuration">
        <div className="create-room-button">
          <button type='button' className="create-room-inner">[１]　Ｃｒｅａｔｅ　ｒｏｏｍ</button>
        </div>
      </Link>
      <div className="room-id-hint-container">【Ｏｒ　ｉｎｓｅｒｔ　ｒｏｏｍ　ｉｄ】</div>
      <div className="room-id-container">
        <div className="input-spacer"></div>
        <input
          className="room-id-input"
          placeholder="T y p e   h e r e ..."
          onKeyUp={submitJoinId}
          type="text"></input>
        <div className="input-reset-container">
          <img src={reset} className='confirmImg'></img>
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
