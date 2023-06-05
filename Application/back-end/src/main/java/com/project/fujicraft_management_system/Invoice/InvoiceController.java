package com.project.fujicraft_management_system.Invoice;

import com.project.fujicraft_management_system.Invoice.dto.Excess;
import com.project.fujicraft_management_system.Invoice.dto.InvoiceDto;
import com.project.fujicraft_management_system.Invoice.dto.Items;
import com.project.fujicraft_management_system.Invoice.dto.ResponseDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3006")
@RestController
public class InvoiceController {

    @Autowired
    InvoiceService invoiceService;



    @GetMapping("/invoice")
    private List<Invoice> getInvoice(@RequestParam(required = false) String itemName, @RequestParam(required = false) String itemColor, @RequestParam(required = false) String po, @RequestParam(required = false) String poDate,@RequestParam(required = false) String invoiceDate,@RequestParam(required = false) String invoiceNo){
        return invoiceService.getInvoice( itemName, itemColor, po, poDate,invoiceDate, invoiceNo );
    }

    @GetMapping("/invoice/{invoiceNo}")
    private List<Invoice> getInvoiceByInvoiceNo(@PathVariable("invoiceNo") String invoiceNo){
        return invoiceService.getInvoiceByInvoiceNo(invoiceNo);
    }

    @GetMapping("/excess")
    private List<Excess> getExcess(@RequestParam(required = false) String itemName, @RequestParam(required = false) String itemColor, @RequestParam(required = false) String excessDeliveredDate){
        return invoiceService.getExcess( itemName, itemColor,excessDeliveredDate);
    }


    @DeleteMapping("/invoice/{id}")
    private ResponseEntity<Object> deleteInvoice(@PathVariable("id") int id){
        return invoiceService.deleteInvoiceItem(id);
    }

    @PutMapping("/invoice/{id}")
    private ResponseEntity<Object> updateInvoice(@PathVariable("id") int id,@RequestBody Invoice invoice){
        return invoiceService.updateInvoiceItem(id,invoice);
    }

    @PutMapping("/AddInvoice/{po}/{invoiceDate}/{invoiceNo}")
    private ResponseEntity<Object> addInvoiceNumber(@PathVariable("po") String po,@PathVariable("invoiceDate") String invoiceDate,@PathVariable("invoiceNo") String invoiceNo){
        return invoiceService.addInvoiceNumber(po,invoiceDate,invoiceNo);
    }


}
