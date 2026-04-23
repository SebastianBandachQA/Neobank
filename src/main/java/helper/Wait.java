package helper;

import org.openqa.selenium.support.ui.WebDriverWait;

public class Wait {

    public static void pause() {
        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            throw new RuntimeException(e);

        }
    }

    /*
    To niżej to fajny Wait. pomyśleć nad jego wdrożeniem
     */

//    public static WebDriverWait getWebDriverWait(){
//        if(wait == null){
//            wait = new WebDriverWait(getChromeDriver(), 5);
//        }
//        return wait;



}
