function createElement(tag, options) {
    const element = document.createElement(tag);
    if ("attributes" in options)
        options.attributes.forEach(attribute =>
            element.setAttribute(attribute[0], attribute[1])
        );
    element.textContent = options.text ?? "";

    return element;
}

export function createProjectsContainer() {
    return createElement("ul", { attributes: [["class", "projects-list"]] });
}

export function createProjectItem(project, currentProject) {
    const projectElement = createElement("li", {
        attributes: [
            [
                "class",
                `project ${
                    project === currentProject ? "selected" : ""
                } justify-between`,
            ],
            ["data-id", project.id],
        ],
    });

    const projectBtn = createElement("button", {
        attributes: [
            ["class", "project-btn"],
            ["data-action-click", "changeCurrentProject"],
        ],
        text: project.name,
    });

    const propertiesBtn = createElement("button", {
        attributes: [["class", "project-properties"]],
    });
    propertiesBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M240-400q-33 0-56.5-23.5T160-480q0-33 23.5-56.5T240-560q33 0 56.5 23.5T320-480q0 33-23.5 56.5T240-400Zm240 0q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm240 0q-33 0-56.5-23.5T640-480q0-33 23.5-56.5T720-560q33 0 56.5 23.5T800-480q0 33-23.5 56.5T720-400Z"/></svg>`;

    projectElement.append(projectBtn, propertiesBtn);

    return projectElement;
}

export function createListContainer() {
    return createElement("ul", {
        attributes: [
            ["class", "tasks-list"],
            ["data-action-scroll", "listContainer"],
        ],
    });
}

export function createTask(task) {
    const taskItem = createElement("li", {
        attributes: [
            ["class", "task-item flex-row gap-16 align-center"],
            ["data-task-id", task.id],
        ],
    });

    const toggleBtn = createElement("button", {
        attributes: [
            [
                "class",
                `task-check-btn flex-row justify-center align-center square round ${
                    task.completed ? "completed" : ""
                }`,
            ],
            ["data-action-click", "toggleCompletion"],
        ],
    });

    toggleBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="#ff9"><path d="M400-304 240-464l56-56 104 104 264-264 56 56-320 320Z"/></svg>`;

    const taskText = createElement("span", { text: task.title });

    const deleteBtn = createElement("button", {
        attributes: [
            ["class", "task-remove-btn"],
            ["data-action-click", "deleteTask"],
        ],
    });

    deleteBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" /></svg>`;

    taskItem.append(toggleBtn, taskText, deleteBtn);

    return taskItem;
}

export function emptyList() {
    return createElement("div", {
        attributes: [["class", "empty-list"]],
        text: "No task available",
    });
}

export function emitEvent(eventName, data) {
    window.dispatchEvent(new CustomEvent(eventName, { detail: data }));
}

export function isValidInput(str) {
    return str.trim().length;
}
