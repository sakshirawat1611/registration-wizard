import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { stepOneSchema } from '../schema'
import { FaArrowRight } from 'react-icons/fa'

function StepOne({ formData, handleChange, nextStep }) {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(stepOneSchema),
        defaultValues: {
            firstName: formData.firstName,
            lastName: formData.lastName,
            dateOfBirth: formData.dateOfBirth
        }
    })
    const onSubmit = (data) => {
        handleChange('firstName', data.firstName)
        handleChange('lastName', data.lastName)
        handleChange('dateOfBirth', data.dateOfBirth)
        nextStep()
    }
    return (
    <div className="step-container">
      <h2 className="step-title">Personal Information</h2>

      <div className="form-group">
        <label className="form-label">First Name</label>
        <input
          className="form-input"
          type="text"
          {...register('firstName')}
        />
        {errors.firstName && <p className="error-text">{errors.firstName.message}</p>}
      </div>

      <div className="form-group">
        <label className="form-label">Last Name</label>
        <input
          className="form-input"
          type="text"
          {...register('lastName')} />
          {errors.lastName && <p className="error-text">{errors.lastName.message}</p>}
      </div>

      <div className="form-group">
        <label className="form-label">Date of Birth</label>
        <input
          className="form-input"
          type="date"
          {...register('dateOfBirth')}
          />
        {errors.dateOfBirth && <p className="error-text">{errors.dateOfBirth.message}</p>}
      </div>

      <div className="button-group">
        <button className="btn-next" onClick={handleSubmit(onSubmit)}>Next <FaArrowRight /></button>
      </div>
    </div>
  )
}

export default StepOne