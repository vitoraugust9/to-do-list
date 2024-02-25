document.addEventListener("DOMContentLoaded", function () {
  const prefersColorScheme = window.matchMedia("(prefers-color-scheme: dark)");
  let favicon = document.getElementsByClassName("favicon")[0];

  if (!prefersColorScheme.matches) {
    favicon.href = "./public/list-task.svg";
  } else {
    favicon.href = "./public/list-task-white.svg";
  }
});
