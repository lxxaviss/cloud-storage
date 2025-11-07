"use client"

import { useState, useRef } from "react"
import {
  Cloud,
  Upload,
  Download,
  File,
  Folder,
  Search,
  Grid,
  List,
  LogOut,
  Plus,
  Trash2,
  Crown,
  Shield,
  Filter,
  SortAsc,
  Eye,
  Star,
} from "lucide-react"
import { useApp } from "../App"

const Dashboard = () => {
  const { user, setUser, userPlan, files, setFiles, navigate } = useApp()
  const [searchTerm, setSearchTerm] = useState("")
  const [viewMode, setViewMode] = useState("grid")
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef(null)
  const [sortBy, setSortBy] = useState("date") // date, name, size
  const [filterType, setFilterType] = useState("all") // all, pdf, image, doc, etc.
  const [selectedFiles, setSelectedFiles] = useState([])
  const [showFilePreview, setShowFilePreview] = useState(null)

  const planLimits = {
    free: { storage: 5 * 1024, files: 100 }, // 5GB in MB
    premium: { storage: 100 * 1024, files: 10000 }, // 100GB in MB
    business: { storage: 1024 * 1024, files: 100000 }, // 1TB in MB
  }

  const currentLimit = planLimits[userPlan]

  const handleFileUpload = (event) => {
    const uploadedFiles = Array.from(event.target.files)

    // Check file limit
    if (files.length + uploadedFiles.length > currentLimit.files) {
      alert(`File limit exceeded. Your ${userPlan} plan allows up to ${currentLimit.files} files.`)
      return
    }

    setIsUploading(true)
    setUploadProgress(0)

    uploadedFiles.forEach((file, index) => {
      const interval = setInterval(() => {
        setUploadProgress((prev) => {
          const newProgress = prev + Math.random() * 15
          if (newProgress >= 100) {
            clearInterval(interval)

            const newFile = {
              id: Date.now() + Math.random(),
              name: file.name,
              size: (file.size / (1024 * 1024)).toFixed(1) + " MB",
              type: file.name.split(".").pop().toLowerCase(),
              uploadDate: new Date().toISOString().split("T")[0],
              starred: false,
              shared: false,
            }

            setFiles((prev) => [newFile, ...prev])

            if (index === uploadedFiles.length - 1) {
              setTimeout(() => {
                setIsUploading(false)
                setUploadProgress(0)
              }, 500)
            }

            return 100
          }
          return newProgress
        })
      }, 100)
    })

    event.target.value = ""
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()

    const droppedFiles = e.dataTransfer.files
    if (droppedFiles.length > 0) {
      const fakeEvent = {
        target: { files: droppedFiles },
      }
      handleFileUpload(fakeEvent)
    }
  }

  const handleDeleteFile = (fileId) => {
    setFiles((prev) => prev.filter((file) => file.id !== fileId))
    setSelectedFiles((prev) => prev.filter((id) => id !== fileId))
  }

  const handleBulkDelete = () => {
    if (selectedFiles.length === 0) return
    if (window.confirm(`Delete ${selectedFiles.length} selected files?`)) {
      setFiles((prev) => prev.filter((file) => !selectedFiles.includes(file.id)))
      setSelectedFiles([])
    }
  }

  const toggleStar = (fileId) => {
    setFiles((prev) => prev.map((file) => (file.id === fileId ? { ...file, starred: !file.starred } : file)))
  }

  const toggleFileSelection = (fileId) => {
    setSelectedFiles((prev) => (prev.includes(fileId) ? prev.filter((id) => id !== fileId) : [...prev, fileId]))
  }

  const handleDownloadFile = (file) => {
    let blob, mimeType

    switch (file.type.toLowerCase()) {
      case "pdf":
        const pdfContent = `%PDF-1.4
1 0 obj
<<
/Type /Catalog
/Pages 2 0 R
>>
endobj

2 0 obj
<<
/Type /Pages
/Kids [3 0 R]
/Count 1
>>
endobj

3 0 obj
<<
/Type /Page
/Parent 2 0 R
/MediaBox [0 0 612 792]
/Contents 4 0 R
/Resources <<
/Font <<
/F1 5 0 R
>>
>>
>>
endobj

4 0 obj
<<
/Length 44
>>
stream
BT
/F1 12 Tf
100 700 Td
(Hello from ${file.name}!) Tj
ET
endstream
endobj

5 0 obj
<<
/Type /Font
/Subtype /Type1
/BaseFont /Helvetica
>>
endobj

xref
0 6
0000000000 65535 f 
0000000009 00000 n 
0000000058 00000 n 
0000000115 00000 n 
0000000274 00000 n 
0000000369 00000 n 
trailer
<<
/Size 6
/Root 1 0 R
>>
startxref
456
%%EOF`
        blob = new Blob([pdfContent], { type: "application/pdf" })
        break

      case "jpg":
      case "jpeg":
      case "png":
      case "gif":
        const canvas = document.createElement("canvas")
        canvas.width = 200
        canvas.height = 200
        const ctx = canvas.getContext("2d")
        ctx.fillStyle = "#4f46e5"
        ctx.fillRect(0, 0, 200, 200)
        ctx.fillStyle = "white"
        ctx.font = "16px Arial"
        ctx.textAlign = "center"
        ctx.fillText(file.name, 100, 100)

        canvas.toBlob((canvasBlob) => {
          const url = URL.createObjectURL(canvasBlob)
          const link = document.createElement("a")
          link.href = url
          link.download = file.name
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)
          URL.revokeObjectURL(url)
        }, `image/${file.type}`)
        return

      case "txt":
        blob = new Blob(
          [`This is the content of ${file.name}\nFile size: ${file.size}\nUpload date: ${file.uploadDate}`],
          { type: "text/plain" },
        )
        break

      default:
        blob = new Blob(
          [`File: ${file.name}\nSize: ${file.size}\nUpload Date: ${file.uploadDate}\nType: ${file.type}`],
          { type: "text/plain" },
        )
    }

    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = file.name
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const getFileIcon = (type) => {
    const iconProps = { size: 32 }
    switch (type) {
      case "pdf":
        return <File {...iconProps} className="file-icon-pdf" />
      case "jpg":
      case "jpeg":
      case "png":
      case "gif":
        return <File {...iconProps} className="file-icon-image" />
      case "doc":
      case "docx":
        return <File {...iconProps} className="file-icon-doc" />
      case "pptx":
      case "ppt":
        return <File {...iconProps} className="file-icon-ppt" />
      case "mp4":
      case "avi":
      case "mov":
        return <File {...iconProps} className="file-icon-video" />
      case "zip":
      case "rar":
        return <File {...iconProps} className="file-icon-archive" />
      default:
        return <File {...iconProps} className="file-icon-default" />
    }
  }

  const FileCard = ({ file }) => {
    const isSelected = selectedFiles.includes(file.id)

    if (viewMode === "list") {
      return (
        <div className={`file-list-item ${isSelected ? "selected" : ""}`}>
          <input
            type="checkbox"
            checked={isSelected}
            onChange={() => toggleFileSelection(file.id)}
            className="file-checkbox"
          />
          <div className="file-list-content">
            <div className="file-icon-container">{getFileIcon(file.type)}</div>
            <div className="file-info">
              <h3 className="file-name">{file.name}</h3>
              <p className="file-details">
                {file.size} • {file.uploadDate}
              </p>
            </div>
          </div>
          <div className="file-actions">
            <button
              className={`action-btn star-btn ${file.starred ? "starred" : ""}`}
              title={file.starred ? "Unstar" : "Star"}
              onClick={() => toggleStar(file.id)}
            >
              <Star size={18} fill={file.starred ? "currentColor" : "none"} />
            </button>
            <button className="action-btn preview-btn" title="Preview" onClick={() => setShowFilePreview(file)}>
              <Eye size={18} />
            </button>
            <button className="action-btn download-btn" title="Download" onClick={() => handleDownloadFile(file)}>
              <Download size={18} />
            </button>
            <button className="action-btn delete-btn" title="Delete" onClick={() => handleDeleteFile(file.id)}>
              <Trash2 size={18} />
            </button>
          </div>
        </div>
      )
    }

    return (
      <div className={`file-card ${isSelected ? "selected" : ""}`}>
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => toggleFileSelection(file.id)}
          className="file-checkbox-card"
        />
        <div className="file-card-header">
          <div className="file-icon-container">{getFileIcon(file.type)}</div>
          <div className="file-card-actions">
            <button
              className={`star-btn-card ${file.starred ? "starred" : ""}`}
              onClick={() => toggleStar(file.id)}
              title={file.starred ? "Unstar" : "Star"}
            >
              <Star size={16} fill={file.starred ? "currentColor" : "none"} />
            </button>
            <button className="delete-btn-card" onClick={() => handleDeleteFile(file.id)} title="Delete file">
              <Trash2 size={16} />
            </button>
          </div>
        </div>
        <div className="file-card-body">
          <h3 className="file-name">{file.name}</h3>
          <p className="file-size">{file.size}</p>
          <p className="file-date">{file.uploadDate}</p>
        </div>
        <div className="file-card-footer">
          <button className="preview-btn-card" onClick={() => setShowFilePreview(file)}>
            <Eye size={16} />
            Preview
          </button>
          <button className="download-btn-card" onClick={() => handleDownloadFile(file)}>
            <Download size={16} />
            Download
          </button>
        </div>
      </div>
    )
  }

  let filteredFiles = files.filter((file) => {
    const matchesSearch = file.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === "all" || file.type.toLowerCase() === filterType.toLowerCase()
    return matchesSearch && matchesType
  })

  filteredFiles = [...filteredFiles].sort((a, b) => {
    switch (sortBy) {
      case "name":
        return a.name.localeCompare(b.name)
      case "size":
        return Number.parseFloat(b.size) - Number.parseFloat(a.size)
      case "date":
      default:
        return new Date(b.uploadDate) - new Date(a.uploadDate)
    }
  })

  const totalSize = files.reduce((acc, file) => {
    const size = Number.parseFloat(file.size.replace(" MB", ""))
    return acc + size
  }, 0)

  const fileTypes = ["all", ...new Set(files.map((f) => f.type))]

  return (
    <div className="dashboard">
      {/* Navigation */}
      <nav className="navbar">
        <div className="navbar-content">
          <button onClick={() => navigate("homepage")} className="navbar-brand navbar-brand-btn">
            <Cloud className="navbar-logo" size={28} />
            <span className="navbar-title">CloudStorage</span>
          </button>

          <div className="navbar-user">
            {user?.role === "admin" && (
              <button onClick={() => navigate("admin")} className="admin-panel-btn">
                <Shield size={16} />
                Admin Panel
              </button>
            )}
            <div className="plan-badge">
              {userPlan !== "free" && <Crown size={16} />}
              <span>{userPlan.charAt(0).toUpperCase() + userPlan.slice(1)} Plan</span>
            </div>
            <div className="user-profile">
              <img src={user?.avatar || "/placeholder.svg"} alt={user?.name} className="user-avatar" />
              <div className="user-info">
                <span className="user-name">{user?.name}</span>
                <span className="user-email">{user?.email}</span>
              </div>
            </div>
            <button
              className="logout-btn"
              onClick={() => {
                setUser(null)
                navigate("homepage")
              }}
              title="Sign Out"
            >
              <LogOut size={20} />
            </button>
          </div>
        </div>
      </nav>

      <div className="main-content">
        {/* Header */}
        <div className="dashboard-header">
          <div className="welcome-section">
            <h1 className="page-title">Welcome back, {user?.name}!</h1>
            <p className="page-subtitle">Manage your files easily and securely</p>
          </div>

          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon stat-icon-files">
                <File size={24} />
              </div>
              <div className="stat-info">
                <h3>Total Files</h3>
                <p className="stat-number">{files.length}</p>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon stat-icon-storage">
                <Cloud size={24} />
              </div>
              <div className="stat-info">
                <h3>Used Storage</h3>
                <p className="stat-number">{totalSize.toFixed(1)} MB</p>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon stat-icon-folders">
                <Folder size={24} />
              </div>
              <div className="stat-info">
                <h3>Available</h3>
                <p className="stat-number">{(currentLimit.storage - totalSize).toFixed(1)} MB</p>
              </div>
            </div>
          </div>

          {userPlan === "free" && (
            <div className="upgrade-banner">
              <div className="upgrade-content">
                <h3>Upgrade to Premium</h3>
                <p>Get 100GB storage and unlimited features</p>
              </div>
              <button onClick={() => navigate("pricing")} className="upgrade-btn">
                Upgrade Now
              </button>
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="controls-panel">
          <div className="controls-left">
            <button className="upload-btn" onClick={() => fileInputRef.current?.click()}>
              <Plus size={20} />
              Upload Files
            </button>
            <input ref={fileInputRef} type="file" multiple onChange={handleFileUpload} className="file-input-hidden" />
            {selectedFiles.length > 0 && (
              <button className="bulk-delete-btn" onClick={handleBulkDelete}>
                <Trash2 size={20} />
                Delete ({selectedFiles.length})
              </button>
            )}
          </div>

          <div className="controls-right">
            <div className="search-container">
              <Search className="search-icon" size={20} />
              <input
                type="text"
                placeholder="Search files..."
                className="search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="filter-dropdown">
              <Filter className="filter-icon-small" size={18} />
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="filter-select-small"
              >
                {fileTypes.map((type) => (
                  <option key={type} value={type}>
                    {type === "all" ? "All Types" : type.toUpperCase()}
                  </option>
                ))}
              </select>
            </div>

            <div className="sort-dropdown">
              <SortAsc className="sort-icon-small" size={18} />
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="sort-select-small">
                <option value="date">Date</option>
                <option value="name">Name</option>
                <option value="size">Size</option>
              </select>
            </div>

            <div className="view-toggle">
              <button
                className={`view-btn ${viewMode === "grid" ? "active" : ""}`}
                onClick={() => setViewMode("grid")}
                title="Grid"
              >
                <Grid size={20} />
              </button>
              <button
                className={`view-btn ${viewMode === "list" ? "active" : ""}`}
                onClick={() => setViewMode("list")}
                title="List"
              >
                <List size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Upload Progress */}
        {isUploading && (
          <div className="upload-progress">
            <div className="progress-info">
              <Upload size={20} />
              <span>Uploading files... {Math.round(uploadProgress)}%</span>
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${uploadProgress}%` }}></div>
            </div>
          </div>
        )}

        <div className="drag-drop-zone" onDragOver={handleDragOver} onDrop={handleDrop}>
          <Upload size={48} />
          <p>Drag and drop files here or click to upload</p>
          <button onClick={() => fileInputRef.current?.click()} className="drag-drop-btn">
            Choose Files
          </button>
        </div>

        {/* Files Section */}
        <div className="files-section">
          <div className="section-header">
            <h2 className="section-title">My Files</h2>
            <span className="files-count">{filteredFiles.length} files</span>
          </div>

          {filteredFiles.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">
                <Cloud size={64} />
              </div>
              <h3 className="empty-title">
                {searchTerm || filterType !== "all" ? "No files found" : "No uploaded files"}
              </h3>
              <p className="empty-description">
                {searchTerm || filterType !== "all"
                  ? "Try changing your search or filter"
                  : "Upload your first file to get started"}
              </p>
              {!searchTerm && filterType === "all" && (
                <button className="empty-action-btn" onClick={() => fileInputRef.current?.click()}>
                  <Upload size={20} />
                  Upload Files
                </button>
              )}
            </div>
          ) : (
            <div className={`files-container ${viewMode === "grid" ? "files-grid" : "files-list"}`}>
              {filteredFiles.map((file) => (
                <FileCard key={file.id} file={file} />
              ))}
            </div>
          )}
        </div>
      </div>

      {showFilePreview && (
        <div className="modal-overlay" onClick={() => setShowFilePreview(null)}>
          <div className="preview-modal" onClick={(e) => e.stopPropagation()}>
            <div className="preview-header">
              <h3>{showFilePreview.name}</h3>
              <button onClick={() => setShowFilePreview(null)} className="modal-close">
                ×
              </button>
            </div>
            <div className="preview-body">
              <div className="preview-icon-large">{getFileIcon(showFilePreview.type)}</div>
              <div className="preview-details">
                <p>
                  <strong>Type:</strong> {showFilePreview.type.toUpperCase()}
                </p>
                <p>
                  <strong>Size:</strong> {showFilePreview.size}
                </p>
                <p>
                  <strong>Uploaded:</strong> {showFilePreview.uploadDate}
                </p>
                <p>
                  <strong>Starred:</strong> {showFilePreview.starred ? "Yes" : "No"}
                </p>
              </div>
            </div>
            <div className="preview-footer">
              <button onClick={() => handleDownloadFile(showFilePreview)} className="preview-download-btn">
                <Download size={16} />
                Download
              </button>
              <button onClick={() => setShowFilePreview(null)} className="preview-close-btn">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Dashboard
