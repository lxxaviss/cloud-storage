"use client"

import { useState } from "react"
import { Cloud, Mail, Lock, Eye, EyeOff, Shield } from "lucide-react"
import { useApp } from "../App"

const Login = () => {
  const { navigate, setUser, allUsers } = useApp()
  const [formData, setFormData] = useState({ email: "", password: "" })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [isAdminMode, setIsAdminMode] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    setTimeout(() => {
      const foundUser = allUsers.find((u) => u.email.toLowerCase() === formData.email.toLowerCase())

      if (!foundUser) {
        setError("User not found. Please check your email.")
        setIsLoading(false)
        return
      }

      if (isAdminMode && foundUser.role !== "admin") {
        setError("This account does not have admin privileges.")
        setIsLoading(false)
        return
      }

      // For demo: any password works, but you can add specific validation
      if (!formData.password || formData.password.length < 3) {
        setError("Please enter a valid password.")
        setIsLoading(false)
        return
      }

      if (foundUser.status === "banned") {
        setError("This account has been banned. Please contact support.")
        setIsLoading(false)
        return
      }

      if (foundUser.status === "suspended") {
        setError("This account has been suspended. Please contact support.")
        setIsLoading(false)
        return
      }

      setUser({
        ...foundUser,
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(foundUser.name)}&background=4f46e5&color=fff`,
      })

      if (foundUser.role === "admin") {
        navigate("admin")
      } else {
        navigate("dashboard")
      }

      setIsLoading(false)
    }, 800)
  }

  const quickLogin = (email) => {
    setFormData({ email, password: "demo123" })
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <Cloud size={32} />
          <h1 className="auth-title">CloudStorage</h1>
          <p className="auth-subtitle">Welcome back!</p>
        </div>

        <div className="login-mode-toggle">
          <button
            type="button"
            className={`mode-btn ${!isAdminMode ? "active" : ""}`}
            onClick={() => setIsAdminMode(false)}
          >
            <Mail size={18} />
            User Login
          </button>
          <button
            type="button"
            className={`mode-btn ${isAdminMode ? "active" : ""}`}
            onClick={() => setIsAdminMode(true)}
          >
            <Shield size={18} />
            Admin Login
          </button>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {error && <div className="error-message">{error}</div>}

          <div className="form-group">
            <label className="form-label">Email Address</label>
            <div className="input-container">
              <Mail className="input-icon" size={20} />
              <input
                type="email"
                className="form-input"
                placeholder="example@email.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <div className="input-container">
              <Lock className="input-icon" size={20} />
              <input
                type={showPassword ? "text" : "password"}
                className="form-input"
                placeholder="Enter password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
              <button type="button" className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <button type="submit" className="auth-button" disabled={isLoading}>
            {isLoading ? <div className="loading-spinner"></div> : "Sign In"}
          </button>
        </form>

        <div className="demo-logins">
          <p className="demo-title">Quick Demo Login:</p>
          <div className="demo-buttons">
            {isAdminMode ? (
              <button
                type="button"
                onClick={() => quickLogin("admin@cloudstorage.com")}
                className="demo-btn demo-btn-admin"
              >
                <Shield size={16} />
                Login as Admin
              </button>
            ) : (
              <>
                <button type="button" onClick={() => quickLogin("john@example.com")} className="demo-btn">
                  Login as John
                </button>
                <button type="button" onClick={() => quickLogin("mike@example.com")} className="demo-btn">
                  Login as Mike
                </button>
              </>
            )}
          </div>
        </div>

        <div className="auth-footer">
          <p>
            Don't have an account?
            <button onClick={() => navigate("register")} className="auth-switch">
              Sign Up
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
