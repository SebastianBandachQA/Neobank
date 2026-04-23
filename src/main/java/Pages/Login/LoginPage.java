package Pages.Login;

public class LoginPage {


    private LoginActController act;
    private LoginVerifyController veryfi;


    public LoginActController act(){
        return act;
    }
    public LoginVerifyController veryfi(){
        return veryfi;
    }
    public LoginPage(LoginActController act, LoginVerifyController veryfi) {
        this.act = act;
        this.veryfi = veryfi;
    }

    public static LoginPage getLoginPage(){
        return new LoginPage(new LoginActController(),
                new LoginVerifyController());
    }
}
