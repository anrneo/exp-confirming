package com.exponencial.confirming.repository;

import com.exponencial.confirming.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Integer> {
}
