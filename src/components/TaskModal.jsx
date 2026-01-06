import { useState, useEffect } from "react";
import { X } from "lucide-react";

export const TaskModal = ({ isOpen, onClose, onSubmit, initialData, mode }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState("Low");
    const [column, setColumn] = useState("To Do");

    useEffect(() => {
        if (isOpen && initialData) {
            setTitle(initialData.title || "");
            setDescription(initialData.description || "");
            setPriority(initialData.priority || "Low");
            setColumn(initialData.column || "To Do");
        } else if (isOpen) {
            setTitle("");
            setDescription("");
            setPriority("Low");
            setColumn(initialData?.column || "To Do");
        }
    }, [isOpen, initialData]);

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({
            title,
            description,
            priority,
            column
        });
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-scale-in">
            <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden border-2 border-teal-100 animate-slide-in">
                <div className="p-5 border-b-2 border-teal-100 flex justify-between items-center bg-gradient-to-r from-cyan-50 via-teal-50 to-emerald-50">
                    <h2 className="text-lg font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
                        {mode === "edit" ? "✏️ Edit Task" : "✨ Create New Task"}
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-white rounded-xl transition-all text-neutral-500 hover:text-neutral-700 hover:shadow-lg border border-transparent hover:border-gray-200"
                    >
                        <X size={20} strokeWidth={2.5} />
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="p-6 space-y-5">
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-neutral-700 flex items-center gap-2">
                            📝 Task Title
                        </label>
                        <input
                            required
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Enter task title..."
                            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 bg-gray-50 text-neutral-900 focus:ring-2 focus:ring-teal-400 focus:border-teal-400 focus:bg-white outline-none transition-all placeholder:text-gray-400 font-medium"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-bold text-neutral-700 flex items-center gap-2">
                            📄 Description
                        </label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Add a more detailed description..."
                            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 bg-gray-50 text-neutral-900 focus:ring-2 focus:ring-teal-400 focus:border-teal-400 focus:bg-white outline-none transition-all h-24 resize-none placeholder:text-gray-400"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-neutral-700">⚡ Priority</label>
                            <select
                                value={priority}
                                onChange={(e) => setPriority(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 bg-gray-50 text-neutral-900 focus:ring-2 focus:ring-teal-400 focus:border-teal-400 focus:bg-white outline-none transition-all font-bold"
                            >
                                <option value="Low">🟢 Low</option>
                                <option value="Medium">🟡 Medium</option>
                                <option value="High">🔴 High</option>
                            </select>
                        </div>
                        {mode === 'edit' && (
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-neutral-700">📊 Status</label>
                                <select
                                    value={column}
                                    onChange={(e) => setColumn(e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 bg-gray-50 text-neutral-900 focus:ring-2 focus:ring-teal-400 focus:border-teal-400 focus:bg-white outline-none transition-all font-bold"
                                >
                                    <option value="To Do">📋 To Do</option>
                                    <option value="In Progress">⚡ In Progress</option>
                                    <option value="Done">✅ Done</option>
                                </select>
                            </div>
                        )}
                    </div>

                    <div className="pt-4 flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-6 py-3 text-sm font-bold text-neutral-700 hover:bg-gray-100 rounded-xl transition-all border-2 border-gray-200 hover:border-gray-300"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-6 py-3 text-sm font-bold text-white bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 rounded-xl shadow-lg hover:shadow-teal-300 transition-all btn-animated"
                        >
                            {mode === "edit" ? "💾 Save Changes" : "✨ Create Task"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
