document.getElementById('coord-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const latStr = document.getElementById('lat').value.trim();
    const lngStr = document.getElementById('lng').value.trim();
    const error = document.getElementById('error');

    // Coordenadas actualizadas en decimal
    const expectedLat = dmsToDecimal("43°58'42\" N");
    const expectedLng = dmsToDecimal("15°23'0\" E");

    const inputLat = dmsToDecimal(latStr);
    const inputLng = dmsToDecimal(lngStr);

    if (inputLat === null || inputLng === null) {
        error.textContent = "Formato inválido. Usa el formato correcto (ej: 43°58'42\" N)";
        return;
    }

    const withinMargin = (a, b, margin = 0.0001) => Math.abs(a - b) < margin;

    if (withinMargin(inputLat, expectedLat) && withinMargin(inputLng, expectedLng)) {
        window.location.href = "ubicacion.html";
    } else {
        error.textContent = "Coordenadas incorrectas. Intenta nuevamente.";
    }
});

function dmsToDecimal(dmsStr) {
    const regex = /(\d+)°(\d+)'(\d+)"\s*([NSEW])/i;
    const match = dmsStr.match(regex);
    if (!match) return null;

    let degrees = parseInt(match[1]);
    let minutes = parseInt(match[2]);
    let seconds = parseInt(match[3]);
    let direction = match[4].toUpperCase();

    let decimal = degrees + minutes / 60 + seconds / 3600;

    if (direction === 'S' || direction === 'W') {
        decimal *= -1;
    }

    return parseFloat(decimal.toFixed(6));
}
