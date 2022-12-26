const api = {
    key: "Coloque Sua Chave da API",
    base: "https://api.openweathermap.org/data/2.5/",
    lang: "pt_br",
    units: "metric"
}

const cidade = document.querySelector('.cidade');
const data = document.querySelector('.data');
const image = document.querySelector('.container-img');
const container_temp = document.querySelector('.container-temp');
const temp_numero = document.querySelector('.container-temp div');
const temp_unidade = document.querySelector('.container-temp span');
const clima_atual = document.querySelector('.clima');
const pesquisa = document.querySelector('.form-control');
const button = document.querySelector('.btn');
const min_max = document.querySelector('.min-max');

button.addEventListener('click', function() {
    procura_Resultados(pesquisa.value);
});

pesquisa.addEventListener('keypress', enter)
function enter(event) {
    key = event.keyCode;
    if (key === 13) {
        procura_Resultados(pesquisa.value);
    }
}

function procura_Resultados(cidade) {
    fetch(`${api.base}weather?q=${cidade}&lang=${api.lang}&units=${api.units}&APPID=${api.key}`)
    .then(response => {
        console.log(response);
        if (!response.ok) {
            throw new Error(`http error: status ${response.status}`);
        }
        return response.json();
    })
    .catch(error => {
        alert(error.message)
    })
    .then(response => {
        mostra_Resultados(response)
    });
}

function mostra_Resultados(weather) {
    console.log(weather);

    cidade.innerText = `${weather.name}, ${weather.sys.country}`;

    let now = new Date();
    data.innerText = registra_Data(now);

    let icone = weather.weather[0].icon;
    image.innerHTML = `<img src="./icons/${icone}.png">`;

    let temperatura2 = `${Math.round(weather.main.temp)}`;
    temp_numero.innerHTML = temperatura2;
    temp_unidade.innerHTML = `°C`;

    weather_tempo = weather.weather[0].description;
    clima_atual.innerText = maiusculo(weather_tempo);

    min_max.innerText = `${Math.round(weather.main.temp_min)}°C / ${Math.round(weather.main.temp_max)}°C`;

}

function registra_Data(d) {
    let dias = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sabado"];
    let meses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julio", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

    let dia = dias[d.getDay()];
    let date = d.getDate();
    let mes = meses[d.getMonth()];
    let ano = d.getFullYear();

    return `${dia}, ${date} ${mes} ${ano}`;
}

container_temp.addEventListener('click', muda_Temperatura)
function muda_Temperatura() {
    temp_numero_atual = temp_numero.innerHTML;

    if (temp_unidade.innerHTML === "°C") {
        let f = (temp_numero_atual * 1.8) + 32;
        temp_unidade.innerHTML = "°F";
        temp_numero.innerHTML = Math.round(f);
    } else {
        let c = (temp_numero_atual - 32) / 1.8
        temp_unidade.innerHTML = "°C"
        temp_numero.innerHTML = Math.round(c)
    }

}

function maiusculo(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}