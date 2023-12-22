import React, { useState,useEffect } from 'react';
import './student.css';
import BasicModal from '../../Components/Modal';
import { IoPersonAddSharp } from "react-icons/io5";
import {useParams} from "react-router-dom"
import axios from 'axios'
const StudentDetail = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showAttendance, setShowAttendance] = useState(false);
  const [studentsData, setStudentsData] = useState([]);
  const {id}=useParams
  console.log("stud---",studentsData)
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const handleModalData = (data) => {
    console.log("data---",data)
    // Update the state with the received data
    setStudentsData([...studentsData, data]);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8005/students/get-students');
        console.log(response.data)
        setStudentsData(response.data);
      } catch (error) {
        console.error('Error fetching student data:', error);
      }
    };
  
    fetchData();
  }, []);
  useEffect(() => {
    const fetchDataOfAttendance = async (id) => {
      try {
        const response = await axios.get(`http://localhost:8005/students/update-user-data/${id}`);
        console.log("Attendd",response.data)
        setShowAttendance(response.data);
      } catch (error) {
        console.error('Error fetching student data:', error);
      }
    };
  
    fetchDataOfAttendance();
  }, []);
  

  const showDetailsHeading = showAttendance ? 'Attendance' : 'Students';

  return (
    <div className='students'>
      <div className="slide">
        <div className='slide-img'>
        <img src="https://www.saylaniwelfareusa.com/static/media/logo_saylaniwelfareusa.22bf709605809177256c.png" alt="" />
        </div>
        <button onClick={() => setShowAttendance(false)}>Student</button>
        <button onClick={() => setShowAttendance(true)}>Attendance</button>
      </div>
      <div className="details">
        <div className="header">
          <h1>{showDetailsHeading} Details</h1>
          {!showAttendance &&
          <button onClick={openModal}>  <IoPersonAddSharp className='add-student-icon'/>  Add Students</button>}
        </div>
        <div className="student-description">
          <table>
            <thead>
              <tr>
                <th>id</th>
                <th>profile img</th>
                <th>Name</th>
                <th>{showAttendance ? 'Check In Time' : 'Course Name'}</th>
                <th>{showAttendance ? 'Check Out Time' : 'Password'}</th>
              </tr>
            </thead>
            <tbody>
            {studentsData.map((student,index) => {

           return(
              <tr key={index}>
                <td>{index+1}</td>
                <td><img src={`http://localhost:8005/${student.imageUrl}`} alt="Profile" /></td>
                <td>{student.firstName} {student.lastName}</td>
                <td>{showAttendance ? student.checkInTime : student.courseName}</td>
                <td>{showAttendance ? student.checkOutTime : student.password}</td>
              </tr>
              )
})}
            </tbody>
          </table>
        </div>
      </div>

      <BasicModal open={isModalOpen} onClose={closeModal} onModalData={handleModalData} />
    </div>
  );
};

export default StudentDetail;
