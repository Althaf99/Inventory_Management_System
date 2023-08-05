package com.project.fujicraft_management_system.Repair;

import com.project.fujicraft_management_system.Invoice.Invoice;
import com.project.fujicraft_management_system.Invoice.InvoiceService;
import com.project.fujicraft_management_system.Invoice.dto.InvoiceDto;
import com.project.fujicraft_management_system.Invoice.dto.ResponseDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3006")
@RestController
public class RepairController {

    @Autowired
    RepairService repairService;
    @Autowired
    private RepairRepository repairRepository;

    @PostMapping("/repair")
    private Repair saveRepair(@RequestBody Repair repair) {
        return repairService.saveRepair(repair);
    }

    @GetMapping("/repair")
    private List<Repair> getRepair() {
        return repairService.getRepair();
    }

    @DeleteMapping("/repair")
    private ResponseEntity<Object> deleteRepair(@PathVariable("id") int id) {
        return repairService.deleteRepair(id);
    }

    @PutMapping("/repair/{id}")
    private ResponseEntity<Object> updateRepair(@PathVariable("id") int id, @RequestBody Repair repair) {
        return repairService.updateInvoiceItem(id, repair);
    }
}
