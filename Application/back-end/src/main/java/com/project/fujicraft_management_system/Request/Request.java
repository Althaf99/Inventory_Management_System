package com.project.fujicraft_management_system.Request;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
import java.util.Date;


@Entity
@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Request {
    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;


    @Column(name = "item_name")
    private String itemName;

    @Column
    private int quantity;

    @Column
    private double unitPrice;

    @Column
    private String itemColor;

    @Column
    private String po;


    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy")
    private LocalDate date;
}