import React from 'react'

function WaitingForPlayer() {
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
                    <div className='inputRow'>
                        <div className="settingTitle">
                            <p>【Your game code:】</p>
                        </div>
                        <div>code</div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default WaitingForPlayer;
