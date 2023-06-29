package com.project.fujicraft_management_system.Common;

import com.project.fujicraft_management_system.Common.Dto.ItemColors;
import com.project.fujicraft_management_system.Common.Dto.ItemNames;
import com.project.fujicraft_management_system.Common.Dto.RequestNumbers;
import com.project.fujicraft_management_system.Invoice.InvoiceRepository;
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
public class CommonService {
    @Autowired
    CommonRepository commonRepository;
    @Autowired
    ItemNameRepository itemNameRepository;

    @Autowired
    ItemColorsRepository itemColorsRepository;

    @Autowired
    private RequestNumbersRepository requestNumbersRepository;

    public void saveCommonItems(Common common) {
        commonRepository.save(common);
    }

    public List<Common> getCommonItems() {
        List <Common> commonItems = commonRepository.findAll();
        return commonItems;
    }

    public ResponseEntity<Object> updateCommonItems(int id, Common common) {
        Common poObj = getRequestBody(id);

        if (poObj != null) {
            poObj.setItemNames(common.getItemNames());
            poObj.setColors(common.getColors());
            poObj.setPoNumbers(common.getPoNumbers());
            return new ResponseEntity<>(commonRepository.save(poObj), HttpStatus.OK);
        }

        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    private Common getRequestBody(int id) {
        Optional<Common> commonObj = commonRepository.findById(id);
        if (commonObj.isPresent()) {
            return commonObj.get();
        }
        return null;
    }

    public ResponseEntity<Object> deleteRequestNumber(int id) {
        try {
            //check if employee exist in database
            Optional<RequestNumbers> requestNumbers1 = requestNumbersRepository.findById(id);
            if (requestNumbers1.isPresent()) {
                requestNumbersRepository.deleteById(id);
                return new ResponseEntity<>(HttpStatus.OK);
            }

            return new ResponseEntity<>(HttpStatus.NOT_FOUND);

        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<Object> deleteItemName(int id) {
        try {
            //check if employee exist in database
            Optional<ItemNames> itemNameObj = itemNameRepository.findById(id);
            if (itemNameObj.isPresent()) {
                itemNameRepository.deleteById(id);
                return new ResponseEntity<>(HttpStatus.OK);
            }

            return new ResponseEntity<>(HttpStatus.NOT_FOUND);

        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<Object> deleteItemColors(int id) {
        try {
            //check if employee exist in database
            Optional<ItemColors> itemColorObj = itemColorsRepository.findById(id);
            if (itemColorObj.isPresent()) {
                itemColorsRepository.deleteById(id);
                return new ResponseEntity<>(HttpStatus.OK);
            }

            return new ResponseEntity<>(HttpStatus.NOT_FOUND);

        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public void saveItemColor(ItemColors itemColors) {
        itemColorsRepository.save(itemColors);
    }

    public void saveItemNames(ItemNames itemNames) {
        itemNameRepository.save(itemNames);
    }

    public void saveRequestNumber(RequestNumbers requestNumbers) {
        requestNumbersRepository.save(requestNumbers);
    }


}
