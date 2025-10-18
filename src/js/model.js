import { emitEvent } from "./helpers";
import { getState, updateState } from "./database";

class TodoApp {
    constructor(appState) {
        this.projects = appState.projects.map(project => new Project(project));
        this.currentProject = this.projects.find(
            project => project.id === appState.currentProject.id
        );
    }

    addProject(details) {
        this.projects.push(new Project(details));
        this.currentProject = this.projects.at(-1);
    }

    changeCurrentProject(projectId) {
        this.currentProject = this.projects.find(
            project => project.id === projectId
        );
    }

    deleteProject() {
        this.projects = this.projects.filter(
            project => project !== this.currentProject
        );
        this.currentProject = this.projects.at(-1);
    }

    addTask(details) {
        this.currentProject.addTask(details);
    }

    deleteTask(taskId) {
        this.currentProject.deleteTask(taskId);
    }

    toggleTaskCompletion(taskId) {
        this.currentProject.toggleCompletion(taskId);
    }

    get appState() {
        return {
            projects: this.projects,
            currentProject: this.currentProject,
        };
    }
}

class Project {
    constructor(details) {
        this.id = details.id ?? crypto.randomUUID();
        this.name = details.name;
        this.tasks = details.tasks
            ? details.tasks.map(task => new Task(task))
            : [];
    }

    addTask(details) {
        this.tasks.push(new Task(details));
    }

    deleteTask(taskId) {
        this.tasks = this.tasks.filter(task => task.id !== taskId);
    }

    toggleCompletion(taskId) {
        this.tasks.find(task => task.id === taskId).toggleCompletion();
    }

    get tasksLeft() {
        return this.tasks.filter(task => !task.completed).length;
    }
}

class Task {
    constructor(details) {
        this.id = details.id ?? crypto.randomUUID();
        this.title = details.title;
        this.completed = details.completed ?? false;
    }

    toggleCompletion() {
        this.completed = !this.completed;
    }
}

export default new Proxy(new TodoApp(getState()), {
    get(actions, action) {
        if (action !== "appState")
            return (...args) => {
                actions[action](...args);
                emitEvent("stateUpdate", actions.appState);
                updateState(actions.appState);
            };
        return Reflect.get(actions, action);
    },
});
