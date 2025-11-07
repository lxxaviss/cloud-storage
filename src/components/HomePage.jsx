"use client"
import {
  Cloud,
  Shield,
  Zap,
  Users,
  Upload,
  Download,
  Lock,
  Smartphone,
  Globe,
  Star,
  CheckCircle,
  ArrowRight,
} from "lucide-react"
import "../styles/HomePage.css"

const Homepage = ({ onNavigate }) => {
  const features = [
    {
      icon: <Shield size={32} />,
      title: "Безопасность",
      description: "Ваши файлы защищены современным 256-битным шифрованием и многоуровневой системой безопасности",
    },
    {
      icon: <Zap size={32} />,
      title: "Быстрота",
      description: "Молниеносная загрузка и синхронизация файлов благодаря современной облачной инфраструктуре",
    },
    {
      icon: <Users size={32} />,
      title: "Совместная работа",
      description: "Легко делитесь файлами и работайте в команде с удобными инструментами совместного доступа",
    },
    {
      icon: <Smartphone size={32} />,
      title: "Мобильность",
      description: "Доступ к вашим файлам с любого устройства в любое время и в любом месте",
    },
    {
      icon: <Globe size={32} />,
      title: "Глобальность",
      description: "Серверы по всему миру обеспечивают быстрый доступ к данным из любой точки планеты",
    },
    {
      icon: <Lock size={32} />,
      title: "Приватность",
      description: "Только вы имеете доступ к своим файлам. Мы не сканируем и не анализируем ваш контент",
    },
  ]

  const plans = [
    {
      name: "Базовый",
      price: "Бесплатно",
      storage: "5 ГБ",
      features: [
        "5 ГБ облачного хранилища",
        "Синхронизация на 3 устройствах",
        "Базовая поддержка",
        "Шифрование файлов",
      ],
    },
    {
      name: "Премиум",
      price: "299₽/мес",
      storage: "100 ГБ",
      features: [
        "100 ГБ облачного хранилища",
        "Неограниченная синхронизация",
        "Приоритетная поддержка",
        "Расширенное шифрование",
        "История версий файлов",
        "Совместная работа",
      ],
      popular: true,
    },
    {
      name: "Бизнес",
      price: "999₽/мес",
      storage: "1 ТБ",
      features: [
        "1 ТБ облачного хранилища",
        "Командные функции",
        "Административная панель",
        "API доступ",
        "Расширенная аналитика",
        "24/7 поддержка",
      ],
    },
  ]

  const stats = [
    { number: "10M+", label: "Пользователей" },
    { number: "500TB", label: "Данных сохранено" },
    { number: "99.9%", label: "Время работы" },
    { number: "150+", label: "Стран" },
  ]

  return (
    <div className="homepage">
      {/* Header */}
      <header className="header">
        <nav className="navbar">
          <div className="nav-container">
            <div className="nav-brand">
              <Cloud className="nav-logo" size={28} />
              <span className="nav-title">CloudStorage</span>
            </div>
            <div className="nav-menu">
              <a href="#features" className="nav-link">
                Возможности
              </a>
              <a href="#pricing" className="nav-link">
                Тарифы
              </a>
              <a href="#about" className="nav-link">
                О нас
              </a>
              <button className="nav-btn nav-btn-outline" onClick={() => onNavigate("login")}>
                Войти
              </button>
              <button className="nav-btn nav-btn-primary" onClick={() => onNavigate("login")}>
                Начать
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-background">
          <div className="hero-shapes">
            <div className="hero-shape hero-shape-1"></div>
            <div className="hero-shape hero-shape-2"></div>
            <div className="hero-shape hero-shape-3"></div>
          </div>
        </div>

        <div className="hero-container">
          <div className="hero-content">
            <h1 className="hero-title">
              Ваше <span className="hero-highlight">облачное</span> хранилище
              <br />
              нового поколения
            </h1>
            <p className="hero-description">
              Безопасно храните, синхронизируйте и делитесь файлами из любой точки мира. Простое и надежное решение для
              всех ваших данных с современным интерфейсом.
            </p>
            <div className="hero-actions">
              <button className="hero-btn hero-btn-primary" onClick={() => onNavigate("login")}>
                <Upload size={20} />
                Начать бесплатно
              </button>
              <button
                className="hero-btn hero-btn-secondary"
                onClick={() => {
                  document.getElementById("features").scrollIntoView({ behavior: "smooth" })
                }}
              >
                <Star size={20} />
                Узнать больше
              </button>
            </div>
            <div className="hero-stats">
              {stats.map((stat, index) => (
                <div key={index} className="hero-stat">
                  <div className="hero-stat-number">{stat.number}</div>
                  <div className="hero-stat-label">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-card">
              <div className="hero-card-header">
                <div className="hero-card-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <span className="hero-card-title">CloudStorage</span>
              </div>
              <div className="hero-card-content">
                <div className="hero-file">
                  <div className="hero-file-icon hero-file-icon-pdf"></div>
                  <div className="hero-file-info">
                    <div className="hero-file-name">Документ.pdf</div>
                    <div className="hero-file-size">2.4 MB</div>
                  </div>
                  <div className="hero-file-action">
                    <Download size={16} />
                  </div>
                </div>
                <div className="hero-file">
                  <div className="hero-file-icon hero-file-icon-image"></div>
                  <div className="hero-file-info">
                    <div className="hero-file-name">Фото.jpg</div>
                    <div className="hero-file-size">3.2 MB</div>
                  </div>
                  <div className="hero-file-action">
                    <Download size={16} />
                  </div>
                </div>
                <div className="hero-file">
                  <div className="hero-file-icon hero-file-icon-video"></div>
                  <div className="hero-file-info">
                    <div className="hero-file-name">Видео.mp4</div>
                    <div className="hero-file-size">15.8 MB</div>
                  </div>
                  <div className="hero-file-action">
                    <Download size={16} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Почему выбирают CloudStorage?</h2>
            <p className="section-description">
              Мы предоставляем все необходимые инструменты для безопасной работы с файлами
            </p>
          </div>

          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="how-it-works">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Как это работает?</h2>
            <p className="section-description">Всего три простых шага для начала работы с облачным хранилищем</p>
          </div>

          <div className="steps">
            <div className="step">
              <div className="step-number">1</div>
              <div className="step-content">
                <h3 className="step-title">Регистрация</h3>
                <p className="step-description">Создайте бесплатный аккаунт за несколько секунд</p>
              </div>
            </div>

            <div className="step-arrow">
              <ArrowRight size={24} />
            </div>

            <div className="step">
              <div className="step-number">2</div>
              <div className="step-content">
                <h3 className="step-title">Загрузка</h3>
                <p className="step-description">Загружайте файлы простым перетаскиванием</p>
              </div>
            </div>

            <div className="step-arrow">
              <ArrowRight size={24} />
            </div>

            <div className="step">
              <div className="step-number">3</div>
              <div className="step-content">
                <h3 className="step-title">Доступ везде</h3>
                <p className="step-description">Получайте доступ к файлам с любого устройства</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="pricing">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Выберите подходящий тариф</h2>
            <p className="section-description">Гибкие тарифные планы для любых потребностей</p>
          </div>

          <div className="pricing-grid">
            {plans.map((plan, index) => (
              <div key={index} className={`pricing-card ${plan.popular ? "pricing-card-popular" : ""}`}>
                {plan.popular && <div className="pricing-badge">Популярный</div>}
                <div className="pricing-header">
                  <h3 className="pricing-title">{plan.name}</h3>
                  <div className="pricing-price">{plan.price}</div>
                  <div className="pricing-storage">{plan.storage}</div>
                </div>
                <div className="pricing-features">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="pricing-feature">
                      <CheckCircle size={16} />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
                <button
                  className={`pricing-btn ${plan.popular ? "pricing-btn-primary" : "pricing-btn-outline"}`}
                  onClick={() => onNavigate("login")}
                >
                  Выбрать план
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Готовы начать?</h2>
            <p className="cta-description">
              Присоединяйтесь к миллионам пользователей, которые доверяют нам свои данные
            </p>
            <button className="cta-btn" onClick={() => onNavigate("login")}>
              <Upload size={20} />
              Создать аккаунт бесплатно
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-brand">
              <div className="footer-logo">
                <Cloud size={24} />
                <span>CloudStorage</span>
              </div>
              <p className="footer-description">Современное облачное хранилище для безопасной работы с файлами</p>
            </div>

            <div className="footer-links">
              <div className="footer-column">
                <h4>Продукт</h4>
                <a href="#features">Возможности</a>
                <a href="#pricing">Тарифы</a>
                <a href="#security">Безопасность</a>
              </div>

              <div className="footer-column">
                <h4>Компания</h4>
                <a href="#about">О нас</a>
                <a href="#careers">Карьера</a>
                <a href="#contact">Контакты</a>
              </div>

              <div className="footer-column">
                <h4>Поддержка</h4>
                <a href="#help">Помощь</a>
                <a href="#docs">Документация</a>
                <a href="#status">Статус</a>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <p>&copy; 2024 CloudStorage. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Homepage
