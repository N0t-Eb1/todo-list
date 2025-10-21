import dom from "./DOM-elements";
import {
    createTask,
    emptyList,
    createListContainer,
    createProjectsContainer,
    createProjectItem,
    emitEvent,
    isValidInput,
} from "./helpers";

const tempUiState = {
    listContainerScrollPosition: null,
    previousProject: null,
};

const clickActions = {
    closeSidebar() {
        dom.sideBar.classList.remove("visible");
    },

    closeDialog(button) {
        const dialog = button.closest("dialog");
        const input = dialog.querySelector("input");
        dialog.close();
        input.value = "";
        inputActions.validateDialog(input);
    },

    openNewProjectModal() {
        dom.newProjectDialog.showModal();
    },

    addNewProject() {
        const input = dom.newProjectDialog.querySelector("input");
        emitEvent("newProject", input.value.trim());

        input.value = "";
        inputActions.validateDialog(input);
        dom.newProjectDialog.close();
        dom.sideBar.classList.remove("visible");
    },

    openSidebar() {
        dom.sideBar.classList.add("visible");
    },

    changeCurrentProject(project) {
        const id = project.closest(".project").dataset.id;
        if (dom.projectsMenuContainer.dataset.currentProjectId === id) return;

        emitEvent("changeCurrentProject", id);

        dom.sideBar.classList.remove("visible");
    },

    addTask() {
        emitEvent("newTaskSubmitted", dom.addTaskInput.value.trim());

        dom.addTaskInput.value = "";
        dom.addTaskBtn.setAttribute("disabled", "");
    },

    toggleCompletion(button) {
        emitEvent(
            "toggleTaskCompletion",
            button.closest(".task-item").dataset.taskId
        );
    },

    deleteTask(button) {
        emitEvent("removeTask", button.closest(".task-item").dataset.taskId);
    },
};

const scrollActions = {
    listContainer(list) {
        tempUiState.listContainerScrollPosition = list.scrollTop;
    },
};

const inputActions = {
    validateAddTask(input) {
        if (isValidInput(input.value))
            dom.addTaskBtn.removeAttribute("disabled");
        else dom.addTaskBtn.setAttribute("disabled", "");
    },

    validateDialog(input) {
        const confirmBtn = input.parentElement.querySelector(".add");
        if (isValidInput(input.value)) confirmBtn.removeAttribute("disabled");
        else confirmBtn.setAttribute("disabled", "");
    },
};

export function renderApp(state) {
    renderProjectsMenu(state);
    setProjectHeader(state.currentProject);
    renderTasksList(state.currentProject);
    manageScrollPosition(state.currentProject);
}

function renderProjectsMenu(state) {
    dom.projectsMenuContainer.dataset.currentProjectId =
        state.currentProject.id;
    const projectsContainer = createProjectsContainer();
    state.projects.forEach(project =>
        projectsContainer.append(
            createProjectItem(project, state.currentProject)
        )
    );
    dom.projectsMenuContainer.replaceChildren(projectsContainer);
}

function setProjectHeader(project) {
    dom.projectName.textContent = project.name;
    dom.taskCount.textContent = `${project.tasksLeft} tasks left`;
}

function renderTasksList(project) {
    if (!project.tasks.length) dom.tasksContainer.replaceChildren(emptyList());
    else {
        const list = createListContainer();
        project.tasks.forEach(task => list.appendChild(createTask(task)));
        dom.tasksContainer.replaceChildren(list);
    }
}

function manageScrollPosition(project) {
    if (!project.tasks.length) return;

    if (tempUiState.previousProject !== project.id)
        tempUiState.listContainerScrollPosition = 0;
    tempUiState.previousProject = project.id;
    document.querySelector(".tasks-list").scrollTop =
        tempUiState.listContainerScrollPosition;
}

/* ---click events--- */
window.addEventListener("click", e => {
    const isAClickTarget = e.target.closest("[data-action-click]");

    if (isAClickTarget)
        clickActions[isAClickTarget.dataset.actionClick](e.target);
});

/* ---scroll events--- */
window.addEventListener(
    "scroll",
    e => {
        const isAScrollTarget = e.target.closest("[data-action-scroll]");

        if (isAScrollTarget)
            scrollActions[isAScrollTarget.dataset.actionScroll](e.target);
    },
    true
);

/* ---input event(for validating user input)--- */
window.addEventListener("input", e => {
    const isAInputTarget = e.target.closest("[data-action-input]");

    if (isAInputTarget)
        inputActions[isAInputTarget.dataset.actionInput](e.target);
});

/* --- close the sidebar when on desktop mode (when the screen is wider that 1100px) --- */
window.matchMedia("(width >= 68.75rem)").addEventListener("change", e => {
    if (e.matches) dom.sideBar.classList.remove("visible");
});

window.addEventListener("load", () => {
    document.body.classList.remove("preload");
});
