package Pages.Login;
import helper.Wait;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.testng.Assert;

import static helper.DriverFactory.driver;

public class LoginVerifyController {

    public LoginVerifyController loginPageisDisplayed(){
        WebElement LoginPage = driver.findElement(By.id("page-login"));
        Wait.pause();
        Assert.assertTrue(LoginPage.isDisplayed());
        return this;
    }
    public LoginVerifyController emaillabelDisplayed(){
        WebElement emailLabel = driver.findElement(By.cssSelector("#login-form > div:nth-child(1) > label"));
        Assert.assertTrue(emailLabel.isDisplayed());
        return this;

    }
    public LoginVerifyController passwordLabelDispayed(){
        WebElement passwordLabel = driver.findElement(By.cssSelector("#login-form > div:nth-child(2) > label"));
        Assert.assertTrue(passwordLabel.isDisplayed());
        return this;
    }
    public LoginVerifyController loginbuttonDisplayed(){
        WebElement buttonLogin = driver.findElement(By.id("btn-login"));
        Assert.assertTrue(buttonLogin.isDisplayed());
        return this;
    }

    public LoginVerifyController wrongLoginMessage(){
        WebElement loginError = driver.findElement(By.id("login-error"));
        Assert.assertTrue(loginError.isDisplayed());
        return this;
    }
    public LoginVerifyController desktopVisible(){
        WebElement toolbar = driver.findElement(By.id("topbar-title"));
        Assert.assertEquals(toolbar.getText(),"Pulpit");
        return this;
    }
}
