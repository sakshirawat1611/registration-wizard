# Registration Wizard — Sprint 4

A multi-step registration form built with React and Vite as part of an engineering residency sprint. This project simulates a real-world SaaS onboarding flow with enterprise-grade form architecture, client-side validation, and a clean professional UI.

---

## Live Demo

Deployed on Vercel — (https://registration-wizard-black.vercel.app/)

GitHub Repository: https://github.com/sakshirawat1611/registration-wizard

---

## Project Overview

Modern enterprise applications never overwhelm users with a single massive form. This project breaks down user data collection into three focused steps using conditional rendering and lifted state — a pattern used in fintech, SaaS, and banking applications worldwide.

The wizard collects personal information, account credentials, and presents a full review before submission. Every field is validated in real time using Zod schema validation connected to react-hook-form.

---

## Features

- Three-step wizard with smooth navigation
- State lifted to parent so data persists across steps
- Real-time validation on every field using Zod and react-hook-form
- Password strength requirements shown dynamically as user types
- Show and hide password toggle using react-icons eye icon
- Progress bar that fills across steps with percentage calculation
- Step labels showing Personal Info, Account Details, and Review
- Review page showing all entered data before submission
- Password shown as dots on review page for security
- Success page with personalised welcome greeting using the user's first name
- Start Over reset button that clears all fields and returns to Step 1
- Dark and light mode toggle with smooth transition
- Responsive design that works on mobile and desktop
- Arrow icons on Next and Back buttons
- Back button retains previously entered data

---

## Tech Stack

| Technology | Purpose |
|---|---|
| React 19 | UI component architecture |
| Vite | Development server and build tool |
| react-hook-form | Enterprise form state management |
| Zod | Schema-based validation |
| @hookform/resolvers | Connects Zod schema to react-hook-form |
| react-icons | Professional icon library (eye, arrows, moon, sun) |
| CSS (vanilla) | Custom styling with responsive design |
| GitHub CLI | Repository creation and push via command line |
| Vercel | Deployment |

---

## Project Structure

```
registration-wizard/
├── src/
│   ├── components/
│   │   ├── StepOne.jsx        # Personal info form with react-hook-form
│   │   ├── StepTwo.jsx        # Account details with password validation
│   │   ├── StepThree.jsx      # Review and submit page
│   │   └── SuccessPage.jsx    # Post-submission success screen
│   ├── App.jsx                # Parent component holding all lifted state
│   ├── App.css                # All styles including dark mode
│   ├── schema.js              # Zod validation schemas for each step
│   ├── index.css              # Global reset and root styles
│   └── main.jsx               # React DOM entry point
├── public/
├── package.json
└── README.md
```

---

## Key Concepts Learned

### State Lifting
All form data lives in the parent `App.jsx` component inside a single `formData` object. Child components (StepOne, StepTwo, StepThree) never own the data — they receive it as props and update it via a `handleChange` function passed down from the parent. This ensures data survives when components unmount during step navigation.

### Conditional Rendering with &&
Each step renders only when `currentStep` matches its number. The `&&` operator in JSX means — if the left side is true, render the right side. If false, render nothing. This is how a single-page app simulates multiple views without React Router.

```jsx
{currentStep === 1 && <StepOne />}
{currentStep === 2 && <StepTwo />}
{currentStep === 3 && <StepThree />}
```

### React Fragments
When the ternary operator needed to return multiple sibling elements in the false branch, wrapping them in a `<div>` would break the layout. React Fragments (`<>` and `</>`) solve this by grouping elements without adding any extra node to the DOM.

```jsx
{isSubmitted ? <SuccessPage /> : (
  <>
    <ProgressBar />
    <StepOne />
  </>
)}
```

### Zod Schema Validation
Instead of writing manual if-else validation logic for every field, Zod lets you define all rules in one place as a schema. This is the industry standard for type-safe validation in enterprise React applications.

```js
export const stepTwoSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Must contain an uppercase letter')
    .regex(/[!@#$%^&*]/, 'Must contain a special character')
    .regex(/[0-9]/, 'Must contain a number'),
  confirmPassword: z.string()
}).refine(data => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword']
})
```

### react-hook-form
Replaced manual useState for each input with react-hook-form's `register` function. This reduces re-renders significantly and isolates form state from component state — the recommended architecture for production forms.

The `watch` function from react-hook-form was used to observe the password field in real time and drive the colour-coded requirements list.

### Spread Operator in State Updates
When updating a single field in `formData`, the spread operator `...prev` copies all existing fields first so no data is lost.

```js
setFormData(prev => ({ ...prev, [field]: value }))
```

### Regex Validation
Regular expressions were used to validate password strength in real time. `/[A-Z]/` checks for uppercase letters, `/[!@#$%^&*]/` checks for special characters, and `/[0-9]/` checks for digits.

### Progress Bar Calculation
The progress bar width is calculated dynamically based on the current step.

```jsx
style={{ width: `${(currentStep / 3) * 100}%` }}
```

Step 1 fills 33%, Step 2 fills 66%, Step 3 fills 100%.

---

## Development Approach

### Clean Code Focus
Every component has a single clear responsibility. StepOne handles personal info, StepTwo handles credentials, StepThree handles review. State and validation logic are separated from JSX. CSS class names are semantic and consistent throughout.

### Command Prompt Usage
All project setup, file creation, package installation, Git operations, and deployment were performed through Windows Command Prompt. This included using `mkdir` and `echo` for file creation, `npm` for package management, `git` for version control, and `gh` (GitHub CLI) for repository creation and push — all without touching a GUI. Console.log was used throughout development to verify form data payload at each step before wiring up the success flow.

Practising CMD throughout this project built confidence with intermediate-level terminal operations including path navigation, command chaining, and reading CLI output to debug issues.

### Console-Driven Debugging Approach
Throughout development, `console.log()` was used strategically at every stage to verify data flow before wiring up the UI. After each step navigation, the full `formData` object was logged to confirm state was updating correctly. On final submission, the complete payload was logged to the console before the success screen was connected. This approach of verifying data in the console before building the visual layer is a professional debugging habit used in real engineering teams.
---

## YouTube Resources

| Concept | Channel | Search Term |
|---|---|---|
| Lifting State Up | Codevolution | React Lifting State Up |
| Conditional Rendering | Codevolution | React Conditional Rendering |
| Controlled Inputs and Forms | Net Ninja | React Forms Tutorial |
| onChange Validation | Traversy Media | React Form Validation |
| react-hook-form | Codevolution | React Hook Form Tutorial |
| Zod with react-hook-form | Codevolution | Zod Validation React Hook Form |
| CSS Flexbox for layout | Kevin Powell | Flexbox CSS Tutorial |
| React Fragments | Web Dev Simplified | React Fragments Explained |

For Web Development : CodeWithHarry

---

## AI Debugging Sessions

Documented in `Prompts.md` as required by the sprint AI policy. AI was used strictly to explain concepts and debug error messages — no code was copied directly. Every line committed to this repository was typed and understood by the developer.

---

## Phases Completed

- Phase 1 — Base MVP and State Architecture (P0) ✅
- Phase 2 — Client-Side Validation and UX Polish (P1) ✅
- Phase 3 — Enterprise Form Architecture with react-hook-form and Zod (P2) ✅

---

## Sprint Submitted By

Sakshi Rawat
Engineering Residency — Sprint 4
Mentor: Mr. Nakul
