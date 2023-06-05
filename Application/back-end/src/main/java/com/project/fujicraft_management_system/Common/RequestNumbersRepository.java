package com.project.fujicraft_management_system.Common;

import com.project.fujicraft_management_system.Common.Dto.ItemNames;
import com.project.fujicraft_management_system.Common.Dto.RequestNumbers;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface RequestNumbersRepository  extends JpaRepository<RequestNumbers,Integer>, JpaSpecificationExecutor<RequestNumbers> {
}
