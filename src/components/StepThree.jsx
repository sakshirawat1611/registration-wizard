function StepThree({ formData, prevStep, onSubmit }) {
  const handleSubmit = () => {
    console.log('Form Submitted!', formData)
    onSubmit()
  }

  return (
    <div className="step-container">
      <h2 className="step-title">Review & Submit</h2>

      <div className="review-container">
        <div className="review-item">
          <span className="review-label">First Name</span>
          <span className="review-value">{formData.firstName}</span>
        </div>
        <div className="review-item">
          <span className="review-label">Last Name</span>
          <span className="review-value">{formData.lastName}</span>
        </div>
        <div className="review-item">
          <span className="review-label">Date of Birth</span>
          <span className="review-value">{formData.dateOfBirth}</span>
        </div>
        <div className="review-item">
          <span className="review-label">Email</span>
          <span className="review-value">{formData.email}</span>
        </div>
        <div className="review-item">
          <span className="review-label">Password</span>
          <span className="review-value">••••••••</span>
        </div>
      </div>

      <div className="button-group">
        <button className="btn-back" onClick={prevStep}>Back</button>
        <button className="btn-submit" onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  )
}

export default StepThree