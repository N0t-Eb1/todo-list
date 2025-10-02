const elems = {
    addTaskInput: document.querySelector(".add-task__input"),
    addTaskBtn: document.querySelector(".add-task__button"),
    projectName: document.querySelector(".project-name"),
    tasksCount: document.querySelector(".project-details__counter"),
    tasksContainer: document.querySelector(".tasks-container"),
};

const deligation = {};

const createElement = (tag, attributes, text) => {
    const element = document.createElement(tag);
    attributes.forEach(attribute =>
        element.setAttribute(attribute[0], attribute[1])
    );
    if (text) element.textContent = text;
    return element;
};

const createTask = task => {
    const taskitem = createElement("li", [
        ["class", "task-item flex-row gap-16 align-center"],
        ["data-task-id", task.id],
    ]);

    const toggleBtn = createElement("button", [
        [
            "class",
            `task-check-btn flex-row justify-center align-center square round ${
                task.completed ? "completed" : ""
            }`,
        ],
    ]);
    toggleBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="#ff9"><path d="M400-304 240-464l56-56 104 104 264-264 56 56-320 320Z"/></svg>`;

    const taskText = createElement("span", [], task.title);

    const deleteBtn = createElement("button", [["class", "task-remove-btn"]]);
    deleteBtn.innerHTML = `<svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    height="24px"
                                    viewBox="0 -960 960 960"
                                    width="24px"
                                    fill="#e3e3e3"
                                >
                                    <path
                                        d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"
                                    />
                                </svg>`;
    taskitem.append(toggleBtn, taskText, deleteBtn);

    return taskitem;
};

export const render = state => {
    let { projects, currentProject } = state;

    elems.projectName.textContent = currentProject.name;
    elems.tasksCount.textContent = currentProject.tasksLeft + " tasks";

    if (!currentProject.tasks.length) {
        elems.tasksContainer.replaceChildren(
            createElement("div", [["class", "empty-list"]], "Empty List")
        );
    } else {
        const listContainer = createElement("ul", [["class", "tasks-list"]]);
        currentProject.tasks.forEach(task =>
            listContainer.appendChild(createTask(task))
        );

        elems.tasksContainer.replaceChildren(listContainer);
    }
};

const toggleAddTaskBtnVisibility = bool => {
    if (bool) elems.addTaskBtn.removeAttribute("disabled");
    else elems.addTaskBtn.setAttribute("disabled", "true");
};

const toggleTaskCompletion = taskId => {
    window.dispatchEvent(
        new CustomEvent("toggleTaskCompletion", { detail: taskId })
    );
};

const removeTask = taskId => {
    window.dispatchEvent(new CustomEvent("removeTask", { detail: taskId }));
};

/* --- event listeners --- */
elems.addTaskInput.addEventListener("input", e => {
    toggleAddTaskBtnVisibility(/\S/.test(e.target.value));
});

elems.addTaskBtn.addEventListener("click", e => {
    window.dispatchEvent(
        new CustomEvent("newTaskSubmitted", {
            detail: elems.addTaskInput.value.trim(),
        })
    );

    elems.addTaskInput.value = "";

    toggleAddTaskBtnVisibility(false);
});

document.addEventListener("click", e => {
    const isInsideATask = e.target.closest(".task-item");
    if (!isInsideATask) return;

    if (isInsideATask && e.target.closest(".task-check-btn"))
        toggleTaskCompletion(isInsideATask.dataset.taskId);

    if (isInsideATask && e.target.closest(".task-remove-btn"))
        removeTask(isInsideATask.dataset.taskId);
});
