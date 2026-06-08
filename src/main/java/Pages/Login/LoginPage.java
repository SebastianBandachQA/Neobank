package Pages.Login;

public class LoginPage {


    private LoginActController act;
    private LoginVerifyController verify;


    public LoginActController act(){
        return act;
    }
    public LoginVerifyController verify(){
        return verify;
    }
    public LoginPage(LoginActController act, LoginVerifyController verify) {
        this.act = act;
        this.verify = verify;
    }

    public static LoginPage getLoginPage(){
        return new LoginPage(new LoginActController(),
                new LoginVerifyController());
    }
}
