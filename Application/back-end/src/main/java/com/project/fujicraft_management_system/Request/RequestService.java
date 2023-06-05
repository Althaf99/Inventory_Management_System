package com.project.fujicraft_management_system.Request;

import com.project.fujicraft_management_system.Invoice.Invoice;
import com.project.fujicraft_management_system.Request.dto.RequestDto;
import org.apache.commons.lang3.StringUtils;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public
class RequestService{
    private static final ModelMapper mapper = null;

    @Autowired
    RequestRepository requestRepository;

    public void saveRequest(RequestDto requestDto) {
        List<Request> reqList = new ArrayList<>();
        requestDto.getItems().forEach(x -> {
            x.getItem().forEach(y->{

            Request reqObj = new Request();
            reqObj.setDate(requestDto.getDate());
            reqObj.setPo(requestDto.getPo());
            reqObj.setItemName(x.getItemName());
            reqObj.setUnitPrice(x.getUnitPrice());
                reqObj.setItemColor(y.getItemColor());
                reqObj.setQuantity(y.getQuantity());
            reqList.add(reqObj);
            });
        });
        requestRepository.saveAll(reqList);
    }

    public List<Request> getRequests(String itemName, String itemColor, String po, String date) {
        List<Request> poRequests = new ArrayList<Request>();
        requestRepository.findAll(Specification.where(itemNameEquals(itemName)).and(itemColorEquals(itemColor)).and(poEquals(po)).and(dateEquals(date))).forEach(updated -> poRequests.add((Request) updated));
        return poRequests;
    }


    public ResponseEntity<Object> deleteRequestById(int id) {
        try {
            //check if employee exist in database
            Optional<Request> poRequest = requestRepository.findById(id);
            if (poRequest != null) {
                requestRepository.deleteById(id);
                return new ResponseEntity<>(HttpStatus.OK);
            }

            return new ResponseEntity<>(HttpStatus.NOT_FOUND);

        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<Object> updateRequest(int id, Request request) {
        //check if employee exist in database
        Optional<Request> poObj = requestRepository.findById(id);
        Request poRequest = poObj.get();
        if (poObj != null) {
            poRequest.setItemName(request.getItemName());
            poRequest.setPo(request.getPo());
            poRequest.setDate(request.getDate());
            poRequest.setQuantity(request.getQuantity());
            poRequest.setItemColor(request.getItemColor());
            poRequest.setUnitPrice(request.getUnitPrice());
            return new ResponseEntity<>(requestRepository.save(poRequest), HttpStatus.OK);
        }

        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }



    private Specification<Request> itemCodeEquals(final String itemCode) {

        return StringUtils.isEmpty(itemCode) ? null : (root, query, builder) -> builder.equal(root.get("itemCode"), itemCode);
    }

    private Specification<Request> itemNameEquals(final String itemName) {

        return StringUtils.isEmpty(itemName) ? null : (root, query, builder) -> builder.equal(root.get("itemName"), itemName);
    }

    private Specification<Request> itemColorEquals(final String itemColor) {

        return StringUtils.isEmpty(itemColor) ? null : (root, query, builder) -> builder.equal(root.get("itemColor"), itemColor);
    }

    private Specification<Request> poEquals(final String po) {

        return StringUtils.isEmpty(po) ? null : (root, query, builder) -> builder.equal(root.get("po"), po);
    }

    private Specification<Request> dateEquals(final String date) {

        return StringUtils.isEmpty(date) ? null : (root, query, builder) -> builder.equal(root.get("date"), date);
    }

}