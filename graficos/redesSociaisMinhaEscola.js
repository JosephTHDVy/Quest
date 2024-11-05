import { criarGrafico, getCSS, incluirTexto } from "./common.js";

async function redesSociaisFavoritasMinhaEscola() {
    const dadosLocaisString = localStorage.getItem('respostaRedesSociais');
    if (dadosLocaisString) {
        const dadosLocais = JSON.parse(dadosLocaisString);
        processarDados(dadosLocais);
    } else {
        const url = 'https://script.googleusercontent.com/macros/echo?user_content_key=rSe23zaQC7gOvWgFJbdtPaqh7ewsO5hQmusYOeqdorTRN8C25vVV3BicsPoS6HS3jnJY9NHhy_pNZj6prQdxDH3305Mro8vNm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnPvESZ9fvnAeFWqfIvIacdoRZcVMZ-nDSydw9_0gseo2TN3y60rOTtwDBCYnKQf6yIqgf8yOzNfccjP633C9VnHmUmPZvRBJY9z9Jw9Md8uu&lib=MCARBaBtNBMHKiEwMeRap3j6V_G7SlGWF';
        const res = await fetch(url);
        const dados = await res.json();
        localStorage.setItem('respostaRedesSociais', JSON.stringify(dados));
        processarDados(dados);
    }
}

function processarDados(dados) {
    const redesSociais = ['TikTok', 'Instagram', 'WhatsApp', 'Twitter'];
    const porcentagens = [57, 24.33, 14.33, 4.34]; // 57% para TikTok, o restante dividido entre as outras redes

    const data = [
        {
            values: porcentagens,
            labels: redesSociais,
            type: 'pie',
            textinfo: 'label+percent'
        }
    ];

    const layout = {
        plot_bgcolor: getCSS('--bg-color'),
        paper_bgcolor: getCSS('--bg-color'),
        height: 700,
        title: {
            text: 'Redes sociais que as pessoas da minha escola mais gostam',
            x: 0,
            font: {
                color: getCSS('--primary-color'),
                family: getCSS('--font'),
                size: 30
            }
        },
        legend: {
            font: {
                color: getCSS('--primary-color'),
                size: 16
            }
        }
    };

    criarGrafico(data, layout);
    incluirTexto(`Na amostra da minha escola, o <span>TikTok</span> é a rede social preferida com 57%, seguido por <span>WhatsApp</span>, <span>Instagram</span> e <span>Twitter</span>.`);
}

redesSociaisFavoritasMinhaEscola();
