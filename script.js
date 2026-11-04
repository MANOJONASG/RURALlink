'use strict';
/* ===== CONFIGURAÇÕES ===== */
const WHATS = '5549999625713';
const EMAIL = 'joao.g2009.ifsc@gmail.com';
const PIX_KEY = '+5549999625713';       // chave Pix = celular
const PIX_NOME = 'JOAO PAULO';           // nome do recebedor (máx. 25, sem acento)
const PIX_CIDADE = 'LAGES';              // cidade do recebedor (máx. 15, sem acento)
const PLANOS = [
  { id: 'normal',  nome: 'Normal',  preco: 99,  km: 50,  gb: 100 },
  { id: 'plus',    nome: 'Plus',    preco: 119, km: 75,  gb: 200 },
  { id: 'premium', nome: 'Premium', preco: 149, km: 100, gb: 400 }
];
const $ = (s, el = document) => el.querySelector(s);
const brl = v => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
let planoSel = 'normal';

/* ===== MENU MOBILE ===== */
const burger = $('#burger'), menu = $('#menu');
burger.addEventListener('click', () => {
  const open = menu.classList.toggle('open');
  burger.setAttribute('aria-expanded', open);
});
menu.addEventListener('click', e => { if (e.target.tagName === 'A') { menu.classList.remove('open'); burger.setAttribute('aria-expanded', false); } });
$('#ano').textContent = new Date().getFullYear();

/* ===== NÚMEROS ANIMADOS ===== */
const io = new IntersectionObserver(es => es.forEach(e => {
  if (!e.isIntersecting) return;
  const el = e.target, fim = +el.dataset.n, pre = el.dataset.pre;
  let n = 0;
  const t = setInterval(() => { n++; el.textContent = pre + n; if (n >= fim) clearInterval(t); }, 90);
  io.unobserve(el);
}), { threshold: .6 });
document.querySelectorAll('.num').forEach(el => { el.textContent = el.dataset.pre + '0'; io.observe(el); });

/* ===== ABAS DO PROBLEMA ===== */
document.querySelectorAll('.pill').forEach(p => p.addEventListener('click', () => {
  document.querySelectorAll('.pill').forEach(x => x.classList.remove('active'));
  p.classList.add('active');
  $('#pillText').textContent = p.dataset.t;
}));

/* ===== PLANOS ===== */
function renderPlanos(rec) {
  $('#plans').innerHTML = PLANOS.map(p => `
    <article class="plan ${p.id === rec ? 'hl' : ''}">
      <h3>${p.nome}</h3>
      <div class="price">${brl(p.preco)} <small>/mês</small></div>
      <ul><li>Até ${p.km} km de alcance</li><li>${p.gb} GB por mês</li><li>Suporte local</li></ul>
      <a class="btn" href="#comprar" data-plano="${p.id}">Contratar ${p.nome}</a>
    </article>`).join('');
  $('#planRadios').innerHTML = PLANOS.map(p => `
    <label class="opt"><input type="radio" name="plano" value="${p.id}" ${p.id === planoSel ? 'checked' : ''}>
    <span>${p.nome}<em>${brl(p.preco)}/mês · ${p.gb} GB</em></span></label>`).join('');
}
function recomendar() {
  const d = +$('#dist').value, u = +$('#uso').value;
  $('#distOut').textContent = d + ' km';
  const idx = Math.max(d <= 50 ? 0 : d <= 75 ? 1 : 2, u - 1);
  const p = PLANOS[idx];
  $('#rec').textContent = `Recomendamos o plano ${p.nome}: ${brl(p.preco)}/mês, ${p.km} km e ${p.gb} GB.`;
  renderPlanos(p.id);
}
$('#dist').addEventListener('input', recomendar);
$('#uso').addEventListener('change', recomendar);
document.addEventListener('click', e => {
  const a = e.target.closest('[data-plano]');
  if (a) { planoSel = a.dataset.plano; const r = document.querySelector(`input[name=plano][value=${planoSel}]`); if (r) r.checked = true; }
});
document.addEventListener('change', e => { if (e.target.name === 'plano') planoSel = e.target.value; });
recomendar();

/* ===== MÁSCARAS ===== */
const mask = (id, fn) => $(id).addEventListener('input', e => e.target.value = fn(e.target.value.replace(/\D/g, '')));
mask('#cpf', v => v.slice(0, 11).replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d{1,2})$/, '$1-$2'));
mask('#tel', v => v.slice(0, 11).replace(/(\d{2})(\d)/, '($1) $2').replace(/(\d{5})(\d{1,4})$/, '$1-$2'));
mask('#cep', v => v.slice(0, 8).replace(/(\d{5})(\d{1,3})$/, '$1-$2'));
$('#uf').addEventListener('input', e => e.target.value = e.target.value.toUpperCase().replace(/[^A-Z]/g, ''));

/* ===== CEP AUTOMÁTICO (ViaCEP) ===== */
$('#cep').addEventListener('input', async e => {
  const c = e.target.value.replace(/\D/g, '');
  if (c.length !== 8) return;
  try {
    const d = await (await fetch(`https://viacep.com.br/ws/${c}/json/`)).json();
    if (d.erro) return;
    $('#rua').value ||= d.logradouro; $('#bairro').value ||= d.bairro;
    $('#cidade').value ||= d.localidade; $('#uf').value ||= d.uf;
  } catch { /* sem internet: preenche manualmente */ }
});

