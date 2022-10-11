import React from 'react';
import {ReactComponent as LightIcon} from '../Assets/icon-sun.svg';
import {ReactComponent as DarkIcon} from '../Assets/icon-moon.svg';

function Header (props) {
    return (
        <header className='mode'>
            <div className='container'>
                <div className='fl'>
                    <h1>
                        T O D O
                    </h1>
                    <button style={{backgroundColor:'transparent', border: 'none', outline:'none'}} onClick={props.onClick}>
                        {props.modeSetted === 'light' ? <DarkIcon /> : <LightIcon />}
                    </button>
                </div>
                {props.children}
            </div>
        </header>
    );
}

export default Header;