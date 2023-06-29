import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const [email, emailupdate] = useState("");
  const [password, passwordupdate] = useState("");

  const usenavigate = useNavigate();

  useEffect(() => {
    sessionStorage.clear();
  }, []);

  async function ProceedLogin (e) {
    e.preventDefault();
    let loginobj = { email, password };
    if (validate()) {
      ///implimentation
      // console.log('proceed');

      fetch("http://localhost:4000/api/login", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(loginobj),
      })
      
        .then((res) => {
          return res.json();
        })
        .then((resp) => {
          // console.log(resp)
          if (Object.keys(resp).length === 0) {
            toast.error("Please Enter valid email");
          } else {
            if (resp.password === password) {
              toast.success("Success");
              sessionStorage.setItem("email", email);
              usenavigate("/");
            } else {
              toast.error("Please Enter valid password");
            }
          }
        })
        .catch((err) => {
          toast.error("Login Failed due to :" + err.message);
        });
    }
  };
  const validate = () => {
    let result = true;
    if (email === "" || email === null) {
      result = false;
      toast.warning("Please Enter Email");
    }
    if (password === "" || password === null) {
      result = false;
      toast.warning("Please Enter Password");
    }
    return result;
  };

  return (
    <div className="TodoWrapper1">
      <div className="offset-lg-1 col-lg-10">
        <form onSubmit={ProceedLogin} className="container">
          <div>
            <div className="card-header">
              <h2>User Login</h2>
            </div>
            <br />
            <div className="card-body">
              <div className="form-group">
                <label>
                  Email <span className="errmsg">*</span>
                </label>
                <input
                  value={email}
                  onChange={(e) => emailupdate(e.target.value)}
                  className="form-control"
                ></input>
              </div>
              <br />
              <div className="form-group">
                <label>
                  Password <span className="errmsg">*</span>
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => passwordupdate(e.target.value)}
                  className="form-control"
                ></input>
              </div>
            </div>
            <br />
            <div className="card-footer">
              <button type="submit" className="btn btn-primary">
                {" "}
                Login{" "}
              </button>{" "}
              |
              <Link className="btn btn-success" to={"/register"}>
                {" "}
                New User
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
