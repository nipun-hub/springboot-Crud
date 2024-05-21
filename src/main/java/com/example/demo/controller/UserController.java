package com.example.demo.controller;

import com.example.demo.dto.UserDto;
import com.example.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "api/v1/User")
@CrossOrigin
public class UserController {
    @Autowired
    private UserService userService;

    @GetMapping("/getUsers")
    public List<UserDto> getUser(){
        return userService.getAllUsers();
    }

    @PostMapping("/saveUser")
    public  UserDto saveUser(@RequestBody UserDto userDto){
        return userService.saveUser(userDto);
    }

    @PutMapping("/updateUser")
    public  UserDto updateUser(@RequestBody UserDto userDto){
        return userService.updateUser(userDto);
    }

    @DeleteMapping("/deletUser")
    public  boolean delettUser(@RequestBody UserDto userDto){
        return userService.deleteUser(userDto);
    }

    @GetMapping("/getUserByUserId/{userID}")
    public UserDto getUserByUserId(@PathVariable String userID){
        return userService.getUserByUserId(userID);
    }

    @GetMapping("/getUserByIdAndName/{userId}/{name}")
    public UserDto getUserByIdAndName(@PathVariable String userId,@PathVariable String name){
        return userService.getUserByIdAndName(userId,name);
    }
}
