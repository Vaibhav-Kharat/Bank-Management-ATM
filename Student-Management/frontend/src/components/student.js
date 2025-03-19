import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import img from "../assests/back_img.png";

const StudentForm = () => {
  const [formData, setFormData] = useState({
    rollNo: "",
    name: "",
    percentage: "",
    branch: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8081/student/add", formData);
      alert("Student added successfully!");
      setFormData({
        rollNo: "",
        name: "",
        percentage: "",
        branch: "",
      });
    } catch (error) {
      console.error("Error adding student:", error);
      alert("Failed to add student. Please try again.");
    }
  };

  const navigateToTable = () => {
    navigate("/StudentTable");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage: `url(${img})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: "20px",
      }}
    >
      <div
        style={{
          maxWidth: "550px",
          padding: "20px 40px",
          animation: "fadeIn 1s ease-in-out",
        }}
      >
        <h2
          style={{
            fontSize: "28px",
            color: "#333",
            marginBottom: "25px",
            animation: "slideInDown 0.8s ease",
          }}
        >
          <u>ADD STUDENTS</u>
        </h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "20px" }}>
            <label htmlFor="rollNo" style={styles.label}>
              <b>Roll No:</b>
            </label>
            <input
              type="text"
              id="rollNo"
              name="rollNo"
              value={formData.rollNo}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>
          <div style={{ marginBottom: "20px" }}>
            <label htmlFor="name" style={styles.label}>
              <b>Name:</b>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>
          <div style={{ marginBottom: "20px" }}>
            <label htmlFor="percentage" style={styles.label}>
              <b>Percentage:</b>
            </label>
            <input
              type="number"
              id="percentage"
              name="percentage"
              value={formData.percentage}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>
          <div style={{ marginBottom: "20px" }}>
            <label htmlFor="branch" style={styles.label}>
              <b>Branch:</b>
            </label>
            <select
              id="branch"
              name="branch"
              value={formData.branch}
              onChange={handleChange}
              required
              style={styles.input}
            >
              <option value="">Select Branch</option>
              <option value="Computer Science">Computer Science</option>
              <option value="Mechanical Engineering">
                Mechanical Engineering
              </option>
              <option value="Electrical Engineering">
                Electrical Engineering
              </option>
              <option value="Civil Engineering">Civil Engineering</option>
              <option value="Chemical Engineering">Chemical Engineering</option>
              <option value="Aerospace Engineering">
                Aerospace Engineering
              </option>
            </select>
          </div>
          <div style={styles.buttonContainer}>
            <button type="submit" style={styles.button}>
              Submit
            </button>
            <button onClick={navigateToTable} style={styles.button}>
              View All Students
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const styles = {
  label: {
    display: "block",
    marginBottom: "10px",
    fontSize: "16px",
    color: "#000",
  },
  input: {
    width: "100%",
    padding: "14px",
    border: "1px solid #000",
    borderRadius: "4px",
    outline: "none",
    fontSize: "16px",
    transition: "border-color 0.3s, box-shadow 0.3s",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "20px",
  },
  button: {
    width: "48%",
    padding: "14px",
    backgroundColor: "#000",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    fontSize: "16px",
    cursor: "pointer",
    transition: "background-color 0.3s, transform 0.2s",
  },
};

export default StudentForm;
