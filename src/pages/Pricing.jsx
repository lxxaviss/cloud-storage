"use client"

import { Cloud, CheckCircle, ArrowLeft } from "lucide-react"
import { useApp } from "../App"

const Pricing = () => {
  const { navigate, user, setUserPlan } = useApp()

  const plans = [
    {
      id: "free",
      name: "Basic",
      price: "Free",
      storage: "5 GB",
      features: ["5 GB cloud storage", "Sync on 3 devices", "Basic support", "File encryption"],
    },
    {
      id: "premium",
      name: "Premium",
      price: "$9.99/month",
      storage: "100 GB",
      features: [
        "100 GB cloud storage",
        "Unlimited sync",
        "Priority support",
        "Advanced encryption",
        "File version history",
        "Team collaboration",
      ],
      popular: true,
    },
    {
      id: "business",
      name: "Business",
      price: "$29.99/month",
      storage: "1 TB",
      features: [
        "1 TB cloud storage",
        "Team features",
        "Admin panel",
        "API access",
        "Advanced analytics",
        "24/7 support",
      ],
    },
  ]

  const handleSelectPlan = (planId) => {
    if (planId === "free") {
      setUserPlan("free")
      if (user) {
        navigate("dashboard")
      } else {
        navigate("register")
      }
    } else {
      // Navigate to payment page for premium plans
      navigate("payment", { planId })
    }
  }

  return (
    <div className="pricing-page">
      {/* Header */}
      <header className="header">
        <nav className="navbar">
          <div className="nav-container">
            <div className="nav-brand">
              <Cloud className="nav-logo" size={28} />
              <span className="nav-title">CloudStorage</span>
            </div>
            <div className="nav-menu">
              <button onClick={() => navigate("homepage")} className="nav-link">
                <ArrowLeft size={16} />
                Back to Home
              </button>
              {user ? (
                <button onClick={() => navigate("dashboard")} className="nav-btn nav-btn-primary">
                  Dashboard
                </button>
              ) : (
                <>
                  <button onClick={() => navigate("login")} className="nav-btn nav-btn-outline">
                    Sign In
                  </button>
                  <button onClick={() => navigate("register")} className="nav-btn nav-btn-primary">
                    Get Started
                  </button>
                </>
              )}
            </div>
          </div>
        </nav>
      </header>

      {/* Pricing Section */}
      <section className="pricing">
        <div className="container">
          <div className="section-header">
            <h1 className="section-title">Choose Your Plan</h1>
            <p className="section-description">Flexible pricing plans for any need</p>
          </div>

          <div className="pricing-grid">
            {plans.map((plan) => (
              <div key={plan.id} className={`pricing-card ${plan.popular ? "pricing-card-popular" : ""}`}>
                {plan.popular && <div className="pricing-badge">Most Popular</div>}
                <div className="pricing-header">
                  <h3 className="pricing-title">{plan.name}</h3>
                  <div className="pricing-price">{plan.price}</div>
                  <div className="pricing-storage">{plan.storage}</div>
                </div>
                <div className="pricing-features">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="pricing-feature">
                      <CheckCircle size={16} />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
                <button
                  className={`pricing-btn ${plan.popular ? "pricing-btn-primary" : "pricing-btn-outline"}`}
                  onClick={() => handleSelectPlan(plan.id)}
                >
                  {plan.id === "free" ? "Get Started Free" : "Choose Plan"}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Pricing
