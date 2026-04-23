package Pages.Desktop;


import helper.Wait;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;

import static helper.DriverFactory.driver;
//Muszę pododawać switch to do tych wszystkich modali z belki bocznej

public class DesktopActController {
    public DesktopActController quickTransferDesktopButton(){
        WebElement quickTransferDesktop = driver.findElement(By.id("btn-quick-send"));
        quickTransferDesktop.click();
        Wait.pause();
        return this;
    }
    public DesktopActController switchToMyAccounts(){
        WebElement myAccountsButton = driver.findElement(By.id("nav-accounts"));
        myAccountsButton.click();
        Wait.pause();
        return this;
    }
    public DesktopActController switchToTransfers(){
        driver.findElement(By.id("nav-transfers")).click();
        Wait.pause();
        return this;
    }
    public DesktopActController switchToHistory(){
        driver.findElement(By.id("nav-history")).click();
        Wait.pause();
        return this;
    }
    public DesktopActController switchToCards(){
        driver.findElement(By.id("nav-cards")).click();
        Wait.pause();
        return this;

    }
    public DesktopActController switchToLoans() {
        driver.findElement(By.id("nav-loans")).click();
        Wait.pause();
        return this;
    }
    public DesktopActController switchToPayments(){
        driver.findElement(By.id("nav-payments")).click();
        Wait.pause();
        return this;
    }
    public DesktopActController switchToSearch(){
        driver.findElement(By.id("nav-search")).click();
        Wait.pause();
        return this;
    }
    public DesktopActController switchToSettings(){
        driver.findElement(By.id("nav-settings")).click();
        Wait.pause();
        return this;
    }
    public DesktopActController switchToSupport(){
        driver.findElement(By.id("nav-support")).click();
        Wait.pause();
        return this;
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
