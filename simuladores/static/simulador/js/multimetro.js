let historialData = [];

function calcular() {
    if (!window.powerOn) return;

    const vIn = document.getElementById("voltaje");
    const iIn = document.getElementById("corriente");
    const rIn = document.getElementById("resistencia");
    const modo = document.getElementById("modo").value;
    const display = document.getElementById("display");

    const v = parseFloat(vIn.value);
    const i = parseFloat(iIn.value);
    const r = parseFloat(rIn.value);

    const validos = [v, i, r].filter(n => !isNaN(n) && isFinite(n));
    if (validos.length < 2) {
        Swal.fire({ 
            icon: 'error', 
            title: 'Datos insuficientes', 
            text: 'Ingrese al menos dos valores (V, A o Ω).' 
        });
        return;
    }

    document.getElementById("spinner").classList.remove("d-none");

    setTimeout(() => {
        let res = 0;
        let unit = "";

        if (modo === "auto") {
            if (isNaN(v)) { res = i * r; unit = "V"; }
            else if (isNaN(i)) { res = v / r; unit = "A"; }
            else { res = v / i; unit = "Ω"; }
        } else {
            switch (modo) {
                case "voltaje": res = i * r; unit = "V"; break;
                case "corriente": res = v / r; unit = "A"; break;
                case "resistencia": res = v / i; unit = "Ω"; break;
                case "potencia": res = v * i; unit = "W"; break;
            }
        }

        if (res > 5000 || !isFinite(res)) {
            display.innerText = "O.L";
            display.style.color = "#ff4444";
        } else {
            const textoFinal = `${res.toFixed(2)} ${unit}`;
            display.innerText = textoFinal;
            display.style.color = "#00ff66";
            actualizarHistorial(textoFinal);
        }
        document.getElementById("spinner").classList.add("d-none");
    }, 600);
}
function actualizarHistorial(texto) {
    const partes = texto.split(" ");
    const valor = partes[0];
    const unidad = partes[1];
    const tiempo = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

    // Guardar en el array (máximo 10)
    historialData.unshift({ valor, unidad, tiempo });
    if (historialData.length > 10) historialData.pop();

    const container = document.getElementById("historial");
    container.innerHTML = ""; 

    historialData.forEach(data => {
        const col = document.createElement("div");
        col.className = "col-12 animate__animated animate__fadeInLeft"; 
        
        col.innerHTML = `
            <div class="historial-card">
                <div>
                    <span class="historial-label">MAGNITUD</span>
                    <div class="historial-valor">${data.valor} <span class="text-success">${data.unit || data.unidad}</span></div>
                </div>
                <div class="text-end">
                    <div class="text-muted small">${data.tiempo}</div>
                </div>
            </div>
        `;
        container.appendChild(col);
    });
}


