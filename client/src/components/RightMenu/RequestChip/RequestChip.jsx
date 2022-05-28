import React from 'react'
import './RequestChip.css'


const RequestChip = () => {
  return (
    <div className='RequestChip__main'>
        <div className='RequestChip__user'>
            <div className='RequestChip__user-image'></div>
            <div className='RequestChip__user-name'><b>Ouday Fatteh Ben Spider</b> wants to add you to friends.</div>
        </div>
        <div className='RequestChip__buttons'>
         <div id="RequestChip_buttons-first" className='RequestChip__buttons-both'>Accept</div>
         <div id="RequestChip_buttons-second" className='RequestChip__buttons-both'>Decline</div>
        </div>
    </div>
  )
}

export default RequestChip