const User = ({ user }) => {
  console.log('{user}', user)
  return (
    <div>
      <h1>{user.name}</h1>
      <h2>added blogs</h2>
      <ul>
        {user.blogs.map((blog) => (
          <li>{blog.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default User
