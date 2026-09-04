import { useState  } from "react";
import { Link, useNavigate} from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [status, setStatus] = useState({ error: "", success: "", loading: false });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ error: "", success: "", loading: true });
    try {
      const response = await fetch("https://instanews-backend.onrender.com/auth/login", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok) {
        setStatus({
          error: data.error || "Invalid email or password",
          success: "",
          loading: false,
        });
      } else {
        navigate('/');
        setStatus({ error: "", success: data.message, loading: false });
        // Handle token storage (e.g., localStorage or cookie) and navigation here
      }
    } catch (err) {
      setStatus({ error: "Server error: " + err.message, success: "", loading: false });
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
                <h3 className="card-title text-center mb-4">Log In</h3>
                <form onSubmit={handleSubmit} className="auth-form">
                  <div className="mb-3">
                    <label className="form-label" htmlFor="login-email">Email address</label>
                    <input
                      id="login-email"
                      type="email"
                      name="email"
                      className="form-control"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label" htmlFor="login-password">Password</label>
                    <input
                      id="login-password"
                      type="password"
                      name="password"
                      className="form-control"
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="text-end mb-3">
                    <Link className="auth-link" to="/forgot-password">Forgot password?</Link>
                  </div>

                  {status.error && <div className="alert alert-danger auth-alert">{status.error}</div>}
                  {status.success && <div className="alert alert-success auth-alert">{status.success}</div>}

                  <button type="submit" className="btn auth-submit w-100" disabled={status.loading}>
                    {status.loading ? "Logging in..." : "Log In"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ForgotPassword() {
  return (
    <div className="auth-page">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <h1 className="auth-brand">InstaNews</h1>
            <div className="card auth-card">
              <div className="card-body">
                <h3 className="card-title text-center mb-4">Forgot password?</h3>
                <form className="auth-form">
                  <label className="form-label" htmlFor="forgot-email">Email address</label>
                  <input
                    id="forgot-email"
                    type="email"
                    className="form-control mb-3"
                    placeholder="Enter your email address"
                    required
                  />
                  <button type="submit" className="btn auth-submit w-100">
                    Send reset link
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;