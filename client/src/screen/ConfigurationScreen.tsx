import React from 'react'
import './Configuration.css'

function ConfigurationScreen() {
  return (
    <div className='background'>
        <div className='settingsWindow'>
            <div className='bar'>
                <div className='barTitle'>
                    <p >
                        [１]　Ｃｏｎｆｉｇｕｒａｔｉｏｎ
                    </p>
                </div>
                <div className='closeIcon'>X</div>
            </div>
            <div className='internalWindow'>
                <div className='settingTitle'>
                    <p>【Ｍａｐ　ｓｉｚｅ】</p>
                </div>
                <div className='settingOptions'>
                    <p></p>
                    <p>asd</p>
                </div>
                <div className='settingTitle'>
                    <p>【Ｍａｐ　ｓｉｚｅ】</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ConfigurationScreen