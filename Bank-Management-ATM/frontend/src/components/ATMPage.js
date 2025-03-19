import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const ATMPage = () => {
  const location = useLocation();
  const { name, accountType } = location.state || {};
  const [showPinPrompt, setShowPinPrompt] = useState(false);
  const [pin, setPin] = useState("");
  const [balance, setBalance] = useState(null); // Initial balance will be fetched
  const [withdrawalAmount, setWithdrawalAmount] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch balance from the backend
    fetch("/api/getBalance", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, accountType }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setBalance(data.balance);
        } else {
          setError("Failed to fetch balance.");
        }
      })
      .catch(() => setError("An error occurred while fetching balance."));
  }, [name, accountType]);

  const handleWithdraw = () => {
    setShowPinPrompt(true);
    setError("");
  };

  const verifyPin = () => {
    // Verify PIN using the backend
    fetch("/api/verifyPin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ pin, name, accountType }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          const amount = parseFloat(withdrawalAmount);
          if (amount > balance) {
            setError("Insufficient balance.");
          } else if (amount <= 0 || isNaN(amount)) {
            setError("Please enter a valid amount.");
          } else {
            setBalance(balance - amount);
            setError("");
            alert("Transaction successful!");
            setShowPinPrompt(false);
            setPin("");
            setWithdrawalAmount("");
          }
        } else {
          setError("Incorrect pin. Please try again.");
        }
      })
      .catch(() => setError("An error occurred while verifying the PIN."));
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
      }}
    >
      <h1
        style={{ fontSize: "36px", fontWeight: "bold", marginBottom: "20px" }}
      >
        Welcome, {name}
      </h1>
      <h2 style={{ fontSize: "24px", marginBottom: "30px" }}>
        Account Type: {accountType}
      </h2>
      {balance !== null ? (
        <h3 style={{ fontSize: "20px", marginBottom: "20px" }}>
          Balance: ${balance}
        </h3>
      ) : (
        <p>Loading balance...</p>
      )}
      <div>
        <button
          style={{
            padding: "14px 40px",
            backgroundColor: "#28a745",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            fontSize: "18px",
            cursor: "pointer",
            margin: "0 15px",
          }}
          onClick={handleWithdraw}
        >
          Withdraw
        </button>
        <button
          style={{
            padding: "14px 40px",
            backgroundColor: "#ffc107",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            fontSize: "18px",
            cursor: "pointer",
            margin: "0 15px",
          }}
        >
          Deposit
        </button>
        <button
          style={{
            padding: "14px 40px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            fontSize: "18px",
            cursor: "pointer",
            margin: "0 15px",
          }}
        >
          Check Balance
        </button>
      </div>

      {showPinPrompt && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "#fff",
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
            textAlign: "center",
          }}
        >
          <h2>Enter Withdrawal Amount</h2>
          <input
            type="number"
            value={withdrawalAmount}
            onChange={(e) => setWithdrawalAmount(e.target.value)}
            style={{
              padding: "10px",
              fontSize: "16px",
              marginBottom: "10px",
              width: "80%",
            }}
          />

          <h2>Enter Pin</h2>
          <input
            type="password"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            style={{
              padding: "10px",
              fontSize: "16px",
              marginBottom: "10px",
              width: "80%",
            }}
          />
          <div style={{ marginTop: "10px" }}>
            <button
              onClick={verifyPin}
              style={{
                padding: "10px 20px",
                backgroundColor: "#28a745",
                color: "#fff",
                border: "none",
                borderRadius: "6px",
                fontSize: "16px",
                cursor: "pointer",
                margin: "0 10px",
              }}
            >
              Submit
            </button>
            <button
              onClick={() => {
                setShowPinPrompt(false);
                setPin("");
                setError("");
              }}
              style={{
                padding: "10px 20px",
                backgroundColor: "#dc3545",
                color: "#fff",
                border: "none",
                borderRadius: "6px",
                fontSize: "16px",
                cursor: "pointer",
                margin: "0 10px",
              }}
            >
              Cancel
            </button>
          </div>
          {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
        </div>
      )}
    </div>
  );
};

export default ATMPage;
