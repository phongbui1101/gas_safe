import React, {useEffect,useState } from 'react';
import { useSubscription } from 'mqtt-react-hooks';
import { FEED_2_NAME,USERNAME1,KEY1} from '../config/config';
import {GetValue,PostValue} from './funcitons';
import fan_off from '../images/fan-off.png'
import fan_on from '../images/fan-on.gif'
import button_off from '../images/button-off.png'
import button_on from '../images/button-on.png'

export default function Fan() {
    const {message} = useSubscription([`${USERNAME1}/feeds/${FEED_2_NAME}/json`,]);    
    const [valueFeed2, setmsgFeed2] = useState('');
    if (!sessionStorage.check_fan) GetValue(USERNAME1,KEY1,FEED_2_NAME).then(function(result) {
        setmsgFeed2(Number(result));
    })
    let checkMessage = (msg) => {
        if (!msg) return;
        sessionStorage.check_fan=1;
        let value = +JSON.parse(message.message)?.data.value;
        setmsgFeed2(value);
    }
    useEffect(() => {
        checkMessage(message);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [message])
    const turn_on = () => {
        PostValue(USERNAME1,KEY1,FEED_2_NAME,1);
    }    
    const turn_off = () => {
        PostValue(USERNAME1,KEY1,FEED_2_NAME,0);
    }  
    if (valueFeed2===0)
    return (
        <>
        <div className="notify">
            <img src={fan_off} alt="" className="fan"/>
            <img src={button_on} alt="" className="button effect_button" onClick={() => turn_on()}/>
        </div>
        </>
    )
    else 
    return (
        <>
        <div className="notify">
            <img src={fan_on} alt="" className="fan"/>
            <img src={button_off} alt="" className="button effect_button" onClick={() => turn_off()}/>
        </div>
        </>
    )
}
