package com.exponencial.confirming.requestDto;

import com.exponencial.confirming.model.Product;
import lombok.Data;

import java.util.List;

@Data
public class StoreResponse {
    private Integer id;
    private String name;

    private List<Product> products;
}
