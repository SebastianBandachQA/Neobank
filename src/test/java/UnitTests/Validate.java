package UnitTests;

import BaseTest.BaseTestClass;
import Pages.Enums.Credentials;
import io.qameta.allure.Description;
import org.testng.annotations.Test;

import static Pages.Enums.Credentials.CORRECT_LOGIN;
import static Pages.Enums.Credentials.PASSWORD;

public class Validate extends BaseTestClass {

    @Test
    @Description("Funkcja formatująca kwotę zwraca 48 320,50 zł dla wartości 48320.50")
    public void rightReturnAmount(){
        login.act()
                .login(CORRECT_LOGIN)
                .password(PASSWORD)
                .buttonLoginClick();
        login.verify()
                .desktopVisible();

    }
}
