const API_URL = "http://localhost:3000";

let container = document.querySelector('.container');
let input = document.querySelector('#search');
let form = document.querySelector('#form');
let image = document.querySelector('#img-logo');
let btn = document.querySelector('.btn');

const crearTarjeta = (Nombre, Genero, Puntaje, link) => {
    container.innerHTML += `
            <div class="card-container">
                <figure>
                    <img
                        src="${link}"
                        alt=""
                        class="img-movie"
                    />
                </figure>

                <div class="card-info">
                    <h3>${Nombre}</h3>
                    <div class="info-movie">
                        <p>Genero: ${Genero}</p>
                        <p>Puntaje: ${Puntaje}</p>
                    </div>
                </div>
            </div> 
        `
}

const busqueda = async (_valor) => {

    try {
        let response = await fetch(API_URL + "/peliculas")
        let data = await response.json();

        container.innerHTML = ""

        data.forEach(elemento => {
            const { Nombre, Genero, Puntaje, link } = elemento
            if (Nombre === _valor) {
                crearTarjeta(Nombre, Genero, Puntaje, link);
            } else if (Genero === _valor) {
                crearTarjeta(Nombre, Genero, Puntaje, link);
            }
        })

    } catch (error) {
        console.log(error);
    }
}


const traerPeliculas = async () => {
    try {
        let response = await fetch(API_URL + "/peliculas")
        let data = await response.json();
        return data
    } catch (error) {
        console.log(error);
    }
}

const showPeliculas = async () => {
    let peliculas = await traerPeliculas();

    container.innerHTML = ""

    peliculas.forEach(element => {
        const { Nombre, Genero, Puntaje, link } = element
        crearTarjeta(Nombre, Genero, Puntaje, link);
    });
}

showPeliculas();

form.addEventListener('submit', (e) => {
    e.preventDefault();

    let valor = input.value;

    if (valor && valor !== "") {
        busqueda(valor);
    } else {
        window.location.reload();
    }

    form.reset();
})

image.addEventListener('click', () => {
    showPeliculas()
})
