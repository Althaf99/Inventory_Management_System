package com.project.fujicraft_management_system.Stock;

import com.project.fujicraft_management_system.Request.Request;
import com.project.fujicraft_management_system.Request.RequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class StockService {
    @Autowired
    StockRepository stockRepository;
    public void saveStock(Stock stock) {
        stockRepository.save(stock);
    }

    public List<Stock> getStock() {
        return stockRepository.findAll();
    }

    public ResponseEntity<Object> deleteStockById(int id) {
        try {
            //check if employee exist in database
            Optional<Stock> stock = stockRepository.findById(id);
            if (stock != null) {
                stockRepository.deleteById(id);
                return new ResponseEntity<>(HttpStatus.OK);
            }

            return new ResponseEntity<>(HttpStatus.NOT_FOUND);

        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<Object> updateRequest(int id, Stock stock) {
        Optional<Stock> stockObj = stockRepository.findById(id);
        Stock newStock = stockObj.get();
        if (stockObj != null) {
            newStock.setItemName(stock.getItemName());
            newStock.setCategory(stock.getCategory());
            newStock.setSupplier(stock.getSupplier());
            newStock.setUnitCost(stock.getUnitCost());
            newStock.setQuantity(stock.getQuantity());
            newStock.setPurchaseDate(stock.getPurchaseDate());
            return new ResponseEntity<>(stockRepository.save(newStock), HttpStatus.OK);
        }

        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
