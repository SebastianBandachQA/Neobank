package UnitTests;

import BaseTest.BaseTestClass;
import Pages.Enums.Credentials;
import helper.Helper;
import io.qameta.allure.Description;
import org.testng.annotations.Test;

import static Pages.Enums.Credentials.CORECT_LOGIN;
import static Pages.Enums.Credentials.PASSWORD;

public class Validate extends BaseTestClass {

    @Test
    @Description("Funkcja formatująca kwotę zwraca 48 320,50 zł dla wartości 48320.50")
    public void rightReturnAmmount(){
        login.act()
                .login(CORECT_LOGIN)
                .password(PASSWORD)
                .buttonLoginClick();
        login.veryfi()
                .desktopVisible();

    }
}
