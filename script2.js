// Seleciona o formulário
const form = document.getElementById("form-simulador");

// Função principal para calcular sustentabilidade
form.addEventListener("submit", function(event) {
    event.preventDefault(); // impede o envio padrão do formulário

    // Captura os valores do usuário
    const nome = document.getElementById("nome").value.trim();
    const total = Number(document.getElementById("area-total").value);
    const preservada = Number(document.getElementById("area-preservada").value);

    // Valida os dados
    if (!nome || total <= 0 || preservada < 0 || preservada > total) {
        alert("Por favor, preencha os campos corretamente. A área preservada não pode ser maior que a área total.");
        return;
    }

    // Calcula percentual de área preservada
    const percentual = (preservada / total) * 100;

    // Gera resultado
    const resultado = document.getElementById("resultado");
    const { mensagem, cor } = gerarMensagemSustentabilidade(nome, percentual);

    // Atualiza visual do resultado
    resultado.style.display = "block";
    resultado.style.background = cor;
    resultado.innerHTML = `
        <h3>Resultado da Avaliação</h3>
        <p>${mensagem}</p>
        <strong>Percentual preservado:</strong> ${percentual.toFixed(1)}%<br><br>
        <progress value="${percentual}" max="100" style="width:100%; height:25px;"></progress>
    `;
});


/**
 * Função para gerar mensagem e cor de acordo com percentual
 * @param {string} nome - Nome do produtor/aluno
 * @param {number} percentual - Percentual de preservação
 * @returns {object} - { mensagem, cor }
 */
function gerarMensagemSustentabilidade(nome, percentual) {
    let mensagem = "";
    let cor = "";

    if (percentual >= 20) {
        mensagem = `
        🏆 Excelente, ${nome}!<br>
        Sua propriedade possui ${percentual.toFixed(1)}% de área preservada.<br>
        Selo Verde Ouro 🌳
        `;
        cor = "#C8E6C9"; // Verde claro
    } else if (percentual >= 10) {
        mensagem = `
        🌱 Bom trabalho, ${nome}!<br>
        Sua preservação é de ${percentual.toFixed(1)}%.<br>
        Selo Verde Prata.
        `;
        cor = "#FFF9C4"; // Amarelo claro
    } else {
        mensagem = `
        ⚠️ Atenção, ${nome}!<br>
        Apenas ${percentual.toFixed(1)}% da área está preservada.<br>
        Considere ampliar a proteção das matas ciliares.
        `;
        cor = "#FFCDD2"; // Vermelho claro
    }

    return { mensagem, cor };
}

/**
 * Função auxiliar para formatar números em hectares com uma casa decimal
 * @param {number} valor
 * @returns {string}
 */
function formatarHectares(valor) {
    return valor.toFixed(1) + " ha";
}

/**
 * Função opcional para limpar o formulário após envio
 */
function limparFormulario() {
    form.reset();
    document.getElementById("resultado").style.display = "none";
}