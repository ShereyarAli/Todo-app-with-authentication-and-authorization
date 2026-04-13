import { useEffect, useState } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { addTodo, addToDone, clearItems, setAddUser, setAdminTask, setEditMode, setShowDashboard, updateTodo } from "../features/todo/todoSlice"
import { updateDBPost, updateDbGet } from "../../hook"
import { nanoid } from "@reduxjs/toolkit"
import Todos from "./Todos"
import { useNavigate } from "react-router-dom"
import Signup from "./Signup"
import { toast } from "sonner"


const AddTodo = () => {
  const isEditMode = useSelector(state => state.isEditMode)
  const editId = useSelector(state => state.editId)
  const showDashboard = useSelector(state => state.showDashboard)
  const adminTask = useSelector(state => state.adminTask)
  const addUser = useSelector(state => state.addUser)
  const todos = useSelector(state => state.todos)
  const doneTasks = useSelector(state => state.doneTasks)

  //dispatch uses reducers to change in store
  const [input, setInput] = useState('')
  const dispatch = useDispatch()
  const apiUrl = import.meta.env.VITE_BASE_URL
  console.log(apiUrl)
  const navigate = useNavigate()
  const jwtToken = localStorage.getItem('jwtToken')
  const user_id = localStorage.getItem('user_id')
  const userRole = localStorage.getItem('userRole')

  // const token = false
  useEffect(() => {
    if (!jwtToken) {
      navigate('/login')
      dispatch(clearItems())
    }
    if (userRole === 'admin') {
      dispatch(setShowDashboard(true))
    }
    else {
      dispatch(setShowDashboard(false))
    }
  }, [jwtToken])

  const addTodoHandler = async (e) => {
    e.preventDefault()
    if (input) {
      // requestToBackend(apiUrl, 'POST', JSON.stringify({
      //   id: nanoid(),
      //   text: input
      // }))
      const res = await updateDBPost({
        method: 'post',
        id: nanoid(),
        text: input,
        user_id: user_id,
        userRole: userRole,
      }, jwtToken)
      const data = res
      console.log(data)
      if (data) {
        dispatch(addTodo(data))
        toast.success("Task added successfully")
      }
      else {
        toast.error("Something went wrong")
      }
      // updateDbGet() 
      setInput('')
    }
  }

  const handleUpdate = async () => {
    if (input) {
      const res = await updateDBPost({
        method: 'update',
        id: editId,
        text: input,
        user_id: user_id
      }, jwtToken)
      const data = res
      console.log(data)
      if (data) {
        dispatch(updateTodo({ input, id: editId }))
        toast.success('Task updated successfully')
      }
      else {
        toast.error('Something went wrong')
      }
      setInput('')
      dispatch(setEditMode({ mode: false }))
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('user_id');
    localStorage.removeItem('userRole');
    dispatch(clearItems())
    toast.success("Logged out successfully")
    navigate('/login');
  };

  const adminTasks = async (task) => {
    dispatch(setAddUser(false))
    dispatch(setAdminTask(task))
    dispatch(clearItems())
    console.log(todos, doneTasks)
  }

  const handleAddUser = () => {
    dispatch(setAddUser(true))
    dispatch(clearItems())
  }

  return (
    <div className="flex min-h-screen bg-black text-white">
      {/* sideBar */}
      {showDashboard && <aside className="w-72 bg-zinc-900/50 backdrop-blur-3xl border-r border-zinc-800/50 p-8 flex flex-col fixed h-full z-40">
        <div className="mb-12">
          <h2 className="text-2xl font-black tracking-tighter text-white flex items-center gap-3">
            <div className="w-8 h-8 bg-zinc-100 rounded-lg flex items-center justify-center">
              <div className="w-3 h-3 bg-zinc-900 rounded-sm rotate-45"></div>
            </div>
            ADMIN
          </h2>
        </div>

        <nav className="flex-1 space-y-4">
          <button
            onClick={() => adminTasks('tasks')}
            className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300 ${adminTask === 'tasks' && !addUser
              ? "bg-zinc-100 text-zinc-950 font-bold shadow-xl"
              : "text-zinc-500 hover:text-white hover:bg-zinc-800/50 font-bold"
              }`}
          >
            <i className="fa fa-tasks text-lg"></i>
            <span className="tracking-wide">Tasks</span>
          </button>

          <button
            onClick={() => adminTasks('users')}
            className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300 group ${adminTask === 'users' && !addUser
              ? "bg-zinc-100 text-zinc-950 font-bold shadow-xl"
              : "text-zinc-500 hover:text-white hover:bg-zinc-800/50 font-bold"
              }`}
          >
            <i className="fa fa-users text-lg group-hover:scale-110 transition-transform"></i>
            <span className="tracking-wide">Users</span>
          </button>
          <button onClick={handleAddUser}
            className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300 group ${addUser
              ? "bg-zinc-100 text-zinc-950 font-bold shadow-xl"
              : "text-zinc-500 hover:text-white hover:bg-zinc-800/50 font-bold"
              }`}
          >
            <i className="fa fa-user-plus text-lg group-hover:scale-110 transition-transform"></i>
            <span className="tracking-wide">Add User</span>
          </button>
        </nav>


      </aside>}

      {/* Main Content */}
      <main className={`flex-1 ${showDashboard ? "ml-72" : "ml-0"} p-10 transition-all duration-300`}>
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-end mb-8">
            <button
              onClick={handleLogout}
              className="group flex items-center gap-3 px-6 py-3 rounded-2xl font-bold text-zinc-400 hover:text-white bg-zinc-900/50 hover:bg-red-900/20 border border-zinc-800 hover:border-red-800/50 transition-all duration-300"
            >

              <span>Logout</span>
              <i className="fa fa-sign-out transition-transform group-hover:translate-x-1"></i>
            </button>
          </div>

          <div className="animate-in fade-in slide-in-from-bottom-10">
            <h1 className="text-5xl font-black mb-10 tracking-tighter">
              {addUser ? "Add User" : adminTask}
            </h1>

            {adminTask === "tasks" && !addUser && (
              <form onSubmit={addTodoHandler} className="relative group mb-12">
                <div className="absolute -inset-1 bg-gradient-to-r from-zinc-100/5 to-zinc-100/10 rounded-[2.5rem] blur opacity-25 group-hover:opacity-50 transition duration-500"></div>

                <div className="relative flex items-center gap-4 bg-zinc-900/80 backdrop-blur-2xl border border-zinc-800/50 shadow-2xl rounded-[2.5rem] p-6 focus-within:border-zinc-700 transition-all">
                  <input
                    type="text"
                    className="flex-1 bg-transparent px-4 py-2 text-white placeholder-zinc-600 outline-none text-xl font-medium"
                    placeholder="What needs to be done?"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                  />

                  {isEditMode ? (
                    <button
                      className="px-8 py-4 rounded-2xl font-black text-zinc-950 bg-white shadow-xl hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
                      type="button"
                      onClick={handleUpdate}
                    >
                      UPDATE
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="px-8 py-4 rounded-2xl font-black text-zinc-950 bg-white shadow-xl hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
                    >
                      ADD
                    </button>
                  )}
                </div>
              </form>
            )}

            {addUser ? <Signup addUser={addUser} /> : <Todos adminTask={adminTask} jwtToken={jwtToken} />}
          </div>
        </div>
      </main>
    </div>
  )
}

export default AddTodo