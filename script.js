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
    const tolerancia = 0.000001; // Tolerância para o cálculo da taxa (maior precisão)
    let iteracoes = 0;

    while (iteracoes < maxIteracoes) {
        const prestacaoCalculada = valor * taxaCalculada * (1 + taxaCalculada) ** prazo / ((1 + taxaCalculada) ** prazo - 1);
        const diferenca = pm - prestacaoCalculada;

        if (Math.abs(diferenca) < tolerancia) {
            console.log('Taxa de juros encontrada:', (taxaCalculada * 100).toFixed(2), '% a.m.');
            break; // Taxa encontrada
        }

        // Ajusta a taxa com base na diferença
        taxaCalculada += diferenca > 0 ? 0.0001 : -0.0001; // Incremento ajustado para maior precisão
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

    // Mensagem personalizada com base na diferença
    let mensagemEconomia = '';
    if (diferencaPrestacao > 0) {
        mensagemEconomia = `
            <p style="color: green; font-weight: bold;">
                Sua economia seria de R$ ${diferencaPrestacao.toFixed(2)} se a taxa fosse 2,65% a.m.
            </p>
        `;
    } else if (diferencaPrestacao < 0) {
        mensagemEconomia = `
            <p style="color: blue; font-weight: bold;">
                Sua taxa de juros atual está menor! 
            </p>
        `;
    } else {
        mensagemEconomia = `
            <p style="color: orange; font-weight: bold;">
                Sua prestação está exatamente igual à calculada com a taxa de 2,65% a.m.
            </p>
        `;
    }

    // Exibindo o resultado no elemento #resultado
    document.getElementById('resultado').innerHTML = `
        <h2>Resultado da Simulação</h2>
        <div style="margin-bottom: 0px;">
            <span><strong>Valor do empréstimo:</strong> R$ ${valor.toFixed(2)}</span> |
            <span><strong>Prazo do empréstimo:</strong> ${prazo} meses</span> |
            <span><strong>Prestação mensal informada:</strong> R$ ${pm.toFixed(2)}</span>
        </div>
        <div style="margin-bottom: 5px;">
            <span><strong>Taxa de juros calculada:</strong> ${(taxaCalculada * 100).toFixed(2)}% a.m.</span> |
            <span><strong>Prestação mensal com taxa de 2,65% a.m.:</strong> R$ ${prestacaoPadrao.toFixed(2)}</span> |
            <span><strong>Diferença entre as prestações:</strong> R$ ${diferencaPrestacao.toFixed(2)}</span>
        </div>
        ${mensagemEconomia}
        <div style="margin-top: 0px;">
            <small>Sujeita a variação de taxa e aprovação de crédito.</small>
            <br>
            <button onclick="window.open('https://www.bb.com.br/site/pra-voce/contas/conta-corrente/', '_blank')" 
                style="background-color: #003366; color: #FFFFFF; padding: 10px 20px; border: none; border-radius: 5px; font-weight: bold; cursor: pointer;">
                Abra a sua conta Banco do Brasil clique aqui!
            </button>
        </div>
    `;
    console.log('Resultado exibido com sucesso.');
});