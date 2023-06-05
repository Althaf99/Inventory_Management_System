package com.project.fujicraft_management_system.Common.Dto;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ItemNames {
    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;


    @Column
    private String itemName;
}
