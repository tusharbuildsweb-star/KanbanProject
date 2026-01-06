import { TaskProvider } from './context/TaskContext'
import { Board } from './components/Board'
import { Layout } from 'lucide-react'

function App() {
  return (
    <TaskProvider>
      <div className="h-screen w-full bg-gradient-to-br from-cyan-50 via-teal-50 to-emerald-50 text-neutral-900 flex flex-col">
        <header className="h-16 bg-white/90 backdrop-blur-lg border-b border-teal-100 flex items-center px-8 justify-between shrink-0 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-xl shadow-lg">
              <Layout className="text-white" size={22} />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-600 bg-clip-text text-transparent">Kanban Board</h1>
          </div>
          <a href="https://github.com/tusharbuildsweb-star/KanbanProject" target="_blank" className="text-sm font-semibold text-neutral-600 hover:text-teal-600 transition-colors px-4 py-2 rounded-lg hover:bg-teal-50">
            View Source
          </a>
        </header>
        <main className="flex-1 overflow-hidden">
          <Board />
        </main>
      </div>
    </TaskProvider>
  )
}

export default App
