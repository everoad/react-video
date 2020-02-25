package com.bjkim.video.server.controller;

import org.springframework.web.bind.annotation.RestController;

import lombok.AllArgsConstructor;

import java.util.List;

import com.bjkim.video.server.domain.dto.ApiResponse;
import com.bjkim.video.server.domain.dto.UserDTO;
import com.bjkim.video.server.service.UserService;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;




@RestController
@AllArgsConstructor
public class UserController {

  private UserService userService;

  
  @GetMapping("/user")
  public List<UserDTO.list> getUserList() {
    return userService.findUserList();
  }

  @GetMapping("/user/{id}")
  public UserDTO.one getUser(@PathVariable String id) {
    return userService.findUser(id);
  }

  @PostMapping("/user")
  public UserDTO.one addUser(@RequestBody UserDTO.save userDTO) {
      return userService.addUser(userDTO);
  }

  @PutMapping("/user/{id}")
  public UserDTO.one editUser(@PathVariable String id, @RequestBody UserDTO.save userDTO) {
    userDTO.setId(id);
    return userService.updateUser(userDTO);
  }
  
  @DeleteMapping("/user/{id}")
  public String removeUser(@PathVariable String id) {
    return userService.deleteUser(id);
  }
  
}