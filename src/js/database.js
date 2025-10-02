const defaultProject = {
    id: crypto.randomUUID(),
    name: "default project",
    tasks: [
        {
            id: crypto.randomUUID(),
            title: "create a todo-list app using vanilla js",
            completed: false,
        },
    ],
    tasksLeft: 1,
    filter: "all",
};
const defaultState = {
    projects: [defaultProject],
    currentProject: defaultProject,
};

const setDefaultState = () => {
    if (!localStorage.getItem("state"))
        localStorage.setItem("state", JSON.stringify(defaultState));
};
export const updateState = state => {
    localStorage.setItem("state", JSON.stringify(state));
};
export const getState = () => JSON.parse(localStorage.getItem("state"));

setDefaultState();
