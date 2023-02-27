package com.exponencial.confirming.requestDto;

import com.exponencial.confirming.model.Store;
import lombok.Data;

@Data
public class ProductResponse {
    private Integer id;
    private String name;
    private String description;
    private Double price;
    private String image;

    private Store store;
}
