package Pages.Login;
import helper.Helper;
import org.assertj.core.api.Assertions;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.testng.Assert;

import static helper.DriverFactory.driver;

public class LoginVeryfiController {

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
