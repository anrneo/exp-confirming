package com.exponencial.confirming.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class Product {
    @Id
    @GeneratedValue
    private Integer id;
    private String name;
    private String description;
    private Double price;
    private String image;

    @ManyToOne
    @JoinColumn(name="store_id")
    private Store store;

 }
