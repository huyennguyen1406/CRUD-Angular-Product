package backend.service;

import backend.model.Product;

import java.util.List;

public interface IProductService {
    Product findById(Long idProduct);

    Product save(Product product);

    void deleteById (Long idProduct);

    List<Product> getAll();

    List<Product> findAllByNameProductContaining(String name);
}
