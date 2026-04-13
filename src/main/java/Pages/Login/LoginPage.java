package Pages.Login;

public class LoginPage {


    private LoginActController act;
    private LoginVeryfiController veryfi;


    public LoginActController act(){
        return act;
    }
    public LoginVeryfiController veryfi(){
        return veryfi;
    }
    public LoginPage(LoginActController act, LoginVeryfiController veryfi) {
        this.act = act;
        this.veryfi = veryfi;
    }

    public static LoginPage getLoginPage(){
        return new LoginPage(new LoginActController(),
                new LoginVeryfiController());
    }
}
