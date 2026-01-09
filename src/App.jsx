import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import loginService from "./services/login";
import blogService from "./services/blogs";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  //Maneja el estado si un usario esta o no logueado
  const [user, setUser] = useState(null);

  const handleLogin = async (credentials) => {
    try {
      const loggedUser = await loginService.login(credentials);
      setUser(loggedUser);
    } catch (error) {
      console.error("Login Failed", error);
    }
  };

  useEffect(() => {
    if (user) {
      blogService.getAll(user.token).then((blogs) => setBlogs(blogs));
    }
  }, [user]);

  return (
    <div>
      <div>
        {user === null ? (
          <div>
            <h2>Login Form</h2>
            <LoginForm onLogin={handleLogin} />
          </div>
        ) : (
          <div>
            <h2>blogs</h2>
            <p>Bienvenido {user.name}</p>
            {blogs.map((blog) => (
              <Blog key={blog.id} blog={blog} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
