import React from 'react'
import addNotification from 'react-push-notification'

export default function Test() {
    const clickToNotification = ()=>{
        addNotification({
            title:'ยินดีต้อนรับ',
            message:'555',
            duration:5000,
            native:true
        })
    }
  return (
    <div>
        <button onClick={()=> clickToNotification()} style={{margin:'100px'}} >
            click
        </button>
    </div>
  )
}
