import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateBankAccountForm = () => {
  const [formData, setFormData] = useState({
    accountHolderName: "",
    accountType: "",
    branchCode: "",
    branchName: "", // Added branchName field
    address: "",
    balance: "",
    pin: "",
  });

  const [accountNumber, setAccountNumber] = useState("");
  const [accountDetails, setAccountDetails] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8081/atm_account/create", formData);
      alert("Bank account created successfully!");
      setFormData({
        accountHolderName: "",
        accountType: "",
        branchCode: "",
        branchName: "", // Reset branchName field
        address: "",
        balance: "",
        pin: "",
      });
    } catch (error) {
      console.error("Error creating account:", error);
      alert("Failed to create account. Please try again.");
    }
  };

  const fetchAccountDetails = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8081/atm_account/${accountNumber}`
      );
      setAccountDetails(response.data);
      setShowModal(false);
    } catch (error) {
      console.error("Error fetching account details:", error);
      alert(
        "Failed to fetch account details. Please check the account number."
      );
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#fff",
        padding: "20px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          maxWidth: "600px",
          padding: "40px 50px",
          backgroundColor: "#000",
          borderRadius: "12px",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)",
          animation: "fadeIn 1s ease-in-out",
          transition: "transform 0.4s ease, box-shadow 0.3s ease",
        }}
      >
        <h2
          style={{
            fontSize: "32px",
            color: "#fff",
            marginBottom: "30px",
            textAlign: "center",
            textDecoration: "underline",
            animation: "slideInDown 1s ease",
          }}
        >
          Create Your Bank Account
        </h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "20px", position: "relative" }}>
            <label htmlFor="accountHolderName" style={styles.label}>
              Account Holder's Name:
            </label>
            <input
              type="text"
              id="accountHolderName"
              name="accountHolderName"
              value={formData.accountHolderName}
              onChange={handleChange}
              required
              style={styles.input}
            />
            <span style={styles.icon}>👤</span>
          </div>
          <div style={{ marginBottom: "20px", position: "relative" }}>
            <label htmlFor="accountType" style={styles.label}>
              Account Type:
            </label>
            <select
              id="accountType"
              name="accountType"
              value={formData.accountType}
              onChange={handleChange}
              required
              style={styles.input}
            >
              <option value="">Select Account Type</option>
              <option value="Savings">Savings Account</option>
              <option value="Current">Current Account</option>
            </select>
            <span style={styles.icon}>💳</span>
          </div>
          <div style={{ marginBottom: "20px", position: "relative" }}>
            <label htmlFor="branchCode" style={styles.label}>
              Branch Code:
            </label>
            <input
              type="text"
              id="branchCode"
              name="branchCode"
              value={formData.branchCode}
              onChange={handleChange}
              required
              style={styles.input}
            />
            <span style={styles.icon}>🏦</span>
          </div>
          <div style={{ marginBottom: "20px", position: "relative" }}>
            <label htmlFor="branchName" style={styles.label}>
              Branch Name:
            </label>
            <input
              type="text"
              id="branchName"
              name="branchName"
              value={formData.branchName}
              onChange={handleChange}
              required
              style={styles.input}
            />
            <span style={styles.icon}>📍</span>
          </div>
          <div style={{ marginBottom: "20px", position: "relative" }}>
            <label htmlFor="address" style={styles.label}>
              Address:
            </label>
            <textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              style={styles.input}
            />
            <span style={styles.icon}>📍</span>
          </div>
          <div style={{ marginBottom: "20px", position: "relative" }}>
            <label htmlFor="balance" style={styles.label}>
              Balance:
            </label>
            <input
              type="number"
              id="balance"
              name="balance"
              value={formData.balance}
              onChange={handleChange}
              required
              style={styles.input}
            />
            <span style={styles.icon}>💰</span>
          </div>
          <div style={{ marginBottom: "20px", position: "relative" }}>
            <label htmlFor="pin" style={styles.label}>
              PIN:
            </label>
            <input
              type="password"
              id="pin"
              name="pin"
              value={formData.pin}
              onChange={handleChange}
              required
              style={styles.input}
            />
            <span style={styles.icon}>🔒</span>
          </div>
          <div style={styles.buttonContainer}>
            <button type="submit" style={styles.button}>
              <b>Create Account</b>
            </button>
            <button
              type="button"
              style={styles.secondaryButton}
              onClick={() => setShowModal(true)}
            >
              <b>Show My Account</b>
            </button>
          </div>
        </form>
        {/* Modal for Account Number */}
        {showModal && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              style={{
                backgroundColor: "#fff",
                padding: "30px",
                borderRadius: "10px",
                textAlign: "center",
              }}
            >
              <h3>Enter Your Account Number</h3>
              <input
                type="text"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
                placeholder="Account Number"
                style={{ padding: "10px", margin: "10px 0", width: "80%" }}
              />
              <div>
                <button
                  onClick={fetchAccountDetails}
                  style={{
                    padding: "10px 20px",
                    marginRight: "10px",
                    backgroundColor: "#28a745",
                    color: "#fff",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  Submit
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  style={{
                    padding: "10px 20px",
                    backgroundColor: "#dc3545",
                    color: "#fff",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Display Account Details */}
        {accountDetails && (
          <div
            style={{
              marginTop: "20px",
              backgroundColor: "#fff",
              padding: "20px",
              borderRadius: "8px",
            }}
          >
            <h3>Account Details</h3>
            <p>
              <b>Name:</b> {accountDetails.accountHolderName}
            </p>
            <p>
              <b>Account Type:</b> {accountDetails.accountType}
            </p>
            <p>
              <b>Branch Code:</b> {accountDetails.branchCode}
            </p>
            <p>
              <b>Branch Name:</b> {accountDetails.branchName}
            </p>
            <p>
              <b>Address:</b> {accountDetails.address}
            </p>
            <p>
              <b>Balance:</b> {accountDetails.balance}
            </p>
            <button
              onClick={() =>
                navigate("/atm", {
                  state: {
                    name: accountDetails.accountHolderName,
                    accountType: accountDetails.accountType,
                  },
                })
              } // Or use useNavigate from react-router-dom
              style={{
                padding: "14px 40px",
                backgroundColor: "#000",
                color: "#fff",
                border: "2px solid #000",
                borderRadius: "6px",
                fontSize: "18px",
                cursor: "pointer",
                transition:
                  "background-color 0.4s ease, transform 0.2s ease, box-shadow 0.3s ease",
                marginLeft: "20px",
                boxShadow: "0 2px 10px rgba(255, 255, 255, 0.1)",
              }}
            >
              Go to ATM
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  label: {
    display: "block",
    marginBottom: "12px",
    fontSize: "18px",
    color: "#fff",
    fontWeight: "bold",
  },
  input: {
    width: "100%",
    padding: "16px",
    border: "2px solid #1c1c1c",
    borderRadius: "6px",
    outline: "none",
    fontSize: "16px",
    transition:
      "border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease",
  },
  icon: {
    position: "absolute",
    right: "10px",
    top: "65%",
    transform: "translateY(-50%)",
    fontSize: "20px",
    color: "#aaa",
  },
  buttonContainer: {
    marginTop: "30px",
    textAlign: "center",
  },
  button: {
    padding: "14px 40px",
    backgroundColor: "#000",
    color: "#fff",
    border: "2px solid #fff",
    borderRadius: "6px",
    fontSize: "18px",
    cursor: "pointer",
    transition:
      "background-color 0.4s ease, transform 0.2s ease, box-shadow 0.3s ease",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
  },
  secondaryButton: {
    padding: "14px 40px",
    backgroundColor: "#000",
    color: "#fff",
    border: "2px solid #fff",
    borderRadius: "6px",
    fontSize: "18px",
    cursor: "pointer",
    transition:
      "background-color 0.4s ease, transform 0.2s ease, box-shadow 0.3s ease",
    marginLeft: "20px",
    boxShadow: "0 2px 10px rgba(255, 255, 255, 0.1)",
  },
};

export default CreateBankAccountForm;
