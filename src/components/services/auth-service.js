import axios from "axios";

class AuthService {
  constructor() {
    this.service = axios.create({
      baseURL: "http://localhost:5000/api",
      withCredentials: true,
    });
  }

  signup = (name, email, password, phone, business, address) => {
    return this.service
      .post("/signup", { name, email, password, phone, business, address })
      .then((response) => response.data);
  };

  loggedin = () => {
    return this.service.get("/loggedin").then((response) => response.data);
  };

  login = (email, password) => {
    return this.service.post("/login", { email, password }).then((response) => response.data);
  };

  logout = () => {
    return this.service.post("/logout", {}).then((response) => response.data);
  };
}

const authService = new AuthService();

export default authService;