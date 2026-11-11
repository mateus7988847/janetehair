
/* =====================================
   ATUALIZAR ANO DO RODAPÉ
===================================== */

document.getElementById("ano").textContent =
    new Date().getFullYear();


/* =====================================
   CONFIGURAÇÃO DA DATA
===================================== */

const formulario = document.getElementById("formulario");

const campoData = document.getElementById("data");


function obterDataAtual() {

    const hoje = new Date();

    const ano = hoje.getFullYear();

    const mes = String(hoje.getMonth() + 1).padStart(2, "0");

    const dia = String(hoje.getDate()).padStart(2, "0");

    return `${ano}-${mes}-${dia}`;

}


// Impedir datas anteriores a hoje

campoData.min = obterDataAtual();


/* =====================================
   FORMULÁRIO DE AGENDAMENTO
===================================== */

formulario.addEventListener("submit", function(event) {

    event.preventDefault();


    // Capturar os dados

    const nome = document.getElementById("nome").value.trim();

    const servico = document.getElementById("servico").value;

    const data = campoData.value;

    const mensagem = document.getElementById("mensagem").value.trim();


    // Verificar os campos obrigatórios

    if (!nome || !servico || !data) {

        alert("Preencha todos os campos obrigatórios!");

        return;

    }


    // Verificar o tamanho do nome

    if (nome.length > 80) {

        alert("O nome deve ter até 80 caracteres.");

        return;

    }


    // Verificar a data escolhida

    const dataEscolhida = new Date(data + "T00:00:00");

    if (
        Number.isNaN(dataEscolhida.getTime()) ||
        data < obterDataAtual()
    ) {

        alert("Escolha uma data válida a partir de hoje!");

        return;

    }


    // Formatar a data

    const dataFormatada =
        dataEscolhida.toLocaleDateString("pt-BR");


    /* =====================================
       MONTAR MENSAGEM PARA O WHATSAPP
    ===================================== */

    let texto =

        "Olá, Janete Hair! Gostaria de solicitar um agendamento.\n\n" +

        "Nome: " + nome + "\n" +

        "Serviço desejado: " + servico + "\n" +

        "Data desejada: " + dataFormatada + "\n";


    // Adicionar mensagem opcional

    if (mensagem !== "") {

        texto += "Mensagem: " + mensagem + "\n";

    }


    texto +=

        "\nAguardo a confirmação do horário. Obrigado(a)!";


    /* =====================================
       NÚMERO DO WHATSAPP DA JANETE
    ===================================== */

    const telefone = "5531986093087";


    // Criar link com a mensagem

    const linkWhatsApp =

        "https://wa.me/" + telefone +

        "?text=" + encodeURIComponent(texto);


    /* =====================================
       ABRIR WHATSAPP
    ===================================== */

    window.open(

        linkWhatsApp,

        "_blank",

        "noopener,noreferrer"

    );

});
