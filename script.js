// Obtém referências aos elementos HTML
const nomeInput = document.getElementById('nome');
const nomeCompleto = document.getElementById('nome-completo');
const cargoFuncao = document.getElementById('cargo-funcao');

// Adiciona um evento de escuta ao campo "Nome completo"
nomeInput.addEventListener('input', function() {
  const valorNome = nomeInput.value;

  // Atualiza o valor do campo "Nome" com o valor inserido
  nomeCompleto.textContent = valorNome;
});

// Adiciona um evento de escuta ao campo "Cargo/Função"
cargoFuncao.addEventListener('change', function() {
  const valorCargoFuncao = cargoFuncao.options[cargoFuncao.selectedIndex].text;

  // Atualiza o valor do campo "Cargo/Função" com base na opção selecionada
  document.getElementById('cargo-funcao-label').textContent =  valorCargoFuncao;
});

// Adiciona um evento de escuta ao campo "Cargo/Função"
cargoFuncao.addEventListener('change', function() {
    const valorCargoFuncao = cargoFuncao.options[cargoFuncao.selectedIndex].text;


    // Atualiza o valor do campo "Cargo/Função" com base na opção selecionada
    document.getElementById('matricula-label').textContent =  valorCargoFuncao;
});


// Obtém referências aos elementos HTML
const mesAnoSelect = document.getElementById('mes-ano');
const movimentoMensal = document.getElementById('movimento-mensal');

// Adiciona um evento de escuta ao campo "Qual mês do ponto você deseja:"
mesAnoSelect.addEventListener('change', function() {
  const valorMesAno = mesAnoSelect.options[mesAnoSelect.selectedIndex].text;

  // Atualiza o valor do campo "MOVIMENTO MENSAL" com base na opção selecionada
  movimentoMensal.textContent = "MOVIMENTO MENSAL – " + valorMesAno;
});

    document.getElementById('form').addEventListener('submit', function(e) {
    e.preventDefault();


    // Obter os dias de feriado selecionados
    var checkboxes = document.getElementsByName('feriados');
    var feriadosSelecionados = [];
    for (var i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            feriadosSelecionados.push(parseInt(checkboxes[i].value));
        }
    }


    // Obter o valor selecionado do mês e do ano
    var mesAno = document.getElementById('mes-ano').value;
    var mes = parseInt(mesAno.split('-')[1]);
    var ano = parseInt(mesAno.split('-')[0]);

    // Obter o elemento da tabela onde os dias da semana serão inseridos
    var tabela = document.getElementById('calendario');

    // Limpar a tabela, mantendo apenas as duas primeiras linhas
    while (tabela.rows.length > 2) {
        tabela.deleteRow(-1);
    }

    // Obter o primeiro dia da semana do mês selecionado
    var primeiroDia = new Date(ano, mes - 1, 1);
    var diaSemana = primeiroDia.getDay();

    // Calcular o último dia do mês
    var ultimoDia = new Date(ano, mes, 0).getDate();

    // Iniciar a contagem dos dias
    var dia = 1;

    var feriados = ["2023-01-01", "2023-02-15", "2023-04-21"]; // Exemplo de datas dos feriados


   // Criar as linhas para os dias da semana
while (dia <= ultimoDia) {
    var row = tabela.insertRow(-1);
    var diaCell = row.insertCell(0);
    var semanaCell = row.insertCell(1);
    var entradaCell = row.insertCell(2);
    var saidaCell = row.insertCell(3);

    diaCell.className = 'th1';
    diaCell.innerHTML = dia;

    semanaCell.innerHTML = obterDiaSemana(diaSemana);
    diaSemana = (diaSemana + 1) % 7;

    entradaCell.style.textAlign = 'left';
    entradaCell.innerHTML = '____:____';

    saidaCell.style.textAlign = 'left';
    saidaCell.innerHTML = '____:____';

    // Verificar se é sábado (6) ou domingo (0)
    if (diaSemana === 1 || diaSemana === 0) {
        entradaCell.classList.add('celula-azul');
        saidaCell.classList.add('celula-azul');
    }

     // Verificar se é um dia de feriado
  var dataAtual = ano + "-" + ("0" + mes).slice(-2) + "-" + ("0" + dia).slice(-2);
  if (feriados.includes(dataAtual)) {
    row.classList.add("feriado");
    entradaCell.innerHTML = "Feriado";
    saidaCell.innerHTML = "Feriado";
  }

    dia++;
}






   

    

        

     

  








    // Atualizar o nome do mês e ano no cabeçalho
    var mesLabel = obterNomeMes(mes);
    var cabecalho = document.getElementById('movimento-mensal');
    cabecalho.innerHTML = 'MOVIMENTO MENSAL - ' + mesLabel + ' ' + ano;
});

// Função auxiliar para obter o nome do mês
function obterNomeMes(mes) {
    var meses = [
        'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
        'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];
    return meses[mes - 1];
}

// Função auxiliar para obter o nome do dia da semana
function obterDiaSemana(diaSemana) {
    var diasSemana = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
    return diasSemana[diaSemana];
}

window.addEventListener('scroll', function() {
    var form = document.getElementById('form');
    var calendario = document.getElementById('calendario');
    
    if (window.pageYOffset > form.offsetTop) {
        calendario.style.marginTop = form.offsetHeight + 'px';
    } else {
        calendario.style.marginTop = '10px';
    }
});