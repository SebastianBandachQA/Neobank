package Pages.Desktop;

import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.testng.Assert;

import static helper.DriverFactory.driver;

public class DesktopVerifyController {
    public DesktopVerifyController insertAmountModal(){
        WebElement popupModal = driver.findElement(By.id("toast-container"));
        Assert.assertTrue(popupModal.isDisplayed());
        return this;
    }
    public DesktopVerifyController fullDesktopSectionIsDisplayed(){
        WebElement totalBalance = driver.findElement(By.className("stat-label"));
        Assert.assertTrue(totalBalance.isDisplayed());
        WebElement expenses = driver.findElement(By.xpath("//*[@id=\"stat-expenses\"]/div[1]"));
        Assert.assertTrue(expenses.isDisplayed());
        WebElement income = driver.findElement(By.id("stat-income"));
        Assert.assertTrue(income.isDisplayed());
        WebElement savings = driver.findElement(By.id("stat-savings"));
        Assert.assertTrue(savings.isDisplayed());
        WebElement card = driver.findElement(By.className("card"));
        Assert.assertTrue(card.isDisplayed());
        WebElement lastTransactions = driver.findElement(By.className("card-title"));
        Assert.assertTrue(lastTransactions.isDisplayed());
        WebElement budgetMonthly = driver.findElement(By.xpath("//*[@id=\"section-dashboard\"]/div[5]"));
        Assert.assertTrue(budgetMonthly.isDisplayed());
        return this;
    }
    public void notEnoughFundsModalIsDisplayed(){
        WebElement modal = driver.findElement(By.id("modal-box"));
        Assert.assertTrue(modal.isDisplayed());
    }
}
