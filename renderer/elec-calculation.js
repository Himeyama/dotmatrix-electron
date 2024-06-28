const calc = () => {
    const ledE = parseFloat(document.getElementById("LedE").value)
    const ledI = parseFloat(document.getElementById("LedI").value)
    const powerE = parseFloat(document.getElementById("PowerE").value)
    const r = ((powerE - ledE) / (ledI / 1000)).toFixed(1)
    document.getElementById("r").innerText = r
}

document.getElementById("LedE").addEventListener("input", calc)
document.getElementById("LedI").addEventListener("input", calc)
document.getElementById("PowerE").addEventListener("input", calc)