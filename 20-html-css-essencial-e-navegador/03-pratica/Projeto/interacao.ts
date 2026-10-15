console.log("TypeScript conectado!");

const formulario = document.querySelector("form");
const newTask = document.querySelector("#create-new-task");
const lista = document.querySelector("ul");
const aviso = document.querySelector(".aviso");
let ultimoId = 2;

if (
    formulario instanceof HTMLFormElement &&
    newTask instanceof HTMLInputElement &&
    lista !== null &&
    aviso !== null
) {
    formulario.addEventListener("submit", (evento) => {
        evento.preventDefault();
        const tarefa = newTask.value.trim();
        if (tarefa === "") {
            console.log(`Digite uma tarefa válida`);
            aviso.textContent = "Digite uma tarefa válida";
            return;
        }
        ultimoId++;
        const idTarefa = `tarefa-${ultimoId}`;
        // precisamos criar o novoLi, que engloba o checkbox e o label. Depois fazer o append do checkbox e do label nesse "novoLi".

        const novoLi = document.createElement("li");
        const novoCheckbox = document.createElement("input");
        novoCheckbox.type = "checkbox";
        novoCheckbox.id = idTarefa;

        const novoItem = document.createElement("label");
        novoItem.htmlFor = idTarefa;
        novoItem.textContent = tarefa;

        novoLi.append(novoCheckbox, novoItem);

        // agora fazer o append do novoLi, contendo o checkbox + label, na lista.

        // Lembre-se da estrutura:
        // <ul>
        //     <li>
        //         <input type="checkbox" id="tarefa-2">
        //         <label for="tarefa-2">Organizar mesa</label>
        //     </li>
        // </ul>

        lista.append(novoLi);
        aviso.textContent = "Tarefa adicionada com sucesso!";

        newTask.value = "";
        newTask.focus();
    });
} else {
    console.error("Não foi possível inicializar a aplicação.");
}
