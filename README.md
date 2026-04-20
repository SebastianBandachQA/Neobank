NeoBank

Prywatny projekt portfolio — aplikacja bankowości internetowej wraz z frameworkiem testów automatycznych. Projekt rozwijany na bieżąco.

![Java](https://img.shields.io/badge/Java-24-orange)
![Selenium](https://img.shields.io/badge/Selenium-4.41-green)
![TestNG](https://img.shields.io/badge/TestNG-7.12-red)
![Allure](https://img.shields.io/badge/Allure-2.33-yellow)
![AssertJ](https://img.shields.io/badge/AssertJ-4.0-blueviolet)
![Maven](https://img.shields.io/badge/Maven-3-blue)

O projekcie

Zbudowałem od zera aplikację bankową (frontend) oraz framework testów automatycznych pod nią. Chcę pokazać nie tylko że testuję, ale w jaki sposób projektuję testy — jako produkt software'owy, nie zbiór skryptów.

Repo pokazuje progres w czasie — po commitach widać jak myślę, jak refaktoryzuję i jakie podejmuję decyzje projektowe.

Aplikacja

NeoBank to jednostronicowa aplikacja bankowa (vanilla JS, bez frameworków) symulująca doświadczenie klienta banku. Moduły:

- Autoryzacja — logowanie z walidacją, rejestracja 4-stopniowa (dane osobowe, PESEL, kontakt, hasło)
- Pulpit — salda, wydatki miesięczne, budżet kategoriami, ostatnie transakcje, powiadomienia
- Moje konta — Konto Osobiste Premium, Oszczędnościowe, Walutowe EUR
- Przelewy — krajowy, zagraniczny, BLIK
- Historia transakcji — sortowanie, filtrowanie, paginacja
- Karty, Kredyty i Lokaty, Płatności z koszykiem, Wyszukiwarka, Ustawienia, Wsparcie

Wszystkie elementy interaktywne mają `data-testid` — aplikację projektowałem z myślą o testach.

## Framework testowy

Stack:

| Warstwa | Technologia | Wersja |
|---|---|---|
| Język | Java | 24 |
| Framework testowy | TestNG | 7.12 |
| UI Automation | Selenium WebDriver | 4.41 |
| Asercje | AssertJ + TestNG Assert | 4.0 |
| Raporty | Allure | 2.33 |
| Build | Maven | — |

Architektura opiera się na wzorcach projektowych:

- Page Object Pattern z klasycznym `driver.findElement()` zamiast PageFactory. Decyzja świadoma — lazy loading i mniejsza podatność na `StaleElementReferenceException` w Selenium 4+.
- Fluent Interface z method chainingiem — testy czytają się jak zdania.
- Act/Verify segregation — każda strona ma dwa kontrolery: jeden dla akcji, drugi dla asercji. Test od razu pokazuje co robi i co sprawdza.
- Controller w BaseTestClass udostępniony wszystkim testom przez dziedziczenie. Zero boilerplate w pojedynczym teście.
- Enumy dla danych testowych — bez magicznych stringów.

Przykład testu:

```java
@Test
@Description("Logowanie z poprawnymi danymi — użytkownik podaje prawidłowy e-mail i hasło, oczekiwany wynik: przejście do pulpitu")
public void RightLogin() {
    login.act()
            .login(CORRECT_LOGIN)
            .password(PASSWORD)
            .buttonLoginClick();
    login.verify()
            .desktopVisible();
}
```

Roadmap

Zrobione:

- Baseline framework: POM, Fluent, Act/Verify, Controller
- Integracja z Allure
- Smoke testy logowania (happy path)

W planach na najbliższy czas:

- Negative testy logowania (walidacja pól, złe dane, formatowanie e-maila)
- Testy rejestracji wieloetapowej (walidacja PESEL, przechodzenie kroków, edge cases)
- Testy przelewów (krajowy, zagraniczny, BLIK)
- Testy historii transakcji
- Stopniowa migracja asercji na AssertJ
- Wprowadzenie `WebDriverWait` zamiast ogólnego `Helper.pause()`

Dalej:

- Data Providers (TestNG) — data-driven testing
- Parallel execution (ThreadLocal WebDriver + refactor DriverFactory)
- Moduł testów API — Postman, docelowo REST Assured
- GitHub Actions — pipeline na PR-ach
- Deploy Allure na GitHub Pages

Uruchomienie

Aplikacja — otwórz `src/web/index.html` w przeglądarce. Logowanie: dowolny e-mail i hasło minimum 6 znaków.

Testy:

```
mvn clean test
mvn allure:serve
```

## Kontakt

Sebastian Bandach — QA Automation Engineer
LinkedIn: linkedin.com/in/sebastian-bandach
[github.com/SebastianBandachQA](https://github.com/SebastianBandachQA)
