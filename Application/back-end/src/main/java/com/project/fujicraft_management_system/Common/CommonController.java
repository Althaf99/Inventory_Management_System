package com.project.fujicraft_management_system.Common;

import com.project.fujicraft_management_system.Common.Dto.ItemColors;
import com.project.fujicraft_management_system.Common.Dto.ItemNames;
import com.project.fujicraft_management_system.Common.Dto.RequestNumbers;
import com.project.fujicraft_management_system.Invoice.Invoice;
import com.project.fujicraft_management_system.Invoice.InvoiceService;
import com.project.fujicraft_management_system.Invoice.dto.InvoiceDto;
import com.project.fujicraft_management_system.Request.Request;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3006")
@RestController
public class CommonController {

    @Autowired
    CommonService commonService;

    @Autowired
    ItemColorsRepository itemColorsRepository;
    @Autowired
    private ItemNameRepository itemNameRepository;
    @Autowired
    private RequestNumbersRepository requestNumbersRepository;


    @PostMapping("/common")
    private Common saveRequest(@RequestBody Common common){
        commonService.saveCommonItems(common);
        return common;
    }
    @PostMapping("/itemColors")
    private ItemColors saveItemColor(@RequestBody ItemColors itemColors){
        commonService.saveItemColor(itemColors);
        return itemColors;
    }

    @PostMapping("/itemNames")
    private ItemNames saveItemColor(@RequestBody ItemNames itemNames){
        commonService.saveItemNames(itemNames);
        return itemNames;
    }

    @PostMapping("/requestNumbers")
    private RequestNumbers saveItemColor(@RequestBody RequestNumbers requestNumbers){
        commonService.saveRequestNumber(requestNumbers);
        return requestNumbers;
    }

    @GetMapping("/common")
    private List<Common> getCommon(){
        return commonService.getCommonItems();
    }

    @GetMapping("/itemColors")
    private List<ItemColors> getItemColors(){
        return itemColorsRepository.findAll();
    }

    @GetMapping("/itemNames")
    private List<ItemNames> getItemNames(){
        return itemNameRepository.findAll();
    }

    @GetMapping("/requestNumbers")
    private List<RequestNumbers> getRequestNumbers(){
        return requestNumbersRepository.findAll();
    }


    @PutMapping("/common/{id}")
    private ResponseEntity<Object> updateRequest(@PathVariable int id, @RequestBody Common common){
        return commonService.updateCommonItems(id,common);
    }

    @DeleteMapping("/common/{id}")
    private ResponseEntity<Object> deleteRequest(@PathVariable("id") int id){
        return commonService.deleteCommonItem(id);
    }
}
