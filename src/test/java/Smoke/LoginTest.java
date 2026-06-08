package Smoke;

import BaseTest.BaseTestClass;
import io.qameta.allure.Description;
import org.testng.annotations.Test;

import static Pages.Enums.Credentials.*;
import static Pages.Enums.Credentials.CORRECT_LOGIN;
import static Pages.Enums.Credentials.PASSWORD;

/*
Czyli by zrobić fluent interface najlepiej dla każdego modułu jakim jest login, pulpit moje konta, historia
przelwey, karty, kredyty, płatności, wyszukiwanie , ustawienia i wsparcie zrobić osobna klase i w tych klasach metyody odpowiadające za akcje ,
 */

public class LoginTest extends BaseTestClass {


    @Test
    @Description("Sprawdzenie czy w ogóle aplikacja się uruchamia")
    public void smokeRunUpTest(){
        login.verify()
                .loginPageIsDisplayed();


    }
    @Test
    @Description("Formularz logowania zawiera pole e-mail, hasło i przycisk submit")
    public void verifyNames(){
        login.verify()
                .loginPageIsDisplayed()
                .emailLabelDisplayed()
                .passwordLabelDisplayed()
                .loginButtonDisplayed();
    }



    @Test
    @Description("Logowanie z poprawnymi danymi — użytkownik podaje prawidłowy e-mail i hasło, oczekiwany wynik: przejście do pulpitu")
    public void rightLogin(){
        login.act()
                .login(CORRECT_LOGIN)
                .password(PASSWORD)
                .buttonLoginClick();
        login.verify()
                .desktopVisible();

    }

}
