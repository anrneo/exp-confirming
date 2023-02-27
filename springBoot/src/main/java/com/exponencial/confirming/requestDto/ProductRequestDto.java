package com.exponencial.confirming.requestDto;

import lombok.Data;

@Data
public class ProductRequestDto {
    private Integer storeId;
    private String name;
    private String description;
    private Double price;
    private String image;

}
