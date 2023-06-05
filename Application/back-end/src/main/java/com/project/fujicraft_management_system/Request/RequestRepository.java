package com.project.fujicraft_management_system.Request;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.Optional;

public interface RequestRepository extends JpaRepository<Request,Integer>, JpaSpecificationExecutor<Request> {
    Optional<Request> findByPo(String po);
    Optional<Request> findByPoAndItemNameAndItemColor(String po, String itemName,String itemColor);



}