package com.project.fujicraft_management_system.Invoice;

import com.project.fujicraft_management_system.DeliveryNote.dto.DeliveryNoteDto;
import com.project.fujicraft_management_system.Invoice.dto.Excess;
import com.project.fujicraft_management_system.Invoice.dto.InvoiceDto;
import com.project.fujicraft_management_system.Invoice.dto.ResponseDto;
import com.project.fujicraft_management_system.Request.Request;
import com.project.fujicraft_management_system.Request.RequestRepository;
import com.project.fujicraft_management_system.Request.RequestService;
import com.project.fujicraft_management_system.Request.dto.RequestDto;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class InvoiceService {

    @Autowired
    InvoiceRepository invoiceRepository;

    @Autowired
    RequestService requestService;
    @Autowired
    private RequestRepository requestRepository;

    @Autowired
    private ExcessRepository excessRepository;

    public ResponseDto createInvoiceDeliveryNote(DeliveryNoteDto deliveryNoteDto) {
        List<Request> requestsList = new ArrayList<Request>();
        List<Invoice> invoiceList = new ArrayList<>();
        List<Excess> excessList = new ArrayList<>();

        requestRepository.findAll().forEach(request -> requestsList.add((Request) request));
        deliveryNoteDto.getItems().forEach(e -> {
            e.getItem().forEach(i -> {

                requestsList.forEach(r -> {
                    Invoice invoiceObj = new Invoice();
                    if (e.getItemName().equals(r.getItemName()) && i.getItemColor().equals(r.getItemColor())  && r.getQuantity() > 0 && i.getQuantity() > 0) {
                        int remaining = i.getQuantity();
                        invoiceObj.setPo(r.getPo());
                        invoiceObj.setItemName(e.getItemName());
                        invoiceObj.setItemColor(r.getItemColor());
                        invoiceObj.setPoDate(r.getDate());
                        invoiceObj.setUnitPrice(r.getUnitPrice());
                        invoiceObj.setInvoiceDate(deliveryNoteDto.getDeliveryDate());
                        if (i.getQuantity() <= r.getQuantity()) {

                            invoiceObj.setQuantity(i.getQuantity());
                            r.setQuantity(r.getQuantity() - invoiceObj.getQuantity());
                            double result = invoiceObj.getUnitPrice() * invoiceObj.getQuantity();
                            double amount = Math.round(result * 100.0) / 100.0;
                            invoiceObj.setAmount(amount);
                            invoiceList.add(invoiceObj);
                            i.setQuantity(0);
                        } else {
                            remaining = i.getQuantity() - r.getQuantity();
                            invoiceObj.setQuantity(r.getQuantity());
                            r.setQuantity(0);
                            invoiceList.add(invoiceObj);
                            i.setQuantity(remaining);
                        }
                        double result = invoiceObj.getUnitPrice() * invoiceObj.getQuantity();
                        double amount = Math.round(result * 100.0) / 100.0;
                        invoiceObj.setAmount(amount);
                    }
                });
                if (i.getQuantity() > 0) {
                    Excess excessObj = new Excess();
                    excessObj.setItemName(e.getItemName());
                    excessObj.setItemColor(i.getItemColor());
                    excessObj.setQuantity(i.getQuantity());
                    excessObj.setExcessDeliveredDate(deliveryNoteDto.getDeliveryDate());
                    excessList.add(excessObj);
                    i.setQuantity(0);
                }
            });
        });
        invoiceRepository.saveAll(invoiceList);
        invoiceRepository.saveAll(excessList);
        ResponseDto responseObj = new ResponseDto();
        responseObj.setInvoiceObj(invoiceList);
        responseObj.setExcessObj(excessList);
        return responseObj;
    };

    public List<Invoice> getInvoice(String itemName, String itemColor, String po, String poDate, String invoiceDate,
            Integer invoiceNo) {
        List<Invoice> invoice = new ArrayList<>();
        invoiceRepository
                .findAll(Specification.where(itemNameEquals(itemName)).and(itemColorEquals(itemColor)).and(poEquals(po))
                        .and(poDateEquals(poDate)).and(invoiceDateEquals(invoiceDate)).and(invoiceNumEquals(invoiceNo)))
                .forEach(updated -> invoice.add((Invoice) updated));
        return invoice;
    }

    public List<Excess> getExcess(String itemName, String itemColor, String excessDeliveredDate) {
        List<Excess> excess = new ArrayList<>();
        excessRepository
                .findAll(Specification.where(itemNameEquals(itemName)).and(itemColorEquals(itemColor))
                        .and(excessDeliveredDateEquals(excessDeliveredDate)))
                .forEach(updated -> excess.add((Excess) updated));
        return excess;
    }

    public ResponseEntity<Object> deleteInvoiceItem(int id) {
        try {
            Optional<Invoice> invoice = invoiceRepository.findById(id);
            Invoice invoiceObj = invoice.get();

            if (invoice != null) {
                invoiceRepository.deleteById(invoiceObj.getId());
                return new ResponseEntity<>(HttpStatus.OK);
            }

            return new ResponseEntity<>(HttpStatus.NOT_FOUND);

        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<Object> updateInvoiceItem(int id, Invoice invoice) {
        Optional<Invoice> obj = invoiceRepository.findById(id);
        Invoice poObj = obj.get();

        if (poObj != null) {
            poObj.setItemName(invoice.getItemName());
            poObj.setPo(invoice.getPo());
            poObj.setPoDate(invoice.getPoDate());
            poObj.setQuantity(invoice.getQuantity());
            poObj.setItemColor(invoice.getItemColor());
            poObj.setUnitPrice(invoice.getUnitPrice());
            poObj.setTotal(invoice.getTotal());
            poObj.setAmount(invoice.getTotal());
            poObj.setInvoiceNo(invoice.getInvoiceNo());
            return new ResponseEntity<>(invoiceRepository.save(poObj), HttpStatus.OK);
        }

        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    public ResponseEntity<Object> addInvoiceNumber(String po, String invoiceDate, int invoiceNo) {
        List<Invoice> invoiceList = new ArrayList<>();

        List<Invoice> invoiceObj = invoiceRepository
                .findAll(Specification.where(poEquals(po)).and(invoiceDateEquals(invoiceDate)));
        if (invoiceObj != null) {
            invoiceObj.forEach(e -> {
                e.setItemName(e.getItemName());
                e.setPo(e.getPo());
                e.setPoDate(e.getPoDate());
                e.setQuantity(e.getQuantity());
                e.setItemColor(e.getItemColor());
                e.setUnitPrice(e.getUnitPrice());
                e.setTotal(e.getTotal());
                e.setAmount(e.getAmount());
                e.setInvoiceNo(invoiceNo);
                invoiceList.add(e);
            });
            return new ResponseEntity<>(invoiceRepository.saveAll(invoiceList), HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);

    }

    public List<Invoice> getInvoiceByInvoiceNo(Integer invoiceNo) {
        List<Invoice> invoice = new ArrayList<>();
        invoiceRepository.findAll(Specification.where(invoiceNumEquals(invoiceNo)))
                .forEach(updated -> invoice.add((Invoice) updated));
        return invoice;
    }

    private Specification<Invoice> itemNameEquals(final String itemName) {

        return StringUtils.isEmpty(itemName) ? null
                : (root, query, builder) -> builder.equal(root.get("itemName"), itemName);
    }

    private Specification<Request> reqItemNameEquals(final String itemName) {

        return StringUtils.isEmpty(itemName) ? null
                : (root, query, builder) -> builder.equal(root.get("itemName"), itemName);
    }

    private Specification<Invoice> itemColorEquals(final String itemColor) {

        return StringUtils.isEmpty(itemColor) ? null
                : (root, query, builder) -> builder.equal(root.get("itemColor"), itemColor);
    }

    private Specification<Request> reqItemColorEquals(final String itemColor) {

        return StringUtils.isEmpty(itemColor) ? null
                : (root, query, builder) -> builder.equal(root.get("itemColor"), itemColor);
    }

    private Specification<Invoice> poEquals(final String po) {

        return StringUtils.isEmpty(po) ? null : (root, query, builder) -> builder.equal(root.get("po"), po);
    }

    private Specification<Request> reqPoEquals(final String po) {

        return StringUtils.isEmpty(po) ? null : (root, query, builder) -> builder.equal(root.get("po"), po);
    }

    private Specification<Invoice> poDateEquals(final String poDate) {
        if (!StringUtils.isEmpty(poDate)) {
            LocalDate localDate = LocalDate.parse(poDate, DateTimeFormatter.ofPattern("dd-MM-yyyy"));
            return StringUtils.isEmpty(poDate) ? null
                    : (root, query, builder) -> builder.equal(root.get("poDate"), localDate);

        }
        return null;
    }

    private Specification<Invoice> invoiceDateEquals(final String invoiceDate) {
        if (!StringUtils.isEmpty(invoiceDate)) {
            LocalDate localDate = LocalDate.parse(invoiceDate, DateTimeFormatter.ofPattern("dd-MM-yyyy"));
            return StringUtils.isEmpty(invoiceDate) ? null
                    : (root, query, builder) -> builder.equal(root.get("invoiceDate"), localDate);
        }
        return null;
    }

    private Specification<Invoice> invoiceNumEquals(final Integer invoiceNo) {
        // if(invoiceNo > 0){
        // Integer intObj = Integer.valueOf(invoiceNo);
        return invoiceNo == null ? null : (root, query, builder) -> builder.equal(root.get("invoiceNo"), invoiceNo);
        // }
        // return null;
    }

    private Specification<Invoice> excessDeliveredDateEquals(final String excessDeliveredDate) {
        if (!StringUtils.isEmpty(excessDeliveredDate)) {
            LocalDate localDate = LocalDate.parse(excessDeliveredDate, DateTimeFormatter.ofPattern("dd-MM-yyyy"));
            return StringUtils.isEmpty(excessDeliveredDate) ? null
                    : (root, query, builder) -> builder.equal(root.get("excessDeliveredDate"), localDate);
        }
        return null;
    }

}
