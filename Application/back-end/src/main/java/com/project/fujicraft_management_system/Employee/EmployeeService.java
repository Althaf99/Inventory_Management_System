package com.project.fujicraft_management_system.Employee;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EmployeeService {
    @Autowired
    EmployeeRepository employeeRepository;
    public void saveEmployee(Employee employee) {
        employeeRepository.save(employee);
    }

    public List<Employee> getEmployee() {
        return employeeRepository.findAll();
    }

    public ResponseEntity<Object> deleteByEmployeeId(int id) {
        try {
            //check if employee exist in database
            Optional<Employee> emplyee = employeeRepository.findById(id);
            if (emplyee != null) {
                employeeRepository.deleteById(id);
                return new ResponseEntity<>(HttpStatus.OK);
            }

            return new ResponseEntity<>(HttpStatus.NOT_FOUND);

        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<Object> updateEmployee(int id, Employee employee) {
        Optional<Employee> employeeObj = employeeRepository.findById(id);
        Employee newEmployee = employeeObj.get();
        if (employeeObj != null) {
            newEmployee.setAge(employee.getAge());
            newEmployee.setDOB(employee.getDOB());
            newEmployee.setName(employee.getName());
            newEmployee.setAddress(employee.getAddress());
            newEmployee.setPhone(employee.getPhone());
            return new ResponseEntity<>(employeeRepository.save(newEmployee), HttpStatus.OK);
        }

        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
