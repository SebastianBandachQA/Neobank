NeoBank

POLISH VERSION AVAILABLE BELOW

Personal portfolio project — an online banking web app together with an automated testing framework. Actively developed.

![Java](https://img.shields.io/badge/Java-24-orange)
![Selenium](https://img.shields.io/badge/Selenium-4.41-green)
![TestNG](https://img.shields.io/badge/TestNG-7.12-red)
![Allure](https://img.shields.io/badge/Allure-2.33-yellow)
![AssertJ](https://img.shields.io/badge/AssertJ-4.0-blueviolet)
![Maven](https://img.shields.io/badge/Maven-3-blue)

About

I built both the banking app (frontend) and the test automation framework from scratch. The goal is to show not just that I test, but how I design tests — as a software product, not a pile of scripts.

The repo reflects progress over time — commits show how I think, how I refactor, and what design decisions I make.

The application

NeoBank is a single-page banking app (vanilla JS, no frameworks) simulating a real customer experience. Modules:

- Authentication — login with validation, 4-step registration (personal data, PESEL, contact, password)
- Dashboard — balances, monthly expenses, category budgets, recent transactions, notifications
- My accounts — Personal Premium, Savings, EUR currency account
- Transfers — domestic, international, BLIK
- Transaction history — sorting, filtering, pagination
- Cards, Loans & Deposits, Payments with cart, Search, Settings, Support

All interactive elements have `data-testid` attributes — the app was designed with automation in mind.

Test framework

Stack:

| Layer | Technology | Version |
|---|---|---|
| Language | Java | 24 |
| Test framework | TestNG | 7.12 |
| UI automation | Selenium WebDriver | 4.41 |
| Assertions | AssertJ + TestNG Assert | 4.0 |
| Reporting | Allure | 2.33 |
| Build tool | Maven | — |

Architecture is built around design patterns:

- Page Object Pattern with classic `driver.findElement()` instead of PageFactory. A conscious choice — lazy loading and fewer `StaleElementReferenceException` issues in Selenium 4+.
- Fluent Interface with method chaining — tests read like sentences.
- Act/Verify segregation — each page has two controllers: one for actions, one for assertions. A test shows what it does and what it checks at a glance.
- Controller exposed through `BaseTestClass` and inherited by every test. No boilerplate in individual tests.
- Enums for test data — no magic strings.

Test example:

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

Done:

- Baseline framework: POM, Fluent, Act/Verify, Controller
- Allure integration
- Login smoke tests (happy path)

Next up:

- Negative login tests (field validation, bad credentials, email formatting)
- Multi-step registration tests (PESEL validation, step flow, edge cases)
- Transfer tests (domestic, international, BLIK)
- Transaction history tests
- Gradual assertion migration to AssertJ
- Replace generic `Helper.pause()` with `WebDriverWait` where it matters

Further ahead:

- TestNG Data Providers — data-driven testing
- Parallel execution (ThreadLocal WebDriver + DriverFactory refactor)
- API testing module — Postman first, REST Assured long-term
- GitHub Actions — PR pipeline
- Allure report deployed to GitHub Pages

## Running

Application — open `src/web/index.html` in a browser. Login: any email and a password of at least 6 characters.

Tests:

```
mvn clean test
mvn allure:serve
```

Contact

Sebastian Bandach — QA Automation Engineer

LinkedIn: linkedin.com/in/sebastian-bandach

[github.com/SebastianBandachQA](https://github.com/SebastianBandachQA)

============================================================================================================================================================================================================================
POLSKA WERSJA
============================================================================================================================================================================================================================
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
