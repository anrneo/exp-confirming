package com.exponencial.confirming.controller;

import com.exponencial.confirming.model.Product;
import com.exponencial.confirming.model.Store;
import com.exponencial.confirming.repository.ProductRepository;
import com.exponencial.confirming.repository.StoreRepository;
import com.exponencial.confirming.requestDto.ProductRequestDto;
import com.exponencial.confirming.requestDto.ProductResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/product")
public class ProductController {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private StoreRepository storeRepository;


    @GetMapping
    public ResponseEntity<List<ProductResponse>> getAll(){

        List<Product> products = productRepository.findAll();

        List<ProductResponse> productResponses = new ArrayList<>();
        for (Product product: products) {
            ProductResponse response = new ProductResponse();
            response.setId(product.getId());
            response.setName(product.getName());
            response.setDescription(product.getDescription());
            response.setPrice(product.getPrice());
            response.setImage(product.getImage());
            response.setStore(product.getStore());
            productResponses.add(response);
        }
        return new ResponseEntity<>(productResponses, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<String> create(@RequestBody ProductRequestDto productRequestDto){

        Product product = new Product();
        product.setName(productRequestDto.getName());
        product.setDescription(productRequestDto.getDescription());
        product.setPrice(productRequestDto.getPrice());
        product.setImage(productRequestDto.getImage());

        Store store = storeRepository.findById(productRequestDto.getStoreId()).get();
        product.setStore(store);

        productRepository.save(product);

        return new ResponseEntity<>("Producto creado correctamente.", HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public Product update(@RequestBody ProductRequestDto product, @PathVariable Integer id){
        Product data = productRepository.findById(id).get();
        data.setName(product.getName());
        data.setDescription(product.getDescription());
        data.setPrice(product.getPrice());
        data.setImage(product.getImage());
        if (product.getStoreId() != null){
            Store store = storeRepository.findById(product.getStoreId()).get();
            data.setStore(store);
        }
        return productRepository.save(data);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Integer id){
        productRepository.deleteById(id);
        return new ResponseEntity<>("Producto eliminado correctamente.", HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public Product getOne(@PathVariable Integer id){
        return  productRepository.findById(id).get();
    }
}
