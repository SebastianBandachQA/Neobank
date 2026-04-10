package Smoke;

import BaseTest.BaseTestClass;
import net.bytebuddy.build.ToStringPlugin;
import org.openqa.selenium.By;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.annotations.Test;

import java.security.PublicKey;

public class LoginTest extends BaseTestClass {

    @Test
    public void SmokeRuneUpTest(){
        driver.get(LOGIN);


    }

    @Test
    public void wrongLogin(){
        driver.findElement(By.id("login-email")).sendKeys("belobelo@wp.pl");
        driver.findElement(By.id("login-password")).sendKeys("4444");
        driver.findElement(By.id("btn-login")).click();
    }

}
