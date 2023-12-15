// Classe Tarefa
class Tarefa {
    constructor(descricao, prioridade, status) {
      this.descricao = descricao;
      this.prioridade = prioridade;
      this.status = status;
    }
  }
  
  // Classe ListaTarefas
  class ListaTarefas {
    constructor(nome) {
      this.nome = nome;
      this.tarefas = [];
    }
  
    adicionarTarefa(tarefa) {
      this.tarefas.push(tarefa);
    }
  
    removerTarefa(tarefa) {
      this.tarefas = this.tarefas.filter((item) => item !== tarefa);
    }
  
    marcarConcluida(tarefa) {
      tarefa.status = "concluída";
    }
  
    exibirLista() {
      return this.tarefas.map((tarefa) => {
        return `${tarefa.descricao} - Prioridade: ${tarefa.prioridade} - Status: ${tarefa.status}`;
      });
    }
  
    calcularEstatisticas() {
      const totalTarefas = this.tarefas.length;
      const concluidas = this.tarefas.filter((tarefa) => tarefa.status === "concluída").length;
      const pendentes = totalTarefas - concluidas;
      return `Total: ${totalTarefas} | Concluídas: ${concluidas} | Pendentes: ${pendentes}`;
    }
  }
  
  // Classe AplicativoToDoList
  class AplicativoToDoList {
    constructor() {
      this.listasTarefas = [];
      this.listaAtual = null;
    }
  
    criarLista(nome) {
      const novaLista = new ListaTarefas(nome);
      this.listasTarefas.push(novaLista);
    }
  
    selecionarLista(nome) {
      this.listaAtual = this.listasTarefas.find((lista) => lista.nome === nome);
    }
  
    exibirListasDisponiveis() {
      return this.listasTarefas.map((lista) => lista.nome);
    }
  }
  
  // Instância do aplicativo
  const app = new AplicativoToDoList();
  
  // Funções para interação com a interface
  function createNewList() {
    const listName = prompt("Digite o nome da nova lista:");
    if (listName) {
      app.criarLista(listName);
      updateLists();
    }
  }
  
  function selectList() {
    const selectedListName = prompt("Digite o nome da lista:");
    if (selectedListName) {
      app.selecionarLista(selectedListName);
      updateTasks();
    }
  }
  
  function updateLists() {
    const listsContainer = document.getElementById("lists");
    listsContainer.innerHTML = "";
    app.listasTarefas.forEach((lista) => {
      const button = document.createElement("button");
      button.textContent = lista.nome;
      button.onclick = () => {
        app.selecionarLista(lista.nome);
        updateTasks();
      };
      listsContainer.appendChild(button);
    });
  }
  
  function updateTasks() {
    const listNameElement = document.getElementById("list-name");
    const tasksContainer = document.getElementById("tasks");
    const statisticsElement = document.getElementById("statistics");
  
    listNameElement.textContent = `Lista Atual: ${app.listaAtual.nome}`;
    tasksContainer.innerHTML = "";
    statisticsElement.textContent = "";
  
    if (app.listaAtual) {
      app.listaAtual.tarefas.forEach((tarefa) => {
        const li = document.createElement("li");
        li.className = "task";
        li.innerHTML = `${tarefa.descricao} - Prioridade: ${tarefa.prioridade} - Status: ${tarefa.status}`;
        const removeButton = document.createElement("button");
        removeButton.textContent = "Remover";
        removeButton.onclick = () => {
          app.listaAtual.removerTarefa(tarefa);
          updateTasks();
        };
        const completeButton = document.createElement("button");
        completeButton.textContent = "Concluir";
        completeButton.onclick = () => {
          app.listaAtual.marcarConcluida(tarefa);
          updateTasks();
        };
        li.appendChild(removeButton);
        li.appendChild(completeButton);
        tasksContainer.appendChild(li);
      });
  
      statisticsElement.textContent = app.listaAtual.calcularEstatisticas();
    }
  }
  
  function addNewTask() {
    const descricao = prompt("Digite a descrição da nova tarefa:");
    const prioridade = prompt("Digite a prioridade da nova tarefa (baixa, média, alta):");
    const status = "pendente";
  
    if (descricao && prioridade) {
      const novaTarefa = new Tarefa(descricao, prioridade, status);
      app.listaAtual.adicionarTarefa(novaTarefa);
      updateTasks();
    }
  }
  
  // Inicialização
  updateLists();
  selectList();
  