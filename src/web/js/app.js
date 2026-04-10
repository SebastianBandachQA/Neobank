/* ═══════════════════════════════════════
   NEOBANK — app.js  (pełna logika stanu)
═══════════════════════════════════════ */
'use strict';

/* ══════════════════════════════════
   LIVE STATE
══════════════════════════════════ */
const state = {
  user: { name: 'Jan Kowalski', email: '', initials: 'JK', firstName: 'Jan' },
  balance: 48320.50,
  mainBalance: 32450.50,
  savingsBalance: 15000.00,
  cartItems: [],
  couponDiscount: 0,
  history: { page: 1, perPage: 8, sort: { col: 'date', dir: -1 }, filtered: [] },
  deposits: [
    { type: 'Lokata 12M Premium', rate: '5,20', amount: 15000.00, expires: '12.12.2026', interest: 780.00 },
    { type: 'Lokata 3M Standard',  rate: '4,10', amount: 5000.00,  expires: '15.06.2026', interest: 51.25  },
  ],
  loans: [
    { name: 'Kredyt hipoteczny',   balance: 187430.20, payment: 1890.00, pct: 35, remaining: 195 },
    { name: 'Kredyt konsumpcyjny', balance: 8200.00,   payment: 620.00,  pct: 72, remaining: 14  },
  ],
};

/* ══════════════════════════════════
   TRANSACTION DATA (mutable)
══════════════════════════════════ */
const TX_DATA = [
  { date:'2026-04-01', title:'Wynagrodzenie kwiecień',  category:'wynagrodzenie', amount: 8500.00,  type:'in',  status:'completed' },
  { date:'2026-03-31', title:'Biedronka Warszawa',      category:'karta',         amount: -87.43,   type:'out', status:'completed' },
  { date:'2026-03-30', title:'Energa — prąd',           category:'rachunek',      amount: -234.00,  type:'out', status:'completed' },
  { date:'2026-03-29', title:'Zwrot Amazon',            category:'przelew',       amount:  149.99,  type:'in',  status:'completed' },
  { date:'2026-03-28', title:'Allegro zakupy',          category:'karta',         amount: -342.50,  type:'out', status:'completed' },
  { date:'2026-03-27', title:'Netflix',                 category:'karta',         amount:  -49.00,  type:'out', status:'completed' },
  { date:'2026-03-26', title:'Przelew — Anna Nowak',    category:'przelew',       amount: -500.00,  type:'out', status:'completed' },
  { date:'2026-03-25', title:'Stacja Orlen paliwo',     category:'karta',         amount: -280.00,  type:'out', status:'completed' },
  { date:'2026-03-24', title:"McDonald's",              category:'karta',         amount:  -38.90,  type:'out', status:'completed' },
  { date:'2026-03-23', title:'Czynsz marzec',           category:'przelew',       amount:-2000.00,  type:'out', status:'completed' },
  { date:'2026-03-22', title:'OLX sprzedaż',            category:'przelew',       amount:  850.00,  type:'in',  status:'completed' },
  { date:'2026-03-21', title:'Apteka Dbam o Zdrowie',   category:'karta',         amount:  -41.20,  type:'out', status:'completed' },
  { date:'2026-03-20', title:'Carrefour',               category:'karta',         amount: -124.80,  type:'out', status:'completed' },
  { date:'2026-03-19', title:'Spotify',                 category:'karta',         amount:  -23.99,  type:'out', status:'completed' },
  { date:'2026-03-18', title:'Przelew — Piotr W.',      category:'przelew',       amount: -300.00,  type:'out', status:'pending'   },
  { date:'2026-03-17', title:'Zwrot podatku PIT',       category:'przelew',       amount: 1245.00,  type:'in',  status:'completed' },
  { date:'2026-03-16', title:'Lidl',                    category:'karta',         amount:  -89.30,  type:'out', status:'completed' },
  { date:'2026-03-15', title:'IKEA Targówek',           category:'karta',         amount: -567.00,  type:'out', status:'completed' },
  { date:'2026-03-14', title:'Wynagrodzenie dodatkowe', category:'wynagrodzenie', amount: 2000.00,  type:'in',  status:'completed' },
  { date:'2026-03-13', title:'Rossmann',                category:'karta',         amount:  -56.70,  type:'out', status:'completed' },
];

const ACCOUNT_DETAILS = {
  main:    { name:'— Konto Osobiste Premium', iban:'PL12 1234 5678 9012 3456 7890 1234', type:'Premium Personal' },
  savings: { name:'— Konto Oszczędnościowe',  iban:'PL55 9120 0000 1111 2222 3333 4444', type:'Savings Account'  },
  eur:     { name:'— Konto Walutowe EUR',      iban:'PL88 3341 0000 5555 6666 7777 8888', type:'Currency (EUR)'   },
};

/* ══════════════════════════════════
   HELPERS
══════════════════════════════════ */
function fmt(n) {
  return Number(n).toLocaleString('pl-PL', { minimumFractionDigits:2, maximumFractionDigits:2 }) + ' zł';
}
function todayStr() { return new Date().toISOString().split('T')[0]; }

/** Dodaje tx do TX_DATA i odświeża wszystkie widoki */
function addTransaction(title, amount, category) {
  TX_DATA.unshift({ date:todayStr(), title, category, amount, type:amount<0?'out':'in', status:'completed' });
  state.history.filtered = [...TX_DATA];
  state.history.page = 1;
  renderHistory();
  renderDashTransactions();
}

