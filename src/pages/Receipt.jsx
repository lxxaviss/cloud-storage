"use client"

import { Cloud, CheckCircle, Download, ArrowRight, Crown, Shield, Zap, Users } from "lucide-react"
import { useApp } from "../App"

const Receipt = () => {
  const { navigate, user, selectedPlan } = useApp()

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
      benefits: [
        {
          icon: <Shield size={20} />,
          title: "Advanced Security",
          description: "256-bit encryption for all your files",
        },
        { icon: <Zap size={20} />, title: "Priority Support", description: "Get help when you need it most" },
        { icon: <Users size={20} />, title: "Team Collaboration", description: "Share and collaborate with your team" },
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
      benefits: [
        {
          icon: <Crown size={20} />,
          title: "Business Features",
          description: "Advanced admin panel and team management",
        },
        {
          icon: <Shield size={20} />,
          title: "Enterprise Security",
          description: "Top-tier security for your business",
        },
        { icon: <Zap size={20} />, title: "24/7 Support", description: "Round-the-clock premium support" },
      ],
    },
  }

  const currentPlan = planDetails[selectedPlan] || planDetails.premium
  const receiptNumber = `CS-${Date.now().toString().slice(-8)}`
  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  const downloadReceipt = () => {
    const receiptContent = `
CLOUDSTORAGE RECEIPT
====================

Receipt #: ${receiptNumber}
Date: ${currentDate}
Customer: ${user?.name || "User"}
Email: ${user?.email || "user@example.com"}

PLAN DETAILS
============
Plan: ${currentPlan.name}
Price: ${currentPlan.price}
Storage: ${currentPlan.storage}


FEATURES INCLUDED
=================
${currentPlan.features.map((feature) => `• ${feature}`).join("\n")}

Thank you for choosing CloudStorage!
Visit us at: https://cloudstorage.com
Support: support@cloudstorage.com

This receipt serves as proof of purchase.
    `

    const blob = new Blob([receiptContent], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `CloudStorage_Receipt_${receiptNumber}.txt`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="receipt-page">
      {/* Header */}
      <header className="header">
        <nav className="navbar">
          <div className="nav-container">
            <div className="nav-brand">
              <Cloud className="nav-logo" size={28} />
              <span className="nav-title">CloudStorage</span>
            </div>
          </div>
        </nav>
      </header>

      <div className="receipt-container">
        <div className="receipt-content">
          {/* Success Message */}
          <div className="success-header">
            <div className="success-icon">
              <CheckCircle size={64} />
            </div>
            <h1 className="success-title">Payment Successful!</h1>
            <p className="success-subtitle">Welcome to {currentPlan.name} plan</p>
          </div>

          {/* Receipt Details */}
          <div className="receipt-card">
            <div className="receipt-header">
              <h2>Receipt</h2>
              <div className="receipt-info">
                <p>
                  <strong>Receipt #:</strong> {receiptNumber}
                </p>
                <p>
                  <strong>Date:</strong> {currentDate}
                </p>
              </div>
            </div>

            <div className="receipt-details">
              <div className="customer-info">
                <h3>Customer Information</h3>
                <p>
                  <strong>Name:</strong> {user?.name || "User"}
                </p>
                <p>
                  <strong>Email:</strong> {user?.email || "user@example.com"}
                </p>
              </div>

              <div className="plan-info">
                <h3>Plan Details</h3>
                <div className="plan-item">
                  <div className="plan-item-details">
                    <h4>{currentPlan.name} Plan</h4>
                    <p>{currentPlan.storage} storage</p>
                  </div>
                  <div className="plan-item-price">
                    <strong>{currentPlan.price}</strong>
                  </div>
                </div>
              </div>

              <div className="receipt-total">
                <div className="total-line">
                  <span>Subtotal:</span>
                  <span>{currentPlan.price}</span>
                </div>
                <div className="total-line">
                  <span>Tax:</span>
                  <span>$0.00</span>
                </div>
                <div className="total-line total-final">
                  <span>
                    <strong>Total:</strong>
                  </span>
                  <span>
                    <strong>{currentPlan.price}</strong>
                  </span>
                </div>
              </div>
            </div>

            <div className="receipt-actions">
              <button onClick={downloadReceipt} className="download-receipt-btn">
                <Download size={16} />
                Download Receipt
              </button>
            </div>
          </div>

          {/* New Features */}
          <div className="features-unlocked">
            <h2>🎉 Features Unlocked</h2>
            <div className="benefits-grid">
              {currentPlan.benefits.map((benefit, index) => (
                <div key={index} className="benefit-card">
                  <div className="benefit-icon">{benefit.icon}</div>
                  <div className="benefit-content">
                    <h3>{benefit.title}</h3>
                    <p>{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* What's Next */}
          <div className="next-steps">
            <h2>What's Next?</h2>
            <div className="steps-grid">
              <div className="step-card">
                <div className="step-number">1</div>
                <div className="step-content">
                  <h3>Access Your Dashboard</h3>
                  <p>Start uploading and managing your files with your new plan features</p>
                </div>
              </div>
              <div className="step-card">
                <div className="step-number">2</div>
                <div className="step-content">
                  <h3>Explore New Features</h3>
                  <p>Try out team collaboration, file versioning, and advanced security</p>
                </div>
              </div>
              <div className="step-card">
                <div className="step-number">3</div>
                <div className="step-content">
                  <h3>Get Support</h3>
                  <p>Contact our priority support team if you need any assistance</p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="receipt-footer">
            <button onClick={() => navigate("dashboard")} className="dashboard-btn">
              Go to Dashboard
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Receipt
