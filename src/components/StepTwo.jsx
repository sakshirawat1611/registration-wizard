import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { stepTwoSchema } from '../schema'
import { useState } from 'react'
import { FaEye, FaEyeSlash, FaArrowRight, FaArrowLeft } from 'react-icons/fa'

function StepTwo({ formData, handleChange, nextStep, prevStep }) {
    const { register, handleSubmit, formState: { errors }, watch } = useForm({
        resolver: zodResolver(stepTwoSchema),
        defaultValues: {
            email: formData.email,
            password: formData.password,
            confirmPassword: formData.confirmPassword
        }
    })
    const onSubmit = (data) => {
        handleChange('email', data.email)
        handleChange('password', data.password)
        handleChange('confirmPassword', data.confirmPassword)
        nextStep()
    }
    const watchPassword = watch('password', '')

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  return (
    <div className="step-container">
      <h2 className="step-title">Account Details</h2>

      <div className="form-group">
        <label className="form-label">Email</label>
        <input
          className="form-input"
          type="email"
          {...register('email')}
        />
        {errors.email && <p className="error-text">{errors.email.message}</p>}
      </div>

      <div className="form-group">
        <label className="form-label">Password</label>
        <div className="input-wrapper">
          <input
            className="form-input"
            type={showPassword ? 'text' : 'password'}
            {...register('password')}
          />
          <button
            className="toggle-btn"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
        <ul className="password-rules" style={{ display: watchPassword.length === 0 ? 'none' : 'block' }}>
          <li style={{ color: watchPassword.length === 0 ? 'grey' : /[A-Z]/.test(watchPassword) ? 'green' : 'red' }}>
            At least one uppercase letter
          </li>
          <li style={{ color: watchPassword.length === 0 ? 'grey' : /[!@#$%^&*]/.test(watchPassword) ? 'green' : 'red' }}>
            At least one special character (!@#$%^&*)
          </li>
          <li style={{ color: watchPassword.length === 0 ? 'grey' : watchPassword.length >= 8 ? 'green' : 'red' }}>
            At least one special character (!@#$%^&*)
          </li>
          <li style={{ color: watchPassword.length === 0 ? 'grey' : /[0-9]/.test(watchPassword) ? 'green' : 'red' }}>
            At least one number (0-9)
          </li>
        </ul>
      </div>

      <div className="form-group">
        <label className="form-label">Confirm Password</label>
        <div className="input-wrapper">
          <input
            className="form-input"
            type={showConfirmPassword ? 'text' : 'password'}
            {...register('confirmPassword')}
          />
          <button
            className="toggle-btn"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
        {errors.confirmPassword && <p className="error-text">{errors.confirmPassword.message}</p>}
        {watchPassword.length > 0 && watch('confirmPassword') && watch('confirmPassword') !== watchPassword && (
          <p className="error-text">Passwords do not match</p>
        )}
      </div>

      <div className="button-group">
        <button className="btn-back" onClick={prevStep}><FaArrowLeft /> Back</button>
        <button className="btn-next" onClick={handleSubmit(onSubmit)}>Next <FaArrowRight /></button>
      </div>
    </div>
  )
}

export default StepTwo