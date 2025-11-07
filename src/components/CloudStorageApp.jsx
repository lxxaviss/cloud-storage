"use client"

import { useState, useRef } from "react"
import {
  Cloud,
  Upload,
  Download,
  File,
  Folder,
  User,
  Lock,
  Mail,
  Eye,
  EyeOff,
  Search,
  Grid,
  List,
  LogOut,
  Plus,
  Trash2,
} from "lucide-react"
import "../styles/CloudStorageApp.css"
import Homepage from "./HomePage"

const CloudStorageApp = () => {
  const [currentView, setCurrentView] = useState("homepage")
  const [user, setUser] = useState(null)
  const [files, setFiles] = useState([
    { id: 1, name: "Документ.pdf", size: "2.4 MB", type: "pdf", uploadDate: "2024-12-15" },
    { id: 2, name: "Презентация.pptx", size: "5.1 MB", type: "pptx", uploadDate: "2024-12-14" },
    { id: 3, name: "Фото.jpg", size: "3.2 MB", type: "jpg", uploadDate: "2024-12-13" },
    { id: 4, name: "Видео.mp4", size: "15.8 MB", type: "mp4", uploadDate: "2024-12-12" },
    { id: 5, name: "Архив.zip", size: "8.2 MB", type: "zip", uploadDate: "2024-12-11" },
  ])
  const [searchTerm, setSearchTerm] = useState("")
  const [viewMode, setViewMode] = useState("grid")
  const [showPassword, setShowPassword] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef(null)

  // Компонент входа и регистрации
  const AuthForm = () => {
    const [isLogin, setIsLogin] = useState(true)
    const [formData, setFormData] = useState({ email: "", password: "", name: "" })
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = (e) => {
      e.preventDefault()
      setIsLoading(true)

      // Имитация загрузки
      setTimeout(() => {
        setUser({
          name: formData.name || "Пользователь",
          email: formData.email,
          avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(formData.name || "User")}&background=4f46e5&color=fff`,
        })
        setCurrentView("dashboard")
        setIsLoading(false)
      }, 1500)
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
            <div className="auth-logo">
              <Cloud size={32} />
            </div>
            <h1 className="auth-title">CloudStorage</h1>
            <p className="auth-subtitle">{isLogin ? "Добро пожаловать обратно!" : "Создайте свой аккаунт"}</p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            {!isLogin && (
              <div className="form-group">
                <label className="form-label">Полное имя</label>
                <div className="input-container">
                  <User className="input-icon" size={20} />
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Введите ваше имя"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
              </div>
            )}

            <div className="form-group">
              <label className="form-label">Email адрес</label>
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
              <label className="form-label">Пароль</label>
              <div className="input-container">
                <Lock className="input-icon" size={20} />
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-input"
                  placeholder="Введите пароль"
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
              {isLoading ? <div className="loading-spinner"></div> : isLogin ? "Войти в аккаунт" : "Создать аккаунт"}
            </button>
          </form>

          <div className="auth-footer">
            <p>
              {isLogin ? "Нет аккаунта?" : "Уже есть аккаунт?"}
              <button type="button" className="auth-switch" onClick={() => setIsLogin(!isLogin)}>
                {isLogin ? "Зарегистрироваться" : "Войти"}
              </button>
            </p>
          </div>
        </div>
      </div>
    )
  }

  // Компонент загрузки файлов
  const handleFileUpload = (event) => {
    const uploadedFiles = Array.from(event.target.files)
    setIsUploading(true)
    setUploadProgress(0)

    uploadedFiles.forEach((file, index) => {
      // Имитация прогресса загрузки
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

  const handleDeleteFile = (fileId) => {
    setFiles((prev) => prev.filter((file) => file.id !== fileId))
  }

  const handleDownloadFile = (file) => {
    // Создаем blob с содержимым файла (для демонстрации)
    const content = `Это содержимое файла: ${file.name}\nРазмер: ${file.size}\nДата загрузки: ${file.uploadDate}`
    const blob = new Blob([content], { type: "text/plain" })
    const url = URL.createObjectURL(blob)

    // Создаем ссылку для скачивания
    const link = document.createElement("a")
    link.href = url
    link.download = file.name
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    // Освобождаем память
    URL.revokeObjectURL(url)
  }

  // Компонент файла
  const FileCard = ({ file }) => {
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

    if (viewMode === "list") {
      return (
        <div className="file-list-item">
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
            <button className="action-btn download-btn" title="Скачать" onClick={() => handleDownloadFile(file)}>
              <Download size={18} />
            </button>
            <button className="action-btn delete-btn" title="Удалить" onClick={() => handleDeleteFile(file.id)}>
              <Trash2 size={18} />
            </button>
          </div>
        </div>
      )
    }

    return (
      <div className="file-card">
        <div className="file-card-header">
          <div className="file-icon-container">{getFileIcon(file.type)}</div>
          <button className="delete-btn-card" onClick={() => handleDeleteFile(file.id)} title="Удалить файл">
            <Trash2 size={16} />
          </button>
        </div>
        <div className="file-card-body">
          <h3 className="file-name">{file.name}</h3>
          <p className="file-size">{file.size}</p>
          <p className="file-date">{file.uploadDate}</p>
        </div>
        <div className="file-card-footer">
          <button className="download-btn-card" onClick={() => handleDownloadFile(file)}>
            <Download size={16} />
            Скачать
          </button>
        </div>
      </div>
    )
  }

  // Главная страница
  const Dashboard = () => {
    const filteredFiles = files.filter((file) => file.name.toLowerCase().includes(searchTerm.toLowerCase()))

    const totalSize = files.reduce((acc, file) => {
      const size = Number.parseFloat(file.size.replace(" MB", ""))
      return acc + size
    }, 0)

    return (
      <div className="dashboard">
        {/* Навигационная панель */}
        <nav className="navbar">
          <div className="navbar-content">
            <div className="navbar-brand">
              <Cloud className="navbar-logo" size={28} />
              <span className="navbar-title">CloudStorage</span>
            </div>

            <div className="navbar-user">
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
                  setCurrentView("login")
                }}
                title="Выйти"
              >
                <LogOut size={20} />
              </button>
            </div>
          </div>
        </nav>

        <div className="main-content">
          {/* Заголовок и статистика */}
          <div className="dashboard-header">
            <div className="welcome-section">
              <h1 className="page-title">Добро пожаловать, {user?.name}!</h1>
              <p className="page-subtitle">Управляйте своими файлами легко и безопасно</p>
            </div>

            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon stat-icon-files">
                  <File size={24} />
                </div>
                <div className="stat-info">
                  <h3>Всего файлов</h3>
                  <p className="stat-number">{files.length}</p>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon stat-icon-storage">
                  <Cloud size={24} />
                </div>
                <div className="stat-info">
                  <h3>Использовано</h3>
                  <p className="stat-number">{totalSize.toFixed(1)} MB</p>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon stat-icon-folders">
                  <Folder size={24} />
                </div>
                <div className="stat-info">
                  <h3>Свободно</h3>
                  <p className="stat-number">{(1000 - totalSize).toFixed(1)} MB</p>
                </div>
              </div>
            </div>
          </div>

          {/* Панель управления */}
          <div className="controls-panel">
            <div className="controls-left">
              <button className="upload-btn" onClick={() => fileInputRef.current?.click()}>
                <Plus size={20} />
                Загрузить файлы
              </button>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                onChange={handleFileUpload}
                className="file-input-hidden"
              />
            </div>

            <div className="controls-right">
              <div className="search-container">
                <Search className="search-icon" size={20} />
                <input
                  type="text"
                  placeholder="Поиск файлов..."
                  className="search-input"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="view-toggle">
                <button
                  className={`view-btn ${viewMode === "grid" ? "active" : ""}`}
                  onClick={() => setViewMode("grid")}
                  title="Сетка"
                >
                  <Grid size={20} />
                </button>
                <button
                  className={`view-btn ${viewMode === "list" ? "active" : ""}`}
                  onClick={() => setViewMode("list")}
                  title="Список"
                >
                  <List size={20} />
                </button>
              </div>
            </div>
          </div>

          {/* Прогресс загрузки */}
          {isUploading && (
            <div className="upload-progress">
              <div className="progress-info">
                <Upload size={20} />
                <span>Загрузка файлов... {Math.round(uploadProgress)}%</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${uploadProgress}%` }}></div>
              </div>
            </div>
          )}

          {/* Список файлов */}
          <div className="files-section">
            <div className="section-header">
              <h2 className="section-title">Мои файлы</h2>
              <span className="files-count">{filteredFiles.length} файлов</span>
            </div>

            {filteredFiles.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">
                  <Cloud size={64} />
                </div>
                <h3 className="empty-title">{searchTerm ? "Файлы не найдены" : "Нет загруженных файлов"}</h3>
                <p className="empty-description">
                  {searchTerm
                    ? "Попробуйте изменить поисковый запрос"
                    : "Загрузите первый файл, чтобы начать работу с облачным хранилищем"}
                </p>
                {!searchTerm && (
                  <button className="empty-action-btn" onClick={() => fileInputRef.current?.click()}>
                    <Upload size={20} />
                    Загрузить файлы
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
      </div>
    )
  }

  // Основной рендер
  if (currentView === "homepage") {
    return <Homepage onNavigate={setCurrentView} />
  }

  if (currentView === "login") {
    return <AuthForm />
  }

  return <Dashboard />
}

export default CloudStorageApp
