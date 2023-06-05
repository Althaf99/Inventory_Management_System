package com.project.fujicraft_management_system.Invoice;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.List;
import java.util.Optional;

public interface InvoiceRepository<T extends Invoice> extends JpaRepository<T ,Integer>, JpaSpecificationExecutor<Invoice> {

    Optional<Invoice> findByPoAndInvoiceDate(String po, String invoiceDate);

    Optional<Invoice> findAllByPoAndInvoiceDate(String po, String invoiceDate);
}