/** Zmienia saldo i aktualizuje wyświetlane wartości */
function changeBalance(delta) {
  state.balance     += delta;
  state.mainBalance += delta;

  // stat card
  const statEl = document.getElementById('stat-total-balance');
  if (statEl) {
    statEl.querySelector('.stat-value').textContent = fmt(state.balance);
    statEl.querySelector('.stat-change').textContent =
      (delta < 0 ? '▼ ' : '▲ +') + fmt(Math.abs(delta)) + ' teraz';
    statEl.querySelector('.stat-change').className =
      'stat-change ' + (delta < 0 ? 'down' : 'up');
  }

  // szczegóły konta
  const balEl = document.getElementById('acc-balance');
  if (balEl) balEl.textContent = fmt(state.mainBalance);

  // select w przelewie i koszyku
  ['tr-from', 'cart-from-account'].forEach(id => {
    const sel = document.getElementById(id);
    if (sel && sel.options[0]) {
      sel.options[0].text = 'Konto Osobiste Premium (' + fmt(state.mainBalance) + ')';
    }
  });
}

/** Renderuje 4 ostatnie transakcje na dashboardzie */
function renderDashTransactions() {
  const el = document.getElementById('dash-transactions');
  if (!el) return;
  const ICONS = { wynagrodzenie:'💼', karta:'💳', przelew:'↔️', rachunek:'🧾', lokata:'🏦', kredyt:'🏠' };
  el.innerHTML = TX_DATA.slice(0,4).map(t => `
    <div class="tx-row border-bottom">
      <div class="tx-icon ${t.type}">${ICONS[t.category]||'💰'}</div>
      <div>
        <div class="tx-title">${t.title}</div>
        <div class="tx-sub">${new Date(t.date).toLocaleDateString('pl-PL')} · ${t.category}</div>
      </div>
      <div class="tx-amount ${t.type} ml-auto">
        ${t.amount>0?'+':''}${fmt(Math.abs(t.amount)).replace(' zł','')} zł
      </div>
    </div>`).join('');
}

/* ══════════════════════════════════
   MODAL CONFIGS
══════════════════════════════════ */
const MODAL_CONFIGS = {
  'close-account': {
    title:'⚠ Zamknij konto', sub:'Ta operacja jest nieodwracalna.',
    content:`<div class="alert alert-danger">Zamknięcie konta spowoduje utratę wszystkich usług.</div>
      <div class="form-group"><label>Powód zamknięcia</label>
        <select id="modal-close-reason" data-testid="select-close-reason">
          <option>Przenoszę się do innego banku</option><option>Nie korzystam z konta</option>
          <option>Niezadowolenie z usług</option><option>Inne</option>
        </select></div>`,
    footer:`<button class="btn btn-outline" id="modal-btn-cancel" onclick="closeModal()">Anuluj</button>
            <button class="btn btn-danger" id="modal-btn-close-confirm" data-testid="btn-close-confirm"
              onclick="closeModal(); showToast('Wniosek złożony. Konto zamknięte w ciągu 5 dni.','info')">Potwierdź</button>`,
  },
  'block-card': {
    title:'🔴 Zastrzeż kartę', sub:'Operacja nieodwracalna.',
    content:`<div class="alert alert-danger">Zastrzeżona karta nie może być odblokowana. Wystawimy nową (5–7 dni).</div>
      <div class="form-group"><label>Powód</label>
        <select id="modal-block-reason" data-testid="select-block-reason">
          <option>Zgubiona karta</option><option>Skradziona karta</option>
          <option>Nieautoryzowane transakcje</option><option>Inne</option>
        </select></div>`,
    footer:`<button class="btn btn-outline" id="modal-btn-cancel" onclick="closeModal()">Anuluj</button>
            <button class="btn btn-danger" id="modal-btn-block-confirm" data-testid="btn-block-confirm"
              onclick="closeModal(); showToast('Karta zastrzeżona. Nowa karta zostanie wysłana.','success')">Zastrzeż kartę</button>`,
  },
  'show-pin': {
    title:'🔐 Pokaż PIN', sub:'Podaj kod SMS, aby zobaczyć PIN.',
    content:`<div class="form-group"><label for="modal-sms-code">Kod SMS *</label>
      <input type="text" id="modal-sms-code" data-testid="input-sms-code"
             placeholder="000000" maxlength="6" style="letter-spacing:4px;text-align:center;"></div>`,
    footer:`<button class="btn btn-outline" id="modal-btn-cancel" onclick="closeModal()">Anuluj</button>
            <button class="btn btn-primary" id="modal-btn-pin-confirm" data-testid="btn-pin-confirm"
              onclick="closeModal(); showToast('Twój PIN: 4782 (ukryty w demo)','info')">Pokaż PIN</button>`,
  },
  'loan-apply': {
    title:'📋 Wniosek kredytowy', sub:'Uzupełnij podstawowe dane do wniosku.',
    content:`
      <div class="form-group">
        <label for="modal-loan-purpose">Cel kredytu *</label>
        <select id="modal-loan-purpose" data-testid="select-loan-purpose">
          <option value="">— wybierz cel —</option>
          <option value="gotówkowy">Gotówkowy</option>
          <option value="hipoteczny">Hipoteczny</option>
          <option value="samochodowy">Samochodowy</option>
          <option value="konsolidacyjny">Konsolidacyjny</option>
          <option value="inny">Inny</option>
        </select>
        <div class="field-error" id="err-loan-purpose" style="display:none;">Wybierz cel kredytu</div>
      </div>
      <div class="form-group">
        <label for="modal-loan-income">Miesięczny dochód netto (zł) *</label>
        <input type="number" id="modal-loan-income" data-testid="input-loan-income" placeholder="np. 6000" min="1">
        <div class="field-error" id="err-loan-income" style="display:none;">Podaj dochód (liczba > 0)</div>
      </div>
      <div class="form-group">
        <label for="modal-loan-employment">Forma zatrudnienia *</label>
        <select id="modal-loan-employment" data-testid="select-loan-employment">
          <option value="">— wybierz —</option>
          <option>Umowa o pracę</option><option>Umowa zlecenie</option>
          <option>Własna działalność</option><option>Emerytura/Renta</option>
        </select>
        <div class="field-error" id="err-loan-employment" style="display:none;">Wybierz formę zatrudnienia</div>
      </div>`,
    footer:`<button class="btn btn-outline" id="modal-btn-cancel" onclick="closeModal()">Anuluj</button>
            <button class="btn btn-primary" id="modal-btn-loan-confirm" data-testid="btn-loan-confirm"
              onclick="submitLoanApplication()">Złóż wniosek</button>`,
  },
  'open-deposit': {
    title:'💰 Otwórz lokatę', sub:'Wybierz parametry lokaty.',
    content:`
      <div class="form-group">
        <label for="modal-deposit-type">Typ lokaty *</label>
        <select id="modal-deposit-type" data-testid="select-deposit-type">
          <option value="3M">Lokata 3M — 4,10%</option>
          <option value="6M">Lokata 6M — 4,60%</option>
          <option value="12M" selected>Lokata 12M — 5,20%</option>
          <option value="24M">Lokata 24M — 5,50%</option>
        </select>
      </div>
      <div class="form-group">
        <label for="modal-dep-amount">Kwota lokaty (min. 1 000 zł) *</label>
        <input type="number" id="modal-dep-amount" data-testid="input-dep-amount" placeholder="np. 10000" min="1000">
        <div class="field-error" id="err-dep-amount" style="display:none;">Minimalna kwota lokaty to 1 000 zł</div>
      </div>
      <div class="form-group">
        <label for="modal-dep-account">Z konta *</label>
        <select id="modal-dep-account" data-testid="select-dep-account">
          <option value="main">Konto Osobiste Premium</option>
          <option value="savings">Konto Oszczędnościowe</option>
        </select>
      </div>`,
    footer:`<button class="btn btn-outline" id="modal-btn-cancel" onclick="closeModal()">Anuluj</button>
            <button class="btn btn-gold" id="modal-btn-dep-confirm" data-testid="btn-dep-confirm"
              onclick="submitDeposit()">Otwórz lokatę</button>`,
  },
};

