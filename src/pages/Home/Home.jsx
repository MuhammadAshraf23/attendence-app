import React from 'react'
import { Link } from 'react-router-dom'
import './home.css'
const Home = () => {
    return (
        <>
            <div className="heading">
                <img src="https://www.saylaniwelfareusa.com/static/media/logo_saylaniwelfareusa.22bf709605809177256c.png" alt="" />
                <h1>ATTENDANCE MANAGEMENT SYSTEM</h1>
                <p className='para1'>Welcome to the No.1 Attendance Management System, where you can track your class's attendance without any issues!</p>
                <p className='para2'>Get ready to experience the No.1 Attendance Management System in the world!</p>
                <p className='para3'>Our Attendance Tracking is the No.1 in the world! You'll find no competitor of ours in the entire world!</p>

                <p className='getStarted'><Link className='link' to="/login">Click here to get started  </Link> </p>
            </div>
        </>
    )
}

export default Home