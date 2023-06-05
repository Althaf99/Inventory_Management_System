package com.project.fujicraft_management_system.Common;

import com.project.fujicraft_management_system.Common.Dto.ItemColors;
import com.project.fujicraft_management_system.Common.Dto.ItemNames;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface ItemNameRepository  extends JpaRepository<ItemNames,Integer>, JpaSpecificationExecutor<ItemNames> {
}
