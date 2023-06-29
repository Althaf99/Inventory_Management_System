package com.project.fujicraft_management_system.Registration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin(origins = "http://localhost:3006")
@RestController
public class RegistrationController {

    @Autowired
    RegistrationService registrationService;

    @PostMapping("/registerUser")
    private Registration saveUser(@RequestBody Registration registration){
        registrationService.saveUser(registration);
        return registration;
    }

    @GetMapping("/getUser")
    private List<Registration> getUser(){
        return registrationService.getUser();
    }

    @DeleteMapping("/user/{id}")
    private ResponseEntity<Object> deleteUser(@PathVariable("id") int id){
        return registrationService.deleteByUserId(id);
    }

    @PutMapping("/user/{id}")
    private ResponseEntity<Object> updateUser(@PathVariable int id, @RequestBody Registration registration){
        return registrationService.updateUser(id, registration);
    }
}
