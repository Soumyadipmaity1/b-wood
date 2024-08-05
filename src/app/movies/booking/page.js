import React from 'react'
import {getUser} from '../../../actions/user'
async function Booking() {
  const user=await getUser();
  return (
    <div>
    {user}
    </div>
  )
}

export default Booking
