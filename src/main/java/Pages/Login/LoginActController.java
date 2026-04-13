package Pages.Login;

import Pages.Enums.Credentials;
import helper.Helper;
import org.openqa.selenium.By;


import static Pages.Enums.Credentials.*;
import static Pages.Enums.Credentials.CORECT_LOGIN;
import static helper.DriverFactory.driver;


public class LoginActController {

    public LoginActController login (Credentials value){
        driver.findElement(By.id("login-email")).sendKeys(value.toString());
        return this;
    }
    public LoginActController password(Credentials value){
        driver.findElement(By.id("login-password")).sendKeys(value.toString());
        return this;

    }
    public LoginActController buttonLoginClick (){
        driver.findElement(By.id("btn-login")).click();
        Helper.pause();
        return this;


    }
    public LoginActController BundleCorrectLogin(Credentials credentials){
        driver.findElement(By.id("login-email")).sendKeys(CORECT_LOGIN.toString());
        driver.findElement(By.id("login-password")).sendKeys(PASSWORD.toString());
        driver.findElement(By.id("btn-login")).click();
        Helper.pause();
        return this;


    }

}
