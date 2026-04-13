package Pages.Login;
import helper.Helper;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.testng.Assert;

import static helper.DriverFactory.driver;

public class LoginVeryfiController {

    public LoginVeryfiController loginPageisDisplayed(){
        WebElement LoginPage = driver.findElement(By.id("page-login"));
        Helper.pause();
        Assert.assertTrue(LoginPage.isDisplayed());
        return this;
    }
    public LoginVeryfiController emaillabelDisplayed(){
        WebElement emailLabel = driver.findElement(By.cssSelector("#login-form > div:nth-child(1) > label"));
        Assert.assertTrue(emailLabel.isDisplayed());
        return this;

    }
    public LoginVeryfiController passwordLabelDispayed(){
        WebElement passwordLabel = driver.findElement(By.cssSelector("#login-form > div:nth-child(2) > label"));
        Assert.assertTrue(passwordLabel.isDisplayed());
        return this;
    }
    public LoginVeryfiController loginbuttonDisplayed(){
        WebElement buttonLogin = driver.findElement(By.id("btn-login"));
        Assert.assertTrue(buttonLogin.isDisplayed());
        return this;
    }

    public LoginVeryfiController wrongLoginMassage(){
        WebElement loginError = driver.findElement(By.id("login-error"));
        Assert.assertTrue(loginError.isDisplayed());
        return this;
    }
    public LoginVeryfiController desktopVisible(){
        WebElement toolbar = driver.findElement(By.id("topbar-title"));
        Assert.assertEquals(toolbar.getText(),"Pulpit");
        return this;
    }
}
