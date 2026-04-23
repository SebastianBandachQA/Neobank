package helper;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;

public class DriverFactory {

    public static WebDriver driver;
    private static WebDriverWait wait;

    private DriverFactory(){
        // prevent instantiation
    }

    public static WebDriver getChromeDriver(){
            driver = new ChromeDriver();
            return driver;
    }
}