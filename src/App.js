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
      <Home/>
    </Connector>
    </>
  )
}
export default App;
