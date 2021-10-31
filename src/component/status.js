import React, {useEffect,useState,useLayoutEffect } from 'react';
import { useSubscription } from 'mqtt-react-hooks';
import { FEED_1_NAME,FEED_2_NAME,FEED_3_NAME,FEED_4_NAME,USERNAME,KEY,USERNAME1,KEY1,} from '../config/config';
import {GetValue,PostValue} from './funcitons';
import logo_safe from '../images/safe.gif'
import logo_danger from '../images/danger.gif'
import led_off from '../images/led-off.png'
import led_on from '../images/led-on.gif'

export default function Status() {

    const {message} = useSubscription([`${USERNAME1}/feeds/${FEED_1_NAME}/json`,]);    
    const [valueFeed1, setmsgFeed1] = useState('');
    useLayoutEffect(()=>{ GetValue(USERNAME1,KEY1,FEED_1_NAME).then(function(result) {
        setmsgFeed1(Number(result));})},[])
    let checkMessage = (msg) => {
        if (!msg) return;
        sessionStorage.check_sensor=1;
        let value = +JSON.parse(message.message)?.data.value;
        setmsgFeed1(value);
        if (value===0){
            PostValue(USERNAME,KEY,FEED_2_NAME,0);
            PostValue(USERNAME,KEY,FEED_3_NAME,0);
            PostValue(USERNAME,KEY,FEED_4_NAME,0);
        }
        else{
            PostValue(USERNAME,KEY,FEED_2_NAME,1);
            PostValue(USERNAME,KEY,FEED_3_NAME,1);
            PostValue(USERNAME,KEY,FEED_4_NAME,1000);
        }
    }
    useEffect(() => {
        checkMessage(message);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [message])

    if (valueFeed1===0){
        return (
            <div>
            <div className="notify">
                <img src={logo_safe} alt="" className="logo"/>
            <div className="status safe" align="center">Nồng độ khí gas bình thường {valueFeed1}</div>
            </div>
                <div className="notify">
                <img src={led_off} className="led" alt=""/>
            </div>
            </div>
        )
    } else {
        return (
            <div>
            <div className="notify">
                <img src={logo_danger} alt="" className="logo"/>
                <div className="status danger" align="center">Nồng độ khí gas quá cao!!! {valueFeed1}</div>
            </div>
            <div className="notify">
                <img src={led_on} className="led" alt=""/>
            </div>
            </div>
        )
    }
}
