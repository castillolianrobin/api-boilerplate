import { User } from "../../User/entities";
import { ENV } from "../../constants";

export const emailVerification = (user: User) => `
<html>
  <body>
    <p>Hello ${user.userInfo?.firstName || 'Guest'},</p>
    
    <p>
      You registered an account on ${ENV.APP_NAME}, before being able to use your account you need to verify that this is your email address by clicking here: 
    </p>
    <a 
      href="${ENV.CLIENT_URL}/verify/?token=${encodeURI(user.token || '')}&email=${encodeURI(user.email)}"
    >
      Verify Email
    </a>
    
    <p>
      Kind Regards, ${ENV.APP_NAME}
    </p>
</body>

</html>
`;