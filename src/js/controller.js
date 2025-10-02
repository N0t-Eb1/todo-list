import actions, { getCurrentState, getTask } from "./model";
import { render } from "./view";

/* --- handling events --- */
window.addEventListener("newTaskSubmitted", e => {
    actions.addTask({ text: e.detail });
});

window.addEventListener("toggleTaskCompletion", e => {
    actions.toggleTaskComplete(e.detail);
});

window.addEventListener("removeTask", e => {
    actions.deleteTask(e.detail);
});

window.addEventListener("stateUpdate", e => {
    render(e.detail);
});

/* --- app initilization --- */
render(getCurrentState());
