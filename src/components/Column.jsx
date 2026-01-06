import { useMemo } from "react";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { TaskCard } from "./TaskCard";
import { useDroppable } from "@dnd-kit/core";
import { Plus } from "lucide-react";

export const Column = ({ title, tasks, deleteTask, onEditClick, onAddClick }) => {
    const tasksIds = useMemo(() => {
        return tasks.map((task) => task.id);
    }, [tasks]);

    const { setNodeRef } = useDroppable({
        id: title,
    });

    const getColumnColors = () => {
        switch (title) {
            case 'To Do':
                return {
                    badge: 'bg-cyan-100 text-cyan-800',
                    button: 'bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white btn-animated shadow-cyan-200',
                    dot: 'bg-gradient-to-r from-cyan-400 to-teal-500',
                    border: 'border-cyan-200 hover:border-cyan-300'
                };
            case 'In Progress':
                return {
                    badge: 'bg-pink-100 text-pink-800',
                    button: 'bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white btn-animated shadow-pink-200',
                    dot: 'bg-gradient-to-r from-pink-400 to-rose-500',
                    border: 'border-pink-200 hover:border-pink-300'
                };
            case 'Done':
                return {
                    badge: 'bg-purple-100 text-purple-800',
                    button: 'bg-gradient-to-r from-purple-500 to-violet-500 hover:from-purple-600 hover:to-violet-600 text-white btn-animated shadow-purple-200',
                    dot: 'bg-gradient-to-r from-purple-400 to-violet-500',
                    border: 'border-purple-200 hover:border-purple-300'
                };
            default:
                return {
                    badge: 'bg-gray-100 text-gray-700',
                    button: 'bg-gray-600 hover:bg-gray-700 text-white btn-animated',
                    dot: 'bg-gray-600',
                    border: 'border-gray-200'
                };
        }
    };

    const colors = getColumnColors();

    return (
        <div className={`bg-white/70 backdrop-blur-md w-[320px] min-h-[500px] flex flex-col rounded-3xl overflow-hidden shadow-xl border-2 ${colors.border} hover:shadow-2xl transition-all duration-300 animate-slide-in`}>
            <div className="bg-gradient-to-br from-white to-gray-50 text-md h-[65px] rounded-t-3xl p-4 font-bold border-b-2 border-gray-100 flex items-center justify-between">
                <div className="flex gap-2.5 items-center">
                    <div className={`w-2.5 h-2.5 rounded-full ${colors.dot} shadow-md`} />
                    <span className="text-neutral-900 font-bold text-sm tracking-wide">{title}</span>
                    <span className={`${colors.badge} px-2.5 py-1 rounded-full text-xs font-bold shadow-sm`}>
                        {tasks.length}
                    </span>
                </div>
            </div>

            <div className="flex-1 p-3.5 flex flex-col gap-3 overflow-y-auto" ref={setNodeRef}>
                <SortableContext items={tasksIds} strategy={verticalListSortingStrategy}>
                    {tasks.map((task) => (
                        <TaskCard
                            key={task.id}
                            task={task}
                            deleteTask={deleteTask}
                            onEditClick={onEditClick}
                        />
                    ))}
                </SortableContext>
                <button
                    onClick={() => onAddClick(title)}
                    className={`flex gap-2 items-center ${colors.button} p-3.5 rounded-2xl text-sm font-bold transition-all justify-center mt-2 shadow-lg hover:shadow-xl`}
                >
                    <Plus size={18} strokeWidth={3} />
                    <span>Add New Task</span>
                </button>
            </div>
        </div>
    );
};