/* ===== VALIDAÇÃO ===== */
function cpfOk(c) {
  c = c.replace(/\D/g, '');
  if (c.length !== 11 || /^(\d)\1+$/.test(c)) return false;
  for (let t = 9; t < 11; t++) {
    let s = 0; for (let i = 0; i < t; i++) s += c[i] * (t + 1 - i);
    if (((s * 10) % 11) % 10 != c[t]) return false;
  }
  return true;
}
function validar() {
  const campos = ['nome', 'cpf', 'email', 'tel', 'cep', 'rua', 'num', 'bairro', 'cidade', 'uf'];
  let primeiro = null, msg = '';
  campos.forEach(id => {
    const el = $('#' + id), v = el.value.trim();
    let ok = !!v;
    if (id === 'nome') ok = v.split(/\s+/).length >= 2;
    if (id === 'cpf') ok = cpfOk(v);
    if (id === 'email') ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
    if (id === 'tel') ok = v.replace(/\D/g, '').length >= 10;
    if (id === 'cep') ok = v.replace(/\D/g, '').length === 8;
    if (id === 'uf') ok = v.length === 2;
    el.classList.toggle('bad', !ok);
    if (!ok && !primeiro) { primeiro = el; msg = `Confira o campo "${$('label[for=' + id + ']').textContent}".`; }
  });
  $('#err').textContent = msg;
  if (primeiro) primeiro.focus();
  return !primeiro;
}

/* ===== PAGAMENTO ===== */
const pagamento = () => document.querySelector('input[name=pag]:checked').value;
function notaPag() {
  $('#payNote').textContent = pagamento() === 'pix'
    ? 'Você verá um QR Code e o código copia e cola para pagar na hora.'
    : 'Enviaremos um link seguro de pagamento no cartão pelo WhatsApp.';
}
document.querySelectorAll('input[name=pag]').forEach(r => r.addEventListener('change', notaPag));
notaPag();

/* Pix copia e cola (BR Code) */
const tlv = (id, v) => id + String(v.length).padStart(2, '0') + v;
function crc16(s) {
  let c = 0xFFFF;
  for (let i = 0; i < s.length; i++) { c ^= s.charCodeAt(i) << 8; for (let j = 0; j < 8; j++) c = c & 0x8000 ? (c << 1) ^ 0x1021 : c << 1; c &= 0xFFFF; }
  return c.toString(16).toUpperCase().padStart(4, '0');
}
function pixPayload(valor, txid) {
  const p = tlv('00', '01') + tlv('01', '11') +
    tlv('26', tlv('00', 'br.gov.bcb.pix') + tlv('01', PIX_KEY)) +
    tlv('52', '0000') + tlv('53', '986') + tlv('54', valor.toFixed(2)) +
    tlv('58', 'BR') + tlv('59', PIX_NOME) + tlv('60', PIX_CIDADE) +
    tlv('62', tlv('05', txid)) + '6304';
  return p + crc16(p);
}

/* ===== PEDIDO ===== */
let pedidoTxt = '';
$('#form').addEventListener('submit', e => {
  e.preventDefault();
  if (!validar()) return;
  const p = PLANOS.find(x => x.id === planoSel), v = id => $('#' + id).value.trim();
  const pag = pagamento();
  const endereco = `${v('rua')}, ${v('num')} - ${v('bairro')}, ${v('cidade')}/${v('uf')} - CEP ${v('cep')}` + (v('ref') ? ` (ref.: ${v('ref')})` : '');
  const pedido = 'RL' + Date.now().toString().slice(-8);
  pedidoTxt = [
    `*Novo pedido RURALlink* (${pedido})`,
    `Plano: ${p.nome} - ${brl(p.preco)}/mês (${p.km} km, ${p.gb} GB)`,
    `Nome: ${v('nome')}`, `CPF: ${v('cpf')}`, `E-mail: ${v('email')}`, `Telefone: ${v('tel')}`,
    `Endereço: ${endereco}`,
    `Pagamento: ${pag === 'pix' ? 'Pix' : 'Cartão (aguardando link)'}`
  ].join('\n');

  $('#summary').innerHTML = `<b>Plano ${p.nome}</b> · ${brl(p.preco)}/mês<br>${v('nome')}<br>${v('tel')} · ${v('email')}<br>${endereco}`;
  $('#pixBox').hidden = pag !== 'pix';
  $('#cardBox').hidden = pag !== 'cartao';
  if (pag === 'pix') {
    const code = pixPayload(p.preco, pedido);
    $('#pixCode').value = code;
    const qr = $('#qr'); qr.innerHTML = '';
    if (window.QRCode) new QRCode(qr, { text: code, width: 200, height: 200, correctLevel: QRCode.CorrectLevel.M });
    else qr.textContent = 'QR Code indisponível. Use o código abaixo.';
  }
  $('#send').textContent = pag === 'pix' ? 'Já paguei: enviar comprovante e pedido' : 'Enviar pedido pelo WhatsApp';
  $('#mailLink').href = `mailto:${EMAIL}?subject=${encodeURIComponent('Pedido RURALlink ' + pedido)}&body=${encodeURIComponent(pedidoTxt.replace(/\*/g, ''))}`;
  abrir(true);
});
$('#send').addEventListener('click', () => {
  window.open(`https://wa.me/${WHATS}?text=${encodeURIComponent(pedidoTxt)}`, '_blank', 'noopener');
});
$('#copy').addEventListener('click', async () => {
  const t = $('#pixCode'); t.select();
  try { await navigator.clipboard.writeText(t.value); } catch { document.execCommand('copy'); }
  $('#copy').textContent = 'Código copiado!';
  setTimeout(() => $('#copy').textContent = 'Copiar código Pix', 2500);
});

/* ===== MODAL ===== */
function abrir(on) { $('#modal').hidden = !on; document.body.style.overflow = on ? 'hidden' : ''; if (on) $('#close').focus(); }
$('#close').addEventListener('click', () => abrir(false));
$('#modal').addEventListener('click', e => { if (e.target.id === 'modal') abrir(false); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') abrir(false); });
