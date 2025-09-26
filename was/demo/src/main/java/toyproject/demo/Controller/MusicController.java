package toyproject.demo.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import toyproject.demo.DTO.APIResponse;
import toyproject.demo.Service.S3Service;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.function.Predicate;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/music")
public class MusicController {
    @Autowired
    private S3Service s3Service;

    // 음악 리스트 반환
    @GetMapping("/playlist")
    public ResponseEntity<List<Map<String, String>>> getPlaylist(){
        List<String> musicUrls = s3Service.getMusicFiles();

        List<Map<String, String>> playlistData = musicUrls.stream()
                .map(url -> {
                    String musicName;
                    try {
                        String fileName = url.substring(url.lastIndexOf("/") + 1);
                        // UTF-8로 URL 디코딩
                        musicName = URLDecoder.decode(fileName, "UTF-8");
                    } catch (UnsupportedEncodingException e) {
                        e.printStackTrace();
                        musicName = "파일 이름 오류";
                    }

                    Map<String, String> item = new HashMap<>();
                    item.put("src", url);     // 실제 음원 파일 URL
                    item.put("title", musicName); // 화면에 표시될 파일 이름
                    return item;
                })
                .collect(Collectors.toList());

        return ResponseEntity.ok(playlistData);
    }


}

