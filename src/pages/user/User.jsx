import React, { useState, useEffect } from "react";
import "./user.css";
import axios from "axios";
import { useParams } from "react-router";
import Swal from 'sweetalert2'
const User = () => {
  const { id } = useParams();
  const [userData, setUserData] = useState({
    firstName: "",
    course: "",
    checkInTime: "",
    checkOutTime: "",
    isCheckedIn: false,
    showCongratulations: false,
    image: null,
  });
  console.log("userData", userData);

  const handleCheckIn = async () => {
    const checkInTime = new Date().toLocaleTimeString();
    try {
      await axios.post(
        `https://attendance-app.adaptable.app/students/update-user-data/${id}`,
        {
          checkInTime,
        }
      );
      setUserData({
        ...userData,
        isCheckedIn: true,
        checkInTime,
      });
    } catch (error) {
      console.error("Error updating check-in time:", error);
    }
  };
  const handleCheckOut = async () => {
    const checkOutTime = new Date().toLocaleTimeString();
    try {
      await axios.post(
        `https://attendance-app.adaptable.app/update-user-data/${id}`,
        {
          checkOutTime,
        }
      );
      setUserData((prevUserData) => ({
        ...prevUserData,
        isCheckedIn: false,
        checkOutTime,
         showCongratulations: true,
      }));
    } catch (error) {
      console.error("Error updating check-out time:", error);
    }
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setUserData({
      ...userData,
      image: file,
    });
  };

  const fetchSingleStudent = async (id) => {
    console.log("studentid--->", id);
    try {
      const response = await axios.get(
        `https://attendance-app.adaptable.app/students/get-single-student/${id}`
      );
      console.log("res--->", response.data);
      setUserData(response.data);
    } catch (error) {
      console.error("Error fetching single student data:", error);
    }
  };

  useEffect(() => {
    fetchSingleStudent(id);
  }, [id]);

  useEffect(() => {
    if (userData.showCongratulations) {
      Swal.fire("Congratulations!", "Your attendance is marked for today.", "success");
    }
  }, [userData.showCongratulations]);

  return (
    <div className="user-container">
      <div className="header">
        <h1>
          {userData.firstName} {userData.lastName}
        </h1>
        <img
          src={`https://attendance-app.adaptable.app/${userData.imageUrl}`}
          alt="User Avatar"
        />
      </div>
      <div className="details-User">
        <div className="detail-item">
          <h2>Id</h2>
          <p>{userData._id}</p>
        </div>
        <div className="detail-item">
          <h2>Course</h2>
          <p>{userData.courseName}</p>
        </div>

        <>
          <div className="detail-item check-in-time">
            <h2>Check In time</h2>
            <p>{userData.isCheckedIn ? userData.checkInTime : "_ _ _ _ _ _"}</p>
          </div>
          <div className="detail-item check-out-time">
            <h2>Check Out time</h2>
            <p>
              {userData.isCheckedIn ? userData.checkOutTime : "_ _ _ _ _ _"}
            </p>
          </div>
          {userData.isCheckedIn && (
            <input type="file" onChange={handleFileChange} />
          )}
          {!userData.isCheckedIn ? (
            <button
              className="check-in-btn"
              onClick={handleCheckIn}
              disabled={userData.isLoading}
            >
              Check In
            </button>
          ) : (
            <button
              className="check-in-btn"
              onClick={handleCheckOut}
              disabled={userData.isLoading}
            >
              Check Out
            </button>
          )}
        </>
      </div>
      {/* {userData.showCongratulations && (
     Swal.fire("Congratulations Your attendance are marked for Today!")
      )} */}
    </div>
  );
};

export default User;
