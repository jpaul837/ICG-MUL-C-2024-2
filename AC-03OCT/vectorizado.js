class Punto {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

class Poligono {
    constructor() {
        this.puntos = [];
    }

    generarPuntosAleatorios(min, max, ancho, alto) {
        const numPuntos = Math.floor(Math.random() * (max - min + 1)) + min;
        for (let i = 0; i < numPuntos; i++) {
            const x = Math.floor(Math.random() * ancho);
            const y = Math.floor(Math.random() * alto);
            this.puntos.push(new Punto(x, y));
        }
    }

    dibujarSVG(svgElement) {
        if (this.puntos.length < 2) return;

        const puntosSVG = this.puntos.map(punto => `${punto.x},${punto.y}`).join(" ");

        const poligonoSVG = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
        poligonoSVG.setAttribute("points", puntosSVG);
        poligonoSVG.setAttribute("stroke", "blue");
        poligonoSVG.setAttribute("stroke-width", "2");
        poligonoSVG.setAttribute("fill", "none");

        svgElement.appendChild(poligonoSVG);

        for (let punto of this.puntos) {
            const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            circle.setAttribute("cx", punto.x);
            circle.setAttribute("cy", punto.y);
            circle.setAttribute("r", "3");
            circle.setAttribute("fill", "black");

            svgElement.appendChild(circle);
        }
    }

    esConcavo() {
        const n = this.puntos.length;
        let signo = 0;

        for (let i = 0; i < n; i++) {
            const p1 = this.puntos[i];
            const p2 = this.puntos[(i + 1) % n];
            const p3 = this.puntos[(i + 2) % n];

            const dx1 = p2.x - p1.x;
            const dy1 = p2.y - p1.y;
            const dx2 = p3.x - p2.x;
            const dy2 = p3.y - p2.y;

            const cruz = dx1 * dy2 - dy1 * dx2;

            if (signo === 0) {
                signo = Math.sign(cruz);
            } else if (signo !== Math.sign(cruz) && cruz !== 0) {
                return true;
            }
        }
        return false;
    }
}

function iniciarDibujoSVG() {
    const svgElement = document.getElementById('miSVG');
    const ancho = svgElement.clientWidth;
    const alto = svgElement.clientHeight;

    const poligono = new Poligono();
    poligono.generarPuntosAleatorios(2, 10, ancho, alto);

    poligono.dibujarSVG(svgElement);

    const tipo = poligono.esConcavo() ? "cóncavo" : "convexo";
    const texto = document.createElementNS("http://www.w3.org/2000/svg", "text");
    texto.setAttribute("x", 10);
    texto.setAttribute("y", 20);
    texto.setAttribute("fill", "black");
    texto.textContent = `El polígono es ${tipo}`;

    svgElement.appendChild(texto);
}
