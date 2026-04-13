import { createSlice, nanoid } from '@reduxjs/toolkit'
import { act } from 'react'
const initialState = {
  todos: [],
  isEditMode: false,
  editId: 0,
  doneTasks: [],
  loading: false,
  showDashboard: false,
  adminTask: 'tasks',
  addUser: false,
}

//This slice will be shown in redux extension
// it has a name
// initialState
// reducers which are functions that contains logic these reducers will always have two parameters (state,action)
// param state refers to initial state 
//param action has data

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.todos.push(...action.payload)
    },
    removeTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id != action.payload)
    },
    removeDoneTasks: (state, action) => {
      state.doneTasks = state.doneTasks.filter((todo) => todo.id != action.payload)
    },
    updateTodo: (state, action) => {
      const todo = state.todos.find(todo => todo.id === action.payload.id)
      console.log(todo)
      if (todo) {
        todo.text = action.payload.input
      }
    },
    setEditMode: (state, action) => {
      state.isEditMode = action.payload.mode
      state.editId = action.payload.id
    },
    clearItems: (state) => {
      state.todos = [];
      state.doneTasks = [];
    },
    addToDone: (state, action) => {
      state.doneTasks.push(...action.payload)
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setShowDashboard: (state, action) => {
      state.showDashboard = action.payload
    },
    setAdminTask: (state, action) => {
      state.adminTask = action.payload
    },
    setAddUser: (state, action) => {
      state.addUser = action.payload
    },
    
  }
})
// indiviual export is imp as they will be used in components
export const { addTodo, removeTodo, removeDoneTasks, setEditMode, updateTodo, addToDone, clearItems, setLoading, setShowDashboard, setAdminTask, setAddUser,  } = todoSlice.actions
export default todoSlice.reducer