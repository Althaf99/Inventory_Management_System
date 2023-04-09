package com.project.fujicraft_management_system.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PO_Request {
    @Id
    @Column
    private int id;

    @Column
    private String itemName;

    @Column
    private String color;

    @Column
    private int item_code;

    @Column
    private int quantity;

    @Column
    private float rate;

    @Column
    private int po_number;

    @Column
    private float total_amount;
}
