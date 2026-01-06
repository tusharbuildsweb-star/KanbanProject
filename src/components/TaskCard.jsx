import { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Trash2, MessageCircle, User } from "lucide-react";

export const TaskCard = ({ task, deleteTask, onEditClick }) => {
    const [mouseIsOver, setMouseIsOver] = useState(false);

    const {
        setNodeRef,
        attributes,
        listeners,
        transform,
        transition,
        isDragging,
    } = useSortable({
        id: task.id,
        data: {
            type: "Task",
            task,
        },
    });

    const style = {
        transition,
        transform: CSS.Transform.toString(transform),
    };

    const getPriorityStyle = (priority) => {
        switch (priority) {
            case 'High':
                return 'bg-gradient-to-r from-red-400 to-pink-500 text-white shadow-md';
            case 'Medium':
                return 'bg-gradient-to-r from-amber-400 to-orange-500 text-white shadow-md';
            case 'Low':
                return 'bg-gradient-to-r from-emerald-400 to-teal-500 text-white shadow-md';
            default:
                return 'bg-gray-100 text-gray-700 border border-gray-200';
        }
    };

    if (isDragging) {
        return (
            <div
                ref={setNodeRef}
                style={style}
                className="opacity-40 bg-gradient-to-br from-cyan-100 to-teal-100 border-2 border-dashed border-cyan-400 p-4 h-[140px] min-h-[140px] items-center flex text-left rounded-3xl cursor-grabbing relative shadow-lg"
            />
        );
    }

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            onClick={() => onEditClick(task)}
            onMouseEnter={() => setMouseIsOver(true)}
            onMouseLeave={() => setMouseIsOver(false)}
            className="task-card bg-white p-4 min-h-[140px] flex flex-col justify-between rounded-2xl cursor-grab relative shadow-lg border-2 border-transparent hover:border-teal-300 group hover:shadow-teal-100"
        >
            <div className="flex flex-col gap-3">
                <div className="flex justify-between items-start">
                    <span className={`text-xs px-3 py-1.5 rounded-full font-bold ${getPriorityStyle(task.priority)}`}>
                        {task.priority || 'Low'}
                    </span>
                    {mouseIsOver && (
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                deleteTask(task.id);
                            }}
                            className="text-gray-400 hover:text-red-500 hover:bg-red-50 p-2 rounded-xl transition-all animate-scale-in shadow-md border border-gray-200 hover:border-red-300 bg-white"
                        >
                            <Trash2 size={16} strokeWidth={2.5} />
                        </button>
                    )}
                </div>
                <p className="text-neutral-900 font-bold text-sm leading-relaxed line-clamp-2">
                    {task.title}
                </p>
                {task.description && (
                    <p className="text-xs text-neutral-600 line-clamp-2 leading-relaxed">
                        {task.description}
                    </p>
                )}
            </div>

            <div className="flex items-center justify-between mt-3 pt-3 border-t-2 border-gray-100">
                <div className="flex items-center gap-1">
                    <div className="flex -space-x-2">
                        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-cyan-400 to-teal-500 border-2 border-white flex items-center justify-center shadow-md">
                            <User size={14} className="text-white" strokeWidth={2.5} />
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-1.5 text-gray-500 bg-gray-50 px-2.5 py-1 rounded-full">
                    <MessageCircle size={14} strokeWidth={2.5} />
                    <span className="text-xs font-bold">0</span>
                </div>
            </div>
        </div>
    );
};
