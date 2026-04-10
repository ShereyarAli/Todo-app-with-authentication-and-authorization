import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addToDone, removeDoneTasks, clearItems, removeTodo, setEditMode, addTodo, setAdminTask } from '../features/todo/todoSlice'
import { updateDbGet, updateDBPost } from '../../hook'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

const Todos = ({ jwtToken, adminTask }) => {
  const todos = useSelector(state => state.todos)
  const donetasks = useSelector(state => state.doneTasks)
  const editMode = useSelector(state => state.isEditMode)
  const editId = useSelector(state => state.editId)
  const dispatch = useDispatch()
  const user_id = localStorage.getItem('user_id')
  const userRole = localStorage.getItem('userRole')

  const getData = async () => {
    console.log(adminTask, userRole)
    const res = await updateDbGet(jwtToken, userRole, adminTask)
    console.log(res)
    dispatch(addTodo(res.payload[0]))
    dispatch(addToDone(res.payload[1]))
  }
  useEffect(() => {
    // return
    if (jwtToken && adminTask) {
      getData();
    }
  }, [jwtToken, adminTask])

  const clearAllItems = () => {
    dispatch(clearItems())
    toast.success("All items cleared")
    dispatch(setEditMode({ mode: false }))
  }
  const handleDoneBtn = async (todo) => {
    const res = await updateDBPost({
      method: 'done',
      id: todo.id,
      text: todo.text,
      type: 'task',
      user_id: user_id
    }, jwtToken)
    const data = res
    console.log(data)
    if (data) {
      dispatch(removeTodo(todo.id))
      dispatch(addToDone([todo]))
      toast.success('Task marked as done')
      editMode && dispatch(setEditMode({ mode: !editMode }))
    }
    else {
      toast.error('Something went wrong')
    }
  }
  const handleDel = async (id, type, task) => {
    const res = await updateDBPost({
      method: 'delete',
      id: id,
      type: type,
      user_id: user_id,
      task: task
    }, jwtToken)
    if (res.success) {
      if (type === 'done') {
        dispatch(removeDoneTasks(id))
      }
      else {
        dispatch(removeTodo(id))
      }
      toast.success(res.message)
      editMode && dispatch(setEditMode({ mode: !editMode }))
    }
    else {
      toast.error(res.message)
    }
  }
  return (
    <>
      <div className="max-w-2xl mx-auto mt-14 p-10 bg-white/70 backdrop-blur-xl border border-gray-200 shadow-2xl rounded-[2.5rem]">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-4xl font-black tracking-tight text-slate-900">
            {adminTask || 'Todos'}
          </h2>
          <span className="text-sm font-bold text-slate-700 bg-slate-100 px-4 py-1.5 rounded-full border border-slate-200 shadow-sm">
            {todos.length} Items
          </span>
        </div>
        <ul className="space-y-5">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className={`${editMode && editId === todo.id
                ? "border-amber-300 bg-amber-50/60 shadow-amber-100"
                : "border-gray-200 bg-white/80 hover:bg-white"
                } flex items-center justify-between px-6 py-5 rounded-3xl border shadow-md transition-all duration-200 hover:shadow-xl`}
            >
              <span className="text-slate-900 font-semibold text-lg">
                {todo.text}
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => handleDel(todo.id, "task", adminTask)}
                  className="w-10 h-10 flex items-center justify-center bg-slate-900 text-white rounded-2xl hover:bg-black transition duration-200 shadow-md"
                >
                  ✕
                </button>
                {adminTask === 'tasks' && <button
                  onClick={() =>
                    dispatch(setEditMode({ mode: !editMode, id: todo.id }))
                  }
                  className="w-10 h-10 flex items-center justify-center bg-slate-200 text-slate-900 rounded-2xl hover:bg-slate-300 transition duration-200 shadow-md"
                >
                  <i className="fa fa-edit"></i>
                </button>}

                {adminTask === 'tasks' && <button
                  onClick={() => handleDoneBtn(todo)}
                  className="w-10 h-10 flex items-center justify-center bg-emerald-600 text-white rounded-2xl hover:bg-emerald-700 transition duration-200 shadow-md"
                >
                  ✓
                </button>}
              </div>
            </li>
          ))}
        </ul>

        <button
          onClick={clearAllItems}
          className="w-full mt-10 py-4 bg-gradient-to-r from-slate-900 to-black text-white font-bold rounded-3xl hover:from-black hover:to-slate-900 transition duration-200 shadow-lg hover:shadow-2xl"
        >
          Clear Items
        </button>
      </div>

      {adminTask === 'tasks' && <div className="max-w-2xl mx-auto mt-16 p-10 bg-white/70 backdrop-blur-xl border border-gray-200 shadow-2xl rounded-[2.5rem]">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-4xl font-black tracking-tight text-slate-900">
            Done Tasks
          </h2>

          <span className="text-sm font-bold text-slate-700 bg-slate-100 px-4 py-1.5 rounded-full border border-slate-200 shadow-sm">
            {donetasks.length} Done
          </span>
        </div>

        <ul className="space-y-5">
          {donetasks.map((todo) => (
            <li
              key={todo.id}
              className="bg-white/80 hover:bg-white flex items-center justify-between px-6 py-5 rounded-3xl border border-gray-200 shadow-md transition-all duration-200 hover:shadow-xl"
            >
              <del className="text-slate-500 font-semibold text-lg">
                {todo.text}
              </del>

              <div className="flex gap-2">
                <button
                  onClick={() => handleDel(todo.id, "done")}
                  className="w-10 h-10 flex items-center justify-center bg-slate-900 text-white rounded-2xl hover:bg-black transition duration-200 shadow-md"
                >
                  ✕
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>}
    </>
  )
}
export default Todos