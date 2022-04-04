package backend.service.impl;

import backend.model.Product;
import backend.repository.IProductRepository;
import backend.service.IProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductServiceImpl implements IProductService {
    @Autowired
    private IProductRepository productRepository;

    @Override
    public Product findById(Long idProduct) {
        if(productRepository.findById(idProduct).isPresent()){
            return productRepository.findById(idProduct).get();
        }
        return null;
    }

    @Override
    public Product save(Product product) {
        return productRepository.save(product);
    }

    @Override
    public void deleteById(Long idProduct) {
        productRepository.deleteById(idProduct);
    }

    @Override
    public List<Product> getAll() {
        return productRepository.findAll();
    }

    @Override
    public List<Product> findAllByNameProductContaining(String name) {
        return productRepository.findAllByNameProductContaining(name);
    }
}
