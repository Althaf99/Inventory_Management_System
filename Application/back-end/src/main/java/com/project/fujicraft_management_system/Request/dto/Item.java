package com.project.fujicraft_management_system.Request.dto;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import lombok.*;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Item {

    private String itemColor;

    private int quantity;


}
