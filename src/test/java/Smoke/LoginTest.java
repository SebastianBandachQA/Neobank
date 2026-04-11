package Smoke;

import BaseTest.BaseTestClass;
import helper.Helper;
import io.qameta.allure.Description;
import org.assertj.core.api.Assertions;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.testng.Assert;
import org.testng.annotations.Test;

public class LoginTest extends BaseTestClass {
    @Test
    @Description("Sprawdzenie czy w ogóle aplikacja się uruchamia")
    public void SmokeRuneUpTest(){
        driver.get(LOGIN);


    }

    @Test
    @Description("Logowanie z błędnym hasłem — użytkownik podaje poprawny e-mail ale złe hasło, oczekiwany wynik: komunikat o błędzie")
    public void wrongLogin(){
        driver.findElement(By.id("login-email")).sendKeys("belobelo@wp.pl");
        driver.findElement(By.id("login-password")).sendKeys("4444");
        driver.findElement(By.id("btn-login")).click();
    }


    @Test
    public void RightLogin(){
        driver.findElement(By.id("login-email")).sendKeys("belobelo@wp.pl");
        driver.findElement(By.id("login-password")).sendKeys("147258");
        driver.findElement(By.id("btn-login")).click();
        Helper.pause();
        WebElement toolbar = driver.findElement(By.id("topbar-title"));

        Assert.assertEquals(toolbar.getText(),"Pulpit");

    }

}
