package com.project.fujicraft_management_system.service.PO;

import com.project.fujicraft_management_system.model.PO.PO_RequestModel;
import com.project.fujicraft_management_system.repository.Po.PO_RequestCommonRepo;
import com.project.fujicraft_management_system.repository.Po.PO_RequestRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class PO_Request_Service {
    private static final ModelMapper mapper = null;

    @Autowired
    PO_RequestRepository poRequestRepository;

    @Autowired
    private PO_RequestCommonRepo pO_Request_Common_Repo;

    public List<PO_RequestModel> getAllPORequests(){
        List<PO_RequestModel> poRequests = new ArrayList<PO_RequestModel>();
        poRequestRepository.findAll().forEach(poRequest -> poRequests.add((PO_RequestModel) poRequest));
        return poRequests;
    }

    public void savePORequest(PO_RequestModel po_requestModel){
        poRequestRepository.save(po_requestModel);
    }

    public ResponseEntity<Object> deleteAllPo(){
        try {
            pO_Request_Common_Repo.deleteAll();
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<PO_RequestModel> updatePo(String poNum , PO_RequestModel po_requestModel){
        //check if employee exist in database
        PO_RequestModel poObj = getEmpRec(poNum);

        if (poObj != null) {
            poObj.setItemName(po_requestModel.getItemName());
            poObj.setPo(po_requestModel.getPo());
            poObj.setDate(po_requestModel.getDate());
            poObj.setQuantity(po_requestModel.getQuantity());
            poObj.setItemColor(po_requestModel.getItemColor());
            poObj.setItemCode(po_requestModel.getItemCode());
            poObj.setUnitPrice(po_requestModel.getUnitPrice());
            return new ResponseEntity<>(pO_Request_Common_Repo.save(poObj), HttpStatus.OK);
        }

        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    public ResponseEntity<Object> deletePoByPoNum(String poNum){
        try {
            //check if employee exist in database
            PO_RequestModel poRequest = getEmpRec(poNum);


            if (poRequest != null) {
                pO_Request_Common_Repo.deleteById(poRequest.getId());
                return new ResponseEntity<>(HttpStatus.OK);
            }

            return new ResponseEntity<>(HttpStatus.NOT_FOUND);

        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    private PO_RequestModel getEmpRec(String poNum) {
        Optional<PO_RequestModel> poObj = pO_Request_Common_Repo.findByPo(poNum);
        if (poObj.isPresent()) {
            return poObj.get();
        }
        return null;
    }



}


