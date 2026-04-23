package Pages.Desktop;

import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.testng.Assert;

import static helper.DriverFactory.driver;

public class DesktopVerifyController {
    public DesktopVerifyController insertAmmountModal(){
        WebElement popapModal = driver.findElement(By.id("toast-container"));
        Assert.assertTrue(popapModal.isDisplayed());
        return this;

    }
}
