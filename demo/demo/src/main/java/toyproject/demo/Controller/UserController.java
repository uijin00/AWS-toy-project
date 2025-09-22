package toyproject.demo.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import toyproject.demo.Configuration.SessionConst;
import toyproject.demo.DTO.APIResponse;
import toyproject.demo.DTO.UserInfo;
import toyproject.demo.Entity.User;
import toyproject.demo.Service.UserService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<APIResponse> register(@RequestBody UserInfo userInfo) {
        if(userService.checkNickname(userInfo.getNickname()))
            return ResponseEntity.status(HttpStatus.CONFLICT)
                        .body(new APIResponse(false, 409, "이미 존재하는 닉네임입니다.", userInfo));

        User newUser = new User(userInfo.getNickname(), userInfo.getPassword());
        userService.save(newUser);

        return ResponseEntity.status(HttpStatus.CREATED)
                        .body(new APIResponse(true, 201, "회원가입에 성공했습니다.", null));
    }
    
    @PostMapping("/login")
    public ResponseEntity<APIResponse> login(@RequestBody UserInfo userInfo, HttpServletRequest request) {
        if(userService.login(userInfo.getNickname(), userInfo.getPassword())){
            HttpSession session = request.getSession(true);
            session.setAttribute(SessionConst.Login_user, userInfo.getNickname());

            return ResponseEntity.status(HttpStatus.OK)
                        .body(new APIResponse(true, 200, "로그인에 성공했습니다.", null));
        } else    
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(new APIResponse(false, 401, "로그인에 실패했습니다.", userInfo));
    
    }

    @PostMapping("/logout")
    public ResponseEntity<APIResponse> logout(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (session != null) {
            session.invalidate();
        }
        return ResponseEntity.status(HttpStatus.OK)
                        .body(new APIResponse(true, 200, "로그아웃에 성공했습니다.", null));
    }
}