/* ══════════════════════════════════
   AUTH
══════════════════════════════════ */
function showPage(page) {
  document.querySelectorAll('.auth-page, .app-layout').forEach(el => el.classList.remove('active'));
  const target = page === 'app'
    ? document.getElementById('app-layout')
    : document.getElementById('page-' + page);
  target.classList.add('active');
}

function doLogin(e) {
  e.preventDefault();
  const email  = document.getElementById('login-email').value.trim();
  const pw     = document.getElementById('login-password').value;
  const errBox = document.getElementById('login-error');

  if (!email.includes('@') || pw.length < 6) { errBox.style.display = 'flex'; return; }
  errBox.style.display = 'none';

  const rawName   = email.split('@')[0].replace(/[._]/g,' ');
  const fullName  = rawName.split(' ').map(w => w.charAt(0).toUpperCase()+w.slice(1)).join(' ');
  const firstName = fullName.split(' ')[0];
  const initials  = fullName.split(' ').map(w=>w[0]).join('').toUpperCase().slice(0,2);

  state.user = { name:fullName, email, firstName, initials };
  document.getElementById('sidebar-name').textContent    = fullName;
  document.getElementById('sidebar-avatar').textContent  = initials;
  document.getElementById('dash-name').textContent       = firstName;
  document.getElementById('settings-avatar').textContent = initials;
  document.getElementById('set-email').value             = email;

  const d = new Date();
  document.getElementById('dash-date').textContent = d.toLocaleDateString('pl-PL',{
    weekday:'long', year:'numeric', month:'long', day:'numeric',
  });

  showPage('app');
  showSection('dashboard');
  renderDashTransactions();
  initHistory();
  renderDeposits();
  renderLoans();
  updateCart();
}

function doLogout() {
  showPage('login');
  document.getElementById('login-form').reset();
  document.getElementById('login-error').style.display = 'none';
  state.cartItems = [];
  updateCart();
}

