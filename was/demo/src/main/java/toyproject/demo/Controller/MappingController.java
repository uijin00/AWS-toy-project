package toyproject.demo.Controller;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import toyproject.demo.Service.S3Service;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.List;
import java.util.stream.Collectors;


@Controller
@RequiredArgsConstructor
public class MappingController {
    @Autowired
    private S3Service s3Service;

    // 랜딩 페이지
    @GetMapping("/")
    public String landing() {
        return "landing";
    }

    // 로그인 페이지
    @GetMapping("/login")
    public String login() {
        return "login";
    }

    // 회원가입 페이지
    @GetMapping("/register")
    public String signup() {
        return "register";
    }

    // 음악재생 페이지
    @RequestMapping("/music")
    public String musicPlayer(Model model) {
        List<String> musicUrls = s3Service.getMusicFiles();

        // S3 URL에서 파일명만 추출하고 URL 디코딩
        List<String> musicNames = musicUrls.stream()
                .map(url -> {
                    try {
                        String fileName = url.substring(url.lastIndexOf("/") + 1);
                        // UTF-8로 URL 디코딩
                        return URLDecoder.decode(fileName, "UTF-8");
                    } catch (UnsupportedEncodingException e) {
                        e.printStackTrace();
                        return "파일 이름 오류";
                    }
                })
                .collect(Collectors.toList());

        model.addAttribute("musicUrls", musicUrls); // 오디오 소스용 URL 리스트
        model.addAttribute("musicNames", musicNames); // 화면 표시용 파일명 리스트
        return "musicPlayer"; // musicPlayer.html 템플릿 반환
    }
}
