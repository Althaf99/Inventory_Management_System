package com.project.fujicraft_management_system.DeliveryNote;

import com.project.fujicraft_management_system.DeliveryNote.dto.DeliveryNoteDto;
import com.project.fujicraft_management_system.Invoice.Invoice;
import com.project.fujicraft_management_system.Invoice.InvoiceService;
import com.project.fujicraft_management_system.Invoice.dto.InvoiceDto;
import com.project.fujicraft_management_system.Invoice.dto.ResponseDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.UnsupportedEncodingException;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3006")
@RestController
public class DeliveryNoteController {

    @Autowired
    DeliveryNoteService deliveryNoteService;

    @PostMapping("/deliveryNote")
    private List<DeliveryNote> saveDelivery(@RequestBody DeliveryNoteDto deliveryNoteDto){
        return deliveryNoteService.saveDeliveryNote(deliveryNoteDto);
    }

    @GetMapping("/deliveryNote")
    private List<DeliveryNote> getDeliveryNote(@RequestParam(required = false) String itemName, @RequestParam(required = false) String itemColor, @RequestParam(required = false) String deliveryDate) throws UnsupportedEncodingException {
        return deliveryNoteService.getDeliveryNote( itemName, itemColor, deliveryDate);
    }

    @PutMapping("/deliveryNote/{id}")
    private ResponseEntity<Object> updateInvoice(@PathVariable("id") int id, @RequestBody DeliveryNote deliveryNote){
        return deliveryNoteService.updateInvoice(id,deliveryNote);
    }

    @DeleteMapping("/deliveryNote/{id}")
    private ResponseEntity<Object> deleteRequest(@PathVariable("id") int id){
        return deliveryNoteService.deleteDeliveryNote(id);
    }

}
