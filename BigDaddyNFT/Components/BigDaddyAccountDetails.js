import React from 'react'
import * as fcl from "@onflow/fcl";
import { useBigDaddyContext } from '../Provider/BigDaddyContext.jsx';

export default function UserProfile() {
  const { 
    usdcBalance,
    flowBalance,
    user } = useBigDaddyContext();
    
    const handleLogOut = () => {
        fcl.unauthenticate();
      };

  return (

<div className="userProfile">
<p>Address: {user.addr}</p>
<p>FLOW Balance: {flowBalance}</p>
<p>USDC Balance: {usdcBalance}</p>
<button onClick={handleLogOut} className="bigdaddy-button">Log Out</button>
</div>
  )
}