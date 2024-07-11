/*Task-one*/ 
function numeroMasPequeño(arr) {
    return Math.min(...arr);
}

let arr = [1, 6, 18, 2, -2, 100];
console.log(numeroMasPequeño(arr));


/*Task-Two*/ 
function menosFrequente(arr) {
    let frecuencyMap = {}

    arr.forEach(elemento => {
        if(frecuencyMap[elemento]) {
            frecuencyMap[elemento]++;
        }else {
            frecuencyMap[elemento] = 1;
        }
    });

    let elementoMenosFrequente = arr[0];
    let frecuenciaMinima = frecuencyMap[elementoMenosFrequente];

    for (let elemento in frecuencyMap) {
        if (frecuencyMap[elemento] < frecuenciaMinima) {
            elementoMenosFrequente = elemento;
            frecuenciaMinima = frecuencyMap[elemento];
        }
    }

    return elementoMenosFrequente;
}

let arr1 = [3, 'c', 'c', 'a', 2, 3, 'c', 3, 'c', 2, 4, 9, 9, 4, 'a', 78];
console.log(menosFrequente(arr1))

/*Task-three*/
function eliminarDuplicados(arr) {
    let unicoElemento = [];
    let elementoRepetido = {}

    arr.forEach(elementos => {
        if (!elementoRepetido[elementos]) {
            elementoRepetido[elementos] = 1;
        } else {
            elementoRepetido[elementos]++;
        }
    });

    for (let elementos in elementoRepetido) {
        if (elementoRepetido[elementos] === 1) {
            unicoElemento.push(elementos);
        }
    }

    return unicoElemento;
}

let arr2 = [7, 9, 1, 'a', 'a', 'f', 9, 4, 2, 'd', 'd', 102, 102];
console.log(eliminarDuplicados(arr2));

/*Task-four*/ 
function concatenarMatrices(arr) {
    return arr.map(subArray => subArray.join(' '));
}

let matriz = [
    ["The", "little", "horse"],
    ["Plane", "over", "the", "ocean"],
    ["Chocolate", "ice", "cream", "is", "awesome"],
    ["this", "is", "a", "large", "sentece"]
]

console.log(concatenarMatrices(matriz))