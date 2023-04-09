package com.project.fujicraft_management_system.controller.PO;

import com.project.fujicraft_management_system.model.PO.PO_RequestModel;
import com.project.fujicraft_management_system.repository.Po.PO_RequestCommonRepo;
import com.project.fujicraft_management_system.service.PO.PO_Request_Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class PO_RequestController {
    @Autowired
    PO_Request_Service poRequestService;
    @Autowired
    private PO_RequestCommonRepo pO_RequestCommonRepo;

    @PostMapping("/poRequest")
    private int savePO(@RequestBody PO_RequestModel po_requestModel)
    {
        poRequestService.savePORequest(po_requestModel);
        return po_requestModel.getId();
    }

    @GetMapping("/poRequest")
    private List<PO_RequestModel> getAllPORequests()
    {
        return poRequestService.getAllPORequests();
    }


    @DeleteMapping("/poRequest")
    private ResponseEntity<Object> deleteAllPo() {
        return poRequestService.deleteAllPo();
    }

    @DeleteMapping("/poRequest/{poNum}")
    public ResponseEntity<Object> deleteEmployeeById(@PathVariable("poNum") String poNum) {
        return poRequestService.deletePoByPoNum(poNum);
    }

    @PutMapping("/poRequest/{poNum}")
    public ResponseEntity<PO_RequestModel> updateEmployee(@PathVariable("poNum") String poNum, @RequestBody PO_RequestModel po_requestModel) {
        return poRequestService.updatePo( poNum ,   po_requestModel);
    }

    private PO_RequestModel getEmpRec(String poNum) {
        Optional<PO_RequestModel> poObj = pO_RequestCommonRepo.findByPo(poNum);
        if (poObj.isPresent()) {
            return poObj.get();
        }
        return null;
    }


}