import { create } from 'zustand'
import blogService from './services/blogs'
import loginService from './services/login'
import { getUser, saveUser } from './services/persistentUser'
import userService from './services/users'

const useNotificationStore = create((set) => ({
  notification: '',
  type: '',
  actions: {
    setNotification: (message, type) => {
      set(() => ({ notification: message, type: type }))
      setTimeout(() => {
        set(() => ({ notification: '', type: '' }))
      }, 5000)
    },
  },
}))

const useBlogStore = create((set, get) => ({
  blogs: [],
  actions: {
    add: async (content) => {
      const user = useUserStore.getState().user

      const newBlog = await blogService.create(content)
      const newBlogWithUser = { ...newBlog, user: { ...user } }
      set((state) => ({ blogs: state.blogs.concat(newBlogWithUser) }))

      useNotificationStore
        .getState()
        .actions.setNotification(
          `a new blog ${newBlog.title} by ${newBlog.author} added`,
          'notification',
        )
    },
    addLike: async (id) => {
      console.log('start')
      const blogs = get().blogs
      const blog = blogs.filter((b) => b.id === id)[0]

      const newLikes = blog.likes + 1
      const newBlog = {
        ...blog,
        likes: newLikes,
      }

      console.log('newBlog', newBlog)

      blogService.update(id, newBlog)
      set((state) => ({
        blogs: state.blogs.map((b) => (b.id === id ? newBlog : b)),
      }))
    },
    addComment: async (id, comment) => {
      console.log('start')
      const user = useUserStore.getState().user

      const newBlog = await blogService.addComment(id, comment)
      const newBlogWithUser = { ...newBlog, user: { ...user } }
      set((state) => ({
        blogs: state.blogs.map((b) => (b.id === id ? newBlogWithUser : b)),
      }))
    },
    deleteBlog: async (id) => {
      const blogs = get().blogs
      const blog = blogs.filter((b) => b.id === id)[0]

      const isDelete = window.confirm(
        `Remove blog ${blog.title} by ${blog.author}`,
      )

      if (isDelete) {
        try {
          await blogService.deleteBlog(id)
        } catch {
          console.log('error')
          return
        }
        set((state) => ({
          blogs: state.blogs.filter((b) => b.id !== id),
        }))
      }
    },
    initializeBlog: async () => {
      const blogs = await blogService.getAll()
      set(() => ({ blogs }))
    },
  },
}))

const useUserStore = create((set) => ({
  user: null,
  users: [],
  actions: {
    initializeUser: async () => {
      const loggedUserJSON = getUser()
      console.log('loggedUserJSON', loggedUserJSON)
      if (loggedUserJSON) {
        const user = JSON.parse(loggedUserJSON)
        set(() => ({ user }))

        blogService.setToken(user.token)
      }
    },
    initializeUsers: async () => {
      const users = await userService.getAll()
      set(() => ({ users }))
    },
    login: async (username, password) => {
      event.preventDefault()

      try {
        const user = await loginService.login({ username, password })

        saveUser(user)
        blogService.setToken(user.token)
        console.log('user pertama klai login', user)
        set(() => ({ user }))
        return user
      } catch {
        useNotificationStore
          .getState()
          .actions.setNotification('username or password is wrong', 'error')
        return null
      }
    },
  },
}))

export const useNotificationType = () =>
  useNotificationStore((state) => state.type)
export const useNotification = () =>
  useNotificationStore((state) => state.notification)
export const useNotificationActions = () =>
  useNotificationStore((state) => state.actions)

export const useBlog = () => {
  const blogs = useBlogStore((state) => state.blogs)
  const sortedBlogs = blogs.sort(({ likes: a }, { likes: b }) => b - a)
  return sortedBlogs
}
export const useBlogActions = () => useBlogStore((state) => state.actions)

export const useUser = () => useUserStore((state) => state.user)
export const useUsers = () => useUserStore((state) => state.users)
export const useUserActions = () => useUserStore((state) => state.actions)
