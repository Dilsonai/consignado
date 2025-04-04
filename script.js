document.getElementById('btn-simular').addEventListener('click', (e) => {
    e.preventDefault();
    console.log('Botão "Simular" clicado.');

    // Obtendo os valores do formulário
    const valor = parseFloat(document.getElementById('valor').value);
    const prazo = parseInt(document.getElementById('prazo').value);
    const pm = parseFloat(document.getElementById('pm').value);

    console.log('Valores obtidos do formulário:');
    console.log('Valor do empréstimo:', valor);
    console.log('Prazo do empréstimo:', prazo);
    console.log('Prestação mensal informada:', pm);

    // Validação dos campos
    if (isNaN(valor) || isNaN(prazo) || isNaN(pm) || valor <= 0 || prazo <= 0 || pm <= 0) {
        console.log('Erro: Dados inválidos.');
        document.getElementById('resultado').innerHTML = `
            <p style="color: red;">Por favor, insira valores válidos para o valor do empréstimo, prazo e prestação mensal.</p>
        `;
        return;
    }

    console.log('Dados válidos. Iniciando cálculo da taxa de juros.');

    // Cálculo da taxa de juros mensal com base nos valores fornecidos
    let taxaCalculada = 0.01; // Chute inicial para a taxa
    const maxIteracoes = 1000; // Limite de iterações para evitar loops infinitos
    const tolerancia = 0.0001; // Tolerância para o cálculo da taxa
    let iteracoes = 0;

    while (iteracoes < maxIteracoes) {
        const prestacaoCalculada = valor * taxaCalculada * (1 + taxaCalculada) ** prazo / ((1 + taxaCalculada) ** prazo - 1);
        const diferenca = pm - prestacaoCalculada;

        if (Math.abs(diferenca) < tolerancia) {
            console.log('Taxa de juros encontrada:', (taxaCalculada * 100).toFixed(2), '% a.m.');
            break; // Taxa encontrada
        }

        // Ajusta a taxa com base na diferença
        taxaCalculada += diferenca > 0 ? 0.00001 : -0.00001; // Incremento menor para maior precisão
        iteracoes++;
    }

    if (iteracoes === maxIteracoes) {
        console.log('Aviso: Limite de iterações atingido. A taxa pode não ser precisa.');
    }

    // Cálculo da prestação com a taxa de 2,65% a.m.
    const taxaPadrao = 2.65 / 100; // Taxa de 2,65% a.m.
    const prestacaoPadrao = valor * taxaPadrao * (1 + taxaPadrao) ** prazo / ((1 + taxaPadrao) ** prazo - 1);

    console.log('Prestação mensal com taxa de 2,65% a.m.:', prestacaoPadrao.toFixed(2));

    // Cálculo da diferença entre as prestações
    const diferencaPrestacao = pm - prestacaoPadrao;

    console.log('Diferença entre a prestação informada e a prestação com taxa de 2,65% a.m.:', diferencaPrestacao.toFixed(2));

   // Exibindo o resultado no elemento #resultado
document.getElementById('resultado').innerHTML = `
<h2>Resultado da Simulação</h2>
<div style="margin-bottom: 15px;">
    <span><strong>Valor do empréstimo:</strong> R$ ${valor.toFixed(2)}</span> |
    <span><strong>Prazo do empréstimo:</strong> ${prazo} meses</span> |
    <span><strong>Prestação mensal informada:</strong> R$ ${pm.toFixed(2)}</span>
</div>
<div style="margin-bottom: 15px;">
    <span><strong>Taxa de juros calculada:</strong> ${(taxaCalculada * 100).toFixed(2)}% a.m.</span> |
    <span><strong>Prestação mensal com taxa de 2,65% a.m.:</strong> R$ ${prestacaoPadrao.toFixed(2)}</span> |
    <span><strong>Diferença entre as prestações:</strong> R$ ${diferencaPrestacao.toFixed(2)}</span>
</div>
<div style="margin-top: 20px;">
    <small>Sujeita a variação de taxa e aprovação de crédito. Consulte mais informações e abra a sua 
    <a href="https://www.bb.com.br/site/pra-voce/contas/conta-corrente/" target="_blank">Banco do Brasil</a>.</small>
</div>
`;
    console.log('Resultado exibido com sucesso.');
});