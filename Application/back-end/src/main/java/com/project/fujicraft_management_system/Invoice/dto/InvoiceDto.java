package com.project.fujicraft_management_system.Invoice.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.project.fujicraft_management_system.Request.dto.Item;
import jakarta.persistence.Column;
import lombok.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class InvoiceDto {
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy")
    private LocalDate invoiceDate;

    private List<Items> items = new ArrayList<>();
}
