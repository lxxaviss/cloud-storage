"use client"

import { useState } from "react"
import { Cloud, User, Mail, Lock, Eye, EyeOff } from "lucide-react"
import { useApp } from "../App"

const Register = () => {
  const { navigate, setUser } = useApp()
  const [formData, setFormData] = useState({ name: "", email: "", password: "" })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (!response.ok) throw new Error("Registration failed")

      const data = await response.json()

      // Предполагаем, что сервер возвращает объект user
      setUser({
        name: data.name,
        email: data.email,
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(data.name)}&background=4f46e5&color=fff`,
      })

      navigate("dashboard")
    } catch (err) {
      setError(err.message || "Server error")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-background">
        <div className="floating-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
          <div className="shape shape-4"></div>
        </div>
      </div>

      <div className="auth-card">
        <div className="auth-header">
          <Cloud size={32} />
          <h1 className="auth-title">CloudStorage</h1>
          <p className="auth-subtitle">Create your account</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {error && <div className="error-message">{error}</div>}

          <div className="form-group">
            <label className="form-label">Full Name</label>
            <div className="input-container">
              <User className="input-icon" size={20} />
              <input
                type="text"
                placeholder="Enter your name"
                className="form-input"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Email Address</label>
            <div className="input-container">
              <Mail className="input-icon" size={20} />
              <input
                type="email"
                placeholder="example@email.com"
                className="form-input"
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
                placeholder="Enter password"
                className="form-input"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <button type="submit" className="auth-button" disabled={isLoading}>
            {isLoading ? <div className="loading-spinner"></div> : "Create Account"}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Already have an account?
            <button onClick={() => navigate("login")} className="auth-switch">
              Sign In
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Register
