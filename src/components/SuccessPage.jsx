import { FaCheckCircle } from 'react-icons/fa'

function SuccessPage({ onReset, firstName }) {
  return (
    <div className="success-container">
      <FaCheckCircle style={{ color: '#16a34a', fontSize: '64px', marginBottom: '20px' }} />
      <h2 className="success-title">Welcome, {firstName}!</h2>
      <p className="success-subtitle">Your registration was successful.</p>
      <button className="btn-next" onClick={onReset}>Start Over</button>
    </div>
  )
}

export default SuccessPage 
