package com.project.fujicraft_management_system.Repair;

import com.project.fujicraft_management_system.Common.Common;
import com.project.fujicraft_management_system.Invoice.Invoice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.http.ResponseEntity;

public interface RepairRepository extends JpaRepository<Repair,Integer>, JpaSpecificationExecutor<Repair> {

}
