package com.project.fujicraft_management_system.DeliveryNote;

import com.project.fujicraft_management_system.Invoice.Invoice;
import com.project.fujicraft_management_system.Request.Request;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.Optional;

public interface DeliveryNoteRepository <T extends DeliveryNote> extends JpaRepository<T ,Integer>, JpaSpecificationExecutor<DeliveryNote> {
    Optional<Request> findByDeliveryDate(String deliveryDate);
}
