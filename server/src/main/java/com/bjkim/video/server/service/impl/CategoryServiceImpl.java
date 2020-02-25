package com.bjkim.video.server.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import com.bjkim.video.server.domain.dto.CategoryDTO;
import com.bjkim.video.server.domain.entity.CategoryEntity;
import com.bjkim.video.server.repository.CategoryRepository;
import com.bjkim.video.server.service.CategoryService;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class CategoryServiceImpl implements CategoryService {

  private CategoryRepository cateRepo;
  private ModelMapper modelMapper;

  @Override
  public List<CategoryDTO.list> findCategoryList(String userId) {
    List<CategoryEntity> entities = cateRepo.findAll();
    List<CategoryDTO.list> dtos = entities.stream().map(e -> modelMapper.map(e, CategoryDTO.list.class)).collect(Collectors.toList());
    return dtos;
  }
  
}