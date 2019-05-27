function toCalculate() {
    let num1 = parseFloat(document.getElementById("x").value);
    let num2 = parseFloat(document.getElementById("y").value);
    return (num1 + num2).toFixed(2);
}