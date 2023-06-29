package com.project.fujicraft_management_system.Stock;

import com.project.fujicraft_management_system.Request.Request;
import com.project.fujicraft_management_system.Request.RequestService;
import com.project.fujicraft_management_system.Request.dto.RequestDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin(origins = "http://localhost:3006")
@RestController
public class StockController {

    @Autowired
    StockService    stockService;

    @PostMapping("/stock")
    private Stock saveStock(@RequestBody Stock stock){
        stockService.saveStock(stock);
        return stock;
    }

    @GetMapping("/stock")
    private List<Stock> getStock(){
        return stockService.getStock();
    }

    @DeleteMapping("/stock/{id}")
    private ResponseEntity<Object> deleteStock(@PathVariable("id") int id){
        return stockService.deleteStockById(id);
    }

    @PutMapping("/stock/{id}")
    private ResponseEntity<Object> updateStock(@PathVariable int id, @RequestBody Stock stock){
        return stockService.updateRequest(id,stock);
    }
}
