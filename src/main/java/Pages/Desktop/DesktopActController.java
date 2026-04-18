package Pages.Desktop;

import helper.Helper;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;

import static helper.DriverFactory.driver;
//Muszę pododawać switch to do tych wszystkich modali z belki bocznej

public class DesktopActController {
    public DesktopActController quickTransferDesktopButton(){
        WebElement quickTransferDesktop = driver.findElement(By.id("btn-quick-send"));
        quickTransferDesktop.click();
        Helper.pause();
        return this;
    }
}
