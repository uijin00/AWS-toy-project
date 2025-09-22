package toyproject.demo.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import toyproject.demo.Entity.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long>{
    // 로그인
    boolean existsByNicknameAndPassword(String nickname, String password);

    // 닉네임 중복 확인
    boolean existsByNickname(String nickname);
}
