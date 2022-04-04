package backend.service.impl;

import backend.model.Category;
import backend.repository.ICategoryRepository;
import backend.service.ICategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryServiceImpl implements ICategoryService {

    @Autowired
    private ICategoryRepository categoryRepository;

    @Override
    public Category findById(Long idCategory) {
        if (categoryRepository.findById(idCategory).isPresent()){
            return categoryRepository.findById(idCategory).get();
        }
        return null;
    }

    @Override
    public Category save(Category category) {
        return categoryRepository.save(category);
    }

    @Override
    public void deleteById(Long idCategory) {
        categoryRepository.deleteById(idCategory);
    }

    @Override
    public List<Category> getAll() {
        return categoryRepository.findAll();
    }
}
