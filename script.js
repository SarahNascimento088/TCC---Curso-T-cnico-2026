// Barra de progresso e destaque de menu ativo na barra lateral
const navLinks = [...document.querySelectorAll('#sidebar-nav a')];
const pageSections = [...document.querySelectorAll('main section')];

function processScroll() {
  let scrollPos = window.scrollY;
  let totalHeight = document.documentElement.scrollHeight - window.innerHeight;
  
  // Atualiza barra de progresso no topo
  document.getElementById('progress-bar').style.width = (totalHeight ? (scrollPos / totalHeight) * 100 : 0) + '%';
  
  // Atualiza item ativo no menu lateral
  let activeId = pageSections[0].id;
  pageSections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 220) {
      activeId = sec.id;
    }
  });
  
  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === '#' + activeId);
  });
}

window.addEventListener('scroll', processScroll);
processScroll();

// Comportamento dos Acordeões
document.querySelectorAll('.acc-btn').forEach(button => {
  button.onclick = () => {
    button.parentElement.classList.toggle('open');
  };
});

// Validação do Quiz Profissional
function validarQuizInstitucional() {
  let pontuacao = 0;
  ['q1', 'q2', 'q3'].forEach(name => {
    let checkedInput = document.querySelector('input[name=' + name + ']:checked');
    if (checkedInput) {
      pontuacao += +checkedInput.value;
    }
  });
  
  let mensagem = 'Resultado da Avaliação: ' + pontuacao + ' de 3 acertos. ';
  if (pontuacao === 3) {
    mensagem += 'Excelente! Domínio conceitual e técnico validado.';
  } else {
    mensagem += 'Recomenda-se a revisão dos fundamentos teóricos.';
  }
  
  document.getElementById('resQuiz').textContent = mensagem;
}