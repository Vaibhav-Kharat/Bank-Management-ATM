import React, { useEffect, useState } from "react";
import axios from "axios";

const StudentTable = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingRow, setEditingRow] = useState(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8081/student/getAllStudents"
        );
        setStudents(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch students");
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  const handleEditToggle = (rollNo) => {
    setEditingRow(editingRow === rollNo ? null : rollNo);
  };

  const handleSave = async (rollNo) => {
    const studentToSave = students.find((student) => student.rollNo === rollNo);

    try {
      await Promise.all([
        axios.put(
          `http://localhost:8081/student/updateStudentName/${rollNo}/${studentToSave.name}`
        ),
        axios.put(
          `http://localhost:8081/student/updateStudentPercentage/${rollNo}/${studentToSave.percentage}`
        ),
        axios.put(
          `http://localhost:8081/student/updateStudentBranch/${rollNo}/${studentToSave.branch}`
        ),
      ]);
      setEditingRow(null);
      alert("Student data updated successfully!");
    } catch (err) {
      alert("Failed to update student data");
      console.error(err);
    }
  };

  const handleInputChange = (rollNo, field, value) => {
    setStudents((prevStudents) =>
      prevStudents.map((student) =>
        student.rollNo === rollNo ? { ...student, [field]: value } : student
      )
    );
  };

  const handleDelete = async (rollNo) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this student?"
    );
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:8081/student/delete/${rollNo}`);
        setStudents((prevStudents) =>
          prevStudents.filter((student) => student.rollNo !== rollNo)
        );
        alert("Student deleted successfully!");
      } catch (err) {
        alert("Failed to delete student");
        console.error(err);
      }
    }
  };

  if (loading) return <p>Loading students...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div style={{ margin: "40px auto", maxWidth: "800px" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        Students List
      </h2>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginBottom: "20px",
        }}
      >
        <thead>
          <tr style={{ backgroundColor: "#f4f4f4", textAlign: "left" }}>
            <th style={styles.th}>Roll No</th>
            <th style={styles.th}>Name</th>
            <th style={styles.th}>Percentage</th>
            <th style={styles.th}>Branch</th>
            <th style={styles.th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.rollNo} style={styles.tr}>
              <td style={styles.td}>{student.rollNo}</td>
              <td style={styles.td}>
                {editingRow === student.rollNo ? (
                  <input
                    type="text"
                    value={student.name}
                    onChange={(e) =>
                      handleInputChange(student.rollNo, "name", e.target.value)
                    }
                  />
                ) : (
                  student.name
                )}
              </td>
              <td style={styles.td}>
                {editingRow === student.rollNo ? (
                  <input
                    type="text"
                    value={student.percentage}
                    onChange={(e) =>
                      handleInputChange(
                        student.rollNo,
                        "percentage",
                        e.target.value
                      )
                    }
                  />
                ) : (
                  student.percentage
                )}
              </td>
              <td style={styles.td}>
                {editingRow === student.rollNo ? (
                  <input
                    type="text"
                    value={student.branch}
                    onChange={(e) =>
                      handleInputChange(
                        student.rollNo,
                        "branch",
                        e.target.value
                      )
                    }
                  />
                ) : (
                  student.branch
                )}
              </td>
              <td style={styles.td}>
                {editingRow === student.rollNo ? (
                  <button
                    style={styles.button}
                    onClick={() => handleSave(student.rollNo)}
                  >
                    Save
                  </button>
                ) : (
                  <button
                    style={styles.button}
                    onClick={() => handleEditToggle(student.rollNo)}
                  >
                    Edit
                  </button>
                )}
                <button
                  style={{ ...styles.button, backgroundColor: "#f44336" }}
                  onClick={() => handleDelete(student.rollNo)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  th: {
    padding: "10px",
    borderBottom: "1px solid #ddd",
  },
  td: {
    padding: "10px",
    borderBottom: "1px solid #ddd",
  },
  tr: {
    ":hover": {
      backgroundColor: "#f1f1f1",
    },
  },
  button: {
    marginRight: "10px",
    padding: "5px 10px",
    border: "none",
    borderRadius: "4px",
    backgroundColor: "#4CAF50",
    color: "white",
    cursor: "pointer",
  },
};

export default StudentTable;
