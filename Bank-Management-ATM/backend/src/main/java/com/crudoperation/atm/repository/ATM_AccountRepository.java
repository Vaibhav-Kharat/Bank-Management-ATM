package com.crudoperation.atm.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.crudoperation.atm.entity.ATM_Account;

public interface ATM_AccountRepository extends JpaRepository<ATM_Account, Integer>{

}
