const exibirStatus = (sistemas: string, online: boolean): void => {
    if (online){
        console.log(`${sistemas}: online`);
    } else {
        console.log(`${sistemas}: offline`);
    }
}

exibirStatus ("API", true);
exibirStatus ("Banco", false);