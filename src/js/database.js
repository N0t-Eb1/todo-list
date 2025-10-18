const defaultProject = {
    id: crypto.randomUUID(),
    name: "default project",
    tasks: [
        {
            id: crypto.randomUUID(),
            title: "create a todo-list app using vanilla js",
            completed: true,
        },
        {
            id: crypto.randomUUID(),
            title: "I own a lot of property in Beijing.",
            completed: false,
        },
        {
            id: crypto.randomUUID(),
            title: "I told Tom I'd try to find a bigger vase.",
            completed: false,
        },
        {
            id: crypto.randomUUID(),
            title: "A sun burn can peel if its bad enough.",
            completed: false,
        },
        {
            id: crypto.randomUUID(),
            title: "I need to start.",
            completed: false,
        },
        {
            id: crypto.randomUUID(),
            title: "That's always been our biggest problem.",
            completed: false,
        },
        {
            id: crypto.randomUUID(),
            title: "The tree was struck by lightning.",
            completed: false,
        },
        {
            id: crypto.randomUUID(),
            title: "Sue was her favorite classmate.",
            completed: false,
        },
        {
            id: crypto.randomUUID(),
            title: "The fossil belongs to a fish.",
            completed: false,
        },
        {
            id: crypto.randomUUID(),
            title: "I will get sick from that.",
            completed: false,
        },
        {
            id: crypto.randomUUID(),
            title: "Everything will be okay in the end.",
            completed: false,
        },
        {
            id: crypto.randomUUID(),
            title: "There is nothing else to do today.",
            completed: false,
        },
        {
            id: crypto.randomUUID(),
            title: "Pandas should come hug me.",
            completed: false,
        },
        {
            id: crypto.randomUUID(),
            title: "You don't need to leave so early.",
            completed: false,
        },
        {
            id: crypto.randomUUID(),
            title: "It's easier to clean with disposable dishes.",
            completed: false,
        },
        {
            id: crypto.randomUUID(),
            title: "A wooden bridge was built over the river.",
            completed: false,
        },
        {
            id: crypto.randomUUID(),
            title: "I have a hairless cat.",
            completed: false,
        },
        {
            id: crypto.randomUUID(),
            title: "The President is back.",
            completed: false,
        },
        {
            id: crypto.randomUUID(),
            title: "I have no money at the moment.",
            completed: false,
        },
        {
            id: crypto.randomUUID(),
            title: "The dessert tasted very sweet.",
            completed: false,
        },
        {
            id: crypto.randomUUID(),
            title: "They speak English in the United States.",
            completed: false,
        },
    ],
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
