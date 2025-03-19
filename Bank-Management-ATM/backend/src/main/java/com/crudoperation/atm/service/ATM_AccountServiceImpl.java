package com.crudoperation.atm.service;


import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import javax.security.auth.login.AccountNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.ResponseBody;

import com.crudoperation.atm.entity.ATM_Account;
import com.crudoperation.atm.repository.ATM_AccountRepository;



@Service
public class ATM_AccountServiceImpl implements ATM_AccountService{

	
	@Autowired
	ATM_AccountRepository repo;
	
	@Override
	public ATM_Account createAccount(ATM_Account atm_account) {
		// TODO Auto-generated method stub
		ATM_Account accountSaved = repo.save(atm_account);
		return accountSaved;
	}

	@Override
	public Map<String, Object> depositeAmount(int accountNumber, int pin, float amount) {
	    Optional<ATM_Account> atm_account = repo.findById(accountNumber);
	    if (atm_account.isEmpty()) {
	        throw new RuntimeException("Account does not exist");
	    }
	    
	    ATM_Account accountPresent = atm_account.get();
	    
	    // Validate PIN
	    if (accountPresent.getPin() != pin) {
	        throw new RuntimeException("Incorrect PIN");
	    }

	    // Perform deposit
	    float total_balance = accountPresent.getBalance() + amount;
	    accountPresent.setBalance(total_balance);
	    repo.save(accountPresent);

	    Map<String, Object> response = new HashMap<>();
	    response.put("message", "Amount credited successfully");
	    response.put("addedAmount", amount);
	    response.put("account", accountPresent);

	    return response;
	}

	@Override
	public Map<String, Object> withdrawAmount(int accountNumber, int pin, float amount) {
	    Optional<ATM_Account> atm_account = repo.findById(accountNumber);
	    if (atm_account.isEmpty()) {
	        throw new RuntimeException("Account does not exist");
	    }

	    ATM_Account accountPresent = atm_account.get();

	    // Validate PIN
	    if (accountPresent.getPin() != pin) {
	        throw new RuntimeException("Incorrect PIN");
	    }

	    // Check balance and perform withdrawal
	    float current_balance = accountPresent.getBalance();
	    if (current_balance < amount) {
	        throw new RuntimeException("Insufficient balance");
	    }

	    float total_balance = current_balance - amount;
	    accountPresent.setBalance(total_balance);
	    repo.save(accountPresent);

	    Map<String, Object> response = new HashMap<>();
	    response.put("message", "Amount debited successfully");
	    response.put("deductedAmount", amount);
	    response.put("account", accountPresent);

	    return response;
	}

	@Override
	public float checkBalance(int accountNumber, int pin) {
		// TODO Auto-generated method stub
		Optional<ATM_Account> atm_account = repo.findById(accountNumber);
		if(atm_account.isEmpty()) {
			throw new RuntimeException("Account does not exixts");
		}
		ATM_Account accountPresent = atm_account.get();;
		if(accountPresent.getPin()!=pin) {
			throw new RuntimeException("Incorrect pin");
		}
		float current_balance = accountPresent.getBalance();
		return current_balance;
	}

	@Override
	public Map<String, Object> changePin(int accountNumber, int current_pin, int updated_pin) {
		// TODO Auto-generated method stub
		Optional<ATM_Account> atm_account = repo.findById(accountNumber);
		if(atm_account.isEmpty()) {
			throw new RuntimeException("Account does not exixts ");
		}
		ATM_Account accountPresent = atm_account.get();
		if (accountPresent.getPin() != current_pin) {
	        throw new RuntimeException("Current pin is incorrect");
	    }

	    // Update the pin
	    accountPresent.setPin(updated_pin);
	    repo.save(accountPresent);
		
	    
	    Map<String, Object> response = Map.of(
	            "message", "Pin updated successfully",
	            "accountNumber", accountNumber);
	    
	    return response;
	}

	@Override
	public void closeAccount(int accountNumber) {  // Keep the parameter type as int
	    // Check if the account exists
	    Optional<ATM_Account> atm_account = repo.findById(accountNumber);
	    
	    if (atm_account.isPresent()) {
	        // Delete the account if it exists
	        repo.deleteById(accountNumber);
	    } else {
	        // Throw exception if account not found
	        throw new RuntimeException("Account with number " + accountNumber + " not found.");
	    }
	}

	@Override
	public ATM_Account getAccountDetailsByAccountNumber(int accountNumber) {
		// TODO Auto-generated method stub
		
		Optional<ATM_Account> account = repo.findById(accountNumber);
		if(account.isEmpty()) {
			throw new RuntimeException("Account does not exists!!!");
		}
		ATM_Account account_found = account.get();	
		
		return account_found;
	}

}
