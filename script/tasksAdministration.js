document.addEventListener("DOMContentLoaded", () => {
  let inputTask = document.getElementById("inputTask");
  let listTasks = document.getElementById("listTasks");
  let tasks = [];
  let search = document.getElementById("searchInput");
  let taskIdCounter = 0;
  let bodyBlur = document.querySelector(".container");
  let headerBlur = document.querySelector(".blurHeader");
  let footerBlur = document.querySelector(".blurFooter");

  const form = document.getElementById("taskSubmit");
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    addTask();
  });

  if (listTasks.getElementsByTagName("li").length === 0) {
    let notElements = document.createElement("p");
    notElements.setAttribute("class", "notElements");
    notElements.textContent = "Não há tarefas!";
    listTasks.appendChild(notElements);
  }

  function setBlur() {
    bodyBlur.setAttribute("id", "blur");
    headerBlur.setAttribute("id", "blur");
    footerBlur.setAttribute("id", "blur");
  }

  function removeBlur() {
    bodyBlur.removeAttribute("id");
    headerBlur.removeAttribute("id");
    footerBlur.removeAttribute("id");
  }

  function addTask() {
    if (inputTask.value.trim() !== "") {
      let taskText = inputTask.value.trim();
      let taskId = "task_" + taskIdCounter++;
      tasks.push({ id: taskId, text: taskText });

      let showTask = document.createElement("button");
      showTask.setAttribute("class", "showTask");
      showTask.addEventListener("click", (event) => {
        showTaskModal(taskId);
      });
      let task = document.createElement("li");
      task.setAttribute("class", "task");
      task.setAttribute("data-task-id", taskId);

      let textTask = document.createElement("div");
      textTask.setAttribute("class", "textTask");
      textTask.textContent = taskText;

      task.appendChild(textTask);

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

      let buttonDone = document.createElement("button");
      buttonDone.setAttribute("class", "buttonDone");
      buttonDone.addEventListener("click", function (event) {
        event.stopPropagation();
        taskDone(taskId);
      });
      let imageDone = document.createElement("img");
      imageDone.src = "./public/check.svg";
      buttonDone.appendChild(imageDone);
      imageDone.setAttribute("class", "imageDone");

      containerButtons.appendChild(deleteButton);
      containerButtons.appendChild(buttonDone);

      task.appendChild(containerButtons);

      let removeElement = document.querySelector(".notElements");
      if (removeElement) {
        removeElement.remove();
      }
      showTask.appendChild(task);
      listTasks.appendChild(showTask);
    }
    inputTask.value = "";

    if (listTasks.getElementsByTagName("li").length > 0) {
      let removeElement = document.querySelector(".notElements");
      if (removeElement) {
        removeElement.remove();
      }
    }
  }

  function removeTask(taskId) {
    tasks = tasks.filter((task) => task.id !== taskId);
    let taskElement = document.querySelector(`.task[data-task-id="${taskId}"]`);
    if (taskElement) {
      taskElement.remove();
    }

    if (listTasks.getElementsByTagName("li").length === 0) {
      let notElements = document.createElement("p");
      notElements.setAttribute("class", "notElements");
      notElements.textContent = "Não há tarefas!";
      listTasks.appendChild(notElements);
    }
  }

  function taskDone(taskId) {
    let task = tasks.find((task) => task.id === taskId);
    if (task) {
      let taskElement = document.querySelector(
        `.task[data-task-id="${taskId}"]`
      );
      if (taskElement) {
        taskElement.classList.toggle("done");
      }
    }
  }

  function showTaskModal(taskId) {
    let task = tasks.find((task) => task.id === taskId);

    if (task) {
      let taskElement = document.querySelector(
        `.task[data-task-id="${taskId}"]`
      );
      let showTaskDialog = document.getElementById("showTaskDialog");

      let showTaskInput = document.getElementById("editTaskInput");
      showTaskInput.textContent = task.text;

      let saveTextButton = showTaskDialog.querySelector("#saveText");
      saveTextButton.addEventListener("click", function (event) {
        event.preventDefault();

        let newText = showTaskInput.value.trim();
        if (newText !== "") {
          task.text = newText;
          taskElement.querySelector(".textTask").textContent = newText;
        }
        removeBlur();
        showTaskDialog.close();
      });

      let closeshowTaskButton = document.getElementById("closeModal");
      closeshowTaskButton.addEventListener("click", function (event) {
        removeBlur();
        showTaskDialog.close();
      });

      let cancelshowTaskButton = document.getElementById("cancelEditTask");
      cancelshowTaskButton.addEventListener("click", function (event) {
        showTaskDialog.close();
        removeBlur();
      });

      showTaskDialog.showModal();
      setBlur();
    }
  }

  search.addEventListener("input", () => {
    let searchText = document.getElementById("searchInput").value.toLowerCase();
    let filteredTasks = tasks.filter((task) =>
      task.text.toLowerCase().includes(searchText)
    );
    listTasks.innerHTML = "";
    if (filteredTasks.length > 0) {
      filteredTasks.forEach((task) => {
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

})