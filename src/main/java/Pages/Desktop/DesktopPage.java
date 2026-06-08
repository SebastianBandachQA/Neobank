package Pages.Desktop;

public class DesktopPage {
    private DesktopActController act;
    private DesktopVerifyController verify;

    public DesktopActController act(){
        return act;
    }

    public DesktopVerifyController verify(){
        return verify;
    }

    public DesktopPage(DesktopVerifyController verify, DesktopActController act) {
        this.verify = verify;
        this.act = act;
    }
    public static DesktopPage getDesktopPage(){
        return new DesktopPage(new DesktopVerifyController(),
                new DesktopActController());
    }
}
