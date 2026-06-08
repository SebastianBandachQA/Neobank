package helper;

import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;

import static helper.DriverFactory.driver;

public class Wait {

    private static final Duration DEFAULT_TIMEOUT = Duration.ofSeconds(5);

    private static WebDriverWait waitUntil() {
        return new WebDriverWait(driver, DEFAULT_TIMEOUT);
    }

    public static WebElement visible(By locator) {
        return waitUntil().until(ExpectedConditions.visibilityOfElementLocated(locator));
    }

    public static WebElement clickable(By locator) {
        return waitUntil().until(ExpectedConditions.elementToBeClickable(locator));
    }

    public static boolean textToBe(By locator, String text) {
        return waitUntil().until(ExpectedConditions.textToBe(locator, text));
    }

    public static void pause() {
        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }
    }
}