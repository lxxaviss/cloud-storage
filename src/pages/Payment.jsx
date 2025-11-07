"use client"

import { useState } from "react"
import { Cloud, CreditCard, Lock, ArrowLeft, CheckCircle } from "lucide-react"
import { useApp } from "../App"

const Payment = () => {
  const { navigate, user, setUserPlan, selectedPlan } = useApp()
  const [isProcessing, setIsProcessing] = useState(false)
  const [cardType, setCardType] = useState({ type: "", icon: "" })
  const [paymentData, setPaymentData] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    name: "",
  })

  const planId = selectedPlan || "premium"

  const planDetails = {
    premium: {
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
    },
    business: {
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
  }

  const currentPlan = planDetails[planId]

  const getCardType = (cardNumber) => {
    const number = cardNumber.replace(/\s/g, "")
    if (number.startsWith("4")) return { type: "Visa", icon: "💳", color: "#1a1f71" }
    if (
      number.startsWith("5") ||
      (number.startsWith("2") && number.length >= 2 && number.substring(0, 2) >= "22" && number.substring(0, 2) <= "27")
    ) {
      return { type: "MasterCard", icon: "💳", color: "#eb001b" }
    }
    if (number.startsWith("3")) return { type: "American Express", icon: "💳", color: "#006fcf" }
    if (number.startsWith("6")) return { type: "Discover", icon: "💳", color: "#ff6000" }
    return { type: "", icon: "", color: "" }
  }

  const handleCardNumberChange = (e) => {
    const value = e.target.value
      .replace(/\D/g, "")
      .replace(/(\d{4})(?=\d)/g, "$1 ")
      .substring(0, 19)
    setPaymentData({ ...paymentData, cardNumber: value })
    setCardType(getCardType(value))
  }

  const handleExpiryChange = (e) => {
    const value = e.target.value
      .replace(/\D/g, "")
      .replace(/(\d{2})(?=\d)/, "$1/")
      .substring(0, 5)
    setPaymentData({ ...paymentData, expiryDate: value })
  }

  const handleCvvChange = (e) => {
    const value = e.target.value.replace(/\D/g, "").substring(0, 4)
    setPaymentData({ ...paymentData, cvv: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsProcessing(true)

    // Simulate payment processing
    setTimeout(() => {
      setUserPlan(planId)
      setIsProcessing(false)
      navigate("receipt", { planId, paymentData })
    }, 3000)
  }

  if (!currentPlan) {
    return (
      <div className="payment-page">
        <div className="container">
          <div className="error-message">
            <h2>Plan not found</h2>
            <button onClick={() => navigate("pricing")} className="nav-btn nav-btn-primary">
              Back to Pricing
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="payment-page">
      {/* Header */}
      <header className="header">
        <nav className="navbar">
          <div className="nav-container">
            <div className="nav-brand">
              <Cloud className="nav-logo" size={28} />
              <span className="nav-title">CloudStorage</span>
            </div>
            <div className="nav-menu">
              <button onClick={() => navigate("pricing")} className="nav-link">
                <ArrowLeft size={16} />
                Back to Pricing
              </button>
            </div>
          </div>
        </nav>
      </header>

      <div className="payment-container">
        <div className="payment-content">
          <div className="payment-summary">
            <h2 className="payment-title">Order Summary</h2>
            <div className="plan-summary">
              <h3 className="plan-name">{currentPlan.name} Plan</h3>
              <div className="plan-price">{currentPlan.price}</div>
              <div className="plan-storage">{currentPlan.storage}</div>

              <div className="plan-features">
                <h4>What's included:</h4>
                {currentPlan.features.map((feature, index) => (
                  <div key={index} className="feature-item">
                    <CheckCircle size={16} />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="payment-form-container">
            <h2 className="payment-title">Payment Details</h2>
            <form onSubmit={handleSubmit} className="payment-form">
              <div className="form-group">
                <label className="form-label">Cardholder Name</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="John Doe"
                  value={paymentData.name}
                  onChange={(e) => setPaymentData({ ...paymentData, name: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Card Number</label>
                <div className="input-container">
                  <CreditCard className="input-icon" size={20} />
                  <input
                    type="text"
                    className="form-input card-input"
                    placeholder="1234 5678 9012 3456"
                    value={paymentData.cardNumber}
                    onChange={handleCardNumberChange}
                    required
                  />
                  {cardType.type && (
                    <div className="card-type" style={{ color: cardType.color }}>
                      <span className="card-type-icon">{cardType.icon}</span>
                      <span className="card-type-text">{cardType.type}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Expiry Date</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="MM/YY"
                    value={paymentData.expiryDate}
                    onChange={handleExpiryChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">CVV</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="123"
                    value={paymentData.cvv}
                    onChange={handleCvvChange}
                    required
                  />
                </div>
              </div>

              <div className="security-notice">
                <Lock size={16} />
                <span>Your payment information is secure and encrypted</span>
              </div>

              <button type="submit" className="payment-btn" disabled={isProcessing}>
                {isProcessing ? (
                  <>
                    <div className="loading-spinner"></div>
                    Processing Payment...
                  </>
                ) : (
                  `Pay ${currentPlan.price}`
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Payment
