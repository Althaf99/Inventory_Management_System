package com.project.fujicraft_management_system.Registration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RegistrationService {
    @Autowired
    RegistrationRepository registrationRepository;
    public void saveUser(Registration registration) {
        registrationRepository.save(registration);
    }

    public List<Registration> getUser() {
        return registrationRepository.findAll();
    }

    public ResponseEntity<Object> deleteByUserId(int id) {
        try {
            //check if employee exist in database
            Optional<Registration> stock = registrationRepository.findById(id);
            if (stock != null) {
                registrationRepository.deleteById(id);
                return new ResponseEntity<>(HttpStatus.OK);
            }

            return new ResponseEntity<>(HttpStatus.NOT_FOUND);

        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<Object> updateUser(int id, Registration registration) {
        Optional<Registration> userObj = registrationRepository.findById(id);
        Registration newRegistration = userObj.get();
        if (userObj != null) {
            newRegistration.setUserName(registration.getUserName());
            newRegistration.setPassword(registration.getPassword());
            newRegistration.setFirstName(registration.getFirstName());
            newRegistration.setLastName(registration.getLastName());
            return new ResponseEntity<>(registrationRepository.save(newRegistration), HttpStatus.OK);
        }

        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
