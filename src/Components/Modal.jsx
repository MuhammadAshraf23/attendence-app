import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { TextField } from "@mui/material";
import axios from "axios";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const BasicModal = ({ open, onClose, onModalData }) => {
  const [image, setImage] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    courseName: "",
  });

  console.log("formData", formData);
  console.log("image", image);

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleTextChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission

    try {
      const formDataObject = new FormData();
      formDataObject.append("firstName", formData.firstName);
      formDataObject.append("lastName", formData.lastName);
      formDataObject.append("email", formData.email);
      formDataObject.append("password", formData.password);
      formDataObject.append("courseName", formData.courseName);
      formDataObject.append("student-photo", image);

      const response = await axios.post(
        "https://attendance-app.adaptable.app/students/add-student",
        formDataObject
      );

      console.log("response.data", response.data);
      onModalData(response.data);

      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        courseName: "",
      });
      setImage(null);

      onClose();
    } catch (error) {
      console.error("Error adding student:", error);
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Add Student
        </Typography>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <input type="file" name="student-photo" onChange={handleFileChange} />
          <TextField
            label="First Name"
            variant="outlined"
            fullWidth
            margin="normal"
            name="firstName"
            value={formData.firstName}
            onChange={handleTextChange}
          />
          <TextField
            label="Last Name"
            variant="outlined"
            fullWidth
            margin="normal"
            name="lastName"
            value={formData.lastName}
            onChange={handleTextChange}
          />
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            name="email"
            value={formData.email}
            onChange={handleTextChange}
          />
          <TextField
            label="Password"
            variant="outlined"
            fullWidth
            margin="normal"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleTextChange}
          />
          <TextField
            label="Course Name"
            variant="outlined"
            fullWidth
            margin="normal"
            name="courseName"
            value={formData.courseName}
            onChange={handleTextChange}
          />

          <Button type="submit" variant="contained" color="primary">
            Add
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default BasicModal;
