"use client"

import { useState } from "react"
import {
  Cloud,
  Users,
  Shield,
  Ban,
  UserCheck,
  Search,
  Filter,
  Trash2,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  ArrowLeft,
  Download,
  Activity,
  TrendingUp,
  BarChart3,
  Eye,
  Mail,
  Calendar,
} from "lucide-react"
import { useApp } from "../App"

const AdminPanel = () => {
  const { user, navigate, allUsers, setAllUsers, adminLogs, setAdminLogs } = useApp()
  const [activeTab, setActiveTab] = useState("users")
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedUser, setSelectedUser] = useState(null)
  const [showBanModal, setShowBanModal] = useState(false)
  const [banReason, setBanReason] = useState("")
  const [banType, setBanType] = useState("ban") // ban, suspend
  const [showUserDetails, setShowUserDetails] = useState(null)

  // Filter users based on search and status
  const filteredUsers = allUsers.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || u.status === statusFilter
    return matchesSearch && matchesStatus && u.role !== "admin"
  })

  // Statistics
  const stats = {
    totalUsers: allUsers.filter((u) => u.role !== "admin").length,
    activeUsers: allUsers.filter((u) => u.status === "active" && u.role !== "admin").length,
    bannedUsers: allUsers.filter((u) => u.status === "banned").length,
    suspendedUsers: allUsers.filter((u) => u.status === "suspended").length,
  }

  const growthRate = stats.totalUsers > 0 ? ((stats.activeUsers / stats.totalUsers) * 100).toFixed(1) : 0

  const handleBanUser = () => {
    if (!selectedUser || !banReason.trim()) return

    const updatedUsers = allUsers.map((u) => {
      if (u.id === selectedUser.id) {
        return {
          ...u,
          status: banType,
          banReason: banReason.trim(),
          bannedBy: user.name,
          banDate: new Date().toISOString().split("T")[0],
        }
      }
      return u
    })

    setAllUsers(updatedUsers)

    // Add to admin logs
    const newLog = {
      id: adminLogs.length + 1,
      action: banType === "ban" ? "User Banned" : "User Suspended",
      target: selectedUser.email,
      admin: user.email,
      reason: banReason.trim(),
      timestamp: new Date().toLocaleString(),
    }
    setAdminLogs([newLog, ...adminLogs])

    setShowBanModal(false)
    setSelectedUser(null)
    setBanReason("")
  }

  const handleUnbanUser = (userId) => {
    const updatedUsers = allUsers.map((u) => {
      if (u.id === userId) {
        return {
          ...u,
          status: "active",
          banReason: undefined,
          bannedBy: undefined,
          banDate: undefined,
        }
      }
      return u
    })

    setAllUsers(updatedUsers)

    const targetUser = allUsers.find((u) => u.id === userId)
    const newLog = {
      id: adminLogs.length + 1,
      action: "User Unbanned",
      target: targetUser.email,
      admin: user.email,
      reason: "Account restored by admin",
      timestamp: new Date().toLocaleString(),
    }
    setAdminLogs([newLog, ...adminLogs])
  }

  const handleDeleteUser = (userId) => {
    if (window.confirm("Are you sure you want to permanently delete this user? This action cannot be undone.")) {
      const targetUser = allUsers.find((u) => u.id === userId)
      const updatedUsers = allUsers.filter((u) => u.id !== userId)
      setAllUsers(updatedUsers)

      const newLog = {
        id: adminLogs.length + 1,
        action: "User Deleted",
        target: targetUser.email,
        admin: user.email,
        reason: "Account permanently deleted",
        timestamp: new Date().toLocaleString(),
      }
      setAdminLogs([newLog, ...adminLogs])
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "active":
        return <CheckCircle size={16} className="text-green-500" />
      case "banned":
        return <XCircle size={16} className="text-red-500" />
      case "suspended":
        return <Clock size={16} className="text-yellow-500" />
      default:
        return null
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "status-active"
      case "banned":
        return "status-banned"
      case "suspended":
        return "status-suspended"
      default:
        return ""
    }
  }

  const exportUserData = () => {
    const csvContent = [
      ["Name", "Email", "Plan", "Status", "Join Date", "Files", "Storage Used"].join(","),
      ...filteredUsers.map((u) =>
        [u.name, u.email, u.plan, u.status, u.joinDate, u.filesCount, u.storageUsed].join(","),
      ),
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `cloudstorage_users_${new Date().toISOString().split("T")[0]}.csv`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="admin-panel">
      {/* Header */}
      <header className="header">
        <nav className="navbar">
          <div className="nav-container">
            <div className="nav-brand">
              <Cloud className="nav-logo" size={28} />
              <span className="nav-title">CloudStorage Admin</span>
            </div>
            <div className="nav-menu">
              <button onClick={() => navigate("dashboard")} className="nav-link">
                <ArrowLeft size={16} />
                Back to Dashboard
              </button>
              <div className="admin-badge">
                <Shield size={16} />
                Admin Panel
              </div>
            </div>
          </div>
        </nav>
      </header>

      <div className="admin-container">
        {/* Sidebar */}
        <div className="admin-sidebar">
          <div className="admin-nav">
            <button
              onClick={() => setActiveTab("users")}
              className={`admin-nav-item ${activeTab === "users" ? "active" : ""}`}
            >
              <Users size={20} />
              User Management
            </button>
            <button
              onClick={() => setActiveTab("logs")}
              className={`admin-nav-item ${activeTab === "logs" ? "active" : ""}`}
            >
              <Activity size={20} />
              Activity Logs
            </button>
            <button
              onClick={() => setActiveTab("analytics")}
              className={`admin-nav-item ${activeTab === "analytics" ? "active" : ""}`}
            >
              <BarChart3 size={20} />
              Analytics
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="admin-main">
          {activeTab === "users" && (
            <>
              {/* Stats */}
              <div className="admin-stats">
                <div className="stat-card stat-card-enhanced">
                  <div className="stat-icon stat-icon-users">
                    <Users size={24} />
                  </div>
                  <div className="stat-info">
                    <h3>Total Users</h3>
                    <p className="stat-number">{stats.totalUsers}</p>
                    <div className="stat-trend positive">
                      <TrendingUp size={14} />
                      <span>+12% this month</span>
                    </div>
                  </div>
                </div>
                <div className="stat-card stat-card-enhanced">
                  <div className="stat-icon stat-icon-active">
                    <CheckCircle size={24} />
                  </div>
                  <div className="stat-info">
                    <h3>Active Users</h3>
                    <p className="stat-number">{stats.activeUsers}</p>
                    <div className="stat-trend positive">
                      <TrendingUp size={14} />
                      <span>{growthRate}% active rate</span>
                    </div>
                  </div>
                </div>
                <div className="stat-card stat-card-enhanced">
                  <div className="stat-icon stat-icon-banned">
                    <XCircle size={24} />
                  </div>
                  <div className="stat-info">
                    <h3>Banned Users</h3>
                    <p className="stat-number">{stats.bannedUsers}</p>
                    <div className="stat-trend neutral">
                      <span>{stats.bannedUsers} total bans</span>
                    </div>
                  </div>
                </div>
                <div className="stat-card stat-card-enhanced">
                  <div className="stat-icon stat-icon-suspended">
                    <Clock size={24} />
                  </div>
                  <div className="stat-info">
                    <h3>Suspended Users</h3>
                    <p className="stat-number">{stats.suspendedUsers}</p>
                    <div className="stat-trend neutral">
                      <span>{stats.suspendedUsers} suspensions</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Controls */}
              <div className="admin-controls">
                <div className="controls-left">
                  <div className="search-container">
                    <Search className="search-icon" size={20} />
                    <input
                      type="text"
                      placeholder="Search users..."
                      className="search-input"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <div className="filter-container">
                    <Filter className="filter-icon" size={20} />
                    <select
                      className="filter-select"
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                    >
                      <option value="all">All Status</option>
                      <option value="active">Active</option>
                      <option value="banned">Banned</option>
                      <option value="suspended">Suspended</option>
                    </select>
                  </div>
                </div>
                <div className="controls-right">
                  <button onClick={exportUserData} className="export-btn">
                    <Download size={16} />
                    Export CSV
                  </button>
                </div>
              </div>

              {/* Users Table */}
              <div className="users-table-container">
                <table className="users-table">
                  <thead>
                    <tr>
                      <th>User</th>
                      <th>Plan</th>
                      <th>Status</th>
                      <th>Join Date</th>
                      <th>Files</th>
                      <th>Storage</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((u) => (
                      <tr key={u.id}>
                        <td>
                          <div className="user-cell">
                            <img
                              src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                                u.name,
                              )}&background=4f46e5&color=fff`}
                              alt={u.name}
                              className="user-avatar-small"
                            />
                            <div className="user-info-small">
                              <div className="user-name-small">{u.name}</div>
                              <div className="user-email-small">{u.email}</div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <span className={`plan-badge plan-${u.plan}`}>{u.plan}</span>
                        </td>
                        <td>
                          <div className={`status-badge ${getStatusColor(u.status)}`}>
                            {getStatusIcon(u.status)}
                            {u.status}
                          </div>
                        </td>
                        <td>{u.joinDate}</td>
                        <td>{u.filesCount}</td>
                        <td>{u.storageUsed}</td>
                        <td>
                          <div className="action-buttons">
                            <button
                              onClick={() => setShowUserDetails(u)}
                              className="action-btn view-btn"
                              title="View Details"
                            >
                              <Eye size={16} />
                            </button>
                            {u.status === "active" && (
                              <>
                                <button
                                  onClick={() => {
                                    setSelectedUser(u)
                                    setBanType("suspend")
                                    setShowBanModal(true)
                                  }}
                                  className="action-btn suspend-btn"
                                  title="Suspend User"
                                >
                                  <Clock size={16} />
                                </button>
                                <button
                                  onClick={() => {
                                    setSelectedUser(u)
                                    setBanType("ban")
                                    setShowBanModal(true)
                                  }}
                                  className="action-btn ban-btn"
                                  title="Ban User"
                                >
                                  <Ban size={16} />
                                </button>
                              </>
                            )}
                            {(u.status === "banned" || u.status === "suspended") && (
                              <button
                                onClick={() => handleUnbanUser(u.id)}
                                className="action-btn unban-btn"
                                title="Restore User"
                              >
                                <UserCheck size={16} />
                              </button>
                            )}
                            <button
                              onClick={() => handleDeleteUser(u.id)}
                              className="action-btn delete-btn"
                              title="Delete User"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {activeTab === "logs" && (
            <div className="admin-logs">
              <div className="logs-header">
                <h2>Activity Logs</h2>
                <p>Recent admin actions and system events</p>
              </div>
              <div className="logs-container">
                {adminLogs.map((log) => (
                  <div key={log.id} className="log-item">
                    <div className="log-icon">
                      <Activity size={20} />
                    </div>
                    <div className="log-content">
                      <div className="log-action">{log.action}</div>
                      <div className="log-details">
                        <span className="log-target">{log.target}</span>
                        <span className="log-separator">•</span>
                        <span className="log-admin">by {log.admin}</span>
                        <span className="log-separator">•</span>
                        <span className="log-time">{log.timestamp}</span>
                      </div>
                      {log.reason && <div className="log-reason">Reason: {log.reason}</div>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "analytics" && (
            <div className="analytics-section">
              <div className="analytics-header">
                <h2>Platform Analytics</h2>
                <p>Overview of platform performance and user engagement</p>
              </div>

              <div className="analytics-grid">
                <div className="analytics-card">
                  <div className="analytics-card-header">
                    <h3>User Growth</h3>
                    <TrendingUp className="analytics-icon" size={20} />
                  </div>
                  <div className="analytics-card-body">
                    <div className="analytics-metric">
                      <span className="metric-value">{stats.totalUsers}</span>
                      <span className="metric-label">Total Users</span>
                    </div>
                    <div className="analytics-progress">
                      <div className="progress-bar-analytics">
                        <div
                          className="progress-fill-analytics"
                          style={{ width: `${(stats.activeUsers / stats.totalUsers) * 100}%` }}
                        ></div>
                      </div>
                      <span className="progress-label">{growthRate}% Active Rate</span>
                    </div>
                  </div>
                </div>

                <div className="analytics-card">
                  <div className="analytics-card-header">
                    <h3>User Status</h3>
                    <Users className="analytics-icon" size={20} />
                  </div>
                  <div className="analytics-card-body">
                    <div className="status-breakdown">
                      <div className="status-item">
                        <div className="status-dot status-dot-active"></div>
                        <span className="status-label">Active</span>
                        <span className="status-count">{stats.activeUsers}</span>
                      </div>
                      <div className="status-item">
                        <div className="status-dot status-dot-suspended"></div>
                        <span className="status-label">Suspended</span>
                        <span className="status-count">{stats.suspendedUsers}</span>
                      </div>
                      <div className="status-item">
                        <div className="status-dot status-dot-banned"></div>
                        <span className="status-label">Banned</span>
                        <span className="status-count">{stats.bannedUsers}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="analytics-card">
                  <div className="analytics-card-header">
                    <h3>Plan Distribution</h3>
                    <BarChart3 className="analytics-icon" size={20} />
                  </div>
                  <div className="analytics-card-body">
                    <div className="plan-distribution">
                      {["free", "premium", "business"].map((plan) => {
                        const count = allUsers.filter((u) => u.plan === plan && u.role !== "admin").length
                        const percentage = stats.totalUsers > 0 ? ((count / stats.totalUsers) * 100).toFixed(0) : 0
                        return (
                          <div key={plan} className="plan-item-analytics">
                            <div className="plan-info-analytics">
                              <span className="plan-name-analytics">
                                {plan.charAt(0).toUpperCase() + plan.slice(1)}
                              </span>
                              <span className="plan-count-analytics">{count} users</span>
                            </div>
                            <div className="plan-bar">
                              <div className="plan-bar-fill" style={{ width: `${percentage}%` }}></div>
                            </div>
                            <span className="plan-percentage">{percentage}%</span>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>

                <div className="analytics-card">
                  <div className="analytics-card-header">
                    <h3>Recent Activity</h3>
                    <Activity className="analytics-icon" size={20} />
                  </div>
                  <div className="analytics-card-body">
                    <div className="activity-summary">
                      <div className="activity-item">
                        <Calendar size={16} />
                        <span>Last 7 days</span>
                        <span className="activity-value">{adminLogs.length} actions</span>
                      </div>
                      <div className="activity-item">
                        <Users size={16} />
                        <span>New users</span>
                        <span className="activity-value">+{Math.floor(stats.totalUsers * 0.12)}</span>
                      </div>
                      <div className="activity-item">
                        <Ban size={16} />
                        <span>Moderation</span>
                        <span className="activity-value">{stats.bannedUsers + stats.suspendedUsers}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Ban Modal */}
      {showBanModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>{banType === "ban" ? "Ban User" : "Suspend User"}</h3>
              <button onClick={() => setShowBanModal(false)} className="modal-close">
                ×
              </button>
            </div>
            <div className="modal-body">
              <div className="user-info-modal">
                <img
                  src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                    selectedUser?.name || "",
                  )}&background=4f46e5&color=fff`}
                  alt={selectedUser?.name}
                  className="user-avatar-modal"
                />
                <div>
                  <div className="user-name-modal">{selectedUser?.name}</div>
                  <div className="user-email-modal">{selectedUser?.email}</div>
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">
                  Reason for {banType === "ban" ? "banning" : "suspending"} this user:
                </label>
                <textarea
                  className="form-textarea"
                  placeholder="Enter the reason..."
                  value={banReason}
                  onChange={(e) => setBanReason(e.target.value)}
                  rows={4}
                />
              </div>
              <div className="warning-message">
                <AlertTriangle size={20} />
                <span>
                  This action will {banType === "ban" ? "permanently ban" : "temporarily suspend"} the user from
                  accessing CloudStorage.
                </span>
              </div>
            </div>
            <div className="modal-footer">
              <button onClick={() => setShowBanModal(false)} className="btn-secondary">
                Cancel
              </button>
              <button onClick={handleBanUser} className="btn-danger" disabled={!banReason.trim()}>
                {banType === "ban" ? "Ban User" : "Suspend User"}
              </button>
            </div>
          </div>
        </div>
      )}

      {showUserDetails && (
        <div className="modal-overlay" onClick={() => setShowUserDetails(null)}>
          <div className="modal-content user-details-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>User Details</h3>
              <button onClick={() => setShowUserDetails(null)} className="modal-close">
                ×
              </button>
            </div>
            <div className="modal-body">
              <div className="user-details-header">
                <img
                  src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                    showUserDetails.name,
                  )}&background=4f46e5&color=fff`}
                  alt={showUserDetails.name}
                  className="user-avatar-large"
                />
                <div className="user-details-info">
                  <h4>{showUserDetails.name}</h4>
                  <p className="user-email-details">{showUserDetails.email}</p>
                  <div className="user-badges">
                    <span className={`plan-badge plan-${showUserDetails.plan}`}>{showUserDetails.plan}</span>
                    <span className={`status-badge ${getStatusColor(showUserDetails.status)}`}>
                      {getStatusIcon(showUserDetails.status)}
                      {showUserDetails.status}
                    </span>
                  </div>
                </div>
              </div>

              <div className="user-details-grid">
                <div className="detail-item">
                  <Calendar size={18} />
                  <div>
                    <span className="detail-label">Join Date</span>
                    <span className="detail-value">{showUserDetails.joinDate}</span>
                  </div>
                </div>
                <div className="detail-item">
                  <Activity size={18} />
                  <div>
                    <span className="detail-label">Last Login</span>
                    <span className="detail-value">{showUserDetails.lastLogin}</span>
                  </div>
                </div>
                <div className="detail-item">
                  <Users size={18} />
                  <div>
                    <span className="detail-label">Files Count</span>
                    <span className="detail-value">{showUserDetails.filesCount}</span>
                  </div>
                </div>
                <div className="detail-item">
                  <Cloud size={18} />
                  <div>
                    <span className="detail-label">Storage Used</span>
                    <span className="detail-value">{showUserDetails.storageUsed}</span>
                  </div>
                </div>
              </div>

              {(showUserDetails.status === "banned" || showUserDetails.status === "suspended") && (
                <div className="ban-info-details">
                  <h5>Restriction Details</h5>
                  <div className="ban-info-grid">
                    <div className="ban-info-item">
                      <strong>Reason:</strong>
                      <span>{showUserDetails.banReason}</span>
                    </div>
                    <div className="ban-info-item">
                      <strong>By:</strong>
                      <span>{showUserDetails.bannedBy}</span>
                    </div>
                    <div className="ban-info-item">
                      <strong>Date:</strong>
                      <span>{showUserDetails.banDate}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="modal-footer">
              <button onClick={() => setShowUserDetails(null)} className="btn-secondary">
                Close
              </button>
              <button
                onClick={() => {
                  const mailtoLink = `mailto:${showUserDetails.email}`
                  window.location.href = mailtoLink
                }}
                className="btn-primary-modal"
              >
                <Mail size={16} />
                Contact User
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminPanel
