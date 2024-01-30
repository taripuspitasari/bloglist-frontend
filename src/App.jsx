import {useEffect, useState} from "react";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    blogService.getAll().then(blogs => setBlogs(blogs));
  }, []);

  const handleLogin = async event => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      setErrorMessage("wrong credentials");
      setTimeout(() => {
        setErrorMessage("");
      }, 5000);
    }
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
        <div>
          username:{" "}
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({target}) => setUsername(target.value)}
          />
        </div>
        <div>
          password:{" "}
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({target}) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
      <Notification message={errorMessage} />
      <h2>blogs</h2>
      {blogs.map(blog => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
