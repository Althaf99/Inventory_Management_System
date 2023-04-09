package com.project.fujicraft_management_system.repository.Po;

import com.project.fujicraft_management_system.model.PO.PO_RequestModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface PO_RequestCommonRepo extends JpaRepository<PO_RequestModel,Integer>{

    Optional<PO_RequestModel> findByPo(String poNum);
}
