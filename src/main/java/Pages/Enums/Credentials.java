package Pages.Enums;

public enum  Credentials {

    CORECT_LOGIN("anna@example.pl"), PASSWORD("Admin123!"), WRONG_LOGIN("anna2example.pl");

    private String value;

    Credentials(String value) {
        this.value = value;
    }
    @Override
    public String toString(){
        return value;
    }
}
