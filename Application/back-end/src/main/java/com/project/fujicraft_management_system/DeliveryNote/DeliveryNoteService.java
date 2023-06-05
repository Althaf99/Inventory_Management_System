package com.project.fujicraft_management_system.DeliveryNote;

import com.project.fujicraft_management_system.DeliveryNote.dto.DeliveryNoteDto;
import com.project.fujicraft_management_system.Invoice.Invoice;
import com.project.fujicraft_management_system.Invoice.InvoiceService;
import com.project.fujicraft_management_system.Invoice.dto.Excess;
import com.project.fujicraft_management_system.Request.Request;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cglib.core.Local;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class DeliveryNoteService {
    @Autowired
    DeliveryNoteRepository deliveryNoteRepository;

    @Autowired
    InvoiceService invoiceService;


    public List<DeliveryNote> saveDeliveryNote(DeliveryNoteDto deliveryNoteDto) {
        List<DeliveryNote> deliveryNote = new ArrayList<DeliveryNote>();
        deliveryNoteDto.getItems().forEach(d -> {
            d.getItem().forEach(i -> {
                DeliveryNote deliveryNoteObj = new DeliveryNote();
                deliveryNoteObj.setDeliveryDate(deliveryNoteDto.getDeliveryDate());
                deliveryNoteObj.setItemName(d.getItemName());
                deliveryNoteObj.setQuantity(i.getQuantity());
                deliveryNoteObj.setItemColor(i.getItemColor());
                deliveryNote.add(deliveryNoteObj);
            });
        });
        deliveryNoteRepository.saveAll(deliveryNote);
        invoiceService.createInvoiceDeliveryNote(deliveryNoteDto);
        return deliveryNote;
    }

    public List<DeliveryNote> getDeliveryNote(String itemName, String itemColor, String deliveryDate) throws UnsupportedEncodingException {
        List<DeliveryNote> deliveryNotes = new ArrayList<>();
        deliveryNoteRepository.findAll(Specification.where(itemNameEquals(itemName)).and(itemColorEquals(itemColor)).and(deliveryDateEquals(deliveryDate))).forEach(updated -> deliveryNotes.add((DeliveryNote) updated));
        return deliveryNotes;
    }

    private Specification<DeliveryNote> itemNameEquals(final String itemName) {

        return StringUtils.isEmpty(itemName) ? null : (root, query, builder) -> builder.equal(root.get("itemName"), itemName);
    }



    public ResponseEntity<Object> updateInvoice(int id, DeliveryNote deliveryNote) {
        Optional<DeliveryNote> deliveryNote1 = deliveryNoteRepository.findById(id);
        DeliveryNote deliveryNoteObj = deliveryNote1.get();
        if (deliveryNoteObj != null) {
            deliveryNoteObj.setItemName(deliveryNote.getItemName());
            deliveryNoteObj.setItemColor(deliveryNote.getItemColor());
            deliveryNoteObj.setQuantity(deliveryNote.getQuantity());
            deliveryNoteObj.setId(deliveryNote.getId());
            return new ResponseEntity<>(deliveryNoteRepository.save(deliveryNoteObj), HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    public ResponseEntity<Object> deleteDeliveryNote(int id) {
        try {
            //check if employee exist in database
            Optional<DeliveryNote> deliveryNote1 = deliveryNoteRepository.findById(id);
            DeliveryNote deliveryNote = deliveryNote1.get();

            if (deliveryNote1 != null) {
                deliveryNoteRepository.deleteById(deliveryNote.getId());
                return new ResponseEntity<>(HttpStatus.OK);
            }
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    private List<DeliveryNote> getDeliveryBody(String deliveryDate) {


        List<DeliveryNote> deliveryNotes = new ArrayList<>();
        deliveryNoteRepository.findAll(Specification.where(deliveryDateEquals(deliveryDate))).forEach(updated -> deliveryNotes.add((DeliveryNote) updated));
        return deliveryNotes;
    }
    private Specification<DeliveryNote> itemColorEquals(final String itemColor) {

        return StringUtils.isEmpty(itemColor) ? null : (root, query, builder) -> builder.equal(root.get("itemColor"), itemColor);
    }

    private Specification<DeliveryNote> deliveryDateEquals(final String deliveryDate) {
        if(!StringUtils.isEmpty(deliveryDate)){
            LocalDate localDate = LocalDate.parse(deliveryDate, DateTimeFormatter.ofPattern("dd-MM-yyyy"));
            return StringUtils.isEmpty(deliveryDate) ? null : (root, query, builder) -> builder.equal(root.get("deliveryDate"), localDate);

        }
        return null;
    }

}


