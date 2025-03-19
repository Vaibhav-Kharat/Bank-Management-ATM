package com.crudoperation.atm.service;

import java.util.Map;

import com.crudoperation.atm.entity.ATM_Account;

public interface ATM_AccountService {
	
	
	public ATM_Account createAccount(ATM_Account account);
	public Map<String, Object> depositeAmount(int accountNumber,int pin, float amount);
	public Map<String, Object> withdrawAmount(int accountNumber,int pin, float amount);
	public float checkBalance(int accountNumber, int pin);
	public Map<String, Object> changePin(int accountNumber, int current_pin, int updated_pin);
	public void closeAccount(int accountNumber);
	public ATM_Account getAccountDetailsByAccountNumber(int accountNumber);
	

}
