package Pages.Desktop;

public class DesktopPage {
    private DesktopActController act;
    private DesktopVeryfiController veryfi;

    public DesktopActController act(){
        return act;
    }

    public DesktopVeryfiController veryfi(){
        return veryfi;
    }

    public DesktopPage(DesktopVeryfiController veryfi, DesktopActController act) {
        this.veryfi = veryfi;
        this.act = act;
    }
    public static DesktopPage getDesktopPage(){
        return new DesktopPage(new DesktopVeryfiController(),
                new DesktopActController());
    }
}
