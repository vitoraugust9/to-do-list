document.addEventListener("DOMContentLoaded", () => {
  let inputTask = document.getElementById("inputTask");
  let listTasks = document.getElementById("listTasks");
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  let taskIdCounter =
    tasks.length > 0
      ? Math.max(
          ...tasks.map((task) => parseInt(task.id.replace("task_", "")))
        ) + 1
      : 0;
  let search = document.getElementById("searchInput");
  let bodyBlur = document.querySelector(".container");
  let headerBlur = document.querySelector(".blurHeader");
  let footerBlur = document.querySelector(".blurFooter");

  function updateNoTasksMessage() {
    if (listTasks.getElementsByTagName("button").length === 0) {
      let notElements = document.createElement("p");
      notElements.setAttribute("class", "notElements");
      notElements.textContent = "Não há tarefas!";
      listTasks.appendChild(notElements);
    } else {
      let removeElement = document.querySelector(".notElements");
      if (removeElement) {
        removeElement.remove();
      }
    }
  }

  function saveTasksToLocalStorage() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
  function loadTasksFromLocalStorage() {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      tasks = JSON.parse(storedTasks);
      taskIdCounter =
        tasks.length > 0
          ? Math.max(
              ...tasks.map((task) => parseInt(task.id.replace("task_", "")))
            ) + 1
          : 0;
      tasks.forEach((task) => {
        addTaskToList(task.id, task.text, task.status);
      });
    }
  }
  

  function addTaskToList(taskId, taskText, status) {
    let showTask = document.createElement("button");
    showTask.setAttribute("class", "showTask");
    showTask.addEventListener("click", () => {
      showTaskModal(taskId);
    });

    let task = document.createElement("li");
    task.setAttribute("class", "task");
    task.setAttribute("data-task-id", taskId);

    let textTask = document.createElement("div");
    textTask.setAttribute("class", "textTask");
    textTask.textContent = taskText;

    task.appendChild(textTask);
    task.appendChild(createTaskButtons(taskId));

    showTask.appendChild(task);
    listTasks.appendChild(showTask);
    updateNoTasksMessage();
    if (status === "Concluído") {
      task.classList.add("done");
    }
  }

  tasks.forEach((task) => addTaskToList(task.id, task.text, task.status));

  const form = document.getElementById("taskSubmit");
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    let taskText = inputTask.value.trim();
    if (taskText !== "") {
      let taskId = "task_" + taskIdCounter++;
      tasks.push({ id: taskId, text: taskText, status: "A fazer" });
      addTaskToList(taskId, taskText);
      saveTasksToLocalStorage();
    }
    inputTask.value = "";
  });

  function createTaskButtons(taskId) {
    let containerButtons = document.createElement("div");
    containerButtons.setAttribute("class", "actionTasksButtons");

    let deleteButton = document.createElement("button");
    deleteButton.setAttribute("class", "deleteButton");
    deleteButton.addEventListener("click", function (event) {
      event.stopPropagation();
      removeTask(taskId);
    });
    let imageTrash = document.createElement("img");
    imageTrash.src = "./public/trash.svg";
    deleteButton.appendChild(imageTrash);
    imageTrash.setAttribute("class", "imageTrash");

    let doneButton = document.createElement("button");
    doneButton.setAttribute("class", "buttonDone");
    doneButton.addEventListener("click", function (event) {
      event.stopPropagation();
      taskDone(taskId);
    });
    let imageDone = document.createElement("img");
    imageDone.src = "./public/check.svg";
    doneButton.appendChild(imageDone);
    imageDone.setAttribute("class", "imageDone");

    containerButtons.appendChild(deleteButton);
    containerButtons.appendChild(doneButton);

    return containerButtons;
  }

  function removeTask(taskId) {
    tasks = tasks.filter((task) => task.id !== taskId);
    let taskElement = document.querySelector(
      `button[class="showTask"] > .task[data-task-id="${taskId}"]`
    );
    if (taskElement) {
      taskElement.parentElement.remove();
    }
    saveTasksToLocalStorage();
    updateNoTasksMessage();
  }

  function taskDone(taskId) {
    let taskIndex = tasks.findIndex((task) => task.id === taskId);
    if (taskIndex !== -1) {
      tasks[taskIndex].status =
        tasks[taskIndex].status === "A fazer" ? "Concluído" : "A fazer";

      let taskElement = document.querySelector(
        `.task[data-task-id="${taskId}"]`
      );
      if (taskElement) {
        taskElement.classList.toggle("done");
      }

      saveTasksToLocalStorage();
    }
  }

  updateNoTasksMessage(); // Chamada inicial para garantir que a mensagem de "Não há tarefas" seja mostrada corretamente.

  function showTaskModal(taskId) {
    let task = tasks.find((task) => task.id === taskId);

    if (task) {
      let showTaskDialog = document.getElementById("showTaskDialog");

      let showTaskInput = document.getElementById("editTaskInput");
      showTaskInput.value = task.text;

      let saveTextButton = showTaskDialog.querySelector("#saveText");
      let closeTaskButton = document.getElementById("closeModal");
      let cancelEditTaskButton = document.getElementById("cancelEditTask");

      // Função modificada para salvar o texto editado
      function saveTaskText(event) {
        event.preventDefault();
        let newText = showTaskInput.value.trim();
        if (newText !== "") {
          task.text = newText;
          let taskElement = document.querySelector(
            `.task[data-task-id="${taskId}"] .textTask`
          );
          if (taskElement) {
            taskElement.textContent = newText;
          }
          saveTasksToLocalStorage(); // Salva as mudanças no localStorage
        }
        removeBlur();
        showTaskDialog.close(); // Fecha o modal após salvar
        removeEventListeners();
      }

      function closeTaskModal(event) {
        removeEventListeners();
        removeBlur();
        showTaskDialog.close(); // Fecha o modal ao clicar no botão fechar
      }

      function cancelEditTask(event) {
        closeTaskModal(event); // Fecha o modal ao clicar no botão cancelar
      }

      function removeEventListeners() {
        saveTextButton.removeEventListener("click", saveTaskText);
        closeTaskButton.removeEventListener("click", closeTaskModal);
        cancelEditTaskButton.removeEventListener("click", cancelEditTask);
      }

      saveTextButton.addEventListener("click", saveTaskText);
      closeTaskButton.addEventListener("click", closeTaskModal);
      cancelEditTaskButton.addEventListener("click", cancelEditTask);

      showTaskDialog.showModal(); // Exibe o modal
      setBlur(); // Aplica o efeito de desfoque ao fundo
    }
  }

  search.addEventListener("input", () => {
    let searchText = document.getElementById("searchInput").value.toLowerCase();
    let filteredTasks = tasks.filter((task) =>
      task.text.toLowerCase().includes(searchText)
    );
    listTasks.innerHTML = ""; // Limpa a lista de tarefas antes de adicionar tarefas filtradas
    if (filteredTasks.length > 0) {
      filteredTasks.forEach((task) => {
        // Adiciona as tarefas filtradas à lista de tarefas
        let showTask = document.createElement("button");
        showTask.setAttribute("class", "showTask");
        showTask.addEventListener("click", (event) => {
          showTaskModal(task.id);
        });
        let taskElement = document.createElement("li");
        taskElement.setAttribute("class", "task");
        taskElement.setAttribute("data-task-id", task.id);

        let textTask = document.createElement("div");
        textTask.setAttribute("class", "textTask");
        textTask.textContent = task.text;

        taskElement.appendChild(textTask);

        let containerButtons = document.createElement("div");
        containerButtons.setAttribute("class", "actionTasksButtons");

        let deleteButton = document.createElement("button");
        deleteButton.setAttribute("class", "deleteButton");
        deleteButton.addEventListener("click", function (event) {
          event.stopPropagation();
          removeTask(task.id);
        });
        let imageTrash = document.createElement("img");
        imageTrash.src = "./public/trash.svg";
        deleteButton.appendChild(imageTrash);
        imageTrash.setAttribute("class", "imageTrash");

        let buttonDone = document.createElement("button");
        buttonDone.setAttribute("class", "buttonDone");
        buttonDone.addEventListener("click", function (event) {
          event.stopPropagation();
          taskDone(task.id);
        });
        let imageDone = document.createElement("img");
        imageDone.src = "./public/check.svg";
        buttonDone.appendChild(imageDone);
        imageDone.setAttribute("class", "imageDone");

        containerButtons.appendChild(deleteButton);
        containerButtons.appendChild(buttonDone);

        taskElement.appendChild(containerButtons);

        showTask.appendChild(taskElement);

        listTasks.appendChild(showTask);
      });
    } else if (searchText !== "") {
      let notElements = document.createElement("p");
      notElements.setAttribute("class", "notElements");
      notElements.textContent = `Nenhuma tarefa relacionada a " ${searchText} " foi encontrada!`;
      listTasks.appendChild(notElements);
    } else {
      if (tasks.length === 0) {
        let notElements = document.createElement("p");
        notElements.setAttribute("class", "notElements");
        notElements.textContent = "Não há tarefas!";
        listTasks.appendChild(notElements);
      }
    }
  });
});