/* Registration */
let regStep = 1;
function regNext(step) {
  if (step===1) {
    const fn=document.getElementById('reg-firstname').value.trim();
    const ln=document.getElementById('reg-lastname').value.trim();
    document.getElementById('err-reg-firstname').classList.toggle('show',!fn);
    document.getElementById('err-reg-lastname').classList.toggle('show',!ln);
    if (!fn||!ln) return;
  }
  if (step===2) {
    const em=document.getElementById('reg-email').value.trim();
    document.getElementById('err-reg-email').classList.toggle('show',!em.includes('@'));
    if (!em.includes('@')) return;
  }
  if (step===3) {
    const pw=document.getElementById('reg-password').value;
    const pw2=document.getElementById('reg-password2').value;
    document.getElementById('err-reg-password').classList.toggle('show',pw.length<8);
    if (pw.length<8) return;
    document.getElementById('err-reg-password2').classList.toggle('show',pw!==pw2);
    if (pw!==pw2) return;
    const fn=document.getElementById('reg-firstname').value;
    const ln=document.getElementById('reg-lastname').value;
    const em=document.getElementById('reg-email').value;
    const ph=document.getElementById('reg-phone').value;
    const city=document.getElementById('reg-city').value;
    document.getElementById('reg-summary').innerHTML=
      `<b>Imię i nazwisko:</b> ${fn} ${ln}<br><b>Email:</b> ${em}<br><b>Telefon:</b> ${ph||'—'}<br><b>Miasto:</b> ${city||'—'}`;
  }
  document.getElementById('reg-step-'+step).classList.remove('active');
  document.getElementById('reg-step-'+(step+1)).classList.add('active');
  document.getElementById('step-item-'+step).classList.remove('active');
  document.getElementById('step-item-'+step).classList.add('done');
  document.getElementById('step-item-'+(step+1)).classList.add('active');
}
function regBack(step) {
  document.getElementById('reg-step-'+step).classList.remove('active');
  document.getElementById('reg-step-'+(step-1)).classList.add('active');
  document.getElementById('step-item-'+step).classList.remove('active');
  document.getElementById('step-item-'+(step-1)).classList.remove('done');
  document.getElementById('step-item-'+(step-1)).classList.add('active');
}
function regStrength(pw) {
  let s=0;
  if (pw.length>=8) s++; if (/[A-Z]/.test(pw)) s++; if (/[0-9]/.test(pw)) s++; if (/[^A-Za-z0-9]/.test(pw)) s++;
  const cols=['var(--danger)','var(--warning)','var(--info)','var(--success)'];
  const labs=['Słabe','Średnie','Dobre','Silne'];
  for (let i=1;i<=4;i++) { const el=document.getElementById('rb'+i); if (el) el.style.background=i<=s?cols[s-1]:'var(--border)'; }
  const t=document.getElementById('strength-text');
  if (t) { t.textContent=s?labs[s-1]:'Siła hasła'; t.style.color=s?cols[s-1]:'var(--muted)'; }
}
function regSubmit() {
  const terms=document.getElementById('reg-terms').checked;
  document.getElementById('err-reg-terms').classList.toggle('show',!terms);
  if (!terms) return;
  showPage('login');
  showToast('Konto otwarte! Możesz się teraz zalogować.','success');
}

/* ══════════════════════════════════
   NAVIGATION
══════════════════════════════════ */
const SECTION_TITLES = {
  dashboard:'Pulpit', accounts:'Moje konta', transfers:'Przelewy',
  history:'Historia transakcji', cards:'Karty płatnicze',
  loans:'Kredyty & Lokaty', payments:'Centrum płatności',
  search:'Wyszukiwarka', settings:'Ustawienia', support:'Centrum wsparcia',
};

function showSection(name) {
  document.querySelectorAll('.section').forEach(s => s.style.display='none');
  document.getElementById('section-'+name).style.display = 'block';
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  document.getElementById('nav-'+name)?.classList.add('active');
  document.getElementById('topbar-title').textContent = SECTION_TITLES[name]||'NeoBank';
  document.getElementById('notif-dropdown').classList.remove('open');
  if (name==='history') initHistory();
  if (name==='loans')   { renderDeposits(); renderLoans(); }
}

function toggleNotif() { document.getElementById('notif-dropdown').classList.toggle('open'); }
document.addEventListener('click', e => {
  if (!e.target.closest('#notif-dropdown') && !e.target.closest('#btn-notifications'))
    document.getElementById('notif-dropdown')?.classList.remove('open');
});

function switchInner(group, tab, btn) {
  document.querySelectorAll(`[id^="panel-${group}-"]`).forEach(p => p.classList.remove('active'));
  btn.parentElement.querySelectorAll('.tab-inner-btn').forEach(b => b.classList.remove('active'));
  document.getElementById(`panel-${group}-${tab}`)?.classList.add('active');
  btn.classList.add('active');
}

/* ══════════════════════════════════
   ACCOUNTS
══════════════════════════════════ */
function showAccountDetails(type) {
  const bals = { main:fmt(state.mainBalance), savings:fmt(state.savingsBalance), eur:'870,00 €' };
  const d = ACCOUNT_DETAILS[type]; if (!d) return;
  document.getElementById('acc-detail-name').textContent = d.name;
  document.getElementById('acc-iban').innerHTML =
    `${d.iban} <button class="copy-btn" id="btn-copy-iban" data-testid="btn-copy-iban" onclick="copyIBAN()">📋</button>`;
  document.getElementById('acc-balance').textContent = bals[type];
  document.getElementById('acc-type').textContent    = d.type;
}
function copyIBAN() { showToast('Numer IBAN skopiowany!','success'); }

/* ══════════════════════════════════
   TRANSFERS
══════════════════════════════════ */
function validateIBAN(input) {
  const val = input.value.replace(/\s/g,'');
  const errEl=document.getElementById('err-tr-iban'), okEl=document.getElementById('ok-tr-iban');
  if (!val) { errEl.classList.remove('show'); okEl.classList.remove('show'); input.classList.remove('is-invalid','is-valid'); return; }
  const valid = /^[A-Z]{2}[0-9]{26}$/.test(val);
  if (valid) { okEl.classList.add('show'); errEl.classList.remove('show'); input.classList.add('is-valid'); input.classList.remove('is-invalid'); }
  else if (val.length>=10) { errEl.classList.add('show'); okEl.classList.remove('show'); input.classList.add('is-invalid'); input.classList.remove('is-valid'); }
}

