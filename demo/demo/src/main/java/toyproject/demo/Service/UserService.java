package toyproject.demo.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import toyproject.demo.Entity.User;
import toyproject.demo.Repository.UserRepository;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    // 로그인
    public boolean login(String nickname, String password) {
        try {
            return userRepository.findByNicknameAndPassword(nickname, password);
        } catch (Exception e) {
            return false;
        }
    }

    // 닉네임 중복 확인
    public boolean checkNickname(String nickname){
        try {
            return userRepository.existsByNickname(nickname);
        } catch (Exception e) {
            return false;
        }
    }

    // 회원가입
    public void save(User user) {
        userRepository.save(user);
    }
}
