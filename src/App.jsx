import { useState } from 'react'
import StepOne from './components/StepOne'
import StepTwo from './components/StepTwo'
import StepThree from './components/StepThree'
import './App.css'
import { FaSun, FaMoon } from 'react-icons/fa'
import SuccessPage from './components/SuccessPage'

function App() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [resetKey, setResetKey] = useState(0)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const nextStep = () => {
    setCurrentStep(prev => prev + 1)
  }

  const prevStep = () => {
    setCurrentStep(prev => prev - 1)
  }
  const handleReset = () => {
    setIsSubmitted(false)
    setCurrentStep(1)
    setResetKey(prev => prev + 1)
    setFormData({
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      email: '',
      password: '',
      confirmPassword: ''
    })
  }
  return (
    <div className={isDarkMode ? 'wizard-container dark' : 'wizard-container'}>
      <div className="theme-toggle">
        <button className="reset-btn" onClick={handleReset}>Reset</button>
        <button className="toggle-theme-btn" onClick={() => setIsDarkMode(!isDarkMode)}>
          {isDarkMode ? <FaSun /> : <FaMoon />}
        </button>
      </div>
      {isSubmitted ? (
        <SuccessPage onReset={handleReset} firstName={formData.firstName} />
      ) : (
      <>
      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{ width: `${(currentStep / 3) * 100}%` }}>
        </div>
      </div>
      <p className="progress-text">Step {currentStep} of 3</p>
      <div className="step-labels">
        <span className={currentStep >= 1 ? 'step-label active' : 'step-label'}>Personal Info</span>
        <span className={currentStep >= 2 ? 'step-label active' : 'step-label'}>Account Details</span>
        <span className={currentStep >= 3 ? 'step-label active' : 'step-label'}>Review</span>
      </div>
      {currentStep === 1 && <StepOne key={`step1-${resetKey}`} formData={formData} handleChange={handleChange} nextStep={nextStep} />}
      {currentStep === 2 && <StepTwo key={`step2-${resetKey}`} formData={formData} handleChange={handleChange} nextStep={nextStep} prevStep={prevStep} />}
      {currentStep === 3 && <StepThree key={`step3-${resetKey}`} formData={formData} prevStep={prevStep} onSubmit={() => setIsSubmitted(true)} />}
      </>
      )}
    </div>
  )
}

export default App