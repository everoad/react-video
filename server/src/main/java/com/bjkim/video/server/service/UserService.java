package com.bjkim.video.server.service;

import java.util.List;

import com.bjkim.video.server.domain.dto.UserDTO;

public interface UserService {


  public List<UserDTO.list> findUserList();

  public UserDTO.one findUser(String id);

  public UserDTO.one addUser(UserDTO.save userDTO);

  public UserDTO.one updateUser(UserDTO.save userDTO);

  public String deleteUser(String id);

}