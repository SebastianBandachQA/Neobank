package Pages.Login;

import Pages.Enums.Credentials;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

import static Pages.Enums.Credentials.*;
import static Pages.Enums.Credentials.CORECT_LOGIN;


public class LoginActController {
    private WebDriver driver = new ChromeDriver();

    public LoginActController login (Credentials value){
        driver.findElement(By.id("login-email")).sendKeys(value.toString());
//        driver.findElement(By.id("login-password")).sendKeys(value);
//        driver.findElement(By.id("btn-login")).click();
        return this;
    }
    public LoginActController password(Credentials value){
        driver.findElement(By.id("login-password")).sendKeys(value.toString());
        return this;

    }
    public LoginActController ButtonLoginClick (){
        driver.findElement(By.id("btn-login")).click();
        return this;


    }
    public LoginActController BundleCorrectLogin(Credentials value){
        driver.findElement(By.id("login-email")).sendKeys(CORECT_LOGIN.toString());
        driver.findElement(By.id("login-password")).sendKeys(PASSWORD.toString());
        driver.findElement(By.id("btn-login")).click();
        return this;


    }

}
