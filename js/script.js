const form = document.getElementById('form-lead');
const btnEnviar = document.getElementById('btn-enviar');

btnEnviar.addEventListener('click', (e) => {
    e.preventDefault();

    const cpf = document.getElementById('cpf').value;
    const telefone = document.getElementById('telefone').value;
    const endereco = document.getElementById('endereco').value;
    const renda = document.getElementById('renda').value;
    const empregador = document.getElementById('empregador').value;

    // Validação dos campos
    if (cpf === '' || telefone === '' || endereco === '' || renda === '') {
        alert('Por favor, preencha todos os campos obrigatórios.');
        return;
    }

    // Enviar os dados para o servidor ou API
    const dados = {
        cpf,
        telefone,
        endereco,
        renda,
        empregador
    };

    console.log('Dados enviados:', dados);

    // Limpar o formulário
    form.reset();
});
const formSimulador = document.getElementById('form-simulador');
const btnSimular = document.getElementById('btn-simular');
const resultado = document.getElementById('resultado');

btnSimular.addEventListener('click', (e) => {
    e.preventDefault();

    const valor = document.getElementById('valor').value;
    const prazo = document.getElementById('prazo').value;

    // Cálculo da prestação
    const taxa = 2.65 / 100; // Taxa de juros mensal
    const prestacao = valor * taxa * (1 + taxa) ** prazo / ((1 + taxa) ** prazo - 1);

    // Exibição do resultado
    resultado.innerHTML = `
        <h2>Resultado da simulação</h2>
        <p>Valor do empréstimo: R$ ${valor}</p>
        <p>Prazo do empréstimo: ${prazo} meses</p>
        <p>Prestação mensal: R$ ${prestacao.toFixed(2)}</p>
    `;
});