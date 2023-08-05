package com.project.fujicraft_management_system.Employee;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3006")
@RestController
public class EmployeeController {

    @Autowired
    EmployeeService employeeService;

    @PostMapping("/employee")
    private Employee saveEmployee(@RequestBody Employee employee) {
        employeeService.saveEmployee(employee);
        return employee;
    }

    @GetMapping("/employee")
    private List<Employee> getEmployee() {
        return employeeService.getEmployee();
    }

    @DeleteMapping("/employee/{id}")
    private ResponseEntity<Object> deleteEmployee(@PathVariable("id") int id) {
        return employeeService.deleteByEmployeeId(id);
    }

    @PutMapping("/employee/{id}")
    private ResponseEntity<Object> updateEmployee(@PathVariable int id, @RequestBody Employee employee) {
        return employeeService.updateEmployee(id, employee);
    }
}
