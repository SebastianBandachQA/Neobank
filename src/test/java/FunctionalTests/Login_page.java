package FunctionalTests;

import BaseTest.BaseTestClass;
import io.qameta.allure.Description;
import org.testng.annotations.Test;

import static Pages.Enums.Credentials.*;

public class Login_page extends BaseTestClass {

    @Test
    @Description("Logowanie z błędnym hasłem — użytkownik podaje zły e-mail ale poprawne hasło, oczekiwany wynik: komunikat o błędzie")
    public void wrongLogin(){
        login.act()
                .login(WRONG_LOGIN)
                .password(PASSWORD)
                .buttonLoginClick();
        login.veryfi()
                .wrongLoginMessage();
    }

    @Test
    @Description("Puste pole e-mail przy próbie logowania wyświetla komunikat walidacji")
    public void emailIsEmpty(){
        login.act()
                .login(EMPTY)
                .password(PASSWORD)
                .buttonLoginClick();
        login.veryfi()
                .wrongLoginMessage();
    }
}