function submitTransfer(e) {
  e.preventDefault();
  const recipEl  = document.getElementById('tr-recipient');
  const amountEl = document.getElementById('tr-amount');
  const titleEl  = document.getElementById('tr-title');
  let ok = true;

  [recipEl, titleEl].forEach(el => {
    if (!el.value.trim()) { el.classList.add('is-invalid'); ok=false; }
    else el.classList.remove('is-invalid');
  });

  const amount = parseFloat(amountEl.value);
  if (!amount||amount<=0) {
    amountEl.classList.add('is-invalid');
    document.getElementById('err-tr-amount').classList.add('show');
    ok=false;
  } else {
    amountEl.classList.remove('is-invalid');
    document.getElementById('err-tr-amount').classList.remove('show');
  }

  if (!ok) { showToast('Uzupełnij wszystkie wymagane pola','error'); return; }

  const box = document.getElementById('transfer-confirm-box');
  box.style.display = 'flex';
  box.innerHTML = `
    <div style="width:100%;">
      ⚠ Potwierdzasz przelew <strong>${fmt(amount)}</strong>
      do <strong>${recipEl.value.trim()}</strong>?<br>
      <span style="font-size:0.78rem;opacity:0.8;">Tytuł: „${titleEl.value.trim()}"</span>
      <div style="margin-top:0.8rem;display:flex;gap:0.5rem;">
        <button class="btn btn-danger btn-sm" id="btn-tr-cancel" data-testid="btn-tr-cancel"
          onclick="clearTransferForm()">Anuluj</button>
        <button class="btn btn-success btn-sm" id="btn-tr-confirm" data-testid="btn-tr-confirm"
          onclick="confirmTransfer()">✓ Potwierdź i wyślij</button>
      </div>
    </div>`;
}

function confirmTransfer() {
  const recip  = document.getElementById('tr-recipient').value.trim();
  const amount = parseFloat(document.getElementById('tr-amount').value);
  const title  = document.getElementById('tr-title').value.trim();

  changeBalance(-amount);
  addTransaction(`Przelew do: ${recip} — ${title}`, -amount, 'przelew');
  clearTransferForm();
  showToast(`✅ Przelew ${fmt(amount)} do ${recip} wysłany!`, 'success');
}

function clearTransferForm() {
  document.getElementById('transfer-form').reset();
  document.getElementById('transfer-confirm-box').style.display = 'none';
  document.getElementById('ok-tr-iban').classList.remove('show');
  document.getElementById('err-tr-iban').classList.remove('show');
  document.querySelectorAll('#transfer-form input').forEach(i => i.classList.remove('is-valid','is-invalid'));
}

function quickTransfer(name, iban) {
  showSection('transfers');
  setTimeout(() => {
    document.getElementById('tr-recipient').value = name;
    document.getElementById('tr-iban').value = iban;
    document.getElementById('tr-amount').focus();
    const qa = document.getElementById('quick-amount').value;
    if (qa) document.getElementById('tr-amount').value = qa;
  }, 100);
}

function doQuickTransfer() {
  const a = document.getElementById('quick-amount').value;
  if (!a||parseFloat(a)<=0) { showToast('Podaj kwotę przelewu','error'); return; }
  showToast('Wybierz odbiorcę powyżej, aby wykonać przelew','info');
}

function submitBLIK() {
  const code = document.getElementById('blik-code').value.replace(/\s/g,'');
  const err  = document.getElementById('err-blik');
  if (!/^\d{6}$/.test(code)) { err.classList.add('show'); return; }
  err.classList.remove('show');
  const amount = parseFloat(document.getElementById('blik-amount').value)||0;
  if (amount>0) { changeBalance(-amount); addTransaction('Płatność BLIK', -amount, 'karta'); }
  showToast('Płatność BLIK zrealizowana!','success');
}

/* ══════════════════════════════════
   HISTORY
══════════════════════════════════ */
const TX_ICONS = { wynagrodzenie:'💼', karta:'💳', przelew:'↔️', rachunek:'🧾', lokata:'🏦', kredyt:'🏠' };
const STATUS_CLS = { completed:'badge-success', pending:'badge-warning', failed:'badge-danger' };
const STATUS_LBL = { completed:'Zaksięgowane', pending:'W realizacji', failed:'Odrzucone' };

function initHistory() {
  state.history.filtered = [...TX_DATA];
  renderHistory();
}

function filterHistory() {
  const q    = document.getElementById('hist-search').value.toLowerCase();
  const from = document.getElementById('hist-from').value;
  const to   = document.getElementById('hist-to').value;
  const type = document.getElementById('hist-type').value;
  const cat  = document.getElementById('hist-cat').value;
  state.history.filtered = TX_DATA.filter(t => {
    if (q    && !t.title.toLowerCase().includes(q) && !t.category.includes(q)) return false;
    if (from && t.date<from) return false;
    if (to   && t.date>to)   return false;
    if (type && t.type!==type) return false;
    if (cat  && t.category!==cat) return false;
    return true;
  });
  state.history.page=1; renderHistory();
}

function resetHistory() {
  ['hist-search','hist-from','hist-to'].forEach(id => document.getElementById(id).value='');
  ['hist-type','hist-cat'].forEach(id => document.getElementById(id).value='');
  state.history.filtered=[...TX_DATA]; state.history.page=1; renderHistory();
}

function sortHistory(col) {
  const h=state.history;
  h.sort.dir = h.sort.col===col ? h.sort.dir*-1 : -1;
  h.sort.col = col;
  h.filtered.sort((a,b)=>{
    const va=a[col], vb=b[col];
    return (va<vb?-1:va>vb?1:0)*h.sort.dir;
  });
  renderHistory();
}

