package backend.service;

import backend.model.Category;

import java.util.List;

public interface ICategoryService {
    Category findById(Long idCategory);

    Category save (Category category);

    void deleteById(Long idCategory);

    List<Category> getAll();
}
