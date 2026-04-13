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

        if(driver == null){
            System.setProperty("webdriver.chrome.driver","C:\\chromedriver.exe");
            driver = new ChromeDriver();
        }
        return driver;
    }

    public static WebDriverWait getWebDriverWait(){// ten wait jest całkiem spoko bo jest zrobiiony tak ze czeka az element się pokarze
        if(wait == null){
            wait = new WebDriverWait(getChromeDriver(), Duration.ofSeconds(5));
        }
        return wait;
    }
}