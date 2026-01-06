import { createContext, useContext, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { generateId } from "../utils/ids";

const TaskContext = createContext();

export const useStore = () => {
    const context = useContext(TaskContext);
    if (!context) {
        throw new Error("useStore must be used within a TaskProvider");
    }
    return context;
};

export const TaskProvider = ({ children }) => {
    const [tasks, setTasks] = useLocalStorage("kanban_tasks", []);
    const [columns, setColumns] = useState(["To Do", "In Progress", "Done"]);

    const addTask = (title, column, description = "", priority = "Low") => {
        const newTask = {
            id: generateId(),
            title,
            column,
            description,
            priority,
        };
        setTasks((prev) => [...prev, newTask]);
    };

    const updateTask = (id, updatedFields) => {
        setTasks((prev) =>
            prev.map((task) => (task.id === id ? { ...task, ...updatedFields } : task))
        );
    };

    const deleteTask = (id) => {
        setTasks((prev) => prev.filter((task) => task.id !== id));
    };

    const moveTask = (id, newColumn) => {
        setTasks((prev) =>
            prev.map((task) => (task.id === id ? { ...task, column: newColumn } : task))
        );
    };

    return (
        <TaskContext.Provider
            value={{
                tasks,
                setTasks,
                columns,
                addTask,
                updateTask,
                deleteTask,
                moveTask,
            }}
        >
            {children}
        </TaskContext.Provider>
    );
};
