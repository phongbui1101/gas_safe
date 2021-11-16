import React from 'react';
import Home from './component/home';
import { Connector } from 'mqtt-react-hooks';
import {KEY1, USERNAME1 } from './config/config';
function App() {
  return (
    <>
    <Connector brokerUrl="mqtt://io.adafruit.com"
      options={{
          username: USERNAME1,
          password: KEY1,
      }}>
      <Menu-bar/>{/* Tien Thanh */}
      <Login/> {/* Bao Minh */}
      <Home/>
      <Phone/> {/* Ngoc Minh */}
      <Profile/>{/* Trung Anh */}
      <History/>{/* Thanh Phong */}
      <User-manual/>{/* Thanh Phong */}
    </Connector>
    </>
  )
}
export default App;
