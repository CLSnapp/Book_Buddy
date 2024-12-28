/* TODO - add your code to create a functional React component that renders a registration form */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRegisterMutation } from "./RegisterSlice";

export default function Register() {
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [registerUser] = useRegisterMutation();
  const [error, setError] = useState(null);
  const change = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      const response = await registerUser(form).unwrap();
      console.log(response);
    //   navigate("/account");
    } catch (err) {
      setError(err.data.message);
      console.log(err.data.message);
    }
  };

  return (
    <div>
      <h2>Register</h2>

      <form onSubmit={submit}>
        <table className="formtable">
          <tbody>
            <tr>
              <td width="150px">
                <label>First name: </label>
              </td>
              <td>
                <input
                  className="inputfield"
                  type="text"
                  name="firstname"
                  onChange={change}
                />
              </td>
            </tr>
            <tr>
              <td width="150px">
                <label>Last name: </label>
              </td>
              <td>
                <input
                  className="inputfield"
                  type="text"
                  name="lastname"
                  onChange={change}
                />
              </td>
            </tr>
            <tr>
              <td width="150px">
                <label>Email address: </label>
              </td>
              <td>
                <input
                  className="inputfield"
                  type="email"
                  name="email"
                  onChange={change}
                />
              </td>
            </tr>
            <tr>
              <td width="150px">
                <label>Password: </label>
              </td>
              <td>
                <input
                  className="inputfield"
                  type="password"
                  name="password"
                  pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                  title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                  required
                  onChange={change}
                />
              </td>
            </tr>
            <tr>
              <td>
                <p></p>
              </td>
              <td>
                <p className="passwordinfo">
                  Password must be 8 or more characters in length and contain at
                  least one number, one uppercase letter, one lowercase letter.
                </p>
              </td>
            </tr>
            <tr>
              <td colSpan={2}>
                <button type="submit" className="submitbutton">
                  Submit
                </button>
              </td>
            </tr>
            {error && <p className="error">{error}</p>}
          </tbody>
        </table>
      </form>
    </div>
  );
}
