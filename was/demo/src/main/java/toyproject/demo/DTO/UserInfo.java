package toyproject.demo.DTO;


import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserInfo {
    private String nickname;
    private String password;
}
