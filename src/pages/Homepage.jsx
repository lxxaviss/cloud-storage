"use client"

import { Cloud, Shield, Zap, Users, Upload, Download, Lock, Smartphone, Globe, Star, ArrowRight } from "lucide-react"
import { useApp } from "../App"
import "../styles/HomePage.css"

const Homepage = () => {
  const { navigate } = useApp()

  const features = [
    {
      icon: <Shield size={32} />,
      title: "Security",
      description: "Your files are protected with modern 256-bit encryption and multi-level security systems",
    },
    {
      icon: <Zap size={32} />,
      title: "Speed",
      description: "Lightning-fast file upload and synchronization thanks to modern cloud infrastructure",
    },
    {
      icon: <Users size={32} />,
      title: "Collaboration",
      description: "Easily share files and work in teams with convenient collaboration tools",
    },
    {
      icon: <Smartphone size={32} />,
      title: "Mobility",
      description: "Access your files from any device, anytime, anywhere",
    },
    {
      icon: <Globe size={32} />,
      title: "Global",
      description: "Servers worldwide ensure fast data access from anywhere on the planet",
    },
    {
      icon: <Lock size={32} />,
      title: "Privacy",
      description: "Only you have access to your files. We don't scan or analyze your content",
    },
  ]

  const stats = [
    { number: "10M+", label: "Users" },
    { number: "500TB", label: "Data Stored" },
    { number: "99.9%", label: "Uptime" },
    { number: "150+", label: "Countries" },
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
                Features
              </a>
              <button onClick={() => navigate("pricing")} className="nav-link nav-link-btn">
                Pricing
              </button>
              <a href="#about" className="nav-link">
                About
              </a>
              <button onClick={() => navigate("login")} className="nav-btn nav-btn-outline">
                Sign In
              </button>
              <button onClick={() => navigate("register")} className="nav-btn nav-btn-primary">
                Get Started
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
              Your <span className="hero-highlight">cloud</span> storage
              <br />
              of the future
            </h1>
            <p className="hero-description">
              Securely store, sync, and share files from anywhere in the world. A simple and reliable solution for all
              your data with a modern interface.
            </p>
            <div className="hero-actions">
              <button onClick={() => navigate("register")} className="hero-btn hero-btn-primary">
                <Upload size={20} />
                Start Free
              </button>
              <button
                className="hero-btn hero-btn-secondary"
                onClick={() => {
                  document.getElementById("features").scrollIntoView({ behavior: "smooth" })
                }}
              >
                <Star size={20} />
                Learn More
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
                    <div className="hero-file-name">Document.pdf</div>
                    <div className="hero-file-size">2.4 MB</div>
                  </div>
                  <div className="hero-file-action">
                    <Download size={16} />
                  </div>
                </div>
                <div className="hero-file">
                  <div className="hero-file-icon hero-file-icon-image"></div>
                  <div className="hero-file-info">
                    <div className="hero-file-name">Photo.jpg</div>
                    <div className="hero-file-size">3.2 MB</div>
                  </div>
                  <div className="hero-file-action">
                    <Download size={16} />
                  </div>
                </div>
                <div className="hero-file">
                  <div className="hero-file-icon hero-file-icon-video"></div>
                  <div className="hero-file-info">
                    <div className="hero-file-name">Video.mp4</div>
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
            <h2 className="section-title">Why Choose CloudStorage?</h2>
            <p className="section-description">We provide all the necessary tools for secure file management</p>
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
            <h2 className="section-title">How It Works?</h2>
            <p className="section-description">Just three simple steps to start working with cloud storage</p>
          </div>

          <div className="steps">
            <div className="step">
              <div className="step-number">1</div>
              <div className="step-content">
                <h3 className="step-title">Sign Up</h3>
                <p className="step-description">Create a free account in seconds</p>
              </div>
            </div>

            <div className="step-arrow">
              <ArrowRight size={24} />
            </div>

            <div className="step">
              <div className="step-number">2</div>
              <div className="step-content">
                <h3 className="step-title">Upload</h3>
                <p className="step-description">Upload files with simple drag and drop</p>
              </div>
            </div>

            <div className="step-arrow">
              <ArrowRight size={24} />
            </div>

            <div className="step">
              <div className="step-number">3</div>
              <div className="step-content">
                <h3 className="step-title">Access Everywhere</h3>
                <p className="step-description">Access your files from any device</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Ready to Start?</h2>
            <p className="cta-description">Join millions of users who trust us with their data</p>
            <button onClick={() => navigate("register")} className="cta-btn">
              <Upload size={20} />
              Create Free Account
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
              <p className="footer-description">Modern cloud storage for secure file management</p>
            </div>

            <div className="footer-links">
              <div className="footer-column">
                <h4>Product</h4>
                <a href="#features">Features</a>
                <button onClick={() => navigate("pricing")} className="footer-link-btn">
                  Pricing
                </button>
                <a href="#security">Security</a>
              </div>

              <div className="footer-column">
                <h4>Company</h4>
                <a href="#about">About</a>
                <a href="#careers">Careers</a>
                <a href="#contact">Contact</a>
              </div>

              <div className="footer-column">
                <h4>Support</h4>
                <a href="#help">Help</a>
                <a href="#docs">Documentation</a>
                <a href="#status">Status</a>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <p>&copy; 2024 CloudStorage. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Homepage
