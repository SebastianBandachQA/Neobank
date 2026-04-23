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
    public void SmokeRuneUpTest(){
        login.veryfi()
                .loginPageisDisplayed();


    }
    @Test
    @Description("Formularz logowania zawiera pole e-mail, hasło i przycisk submit")
    public void VeryfiNames(){
        login.veryfi()
                .loginPageisDisplayed()
                .emaillabelDisplayed()
                .passwordLabelDispayed()
                .loginbuttonDisplayed();
    }



    @Test
    @Description("Logowanie z poprawnymi danymi — użytkownik podaje prawidłowy e-mail i hasło, oczekiwany wynik: przejście do pulpitu")
    public void RightLogin(){
        login.act()
                .login(CORRECT_LOGIN)
                .password(PASSWORD)
                .buttonLoginClick();
        login.veryfi()
                .desktopVisible();

    }

}