function renderHistory() {
  const h=state.history;
  const start=(h.page-1)*h.perPage;
  const page=h.filtered.slice(start,start+h.perPage);

  document.getElementById('history-body').innerHTML = page.map(t=>`
    <tr data-testid="tx-row" data-amount="${t.amount}" data-type="${t.type}">
      <td>${new Date(t.date).toLocaleDateString('pl-PL')}</td>
      <td>
        <div class="tx-row" style="padding:0;">
          <div class="tx-icon ${t.type}">${TX_ICONS[t.category]||'💰'}</div>
          <div><div class="tx-title">${t.title}</div>
               <div class="tx-sub">${t.category}</div></div>
        </div>
      </td>
      <td><span class="badge badge-neutral">${t.category}</span></td>
      <td><span class="tx-amount ${t.type}">
        ${t.amount>0?'+':''}${fmt(Math.abs(t.amount)).replace(' zł','')} zł
      </span></td>
      <td><span class="badge ${STATUS_CLS[t.status]}">${STATUS_LBL[t.status]}</span></td>
      <td>
        <button class="btn btn-ghost btn-sm" data-testid="btn-tx-details"
          onclick="showToast('Szczegóły: ${t.title.replace(/'/g,'`')}','info')">Szczegóły</button>
      </td>
    </tr>`).join('');

  const totalPages=Math.ceil(h.filtered.length/h.perPage);
  const pg=document.getElementById('hist-pagination');
  pg.innerHTML='';
  for (let i=1;i<=totalPages;i++) {
    const btn=document.createElement('button');
    btn.className='pg-btn'+(i===h.page?' active':'');
    btn.textContent=i; btn.setAttribute('data-testid','hist-page-'+i);
    btn.onclick=()=>{ h.page=i; renderHistory(); };
    pg.appendChild(btn);
  }
  const shown=Math.min(h.filtered.length, start+h.perPage);
  document.getElementById('hist-info').textContent=
    `Wyświetlam ${Math.min(start+1,h.filtered.length)}–${shown} z ${h.filtered.length} transakcji`;
}

/* ══════════════════════════════════
   CARDS
══════════════════════════════════ */
function setCardStatus(status) {
  const msgs={active:'Karta aktywowana ✓', frozen:'Karta tymczasowo zablokowana ❄'};
  showToast(msgs[status]||'Status zmieniony', status==='active'?'success':'warning');
}
function updateCardLimit(type, val) {
  const f=parseInt(val).toLocaleString('pl-PL')+' zł';
  if (type==='daily') document.getElementById('daily-limit-display').textContent=f;
  if (type==='atm')   document.getElementById('atm-limit-display').textContent=f;
}
function toggleEl(el) { el.classList.toggle('on'); }

/* ══════════════════════════════════
   LOANS & DEPOSITS — render
══════════════════════════════════ */
function calcLoan() {
  const P=parseFloat(document.getElementById('loan-amount').value)||50000;
  const n=parseInt(document.getElementById('loan-period').value)||60;
  const r=parseFloat(document.getElementById('loan-rate').value)/100/12;
  document.getElementById('loan-amount-display').textContent=P.toLocaleString('pl-PL')+' zł';
  document.getElementById('loan-period-display').textContent=n+' mies.';
  const monthly=r>0?(P*r*Math.pow(1+r,n))/(Math.pow(1+r,n)-1):P/n;
  const total=monthly*n, cost=total-P;
  const f2=v=>v.toFixed(2).replace('.',',')+' zł';
  document.getElementById('loan-monthly').textContent=f2(monthly);
  document.getElementById('loan-total').textContent=f2(total);
  document.getElementById('loan-cost').textContent=f2(cost);
}

function renderDeposits() {
  const el=document.getElementById('deposits-list');
  if (!el) return;
  el.innerHTML = state.deposits.map((d,i)=>`
    <div style="padding:0.8rem 0;border-bottom:1px solid var(--border);"
         id="deposit-item-${i}" data-testid="deposit-item-${i}">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.3rem;">
        <span style="font-weight:600;">${d.type}</span>
        <span style="color:var(--success);font-weight:700;">+${d.rate}%</span>
      </div>
      <div style="color:var(--muted);font-size:0.78rem;">${fmt(d.amount)} · Zapada: ${d.expires}</div>
      <div style="color:var(--success);font-size:0.75rem;">Odsetki: ≈ ${fmt(d.interest)}</div>
    </div>`).join('');
}

function renderLoans() {
  const el=document.getElementById('loans-list');
  if (!el) return;
  el.innerHTML = state.loans.map((l,i)=>`
    <div style="padding:0.8rem 0;border-bottom:1px solid var(--border);"
         id="loan-item-${i}" data-testid="loan-item-${i}">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.4rem;">
        <span style="font-weight:600;">${l.name}</span>
        <span class="badge badge-success">Aktywny</span>
      </div>
      <div style="color:var(--muted);font-size:0.78rem;margin-bottom:0.4rem;">
        Saldo: ${fmt(l.balance)} · Rata: ${fmt(l.payment)}/mies.
      </div>
      <div class="progress-track">
        <div class="progress-fill" style="width:${l.pct}%;"></div>
      </div>
      <div style="color:var(--muted);font-size:0.72rem;margin-top:0.3rem;">
        ${l.pct}% spłacony · ${l.remaining} rat pozostało
      </div>
    </div>`).join('');
}

/* ══════════════════════════════════
   LOAN APPLICATION (modal submit)
══════════════════════════════════ */
function submitLoanApplication() {
  const purposeEl    = document.getElementById('modal-loan-purpose');
  const incomeEl     = document.getElementById('modal-loan-income');
  const employmentEl = document.getElementById('modal-loan-employment');
  let ok=true;

  if (!purposeEl?.value) {
    document.getElementById('err-loan-purpose').style.display='block'; ok=false;
  } else document.getElementById('err-loan-purpose').style.display='none';

  const income=parseFloat(incomeEl?.value);
  if (!income||income<=0) {
    document.getElementById('err-loan-income').style.display='block';
    incomeEl?.classList.add('is-invalid'); ok=false;
  } else {
    document.getElementById('err-loan-income').style.display='none';
    incomeEl?.classList.remove('is-invalid');
  }

  if (!employmentEl?.value) {
    document.getElementById('err-loan-employment').style.display='block'; ok=false;
  } else document.getElementById('err-loan-employment').style.display='none';

  if (!ok) { showToast('Uzupełnij wszystkie wymagane pola','error'); return; }

  const loanAmount = parseFloat(document.getElementById('loan-amount')?.value)||0;
  const n          = parseInt(document.getElementById('loan-period')?.value)||60;
  const monthly    = document.getElementById('loan-monthly')?.textContent||'—';
  const purpose    = purposeEl.value;
  const decision   = income>=3000 ? 'Pozytywna ✅' : 'Wymaga weryfikacji ⏳';

  // Dodaj do listy kredytów
  state.loans.push({
    name:      `Kredyt ${purpose}`,
    balance:   loanAmount,
    payment:   parseFloat(monthly.replace(/[^\d,]/g,'').replace(',','.'))||0,
    pct:       0,
    remaining: n,
  });

  // Kredyt = wpływ na konto
  if (loanAmount>0) {
    changeBalance(loanAmount);
    addTransaction(`Kredyt ${purpose} — wypłata`, loanAmount, 'kredyt');
  }

  closeModal();
  renderLoans();
  showToast(`✅ Wniosek złożony! Decyzja: ${decision}. Kwota: ${fmt(loanAmount)}`, 'success');
}

/* ══════════════════════════════════
   DEPOSIT SUBMIT (modal)
══════════════════════════════════ */
function submitDeposit() {
  const amountEl = document.getElementById('modal-dep-amount');
  const amount   = parseFloat(amountEl?.value);

  if (!amount||amount<1000) {
    document.getElementById('err-dep-amount').style.display='block';
    amountEl?.classList.add('is-invalid');
    showToast('Minimalna kwota lokaty to 1 000 zł','error'); return;
  }
  document.getElementById('err-dep-amount').style.display='none';
  amountEl?.classList.remove('is-invalid');

  const typeVal = document.getElementById('modal-deposit-type')?.value||'12M';
  const RATES   = {'3M':'4,10','6M':'4,60','12M':'5,20','24M':'5,50'};
  const LABELS  = {'3M':'Lokata 3M','6M':'Lokata 6M','12M':'Lokata 12M','24M':'Lokata 24M'};
  const MONTHS  = {'3M':3,'6M':6,'12M':12,'24M':24};
  const rate    = RATES[typeVal]||'5,20';
  const rateNum = parseFloat(rate.replace(',','.'));
  const months  = MONTHS[typeVal]||12;
  const interest = amount * rateNum / 100 * months / 12;

  const expDate = new Date();
  expDate.setMonth(expDate.getMonth()+months);
  const expires = expDate.toLocaleDateString('pl-PL');

  state.deposits.push({
    type:     `${LABELS[typeVal]} — ${rate}%`,
    rate,
    amount,
    expires,
    interest: Math.round(interest*100)/100,
  });

  // Środki zablokowane — odejmij z salda
  changeBalance(-amount);
  addTransaction(`Lokata otwarta: ${LABELS[typeVal]} ${rate}%`, -amount, 'lokata');

  closeModal();
  renderDeposits();
  showToast(`✅ Lokata ${fmt(amount)} (${rate}%) otwarta! Środki zablokowane.`, 'success');
}

/* ══════════════════════════════════
   PAYMENTS / CART
══════════════════════════════════ */
function addToCart() {
  const typeEl = document.getElementById('pay-type');
  const icon   = typeEl.value;
  const name   = document.getElementById('pay-company').value.trim()
               || typeEl.options[typeEl.selectedIndex].getAttribute('data-name');
  const amount = parseFloat(document.getElementById('pay-amount').value);
  if (!amount||amount<=0) { showToast('Podaj kwotę rachunku','error'); return; }
  state.cartItems.push({ icon, name, amount, ref:document.getElementById('pay-ref').value.trim() });
  updateCart();
  document.getElementById('pay-company').value='';
  document.getElementById('pay-amount').value='';
  document.getElementById('pay-ref').value='';
  showToast(`Dodano do koszyka: ${name}`,'success');
}

function quickBill(name, acc, icon, amount) {
  state.cartItems.push({ icon, name, amount, ref:acc });
  updateCart();
  showToast(`Dodano: ${name}`,'success');
}

function removeCart(i) { state.cartItems.splice(i,1); updateCart(); }
function clearCart()   { state.cartItems=[]; updateCart(); }

function payCart() {
  if (!state.cartItems.length) return;
  const total = state.cartItems.reduce((s,i)=>s+i.amount, 0);

  // Każdy rachunek = osobna transakcja + odjęcie z salda
  state.cartItems.forEach(item => {
    changeBalance(-item.amount);
    addTransaction(`Płatność: ${item.name}`, -item.amount, 'rachunek');
  });

  showToast(`✅ Opłacono ${state.cartItems.length} rachunki · Łącznie: ${fmt(total)}`,'success');
  state.cartItems=[];
  updateCart();
}

function updateCart() {
  const items=state.cartItems, cnt=items.length;
  const total=items.reduce((s,i)=>s+i.amount,0);

  document.getElementById('cart-count-badge').textContent=
    cnt+' pozycj'+(cnt===1?'a':cnt<5?'e':'i');
  document.getElementById('cart-empty').style.display  = cnt===0?'block':'none';
  document.getElementById('cart-items').style.display  = cnt===0?'none':'block';
  document.getElementById('cart-total').textContent    = fmt(total);

  const badge=document.getElementById('cart-badge');
  badge.style.display=cnt>0?'inline-flex':'none';
  badge.textContent=cnt;

  document.getElementById('cart-list').innerHTML = items.map((it,i)=>`
    <div class="cart-item" id="cart-item-${i}" data-testid="cart-item-${i}">
      <div class="cart-item-icon">${it.icon}</div>
      <div><div class="cart-item-name">${it.name}</div></div>
      <div class="cart-item-amount">-${fmt(it.amount)}</div>
      <button class="cart-item-remove" data-testid="btn-cart-remove-${i}" onclick="removeCart(${i})">✕</button>
    </div>`).join('');
}

/* ══════════════════════════════════
   SEARCH
══════════════════════════════════ */
function doSearch(q) {
  const container=document.getElementById('search-results');
  if (!q.trim()) { container.innerHTML='<div class="search-hint">Wpisz frazę, aby wyszukać</div>'; return; }
  const results=TX_DATA.filter(t=>
    t.title.toLowerCase().includes(q.toLowerCase())||
    t.category.toLowerCase().includes(q.toLowerCase())
  );
  if (!results.length) {
    container.innerHTML=`<div class="empty-state"><div class="empty-icon">🔍</div><h3>Brak wyników</h3></div>`;
    return;
  }
  container.innerHTML=results.map(t=>`
    <div class="search-result-item" data-testid="search-result">
      <div class="tx-icon ${t.type}" style="flex-shrink:0;">${t.type==='in'?'📥':'📤'}</div>
      <div>
        <div style="font-weight:600;font-size:0.85rem;">${t.title}</div>
        <div style="color:var(--muted);font-size:0.75rem;">${t.date} · ${t.category}</div>
      </div>
      <div class="tx-amount ${t.type}" style="margin-left:auto;">
        ${t.amount>0?'+':''}${fmt(Math.abs(t.amount)).replace(' zł','')} zł
      </div>
    </div>`).join('');
}
function searchChip(term) { document.getElementById('main-search').value=term; doSearch(term); }

function findATM() {
  const city=document.getElementById('atm-city').value.trim()||'Warszawa';
  const type=document.getElementById('atm-type').value;
  document.getElementById('atm-results').innerHTML=`
    <div style="font-size:0.83rem;">
      <div style="padding:0.7rem 0;border-bottom:1px solid var(--border);">
        <strong>🏧 NeoBank ${type} Centrum</strong> — ul. Marszałkowska 100, ${city}
        <span class="badge badge-success" style="margin-left:0.5rem;">Czynny</span>
      </div>
      <div style="padding:0.7rem 0;border-bottom:1px solid var(--border);">
        <strong>🏧 NeoBank ${type} Wola</strong> — ul. Wolska 50, ${city}
        <span class="badge badge-success" style="margin-left:0.5rem;">Czynny</span>
      </div>
      <div style="padding:0.7rem 0;">
        <strong>🏧 NeoBank ${type} Mokotów</strong> — ul. Puławska 200, ${city}
        <span class="badge badge-warning" style="margin-left:0.5rem;">Chwilowo nieczynny</span>
      </div>
    </div>`;
}

/* ══════════════════════════════════
   SETTINGS
══════════════════════════════════ */
function saveProfile(e) { e.preventDefault(); showToast('Dane profilu zostały zapisane!','success'); }

function changePassword() {
  const old=document.getElementById('old-password').value;
  const nw =document.getElementById('new-password').value;
  const cf =document.getElementById('confirm-password').value;
  if (!old||nw.length<8) { showToast('Hasło musi mieć min. 8 znaków','error'); return; }
  if (nw!==cf)           { showToast('Hasła nie są identyczne','error'); return; }
  ['old-password','new-password','confirm-password'].forEach(id=>document.getElementById(id).value='');
  showToast('Hasło zostało zmienione!','success');
}

/* ══════════════════════════════════
   SUPPORT
══════════════════════════════════ */
function submitSupport(e) {
  e.preventDefault();
  const topic=document.getElementById('sup-topic').value;
  document.getElementById('err-sup-topic').classList.toggle('show',!topic);
  if (!topic) return;
  const ticket='NB-'+Math.floor(Math.random()*90000+10000);
  document.getElementById('ticket-num').textContent=ticket;
  document.getElementById('sup-success').style.display='flex';
  document.getElementById('support-form').reset();
  document.getElementById('sup-char-count').textContent='0';
  showToast('Zgłoszenie #'+ticket+' wysłane!','success');
}
function toggleAcc(header) { header.parentElement.classList.toggle('open'); }

/* ══════════════════════════════════
   MODALS
══════════════════════════════════ */
function openModal(type) {
  const cfg=MODAL_CONFIGS[type]; if (!cfg) return;
  document.getElementById('modal-title').textContent = cfg.title;
  document.getElementById('modal-sub').textContent   = cfg.sub;
  document.getElementById('modal-content').innerHTML = cfg.content;
  document.getElementById('modal-footer').innerHTML  = cfg.footer;
  document.getElementById('modal-overlay').classList.add('open');
}
function closeModal() { document.getElementById('modal-overlay').classList.remove('open'); }
function closeModalOutside(e) { if (e.target===document.getElementById('modal-overlay')) closeModal(); }

/* ══════════════════════════════════
   TOASTS
══════════════════════════════════ */
function showToast(msg, type='success') {
  const icons={success:'✅',error:'❌',warning:'⚠️',info:'ℹ️'};
  const t=document.createElement('div');
  t.className='toast'+(type!=='success'?' '+type:'');
  t.innerHTML=`<span>${icons[type]}</span><span>${msg}</span>`;
  document.getElementById('toast-container').appendChild(t);
  setTimeout(()=>{
    t.style.transition='0.35s'; t.style.transform='translateX(120%)'; t.style.opacity='0';
    setTimeout(()=>t.remove(),380);
  },3500);
}

/* ══════════════════════════════════
   INIT
══════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  const textarea=document.getElementById('sup-message');
  if (textarea) textarea.addEventListener('input',()=>{
    document.getElementById('sup-char-count').textContent=textarea.value.length;
  });
  calcLoan();
  updateCart();
});
