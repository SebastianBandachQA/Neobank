# NeoBank — Dummy Banking App

Fikcyjna aplikacja bankowa stworzona jako środowisko testowe do automatyzacji w Selenium + Java.

## Struktura projektu

```
neobank/
├── index.html          # Główny plik HTML
├── css/
│   └── styles.css      # Wszystkie style
├── js/
│   └── app.js          # Logika aplikacji
└── README.md
```

## Uruchomienie

Otwórz `index.html` bezpośrednio w przeglądarce lub uruchom lokalny serwer:

```bash
# Python 3
python -m http.server 8080

# Node.js (npx)
npx serve .
```

Następnie przejdź pod adres `http://localhost:8080`.

## Dane logowania (demo)

- **Email:** dowolny poprawny e-mail (np. `jan.kowalski@test.pl`)
- **Hasło:** dowolne hasło o długości min. 6 znaków

## Zakładki aplikacji

| Sekcja | ID nawigacji | Opis |
|---|---|---|
| Logowanie | `page-login` | Formularz logowania + walidacja |
| Rejestracja | `page-register` | 4-krokowy formularz rejestracji |
| Pulpit | `section-dashboard` | Saldo, szybki przelew, ostatnie transakcje, budżet |
| Moje konta | `section-accounts` | Karty bankowe, szczegóły, otwarcie konta |
| Przelewy | `section-transfers` | Krajowy, ekspresowy, SWIFT, BLIK |
| Historia | `section-history` | Tabela z filtrowaniem, sortowaniem i paginacją |
| Karty | `section-cards` | Wizualne karty, limity, zezwolenia, toggle switche |
| Kredyty & Lokaty | `section-loans` | Kalkulator kredytowy, aktywne kredyty, lokaty |
| Płatności | `section-payments` | Koszyk rachunków, szybkie płatności |
| Wyszukiwarka | `section-search` | Wyszukiwanie transakcji, filtry, wyszukiwarka bankomatów |
| Ustawienia | `section-settings` | Profil, bezpieczeństwo, powiadomienia, limity |
| Wsparcie | `section-support` | Formularz zgłoszenia, FAQ accordion, kontakt |

## Selektor strategia (dla Selenium)

Każdy interaktywny element posiada co najmniej jeden z poniższych atrybutów:

```
id="..."              → By.id("...")
data-testid="..."     → By.cssSelector("[data-testid='...']")
name="..."            → By.name("...")
```

### Przykłady

```java
// Logowanie
driver.findElement(By.id("login-email")).sendKeys("test@test.pl");
driver.findElement(By.id("login-password")).sendKeys("password123");
driver.findElement(By.cssSelector("[data-testid='btn-login']")).click();

// Nawigacja
driver.findElement(By.cssSelector("[data-testid='nav-transfers']")).click();

// Formularz przelewu
driver.findElement(By.id("tr-recipient")).sendKeys("Jan Nowak");
driver.findElement(By.id("tr-iban")).sendKeys("PL12345678901234567890123456");
driver.findElement(By.id("tr-amount")).sendKeys("100");
driver.findElement(By.id("tr-title")).sendKeys("Test przelewu");

// Oczekiwanie na element
WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(5));
wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("section-dashboard")));

// Select (dropdown)
Select select = new Select(driver.findElement(By.id("tr-from")));
select.selectByVisibleText("Konto Oszczędnościowe (15 000,00 zł)");

// Toggle switch
driver.findElement(By.cssSelector("[data-testid='toggle-contactless']")).click();
```

## Elementy do testowania

### Formularze i walidacja
- Logowanie z komunikatami błędów
- Rejestracja wielokrokowa (4 kroki)
- Walidacja IBAN w czasie rzeczywistym
- Password strength indicator
- Formularz przelewu z potwierdzeniem

### Interakcje zaawansowane
- Modale (5 różnych wariantów)
- Powiadomienia toast
- Drag & drop (koszyk płatności)
- Toggle switche (ustawienia kart)
- Range sliders (limity)
- Paginacja i sortowanie tabeli
- Accordion (FAQ)
- Inner tabs (zakładki w zakładkach)

### Dynamiczne elementy
- Kalkulator kredytowy (live update)
- Filtrowanie historii transakcji
- Koszyk rachunków (add/remove)
- Wyszukiwarka transakcji

---

*Projekt stworzony w celach edukacyjnych — automatyzacja testów Selenium + Java.*
