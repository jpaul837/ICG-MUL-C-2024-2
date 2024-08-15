function mostrarOpciones() {
    const figura = document.getElementById('figura').value;
    const opcionesFigura = document.getElementById('opcionesFigura');
    opcionesFigura.innerHTML = ''; // Limpiar opciones anteriores

    switch (figura) {
        case 'triangulo':
            opcionesFigura.innerHTML = `
                <div class="form-group">
                    <label for="ladoTriangulo">Tamaño del lado:</label>
                    <input type="number" id="ladoTriangulo" placeholder="Lado">
                </div>`;
            break;
        case 'rectangulo':
            opcionesFigura.innerHTML = `
                <div class="form-group">
                    <label for="ladoMayor">Lado Mayor:</label>
                    <input type="number" id="ladoMayor" placeholder="Lado Mayor">
                </div>
                <div class="form-group">
                    <label for="ladoMenor">Lado Menor:</label>
                    <input type="number" id="ladoMenor" placeholder="Lado Menor">
                </div>`;
            break;
        case 'circulo':
            opcionesFigura.innerHTML = `
                <div class="form-group">
                    <label for="radio">Radio:</label>
                    <input type="number" id="radio" placeholder="Radio">
                </div>`;
            break;
        case 'pentagono':
            opcionesFigura.innerHTML = `
                <div class="form-group">
                    <label for="ladoPentagono">Tamaño del lado:</label>
                    <input type="number" id="ladoPentagono" placeholder="Lado">
                </div>
                <div class="form-group">
                    <label for="numLados">Número de lados:</label>
                    <input type="number" id="numLados" placeholder="Número de lados" value="5">
                </div>`;
            break;
    }
}

function dibujarPlanoCartesiano(ctx, ancho, alto) {
    const numDivisiones = 10; // Número de divisiones en cada eje
    const pasoX = ancho / (numDivisiones * 2);
    const pasoY = alto / (numDivisiones * 2);

    ctx.strokeStyle = "#ccc";
    ctx.beginPath();
    ctx.moveTo(ancho / 2, 0);
    ctx.lineTo(ancho / 2, alto);
    ctx.moveTo(0, alto / 2);
    ctx.lineTo(ancho, alto / 2);
    ctx.stroke();

    ctx.font = "10px Arial";
    ctx.fillStyle = "black";

    // Dibujar números en el eje X
    for (let i = -numDivisiones; i <= numDivisiones; i++) {
        ctx.fillText(i, (ancho / 2) + (i * pasoX), (alto / 2) + 15);
        ctx.beginPath();
        ctx.moveTo((ancho / 2) + (i * pasoX), (alto / 2) - 5);
        ctx.lineTo((ancho / 2) + (i * pasoX), (alto / 2) + 5);
        ctx.stroke();
    }

    // Dibujar números en el eje Y
    for (let i = -numDivisiones; i <= numDivisiones; i++) {
        if (i !== 0) { // No dibujar 0 en el eje Y
            ctx.fillText(-i, (ancho / 2) - 20, (alto / 2) + (i * pasoY));
        }
        ctx.beginPath();
        ctx.moveTo((ancho / 2) - 5, (alto / 2) + (i * pasoY));
        ctx.lineTo((ancho / 2) + 5, (alto / 2) + (i * pasoY));
        ctx.stroke();
    }
}

document.getElementById('generateBtn').addEventListener('click', function() {
    const figura = document.getElementById('figura').value;
    const coordX = parseInt(document.getElementById('coordX').value) || 0;
    const coordY = parseInt(document.getElementById('coordY').value) || 0;
    const colorRelleno = document.getElementById('colorRelleno').value;
    const colorBorde = document.getElementById('colorBorde').value;

    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const ancho = canvas.width;
    const alto = canvas.height;

    ctx.clearRect(0, 0, ancho, alto); // Limpiar canvas antes de dibujar

    // Dibujar plano cartesiano con escalas
    dibujarPlanoCartesiano(ctx, ancho, alto);

    ctx.fillStyle = colorRelleno;
    ctx.strokeStyle = colorBorde;

    switch (figura) {
        case 'triangulo':
            const ladoTriangulo = parseInt(document.getElementById('ladoTriangulo').value) || 0;
            // Dibujar triángulo equilátero
            const alturaTriangulo = (Math.sqrt(3) / 2) * ladoTriangulo;
            ctx.beginPath();
            ctx.moveTo(coordX * 20 + ancho / 2, alto / 2 - coordY * 20);
            ctx.lineTo(coordX * 20 + ladoTriangulo * 20 + ancho / 2, alto / 2 - coordY * 20);
            ctx.lineTo(coordX * 20 + (ladoTriangulo / 2) * 20 + ancho / 2, alto / 2 - coordY * 20 - alturaTriangulo * 20);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
            break;
        case 'rectangulo':
            const ladoMayor = parseInt(document.getElementById('ladoMayor').value) || 0;
            const ladoMenor = parseInt(document.getElementById('ladoMenor').value) || 0;
            // Dibujar rectángulo
            ctx.fillRect(coordX * 20 + ancho / 2, alto / 2 - coordY * 20, ladoMayor * 20, -ladoMenor * 20);
            ctx.strokeRect(coordX * 20 + ancho / 2, alto / 2 - coordY * 20, ladoMayor * 20, -ladoMenor * 20);
            break;
        case 'circulo':
            const radio = parseInt(document.getElementById('radio').value) || 0;
            // Dibujar círculo
            ctx.beginPath();
            ctx.arc(coordX * 20 + ancho / 2, alto / 2 - coordY * 20, radio * 20, 0, 2 * Math.PI);
            ctx.fill();
            ctx.stroke();
            break;
        case 'pentagono':
            const ladoPentagono = parseInt(document.getElementById('ladoPentagono').value) || 0;
            const numLados = parseInt(document.getElementById('numLados').value) || 5;
            // Dibujar pentágono regular
            const angulo = (2 * Math.PI) / numLados;
            ctx.beginPath();
            for (let i = 0; i < numLados; i++) {
                const x = coordX * 20 + ancho / 2 + ladoPentagono * 20 * Math.cos(i * angulo);
                const y = alto / 2 - coordY * 20 + ladoPentagono * 20 * Math.sin(i * angulo);
                if (i === 0) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }
            }
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
            break;
    }
});

// Ajustar el tamaño del canvas al cargar la página
window.onload = function() {
    const canvas = document.getElementById('canvas');
    const ancho = canvas.parentElement.offsetWidth * 0.95;
    canvas.width = ancho;
    canvas.height = ancho; // Hacer el canvas cuadrado
};

// Ajustar el tamaño del canvas cuando se redimensione la ventana
window.onresize = function() {
    const canvas = document.getElementById('canvas');
    const ancho = canvas.parentElement.offsetWidth * 0.95;
    canvas.width = ancho;
    canvas.height = ancho; // Hacer el canvas cuadrado
};
