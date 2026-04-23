package FunctionalTests;

import BaseTest.BaseTestClass;
import Pages.Enums.Credentials;
import io.qameta.allure.Description;
import org.testng.annotations.Test;

public class Transfers_dashboard extends BaseTestClass {
    @Test
    @Description("Przycisk Wyślij przelew jest nieaktywny gdy pole kwoty jest puste")
    public void transferIsInActiveIfTransferFieldIsEmpty(){
        login.act()
                .login(Credentials.CORRECT_LOGIN)
                .password(Credentials.PASSWORD)
                .buttonLoginClick();
        desktop.act()
                .quickTransferDesktopButton();
        desktop.veryfi()
                .insertAmmountModal();
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
    }
}
