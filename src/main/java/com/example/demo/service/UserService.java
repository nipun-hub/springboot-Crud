package com.example.demo.service;

import com.example.demo.dto.UserDto;
import com.example.demo.repo.UserRepo;
import com.example.demo.entity.User;
import jakarta.transaction.Transactional;
//import org.apache.catalina.User;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.security.PublicKey;
import java.util.List;

@Service
@Transactional
public class UserService {
    @Autowired
    private UserRepo userRepo;
    @Autowired
    private ModelMapper modelMapper;

    public UserDto saveUser(UserDto userDto){
        userRepo.save(modelMapper.map(userDto, User.class));
        return  userDto;
    }

    public List<UserDto> getAllUsers(){
        List<User>userList=userRepo.findAll();
        return modelMapper.map(userList,new TypeToken<List<UserDto>>(){}.getType());
    }

    public UserDto updateUser(UserDto userDto){
        userRepo.save(modelMapper.map(userDto , User.class));
        return userDto;
    }

    public boolean deleteUser(UserDto userDto){
        userRepo.delete(modelMapper.map(userDto,User.class));
        return true;
    }

    // user id > show user details
    public UserDto getUserByUserId(String userID){
        User user = userRepo.getUserByUserId(userID);
        return modelMapper.map(user,UserDto.class);
    }

    // user and name  > show datails
    public UserDto getUserByIdAndName(String userId,String name){
        User user = userRepo.getUserByIdAndName(userId,name);
        return  modelMapper.map(user,UserDto.class);
    }
}
