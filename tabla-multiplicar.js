let base = 1;

while (base <= 10) {
    console.log(`\nTabla del ${base}:`);

    let indice = 1;
    while (indice <= 10) {
        console.log(`${base} x ${indice} = ${base * indice}`);
        indice++;
    }

    base++;
}
