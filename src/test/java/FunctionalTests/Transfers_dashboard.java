package FunctionalTests;

import BaseTest.BaseTestClass;
import Pages.Enums.Credentials;
import io.qameta.allure.Description;
import org.testng.annotations.Test;

public class Transfers_dashboard extends BaseTestClass {
    @Test
    @Description("Przycisk Wyślij przelew jest nieaktywny gdy pole kwoty jest puste")
    public void transferIsInactiveIfTransferFieldIsEmpty(){
        login.act()
                .login(Credentials.CORRECT_LOGIN)
                .password(Credentials.PASSWORD)
                .buttonLoginClick();
        desktop.act()
                .quickTransferDesktopButton();
        desktop.verify()
                .insertAmountModal();
    }
    @Test
    @Description("Przelew z kwotą wyższą niż dostępne saldo jest blokowany z komunikatem")
    public void transferForAnAmountGreaterThanTheAvailableBalance(){
        login.act()
                .login(Credentials.CORRECT_LOGIN)
                .password(Credentials.PASSWORD)
                .buttonLoginClick();
        desktop.act()
                .quickAmount("50 000")
                .selectQuickTransferPerson()
                .quickTransferDesktopButton();
        desktop.verify()
                .notEnoughFundsModalIsDisplayed();
    }
    @Test
    @Description("Full Desktop Displayed")
    public void testDesktop(){
        login.act()
                .login(Credentials.CORRECT_LOGIN)
                .password(Credentials.PASSWORD)
                .buttonLoginClick();
        desktop.verify()
                .fullDesktopSectionIsDisplayed();
    }
}
