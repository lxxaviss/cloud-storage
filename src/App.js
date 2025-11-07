"use client"

import { useState, createContext, useContext } from "react"
import Homepage from "./pages/Homepage"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Dashboard from "./pages/Dashboard"
import Pricing from "./pages/Pricing"
import Payment from "./pages/Payment"
import Receipt from "./pages/Receipt"
import AdminPanel from "./pages/AdminPanel"
import "./styles/CloudStorageApp.css"

// Context for user and plan management
const AppContext = createContext()

export const useApp = () => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error("useApp must be used within AppProvider")
  }
  return context
}

function App() {
  const [currentPage, setCurrentPage] = useState("homepage")
  const [user, setUser] = useState(null)
  const [userPlan, setUserPlan] = useState("free") // free, premium, business
  const [selectedPlan, setSelectedPlan] = useState(null) // for payment page
  const [files, setFiles] = useState([
    { id: 1, name: "Document.pdf", size: "2.4 MB", type: "pdf", uploadDate: "2024-12-15" },
    { id: 2, name: "Presentation.pptx", size: "5.1 MB", type: "pptx", uploadDate: "2024-12-14" },
    { id: 3, name: "Photo.jpg", size: "3.2 MB", type: "jpg", uploadDate: "2024-12-13" },
  ])

  // Admin and user management
  const [allUsers, setAllUsers] = useState([
    {
      id: 1,
      name: "Admin User",
      email: "admin@cloudstorage.com",
      role: "admin",
      plan: "business",
      status: "active",
      joinDate: "2024-01-01",
      lastLogin: "2024-12-15",
      filesCount: 0,
      storageUsed: "0 MB",
    },
    {
      id: 2,
      name: "John Doe",
      email: "john@example.com",
      role: "user",
      plan: "premium",
      status: "active",
      joinDate: "2024-06-15",
      lastLogin: "2024-12-14",
      filesCount: 25,
      storageUsed: "45.2 MB",
    },
    {
      id: 3,
      name: "Jane Smith",
      email: "jane@example.com",
      role: "user",
      plan: "free",
      status: "banned",
      joinDate: "2024-08-20",
      lastLogin: "2024-12-10",
      filesCount: 8,
      storageUsed: "12.1 MB",
      banReason: "Violation of terms of service",
      bannedBy: "Admin User",
      banDate: "2024-12-12",
    },
    {
      id: 4,
      name: "Mike Johnson",
      email: "mike@example.com",
      role: "user",
      plan: "premium",
      status: "suspended",
      joinDate: "2024-09-10",
      lastLogin: "2024-12-13",
      filesCount: 15,
      storageUsed: "28.7 MB",
      banReason: "Suspicious activity detected",
      bannedBy: "Admin User",
      banDate: "2024-12-13",
    },
  ])

  const [adminLogs, setAdminLogs] = useState([
    {
      id: 1,
      action: "User Banned",
      target: "jane@example.com",
      admin: "admin@cloudstorage.com",
      reason: "Violation of terms of service",
      timestamp: "2024-12-12 14:30:00",
    },
    {
      id: 2,
      action: "User Suspended",
      target: "mike@example.com",
      admin: "admin@cloudstorage.com",
      reason: "Suspicious activity detected",
      timestamp: "2024-12-13 09:15:00",
    },
  ])

  const navigate = (page, data = null) => {
    setCurrentPage(page)
    if (data) {
      setSelectedPlan(data.planId)
    }
  }

  const contextValue = {
    user,
    setUser,
    userPlan,
    setUserPlan,
    files,
    setFiles,
    navigate,
    selectedPlan,
    setSelectedPlan,
    allUsers,
    setAllUsers,
    adminLogs,
    setAdminLogs,
  }

  const renderPage = () => {
    // Check if user is banned
    if (user && user.status === "banned") {
      return <BannedPage />
    }

    // Check if user is suspended
    if (user && user.status === "suspended") {
      return <SuspendedPage />
    }

    // Redirect logic
    if (currentPage === "login" && user) {
      return <Dashboard />
    }
    if (currentPage === "register" && user) {
      return <Dashboard />
    }
    if (currentPage === "dashboard" && !user) {
      return <Login />
    }
    if (currentPage === "admin" && (!user || user.role !== "admin")) {
      return <Dashboard />
    }

    switch (currentPage) {
      case "homepage":
        return <Homepage />
      case "login":
        return <Login />
      case "register":
        return <Register />
      case "pricing":
        return <Pricing />
      case "payment":
        return <Payment />
      case "receipt":
        return <Receipt />
      case "dashboard":
        return <Dashboard />
      case "admin":
        return <AdminPanel />
      default:
        return <Homepage />
    }
  }

  // Banned user page
  const BannedPage = () => (
    <div className="banned-page">
      <div className="banned-container">
        <div className="banned-content">
          <div className="banned-icon">🚫</div>
          <h1>Account Banned</h1>
          <p>Your account has been permanently banned from CloudStorage.</p>
          <div className="ban-details">
            <p>
              <strong>Reason:</strong> {user.banReason}
            </p>
            <p>
              <strong>Banned by:</strong> {user.bannedBy}
            </p>
            <p>
              <strong>Date:</strong> {user.banDate}
            </p>
          </div>
          <p className="ban-appeal">
            If you believe this is a mistake, please contact our support team at{" "}
            <a href="mailto:support@cloudstorage.com">support@cloudstorage.com</a>
          </p>
          <button
            onClick={() => {
              setUser(null)
              navigate("homepage")
            }}
            className="back-home-btn"
          >
            Back to Homepage
          </button>
        </div>
      </div>
    </div>
  )

  // Suspended user page
  const SuspendedPage = () => (
    <div className="suspended-page">
      <div className="suspended-container">
        <div className="suspended-content">
          <div className="suspended-icon">⏸️</div>
          <h1>Account Suspended</h1>
          <p>Your account has been temporarily suspended from CloudStorage.</p>
          <div className="suspension-details">
            <p>
              <strong>Reason:</strong> {user.banReason}
            </p>
            <p>
              <strong>Suspended by:</strong> {user.bannedBy}
            </p>
            <p>
              <strong>Date:</strong> {user.banDate}
            </p>
          </div>
          <p className="suspension-info">
            Your account access is temporarily restricted. Please contact support for more information.
          </p>
          <div className="suspension-actions">
            <button
              onClick={() => {
                setUser(null)
                navigate("homepage")
              }}
              className="back-home-btn"
            >
              Back to Homepage
            </button>
            <a href="mailto:support@cloudstorage.com" className="contact-support-btn">
              Contact Support
            </a>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <AppContext.Provider value={contextValue}>
      <div className="App">{renderPage()}</div>
    </AppContext.Provider>
  )
}

export default App
