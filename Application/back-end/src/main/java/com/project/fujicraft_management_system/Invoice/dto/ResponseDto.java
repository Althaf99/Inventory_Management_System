package com.project.fujicraft_management_system.Invoice.dto;

import com.project.fujicraft_management_system.Invoice.Invoice;
import lombok.*;

import java.util.ArrayList;
import java.util.List;
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ResponseDto {
    private List<Invoice> invoiceObj=  new ArrayList<>();
    private List<Excess> excessObj = new ArrayList<>();

}
