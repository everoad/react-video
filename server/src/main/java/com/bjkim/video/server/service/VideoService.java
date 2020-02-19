package com.bjkim.video.server.service;

import java.util.List;

import com.bjkim.video.server.domain.dto.SearchDTO;
import com.bjkim.video.server.domain.dto.VideoDTO;

public interface VideoService {

  public List<VideoDTO> findVideosAPI(String type, SearchDTO searchDTO) throws Exception;

}