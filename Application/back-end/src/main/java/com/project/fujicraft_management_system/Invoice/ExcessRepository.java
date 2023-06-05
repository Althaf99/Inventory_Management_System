package com.project.fujicraft_management_system.Invoice;

import com.project.fujicraft_management_system.Invoice.dto.Excess;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface ExcessRepository <T extends Excess> extends JpaRepository<T ,Integer>, JpaSpecificationExecutor<Excess> {
}
