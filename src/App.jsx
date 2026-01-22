import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import loginService from "./services/login";
import blogService from "./services/blogs";
import BlogForm from "./components/BlogForm";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  //Maneja el estado si un usario esta o no logueado
  const [user, setUser] = useState(null);

  //Hace login con los datos del formulario, los guarda en local
  const handleLogin = async (credentials) => {
    try {
      const loggedUser = await loginService.login(credentials);
      setUser(loggedUser);
      localStorage.setItem("userSaved", JSON.stringify(loggedUser));
    } catch (error) {
      console.error("Login Failed", error);
    }
  };

  //Hace logout y limpia localstorage
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("userSaved");
  };

  //Monitorea si hay un datos de inicio en local, en caso de que si los obtiene y los parsea
  useEffect(() => {
    const storedUser = localStorage.getItem("userSaved");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  //Monitorea si hay un usuario, en caso de que si carga sus blogs
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
            <p>Bienvenido {user.name}</p>{" "}
            <button onClick={handleLogout}>Logout</button>
            <BlogForm />
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
