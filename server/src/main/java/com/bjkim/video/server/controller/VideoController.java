package com.bjkim.video.server.controller;

import java.util.List;

import com.bjkim.video.server.domain.dto.SearchDTO;
import com.bjkim.video.server.domain.dto.VideoDTO;
import com.bjkim.video.server.service.VideoService;

import org.springframework.web.bind.annotation.RestController;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@AllArgsConstructor
public class VideoController {

  private VideoService videoService;

  @GetMapping(value="/{type}/search")
  public List<VideoDTO> findVideoItems(@PathVariable("type") String type, SearchDTO searchDTO) throws Exception {
    return videoService.findVideosAPI(type, searchDTO);
  }
  
}