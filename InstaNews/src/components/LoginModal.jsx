import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginModal({ show, close }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [status, setStatus] = useState({ error: "", loading: false });
  
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleClose = ()=>{
	  close(false);
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ error: "", loading: true });
    try {
      const response = await fetch("https://instanews-backend.onrender.com/auth/login", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (!response.ok) {
        setStatus({ error: data.error || "Invalid email or password", loading: false });
        // return;
      }
      setStatus({ error: "", loading: false });
    //   onClose();
    // navigate("/");
	    close(false);

    } catch (err) {
      setStatus({ error: "Server error: " + err.message, loading: false });
    }
  };

  if (!show) return null;

  return (
    <>
      <div className="modal d-block" tabIndex="-1" role="dialog">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content login-modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Log In</h5>
              <button type="button" className="btn-close" onClick={handleClose}></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label" htmlFor="modal-email">Email address</label>
                  <input
                    id="modal-email"
                    type="email"
                    name="email"
                    className="form-control"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label" htmlFor="modal-password">Password</label>
                  <input
                    id="modal-password"
                    type="password"
                    name="password"
                    className="form-control"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
                {status.error && <div className="alert alert-danger py-2">{status.error}</div>}
                <button type="submit" className="btn btn-primary w-100" disabled={status.loading}>
                  {status.loading ? "Logging in..." : "Log In"}
                </button>
              </form>
            </div>
            <div className="modal-footer justify-content-center">
              <span>
                Don't have an account?{" "}
                <button
                  type="button"
                  className="btn btn-link p-0"
                  onClick={() => { close(); navigate("/signin"); }}
                >
                  Sign up
                </button>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop show"></div>
    </>
  );
}

export default LoginModal;