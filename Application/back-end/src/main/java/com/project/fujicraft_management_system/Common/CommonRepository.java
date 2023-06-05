package com.project.fujicraft_management_system.Common;

import com.project.fujicraft_management_system.Invoice.Invoice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface CommonRepository extends JpaRepository<Common,Integer>, JpaSpecificationExecutor<Invoice> {
}
