package FunctionalTests;

import BaseTest.BaseTestClass;
import Pages.Enums.Credentials;
import io.qameta.allure.Description;
import org.testng.annotations.Test;

public class Transfers extends BaseTestClass {
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
}
