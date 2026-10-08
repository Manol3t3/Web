// ---------- Cookies ----------
function guardarCookie(nombre, valor) {
    document.cookie = nombre + "=" + valor + ";max-age=31536000;path=/";
}
function leerCookie(nombre) {
    var lista = document.cookie.split("; ");
    for (var i = 0; i < lista.length; i++) {
        var par = lista[i].split("=");
        if (par[0] == nombre) return decodeURIComponent(par[1]);
    }
    return "";
}

// ---------- Fecha y hora (index) ----------
function mostrarHora() {
    var ahora = new Date();
    document.getElementById("reloj").textContent =
        ahora.toLocaleDateString("es-MX", { weekday: "long", day: "numeric", month: "long", year: "numeric" }) +
        " - " + ahora.toLocaleTimeString("es-MX");
}
if (document.getElementById("reloj")) {
    mostrarHora();
    setInterval(mostrarHora, 1000);
    var nombreGuardado = leerCookie("nombre");
    document.getElementById("saludo").textContent =
        nombreGuardado ? "Hola de nuevo, " + nombreGuardado : "Bienvenido, deja tu nombre en Contacto";
}

// ---------- Convertidor ----------
function convertir() {
    var monto = parseFloat(document.getElementById("monto").value);
    var tasa = parseFloat(document.getElementById("moneda").value);
    if (isNaN(monto)) {
        document.getElementById("resultado").textContent = "Escribe una cantidad";
        return;
    }
    document.getElementById("resultado").textContent = "= $" + (monto * tasa).toFixed(2) + " pesos";
}

// ---------- Calculadora ----------
function tecla(t) { document.getElementById("pantalla").value += t; }
function limpiar() { document.getElementById("pantalla").value = ""; }
function calcular() {
    var p = document.getElementById("pantalla");
    var m = p.value.match(/^(-?[\d.]+)([+\-*\/])([\d.]+)$/);
    if (!m) { p.value = "Error"; return; }
    var a = parseFloat(m[1]), b = parseFloat(m[3]), r;
    if (m[2] == "+") r = a + b;
    if (m[2] == "-") r = a - b;
    if (m[2] == "*") r = a * b;
    if (m[2] == "/") r = b == 0 ? "Error" : a / b;
    p.value = r;
}

// ---------- Cuestionario ----------
function calificar() {
    var correctas = { q1: "b", q2: "b", q3: "c" };
    var puntos = 0;
    for (var q in correctas) {
        var marcada = document.querySelector('input[name="' + q + '"]:checked');
        if (marcada && marcada.value == correctas[q]) puntos++;
    }
    document.getElementById("nota").textContent = "Sacaste " + puntos + " de 3";
}

// ---------- Validación de contacto ----------
var form = document.getElementById("contacto");
if (form) {
    form.addEventListener("submit", function (e) {
        e.preventDefault();
        var errores = [];
        var nombre = document.getElementById("nombre").value.trim();
        var correo = document.getElementById("correo").value.trim();
        if (nombre.length < 3) errores.push("El nombre debe tener al menos 3 letras.");
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) errores.push("El correo no es válido.");
        if (!document.querySelector('input[name="genero"]:checked')) errores.push("Elige un género.");
        if (!document.getElementById("pais").value) errores.push("Elige un país.");
        if (document.getElementById("mensaje").value.trim().length < 10) errores.push("El mensaje debe tener al menos 10 caracteres.");
        if (!document.getElementById("terminos").checked) errores.push("Debes aceptar los términos.");

        document.getElementById("errores").innerHTML = errores.join("<br>");
        if (errores.length == 0) {
            guardarCookie("nombre", encodeURIComponent(nombre.split(" ")[0]));
            document.getElementById("exito").textContent = "Formulario correcto, gracias " + nombre.split(" ")[0];
            form.reset();
        } else {
            document.getElementById("exito").textContent = "";
        }
    });
}
