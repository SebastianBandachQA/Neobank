package Pages.Desktop;


import helper.Wait;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;

import static helper.DriverFactory.driver;

public class DesktopActController {
    public void quickTransferDesktopButton(){
        WebElement quickTransferDesktop = driver.findElement(By.id("btn-quick-send"));
        quickTransferDesktop.click();
        Wait.pause();

    }
    public void switchToMyAccounts(){
        WebElement myAccountsButton = driver.findElement(By.id("nav-accounts"));
        myAccountsButton.click();
        Wait.pause();
    }
    public void switchToTransfers(){
        driver.findElement(By.id("nav-transfers")).click();
        Wait.pause();

    }
    public void switchToHistory(){
        driver.findElement(By.id("nav-history")).click();
        Wait.pause();
    }
    public void switchToCards(){
        driver.findElement(By.id("nav-cards")).click();
        Wait.pause();

    }
    public void switchToLoans() {
        driver.findElement(By.id("nav-loans")).click();
        Wait.pause();
    }
    public void switchToPayments(){
        driver.findElement(By.id("nav-payments")).click();
        Wait.pause();
    }
    public void switchToSearch(){
        driver.findElement(By.id("nav-search")).click();
        Wait.pause();
    }
    public void switchToSettings(){
        driver.findElement(By.id("nav-settings")).click();
        Wait.pause();

    }
    public void switchToSupport(){
        driver.findElement(By.id("nav-support")).click();
        Wait.pause();

    }
    public DesktopActController quickAmount(String number){
        WebElement amountField = driver.findElement(By.id("quick-amount"));
        amountField.sendKeys(number);
        return this;
    }
    public DesktopActController selectQuickTransferPerson(){
        driver.findElement(By.cssSelector("#quick-contacts > div:nth-child(1)")).click();
        Wait.pause();
        return this;
    }

}
