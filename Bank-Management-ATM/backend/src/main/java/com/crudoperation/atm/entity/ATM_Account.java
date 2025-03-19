package com.crudoperation.atm.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "ATM")
public class ATM_Account {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "account_number")
    private int accountNumber;

    @Column(name = "account_holder_name")
    private String accountHolderName;

    @Column(name = "address")
    private String address;

    @Column(name = "account_type")
    private String accountType;

    @Column(name = "branch_code")
    private String branchCode;

    @Column(name = "branch_name")
    private String branchName;

    @Column(name = "balance")
    private float balance;

    @Column(name = "pin")
    private int pin;

    public ATM_Account() {
        // Default constructor
    }

    public ATM_Account(String accountHolderName, String address, String accountType, String branchCode, String branchName, float balance, int pin) {
        this.accountHolderName = accountHolderName;
        this.address = address;
        this.accountType = accountType;
        this.branchCode = branchCode;
        this.branchName = branchName;
        this.balance = balance;
        this.pin = pin;
    }

    public int getAccountNumber() {
        return accountNumber;
    }

    public void setAccountNumber(int accountNumber) {
        this.accountNumber = accountNumber;
    }

    public String getaccountHolderName() {
        return accountHolderName;
    }

    public void setaccountHolderName(String accountHolderName) {
        this.accountHolderName = accountHolderName;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getAccountType() {
        return accountType;
    }

    public void setAccountType(String accountType) {
        this.accountType = accountType;
    }

    public String getBranchCode() {
        return branchCode;
    }

    public void setBranchCode(String branchCode) {
        this.branchCode = branchCode;
    }

    public String getbranchName() {
        return branchName;
    }

    public void setbranchName(String branchName) {
        this.branchName = branchName;
    }

    public float getBalance() {
        return balance;
    }

    public void setBalance(float balance) {
        this.balance = balance;
    }

    public int getPin() {
        return pin;
    }

    public void setPin(int pin) {
        this.pin = pin;
    }

    @Override
    public String toString() {
        return "ATM_Account{" +
                "accountNumber=" + accountNumber +
                ", name='" + accountHolderName + '\'' +
                ", address='" + address + '\'' +
                ", accountType='" + accountType + '\'' +
                ", branchCode='" + branchCode + '\'' +
                ", branch='" + branchName + '\'' +
                ", balance=" + balance +
                ", pin=" + pin +
                '}';
    }
}
