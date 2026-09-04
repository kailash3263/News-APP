import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
  });

  const [status, setStatus] = useState({
    error: "",
    success: "",
    loading: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setStatus({
      error: "",
      success: "",
      loading: true,
    });

    try {
      const response = await fetch("https://instanews-backend.onrender.com/auth/signUp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        const message = data.errors
          ? data.errors.map((error) => error.msg).join(", ")
          : data.message || "Signup failed";

        setStatus({
          error: message,
          success: "",
          loading: false,
        });

        return;
      }

      setStatus({
        error: "",
        success: "Signup successful!",
        loading: false,
      });

      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        acceptTerms: false,
      });
    } catch (error) {
      setStatus({
        error: "Unable to connect to server",
        success: "",
        loading: false,
      });
    }
  };

  return (
    <div className="auth-page">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <h1 className="auth-brand">InstaNews</h1>

            <div className="card auth-card">
              <div className="card-body">
                <h3 className="card-title text-center mb-4">Sign Up</h3>

                <form onSubmit={handleSubmit} className="auth-form">

                  <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Email address</label>
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input
                      type="password"
                      name="password"
                      className="form-control"
                      value={formData.password}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Confirm password</label>
                    <input
                      type="password"
                      name="confirmPassword"
                      className="form-control"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-check mb-3">
                    <input
                      type="checkbox"
                      name="acceptTerms"
                      className="form-check-input"
                      checked={formData.acceptTerms}
                      onChange={handleChange}
                    />

                    <label className="form-check-label">
                      I accept the terms and conditions
                    </label>
                  </div>

                  {status.error && (
                    <div className="alert alert-danger auth-alert">
                      {status.error}
                    </div>
                  )}

                  {status.success && (
                    <div className="alert alert-success auth-alert">
                      {status.success}
                    </div>
                  )}

                  <button
                    type="submit"
                    className="btn auth-submit w-100"
                    disabled={status.loading}
                  >
                    {status.loading ? "Signing up..." : "Sign Up"}
                  </button>
                  <br />

                 {status.success && ( <button
                    type="button"
                    onClick={()=> navigate('/login')}
                    className="btn auth-submit w-100 mt-3"
                    disabled={status.loading}
                  >
                    {"click here to login"}
                  </button>)
                  }
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;