import { getState, updateState } from "./database";

let { projects, currentProject } = getState();

class Project {
    constructor(name) {
        this.id = crypto.randomUUID();
        this.name = name;
        this.tasks = [];
        this.tasksLeft = 0;
        this.filter = "all";
    }
}

class Task {
    constructor(taskDetails) {
        this.id = crypto.randomUUID();
        this.title = taskDetails.text;
        this.completed = false;
    }
}

export const getCurrentState = () =>
    structuredClone({ projects, currentProject });

export const getTask = taskId =>
    currentProject.tasks.find(task => task.id === taskId);

const actions = {
    createNewProject(name) {
        projects.push(new Project(name));
        currentProject = projects.at(-1);
    },

    addTask(taskDetails) {
        currentProject.tasks.push(new Task(taskDetails));
        this.updateTasksCount();
    },

    changeCurrentProject(projectId) {
        currentProject = projects.find(project => project.id === projectId);
    },

    deleteProject() {
        projects = projects.filter(project => project !== currentProject);
        currentProject = projects.length ? projects.at(-1) : null;
    },

    deleteTask(taskId) {
        currentProject.tasks = currentProject.tasks.filter(
            task => task.id !== taskId
        );

        this.updateTasksCount();
    },

    tasksFilter(option) {
        currentProject.filter = option;
    },

    toggleTaskComplete(taskId) {
        const task = currentProject.tasks.find(task => task.id === taskId);

        task.completed = !task.completed;

        this.updateTasksCount();
    },

    deleteCompleted() {
        currentProject.tasks = currentProject.tasks.filter(
            task => !task.completed
        );
    },

    updateTasksCount() {
        currentProject.tasksLeft = currentProject.tasks.filter(
            task => !task.completed
        ).length;
    },
};

export default new Proxy(actions, {
    get(actions, action) {
        return (...args) => {
            actions[action](...args);
            window.dispatchEvent(
                new CustomEvent("stateUpdate", { detail: getCurrentState() })
            );
            // updateState(getCurrentState());
        };
    },
});
