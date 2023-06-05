package com.project.fujicraft_management_system.Common;

import com.project.fujicraft_management_system.Common.Dto.ItemColors;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface ItemColorsRepository extends JpaRepository<ItemColors,Integer>, JpaSpecificationExecutor<ItemColors> {
}
