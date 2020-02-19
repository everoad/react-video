package com.bjkim.video.server.service.impl;

import java.util.Arrays;
import java.util.List;

import com.bjkim.video.server.domain.dto.SearchDTO;
import com.bjkim.video.server.domain.dto.VideoDTO;
import com.bjkim.video.server.lib.ApiType;
import com.bjkim.video.server.service.VideoService;

import org.springframework.stereotype.Service;


@Service
public class VideoServiceImpl implements VideoService {

  @Override
  public List<VideoDTO> findVideosAPI(String type, SearchDTO searchDTO) throws Exception {
    VideoDTO dto = new VideoDTO();
    dto.setId("1");
    dto.setTitle("Hello World");
    dto.setDescription("GAGAGA");
    ApiType api = ApiType.findApiType(type);
    dto.setId(String.valueOf(api.getTest()));
    return Arrays.asList(dto);
  }
}