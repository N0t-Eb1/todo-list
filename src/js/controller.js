import actions from "./model";
import { renderApp } from "./view";

/* --- handling events --- */
window.addEventListener("newTaskSubmitted", e => {
    actions.addTask({ title: e.detail });
});

window.addEventListener("changeCurrentProject", e => {
    actions.changeCurrentProject(e.detail);
});

window.addEventListener("newProject", e => {
    actions.addProject({ name: e.detail });
});

window.addEventListener("changeProjectName", e => {
    actions.changeCurrentProjectName(e.detail);
});

window.addEventListener("toggleTaskCompletion", e => {
    actions.toggleTaskCompletion(e.detail);
});

window.addEventListener("removeTask", e => {
    actions.deleteTask(e.detail);
});

window.addEventListener("deleteProject", e => {
    actions.deleteCurrentProject();
});

window.addEventListener("stateUpdate", e => {
    renderApp(e.detail);
});

/* --- initial render --- */
renderApp(actions.appState);
