import { useState, useMemo } from "react";
import {
    DndContext,
    DragOverlay,
    PointerSensor,
    useSensor,
    useSensors,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";
import { useStore } from "../context/TaskContext";
import { Column } from "./Column";
import { TaskCard } from "./TaskCard";
import { TaskModal } from "./TaskModal";

export const Board = () => {
    const { tasks, setTasks, columns, addTask, updateTask, deleteTask, moveTask } = useStore();
    const [activeTask, setActiveTask] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState("create");
    const [selectedTask, setSelectedTask] = useState(null);
    const [newTaskColumn, setNewTaskColumn] = useState("To Do");

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 10,
            },
        })
    );

    const onDragStart = (event) => {
        if (event.active.data.current?.type === "Task") {
            setActiveTask(event.active.data.current.task);
            return;
        }
    };

    const onDragEnd = (event) => {
        setActiveTask(null);
        const { active, over } = event;

        if (!over) return;

        const activeId = active.id;
        const overId = over.id;

        const activeTask = tasks.find(t => t.id === activeId);
        if (!activeTask) return;

        if (columns.includes(overId)) {
            moveTask(activeId, overId);
            return;
        }

        const overTask = tasks.find(t => t.id === overId);
        if (overTask) {
            if (activeTask.column !== overTask.column) {
                moveTask(activeId, overTask.column);
            }
            const activeIndex = tasks.findIndex((t) => t.id === activeId);
            const overIndex = tasks.findIndex((t) => t.id === overId);
            if (activeIndex !== overIndex) {
                setTasks((tasks) => arrayMove(tasks, activeIndex, overIndex));
            }
        }
    };

    const handleAddClick = (columnTitle) => {
        setModalMode("create");
        setNewTaskColumn(columnTitle);
        setSelectedTask(null);
        setIsModalOpen(true);
    };

    const handleEditClick = (task) => {
        setModalMode("edit");
        setSelectedTask(task);
        setIsModalOpen(true);
    };

    const handleModalSubmit = (data) => {
        if (modalMode === "create") {
            addTask(data.title, newTaskColumn, data.description, data.priority);
        } else {
            updateTask(selectedTask.id, data);
        }
        setIsModalOpen(false);
    };

    const getTasksByColumn = (columnTitle) => {
        return tasks.filter((task) => task.column === columnTitle);
    };

    return (
        <div className="flex flex-col h-full w-full overflow-hidden">
            <DndContext
                sensors={sensors}
                onDragStart={onDragStart}
                onDragEnd={onDragEnd}
            >
                <div className="flex h-full w-full gap-6 overflow-x-auto p-8 items-start justify-center bg-transparent">
                    {columns.map((col) => (
                        <Column
                            key={col}
                            title={col}
                            tasks={getTasksByColumn(col)}
                            deleteTask={deleteTask}
                            onEditClick={handleEditClick}
                            onAddClick={handleAddClick}
                        />
                    ))}
                </div>

                {createPortal(
                    <DragOverlay>
                        {activeTask && (
                            <TaskCard
                                task={activeTask}
                                deleteTask={deleteTask}
                                onEditClick={() => { }}
                            />
                        )}
                    </DragOverlay>,
                    document.body
                )}
            </DndContext>

            <TaskModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleModalSubmit}
                initialData={modalMode === "edit" ? selectedTask : { column: newTaskColumn }}
                mode={modalMode}
            />
        </div>
    );
};
