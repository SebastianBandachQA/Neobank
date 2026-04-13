package Smoke;

import BaseTest.BaseTestClass;
import Pages.Enums.Credentials;
import Pages.Login.LoginPage;
import helper.Helper;
import io.qameta.allure.Description;
import org.assertj.core.api.Assertions;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.testng.Assert;
import org.testng.annotations.Test;

/*
Czyli by zrobić fluent interface najlepiej dla każdego modułu jakim jest login, pulpit moje konta, historia
przelwey, karty, kredyty, płatności, wyszukiwanie , ustawienia i wsparcie zrobić osobna klase i w tych klasach metyody odpowiadające za akcje ,
 */

public class LoginTest extends BaseTestClass {


    @Test
    @Description("Sprawdzenie czy w ogóle aplikacja się uruchamia")
    public void SmokeRuneUpTest(){
        WebElement LoginPage = driver.findElement(By.id("page-login"));
        Helper.pause();
        Assert.assertTrue(LoginPage.isDisplayed());


    }

    @Test
    @Description("Logowanie z błędnym hasłem — użytkownik podaje poprawny e-mail ale złe hasło, oczekiwany wynik: komunikat o błędzie")
    public void wrongLogin(){
        login.act()
                .login(Credentials.WRONG_LOGIN)
                .password(Credentials.PASSWORD)
                .ButtonLoginClick();
    }


    @Test
    @Description("Logowanie z poprawnymi danymi — użytkownik podaje prawidłowy e-mail i hasło, oczekiwany wynik: przejście do pulpitu")
    public void RightLogin(){
        driver.findElement(By.id("login-email")).sendKeys("belobelo@wp.pl");
        driver.findElement(By.id("login-password")).sendKeys("147258");
        driver.findElement(By.id("btn-login")).click();
        Helper.pause();
        WebElement toolbar = driver.findElement(By.id("topbar-title"));
        Helper.pause();

        Assert.assertEquals(toolbar.getText(),"Pulpit");

    }

}
