import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Register = () => {
  const [id, idchange] = useState("");
  const [name, namechange] = useState("");
  const [email, emailchange] = useState("");
  const [password, passwordchange] = useState("");
  const [gender, genderchange] = useState("");

  const navigate = useNavigate();

  const IsValidate = () => {
    let isproceed = true;
    let errormessage = "Please enter valid value";
    if (id === null || id === "") {
      isproceed = false;
      errormessage += " Username";
    }
    if (id === null || name === "") {
      isproceed = false;
      errormessage += " Fullname";
    }
    if (id === null || email === "") {
      isproceed = false;
      errormessage += " Email";
    }
    if (id === null || password === "") {
      isproceed = false;
      errormessage += " Password";
    }

    if (!isproceed) {
      toast.warning(errormessage);
    } else {
      if (/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)) {
      } else {
        isproceed = false;
        toast.warning("Please enter valid email");
      }
    }
    return isproceed;
  };

  async function proceedRegister(e) {
    e.preventDefault();
    let regobj = { id, name, email, password, gender };
    if (IsValidate()) {
      // console.log(regobj);

      fetch("http://localhost:4000/api/user", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(regobj),
      })
        .then((res) => {
          toast.success("Registered successfully.");
          navigate("/login");
        })
        .catch((err) => {
          toast.err("Failed: " + err.message);
        });

      // const data = await response.json(); 
      // console.log(data);
    }
  };

  return (
    <div className="TodoWrapper1">
      <div className="offset-lg-1 col-lg-10">
        <form className="container" onSubmit={proceedRegister}>
          <div>
            <div className="card-header">
              <h2>User Registration</h2>
            </div>
            <br />
            <div className="card-body">
              <div className="row">
                <div className="col-lg-12">
                  <div className="form-group">
                    <label>
                      User Name <span className="errmsg">*</span>
                    </label>
                    <input
                      value={id}
                      onChange={(e) => idchange(e.target.value)}
                      className="form-control"
                    ></input>
                  </div>
                </div>
              </div>
              <br />
              <div className="row">
                <div className="col-lg-12">
                  <div className="form-group">
                    <label>
                      Full Name <span className="errmsg">*</span>
                    </label>
                    <input
                      value={name}
                      onChange={(e) => namechange(e.target.value)}
                      className="form-control"
                    ></input>
                  </div>
                </div>
              </div>
              <br />
              <div className="row">
                <div className="col-lg-12">
                  <div className="form-group">
                    <label>
                      Email <span className="errmsg">*</span>
                    </label>
                    <input
                      value={email}
                      onChange={(e) => emailchange(e.target.value)}
                      className="form-control"
                    ></input>
                  </div>
                </div>
              </div>
              <br />
              <div className="row">
                <div className="col-lg-12">
                  <div className="form-group">
                    <label>
                      Password <span className="errmsg">*</span>
                    </label>
                    <input
                      value={password}
                      onChange={(e) => passwordchange(e.target.value)}
                      type="password"
                      className="form-control"
                    ></input>
                  </div>
                </div>
              </div>
              <br />
              <div className="col-lg-12">
                <div className="form-group">
                  <label>Gender</label>
                  <br></br>
                  <input
                    type="radio"
                    checked={gender === "male"}
                    onChange={(e) => genderchange(e.target.value)}
                    name="gender"
                    value="male"
                    className="app-check"
                  ></input>
                  <label>Male</label>
                  <input
                    type="radio"
                    checked={gender === "female"}
                    onChange={(e) => genderchange(e.target.value)}
                    name="gender"
                    value="female"
                    className="app-check"
                  ></input>
                  <label>Female</label>
                </div>
              </div>
            </div>
            <br />
            <div className="card-footer">
              <button type="submit" className="btn btn-primary">
                Register
              </button>{" "}
              |
              <Link className="btn btn-danger" to={"/login"}>
                {" "}
                Back
              </Link>
              {/* <a className="btn btn-danger">Back</a> */}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
