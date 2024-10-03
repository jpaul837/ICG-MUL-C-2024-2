class Punto {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    dibujar(contexto) {
        contexto.beginPath();
        contexto.arc(this.x, this.y, 3, 0, 2 * Math.PI);
        contexto.fillStyle = 'black';
        contexto.fill();
        contexto.closePath();
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

    dibujar(contexto) {
        if (this.puntos.length < 2) return;

        contexto.beginPath();
        contexto.moveTo(this.puntos[0].x, this.puntos[0].y);

        for (let i = 1; i < this.puntos.length; i++) {
            contexto.lineTo(this.puntos[i].x, this.puntos[i].y);
        }

        contexto.lineTo(this.puntos[0].x, this.puntos[0].y);
        contexto.strokeStyle = 'blue';
        contexto.lineWidth = 2;
        contexto.stroke();
        contexto.closePath();

        for (let punto of this.puntos) {
            punto.dibujar(contexto);
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

function iniciarDibujo() {
    const canvas = document.getElementById('miCanvas');
    const contexto = canvas.getContext('2d');
    const ancho = canvas.width;
    const alto = canvas.height;

    const poligono = new Poligono();
    poligono.generarPuntosAleatorios(2, 10, ancho, alto);

    poligono.dibujar(contexto);

    const tipo = poligono.esConcavo() ? "cóncavo" : "convexo";
    contexto.font = "16px Arial";
    contexto.fillStyle = "black";
    contexto.fillText(`El polígono es ${tipo}`, 10, 20);
}
