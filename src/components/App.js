import React from 'react';
import ConnectFour from './connect-four/game';

export default function App() {
  return (
    <>
      <ConnectFour playerNames={['Human', 'Computer']} columns={7} rows={6}/>
    </>
  );
}
