package com.project.fujicraft_management_system.Repair;

import com.project.fujicraft_management_system.Invoice.Invoice;
import com.project.fujicraft_management_system.Request.Request;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class RepairService {

    @Autowired
    RepairRepository repairRepository;

    public Repair saveRepair(Repair repair) {
        return repairRepository.save(repair);
    }

    public List<Repair> getRepair() {
        List<Repair> repair = new ArrayList<>();
        repairRepository.findAll().forEach(updated -> repair.add((Repair) updated));
        return repair;
    }

    public ResponseEntity<Object> deleteRepair(int id) {
        try {
            //check if employee exist in database
//            Invoice invoice = getRequestBody(invoiceNum);
            Optional<Repair> repair = repairRepository.findById(id);
            Repair repair1 = repair.get();
            if (repair1 != null) {
                repairRepository.deleteById(repair1.getId());
                return new ResponseEntity<>(HttpStatus.OK);
            }
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<Object> updateInvoiceItem(int id, Repair repair) {
        //check if employee exist in database
        Optional<Repair> repairObj = repairRepository.findById(id);
        Repair repair1 = repairObj.get();
        if (repairObj != null) {
            repair1.setCategory(repair.getCategory());
            repair1.setStatus(repair.getStatus());
            repair1.setDescription(repair.getDescription());
            repair1.setDate(repair.getDate());

            return new ResponseEntity<>(repairRepository.save(repair1), HttpStatus.OK);
        }

        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
