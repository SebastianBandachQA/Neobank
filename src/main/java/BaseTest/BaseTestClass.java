package BaseTest;

import helper.Helper;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;

import java.time.Duration;

public class BaseTestClass {

    protected static final String PREFIX = "file:///" + System.getProperty("user.dir") + "\\src\\web\\";
    protected static final String LOGIN = PREFIX + "index.html";// i zmienić tu nazwę na START
    protected WebDriver driver;

    /*
    Jest opcja zeby zrobić @BforeSuite. W senssie to co jkest teraz w Before method  zrobic jako BeforeSuite a w before method zostawić samo driver.get(LOGIN);
    i też zmienić @AfterMethod na @AfterSuite
     */

    @BeforeMethod
    public WebDriver Starter(){
        driver = new ChromeDriver();
        driver.manage().window().maximize();
        driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(5));
        driver.get(LOGIN);// Zmienić tu nazwę na START
        return driver;
    }

    @AfterMethod(alwaysRun = true)
    public void close(){
        driver.quit();
    }
}
