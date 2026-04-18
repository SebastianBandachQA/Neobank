package BaseTest;

import Pages.Desktop.DesktopPage;
import Pages.Login.LoginPage;
import helper.DriverFactory;
import helper.Helper;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;

import java.time.Duration;

public class BaseTestClass {

    protected static final String PREFIX = "file:///" + System.getProperty("user.dir") + "\\src\\web\\";
    public static final String START = PREFIX + "index.html";// i zmienić tu nazwę na START
    protected WebDriver driver;

    /*
    Jest opcja zeby zrobić @BforeSuite. W senssie to co jkest teraz w Before method  zrobic jako BeforeSuite a w before method zostawić samo driver.get(LOGIN);
    i też zmienić @AfterMethod na @AfterSuite
     */

    @BeforeMethod
    public WebDriver Starter(){
        driver = DriverFactory.getChromeDriver();
        driver.manage().window().maximize();
        driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(5));
        driver.get(START);// Zmienić tu nazwę na START
        return driver;
    }
    public LoginPage login = LoginPage.getLoginPage();
    public DesktopPage desktop = DesktopPage.getDesktopPage();


    @AfterMethod(alwaysRun = true)
    public void close(){
        driver.quit();
        DriverFactory.driver = null;// Zeruje Drivera
    }
}
