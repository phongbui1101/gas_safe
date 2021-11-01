import React, { useEffect, useState } from 'react';
import { useSubscription } from 'mqtt-react-hooks';
import { FEED_1_NAME,FEED_2_NAME,FEED_3_NAME, FEED_4_NAME, USERNAME, KEY, USERNAME1, KEY1, } from '../config/config';
import { GetValue, PostValue,Value_control } from './funcitons';
import logo_safe from '../images/safe.gif'
import logo_danger from '../images/danger.gif'
import led_off from '../images/led-off.png'
import led_on from '../images/led-on.gif'

export default function Status() {
    const { message } = useSubscription([`${USERNAME1}/feeds/${FEED_1_NAME}/json`,]);
    const [valueFeed1, setmsgFeed1] = useState('');
    useEffect(() => {
        GetValue(USERNAME1, KEY1, FEED_1_NAME).then(function (result) {
            result = JSON.parse(result)["data"];
            setmsgFeed1(Number(result));
            if (result === '0') {
                PostValue(USERNAME, KEY, FEED_3_NAME, Value_control("1","LED","0"));
                PostValue(USERNAME, KEY, FEED_4_NAME, Value_control("2","SPEAKER","0"));
            } else {
                PostValue(USERNAME1, KEY1, FEED_2_NAME,Value_control("11","RELAY","1"));
                PostValue(USERNAME, KEY, FEED_3_NAME, Value_control("1","LED","1"));
                PostValue(USERNAME, KEY, FEED_4_NAME, Value_control("2","SPEAKER","1000"));
            }
        })
    }, [])
    let checkMessage = (msg) => {
        if (!msg) return;
        let value=(JSON.parse(JSON.parse(msg.message).last_value)["data"]);
        setmsgFeed1(Number(value));
        if (value === '0') {
            PostValue(USERNAME, KEY, FEED_3_NAME, Value_control("1","LED","0"));
            PostValue(USERNAME, KEY, FEED_4_NAME, Value_control("2","SPEAKER","0"));
        }
        else {
            PostValue(USERNAME1, KEY1, FEED_2_NAME,Value_control("11","RELAY","1"));
            PostValue(USERNAME, KEY, FEED_3_NAME, Value_control("1","LED","1"));
            PostValue(USERNAME, KEY, FEED_4_NAME, Value_control("2","SPEAKER","1000"));
        }
    }
    useEffect(() => {
        checkMessage(message);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [message])

    if (valueFeed1 === 0) {
        return (
            <div>
                <div className="notify">
                    <img src={logo_safe} alt="" className="logo" />
                    <div className="status safe" align="center">Nồng độ khí gas bình thường</div>
                    {/* <p>giá trị sensor: {valueFeed1}</p> */}
                </div>
                <div className="notify">
                    <img src={led_off} className="led" alt="" />
                </div>
            </div>
        )
    } else {
        return (
            <div>
                <div className="notify">
                    <img src={logo_danger} alt="" className="logo" />
                    <div className="status danger" align="center">Nồng độ khí gas quá cao!!!</div>
                    {/* <p>giá trị sensor: {valueFeed1}</p> */}
                </div>
                <div className="notify">
                    <img src={led_on} className="led" alt="" />
                </div>
            </div>
        )
    }
}
