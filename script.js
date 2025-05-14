let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

function adicionarAoCarrinho(nome, preco) {
  carrinho.push({ nome, preco });
  salvarCarrinho();
  atualizarCarrinho();
}

function salvarCarrinho() {
  localStorage.setItem('carrinho', JSON.stringify(carrinho));
}

function removerItem(index) {
  carrinho.splice(index, 1);
  salvarCarrinho();
  atualizarCarrinho();
}

function atualizarCarrinho() {
  const lista = document.getElementById('lista-carrinho');
  const total = document.getElementById('total-carrinho');
  const count = document.getElementById('cart-count');

  lista.innerHTML = '';
  let totalCarrinho = 0;

  carrinho.forEach((item, index) => {
    const li = document.createElement('li');
    li.innerHTML = `${item.nome} - R$ ${item.preco.toFixed(2)} <button onclick="removerItem(${index})">Remover</button>`;
    lista.appendChild(li);
    totalCarrinho += item.preco;
  });

  total.textContent = totalCarrinho.toFixed(2);
  count.textContent = carrinho.length;

  const msg = encodeURIComponent(`Olá! Gostaria de finalizar minha compra:\n${carrinho.map(i => `• ${i.nome} - R$ ${i.preco.toFixed(2)}`).join('\n')}\nTotal: R$ ${totalCarrinho.toFixed(2)}`);
  document.getElementById('finalizar-whatsapp').href = `https://wa.me/5541991575259?text=${msg}`;

  // Stripe link de checkout fictício
  document.getElementById('finalizar-stripe').href = 'https://buy.stripe.com/test_xxxx';
}

document.addEventListener('DOMContentLoaded', () => {
  atualizarCarrinho();

  const form = document.getElementById('form-cadastro');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Cadastro realizado com sucesso!');
      form.reset();
    });
  }
});