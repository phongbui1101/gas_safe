import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import './style.css';

export default function Clock() {
    const[date,setDate]  = useState('');
    const[hours,setHours]  = useState('');
    const[minutes,setMinutes]  = useState('');
    const[seconds,setSeconds]  = useState('');
    function getTime(){
        var monthNames = [ "Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 6", "Tháng 6", "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12" ];
        var dayNames= ["Chủ nhật","Thứ Hai","Thứ Ba","Thứ Tư","Thứ Năm","Thứ Sáu","Thứ Bảy"];
        var newDate = new Date();
        newDate.setDate(newDate.getDate());
        setDate(dayNames[newDate.getDay()] + " " + newDate.getDate() + ' ' + monthNames[newDate.getMonth()] + ' ' + newDate.getFullYear());
        setHours((new Date().getHours() < 10 ? "0" : "" ) + new Date().getHours());
        setMinutes((new Date().getMinutes() < 10 ? "0" : "" ) + new Date().getMinutes());
        setSeconds((new Date().getSeconds() < 10 ? "0" : "" ) + new Date().getSeconds());
    }
    useEffect(() => {
        let clear_clock = setInterval(()=>{
            getTime()
        },1000);
        return ()=> clearInterval(clear_clock)
    }, [])
    return (
        <div className="clock mt-3">
        <div className="Date">{date}</div>
          <ul>
              <li id="hours">{hours}</li>
              <li id="point">:</li>
              <li id="min">{minutes}</li>
              <li id="point">:</li>
              <li id="sec">{seconds}</li>
          </ul>
        </div>
    )
}
