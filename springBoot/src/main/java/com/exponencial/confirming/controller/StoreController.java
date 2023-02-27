package com.exponencial.confirming.controller;

import com.exponencial.confirming.model.Store;
import com.exponencial.confirming.repository.StoreRepository;
import com.exponencial.confirming.requestDto.StoreResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/store")
public class StoreController {
    @Autowired
    private StoreRepository storeRepository;

    @GetMapping
    public ResponseEntity<List<StoreResponse>> getAll(){
        List<Store> stores = storeRepository.findAll();

        List<StoreResponse> storeResponses = new ArrayList<>();
        for (Store store: stores) {
            StoreResponse response = new StoreResponse();
            response.setId(store.getId());
            response.setName(store.getName());
            response.setProducts(store.getProducts());
            storeResponses.add(response);
        }
        return new ResponseEntity<>(storeResponses, HttpStatus.OK);
    }

    @PostMapping
    public Store create(@RequestBody Store store){
        return storeRepository.save(store);
    }

    @PutMapping("/{id}")
    public Store update(@RequestBody Store store, @PathVariable Integer id){
        Store data = storeRepository.findById(id).get();
        data.setName(store.getName());
        return storeRepository.save(data);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Integer id){
        storeRepository.deleteById(id);
        return new ResponseEntity<>("Tienda elimanda correctamente.", HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<StoreResponse> getOne(@PathVariable Integer id){
        Store store = storeRepository.findById(id).get();
        StoreResponse response = new StoreResponse();
        response.setId(store.getId());
        response.setName(store.getName());
        response.setProducts(store.getProducts());
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
