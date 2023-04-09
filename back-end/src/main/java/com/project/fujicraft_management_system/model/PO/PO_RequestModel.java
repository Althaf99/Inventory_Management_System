package com.project.fujicraft_management_system.model.PO;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

@Entity
@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PO_RequestModel {

    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    @Column(name="item_code")
    private String itemCode;

    @Column(name="item_name")
    private String itemName;

    @Column
    private int quantity;

    @Column
    private float unitPrice;

    @Column
    private String itemColor;

    private String po;

    @DateTimeFormat(pattern = "dd-MM-yyyy")
    private String date;

}
