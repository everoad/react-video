package com.bjkim.video.server.service.impl;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import com.bjkim.video.server.domain.dto.UserDTO;
import com.bjkim.video.server.domain.entity.UserEntity;
import com.bjkim.video.server.repository.UserRepository;
import com.bjkim.video.server.service.UserService;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class UserServiceImpl implements UserService {

  private UserRepository userRepo;
  private ModelMapper modelMapper;

  @Override
  public List<UserDTO.list> findUserList() {
    List<UserEntity> entities = userRepo.findAll();
    List<UserDTO.list> dtos = entities.stream().map(e -> modelMapper.map(e, UserDTO.list.class))
        .collect(Collectors.toList());
    return dtos;
  }

  @Override
  public UserDTO.one findUser(String id) {
    UserEntity entity = userRepo.getOne(id);
    UserDTO.one dto = modelMapper.map(entity, UserDTO.one.class);
    return dto;
  }

  @Override
  public UserDTO.one addUser(UserDTO.save userDTO) {
    UserEntity entity = userDTO.toEntity();
    entity = userRepo.save(entity);
    UserDTO.one dto = modelMapper.map(entity, UserDTO.one.class);
    return dto;
  }

  @Override
  public UserDTO.one updateUser(UserDTO.save userDTO) {
    UserEntity entity = userDTO.toEntity();
    entity = userRepo.save(entity);
    UserDTO.one dto = modelMapper.map(entity, UserDTO.one.class);
    return dto;
  }

  @Override
  public String deleteUser(String id) {
    Optional<UserEntity> result = userRepo.findById(id);
    if (result.isPresent()) {
      userRepo.delete(result.get());
      return "Success";
    } else {
      return "fail";
    }
  }
  
}