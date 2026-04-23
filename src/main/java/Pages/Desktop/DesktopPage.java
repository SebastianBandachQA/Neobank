package Pages.Desktop;

public class DesktopPage {
    private DesktopActController act;
    private DesktopVerifyController veryfi;

    public DesktopActController act(){
        return act;
    }

    public DesktopVerifyController veryfi(){
        return veryfi;
    }

    public DesktopPage(DesktopVerifyController veryfi, DesktopActController act) {
        this.veryfi = veryfi;
        this.act = act;
    }
    public static DesktopPage getDesktopPage(){
        return new DesktopPage(new DesktopVerifyController(),
                new DesktopActController());
    }
}
