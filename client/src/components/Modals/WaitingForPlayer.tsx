type Props = { roomID: string | null };

function WaitingForPlayer({ roomID }: Props) {
  return (
    <div className="modalView">
      <div className="settingsWindow">
        <div className="bar">
          <div className="barTitle">
            <div>[１]　W a i t i n g</div>
          </div>
          <div className="closeIcon">X</div>
        </div>
        <div className="internalWindow">
          <div className="settingTitle hugeTitle">
            <p>【Waiting for opponent】</p>
          </div>
          <div className="inputRow">
            <div className="settingTitle">
              <p>【Your game code:】</p>
            </div>
            <div>{roomID}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WaitingForPlayer;
