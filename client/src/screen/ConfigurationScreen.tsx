import React from 'react'
import './Configuration.css'

function ConfigurationScreen() {
    return (
        <form>
            <div className='background'>
                <div className='settingsWindow'>
                    <div className='bar'>
                        <div className='barTitle'>
                            <p >
                                [１]　Configuration
                            </p>
                        </div>
                        <div className='closeIcon'>X</div>
                    </div>
                    <div className='internalWindow'>
                        <div className='settingTitle'>
                            <p>【Map size】</p>
                        </div>
                        <div className='verticalSettingOptions'>
                            <div className='row'>
                                <p>Width</p><input type='text'></input>
                            </div>
                            <div className='row'>
                                <p>Height</p><input type='text'></input>
                            </div>


                        </div>
                        <div className='settingTitle'>
                            <p>【Parameters】</p>
                        </div>
                        <div className='verticalSettingOptions'>
                            <div className='row'>
                                <p>Max points</p>
                                <input type='text'>
                                </input>
                            </div>
                            <div className='row'>
                                <p>Time for move</p>
                                <input type='text'></input>
                            </div>
                        </div>
                        <div className='buttonContainer'>
                            <input type='submit' className='button'></input>
                        </div>
                    </div>

                </div>
            </div>
        </form>
    )
}

export default ConfigurationScreen