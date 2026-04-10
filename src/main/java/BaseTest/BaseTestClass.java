package BaseTest;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;

import java.time.Duration;

public class BaseTestClass {

    protected static final String PREFIX = "file:///" + System.getProperty("user.dir") + "\\src\\web\\";
    protected static final String LOGIN = PREFIX + "index.html";
    protected WebDriver driver;

    @BeforeMethod
    public WebDriver Starter(){
        driver = new ChromeDriver();
        driver.manage().window().maximize();
        driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(5));
        driver.get(LOGIN);
        return driver;
    }

    @AfterMethod(alwaysRun = true)
    public void close(){
        driver.quit();
    }
}
