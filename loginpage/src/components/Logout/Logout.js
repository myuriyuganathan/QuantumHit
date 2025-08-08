import React from 'react'
import { Link } from 'react-router-dom'


const Logout = () => {
  return (
    <div className='bg-purple-300 h-screen w-full flex items-center justify-center'>
        <div className='text-3xl font-bold '>
            Logged Out Successfully<br></br>
            <Link to ="/" className="text-white hover:underline flex items-center justify-center">Back to loginpage</Link>
        </div>
    </div>
  )
}

export default Logout