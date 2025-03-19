package com.crudoperation.atm.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.crudoperation.atm.entity.ATM_Account;
import com.crudoperation.atm.service.ATM_AccountService;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping("/atm_account")
public class ATM_AccountController {

	
	@Autowired
	ATM_AccountService service;
	
	//CREATE ACCOUNT
		@PostMapping("/create")
		public ResponseEntity<ATM_Account> createAccount(@RequestBody ATM_Account atm_account) {
			
			ATM_Account createAccount = service.createAccount(atm_account);
			return ResponseEntity.status(HttpStatus.CREATED).body(createAccount);
		}
		
	// credited money
		@PutMapping("/deposit/{accountNumber}/{pin}/{amount}")
		public Map<String, Object> depositAccount(@PathVariable int accountNumber,@PathVariable int pin, @PathVariable float amount) {
			Map<String, Object> account = service.depositeAmount(accountNumber, pin, amount);
			return account;
		}
		
	// debited money
		@PutMapping("/withdraw/{accountNumber}/{pin}/{amount}")
		public Map<String, Object> withdrawAccount(@PathVariable int accountNumber,@PathVariable int pin, @PathVariable float amount) {
			Map<String, Object> account = service.withdrawAmount(accountNumber, pin, amount);
			return account;
		}
		
	// check balance
		@GetMapping("/current_balance/{accountNumber}/{pin}")
		public ResponseEntity<String> getBalance(@PathVariable int accountNumber, @PathVariable int pin) {
			float balance = service.checkBalance(accountNumber, pin);
			return ResponseEntity.ok("Your current balance is: " + balance);
		}
		
	// change pin
		@PutMapping("/change_pin/{accountNumber}/{currentPin}/{updatedPin}")
	    public ResponseEntity<?> changePin(@PathVariable int accountNumber, @PathVariable int currentPin, @PathVariable int updatedPin) {

			Map<String, Object> response = service.changePin(accountNumber, currentPin, updatedPin);
			return ResponseEntity.ok(response);
	        
	    }
		
	
	// delete account
		@DeleteMapping("/delete_account/{accountNumber}")
		public ResponseEntity<String> closeAccount(@PathVariable int accountNumber){
			service.closeAccount(accountNumber); // Calls the service method to delete the account
            return ResponseEntity.ok("Account with number " + accountNumber + " has been successfully deleted.");
		}
		
		
		
		// get account details by account number
				@GetMapping("/{accountNumber}")
				public ATM_Account getAccountByAccountNumber(@PathVariable int accountNumber) {
					ATM_Account getAccountDetailsByAccountNumber = service.getAccountDetailsByAccountNumber(accountNumber);
					return getAccountDetailsByAccountNumber;
				}
		
}
