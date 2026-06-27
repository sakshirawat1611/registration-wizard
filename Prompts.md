# Prompts.md — AI Debugging & Learning Sessions

## Sprint 4: Registration Wizard
**Engineering Residency | Mentor: Mr. Nakul**

---

## How I Used AI This Sprint

This document records my AI-assisted learning sessions during Sprint 4. As per the sprint's AI policy, I used Claude as a strict mentor — not to copy code, but to understand concepts before writing them myself. Every line in this repository was typed and understood by me personally.

---

## Session Overview

### My Opening Prompt

> "I want you to be my mentor and help me complete this project by guiding me throughout it. I want you to suggest YouTube videos for the critical and key important concepts, tell me where I am wrong, and explain each and every concept to make this project successful."

Claude agreed to act as a strict mentor with a specific working style — concept-first explanations, targeted line-level guidance rather than full file rewrites, and professional standards throughout.

---

## How the Mentorship Sessions Worked

Before writing a single line of code, Claude asked me four foundational questions:

1. Where should `formData` live — in the parent or in a child component? Why?
2. Where should `currentStep` live?
3. If StepOne has an input for `firstName`, how does typing in that input update the parent's state?
4. If `formData` lives in the parent and I navigate Step 1 to Step 2 and click Back, what happens to the firstName value?

I did not know all the answers at first. Claude explained each one using real analogies — like comparing the parent component to a Google Form that holds all answers across sections. Only after I understood the concept and could explain it back in my own words did we move to writing code.

This pattern repeated throughout the project. After every new concept, Claude would ask me a question. If I answered correctly we moved forward. If I did not know, Claude explained it and asked again. We never wrote code before the concept was clear.

---

## Key Prompts and Learning Moments

### Phase 1 — State Lifting and Conditional Rendering

**My prompt:**
> "I don't know, tell me the answers."

Claude explained that `formData` must live in the parent because child components unmount when you navigate away from them and all their local state is lost. The parent never unmounts, so it is the safe place to store data.

**Concept I learned:** State lifting — moving state up to the nearest common ancestor so multiple children can read and update it.

**My prompt after explanation:**
> "So when the DOM switches to another step, data will remain stored and can be fetched whenever required."

Claude confirmed this was correct and added a small precision — the data does not get fetched, it gets passed down as props. The parent always holds it.

**YouTube resource Claude suggested:** Codevolution — React Lifting State Up

---

### Understanding the Spread Operator

**Claude asked me:**
> "What do you think `...prev` does?"

**My answer:**
> "To keep the previous data and to not erase it."

Claude confirmed this was exactly right. The spread operator copies all existing fields into the new object and only updates the one field that changed.

---

### Understanding the && Operator

**Claude asked me:**
> "What do you think this line means in plain English? `{currentStep === 1 && <StepOne />}`"

**My answer:**
> "Step 1."

Claude smiled and gave the full explanation — the `&&` operator means if the left side is true, show the right side. If currentStep is 2, the left side is false so StepOne never renders. This is how we simulate multiple pages without React Router.

---

### Understanding the ! Not Operator

**Claude asked me:**
> "What does `!` mean in front of `/[A-Z]/.test(value)`?"

**My answer:**
> "! stands for not operator."

Claude confirmed this was correct. `!/[A-Z]/.test(value)` means — if it is NOT true that the value contains an uppercase letter, show the error.

---

### Understanding && in isFormValid

**Claude asked me:**
> "What do you think `&&` means here between each condition?"

**My answer:**
> "When both conditions are true then we can proceed, otherwise stop."

Claude confirmed — all conditions must be true simultaneously. If even one fails, `isFormValid` returns false and the Next button stays disabled.

---

## Phase 3 — Zod and react-hook-form (The Hardest Part)

Phase 3 was the most challenging part of the entire sprint. Zod was a completely new concept to me and I had never worked with schema-based validation before.

### What Made It Hard

Before Phase 3 I was manually writing `if` statements inside a `validate` function to check every field. When Claude introduced Zod, the idea of defining rules in a separate `schema.js` file and having them automatically connect to the form felt very unfamiliar.

I spent extra time on YouTube watching Codevolution's react-hook-form and Zod playlist before the concepts clicked. The `refine` method for comparing password and confirmPassword was particularly confusing — I did not understand at first why you needed a separate `.refine()` call just for that check.

### Prompts I Used During Phase 3

**My prompt:**
> "We need to install two new libraries. What command do you think we use to install them?"

I remembered from installing react-icons that it followed the `npm install` pattern and answered correctly.

**My prompt when I was stuck on Zod:**
> "I idk"

Claude broke it down step by step — first explaining what `z.string()` does, then `.min()`, then `.regex()`, then finally `.refine()` for cross-field comparison. Each method was explained before the next was introduced.

### Mistakes I Made in Phase 3

**Mistake 1 — Extra comma breaking method chain**

I added a comma after the special character regex line which broke the entire password schema. The correct pattern for chaining Zod methods is no commas between them:

```js
// Wrong — comma breaks the chain
.regex(/[!@#$%^&*]/, 'Must contain a special character'),
.regex(/[0-9]/, 'Must contain a number'),

// Correct — chained methods have no commas between them
.regex(/[!@#$%^&*]/, 'Must contain a special character')
.regex(/[0-9]/, 'Must contain a number'),
```

**Mistake 2 — Duplicate error message in StepTwo**

I accidentally kept both the old manual error paragraph and the new react-hook-form error paragraph for the email field. This caused a React error because the old one was trying to render an object instead of a string. Claude identified this from the console error and I removed the duplicate line.

**Mistake 3 — Forgetting to add onSubmit to StepThree props**

The success page was not showing after submit because I had `onSubmit` in the function parameter list but had not passed it from App.jsx. Claude asked me to paste the component and spotted the missing prop immediately.

**Mistake 4 — Password rules using wrong condition**

The uppercase and special character list items were checking `watchPassword.length >= 8` instead of the correct regex. This meant all three rules turned green just from length alone. Claude caught this when I pasted the StepTwo code.

---

## Bugs Debugged With AI Assistance

| Bug | Error Message | Root Cause | Fix |
|---|---|---|---|
| Success page not showing | No error, alert showing instead | `onSubmit` not called in handleSubmit | Added `onSubmit()` call and passed prop from App.jsx |
| Objects not valid as React child | React DOM error in console | Rendering `errors.email` object instead of `errors.email.message` | Added `.message` to all error renders |
| handleChange is not a function | TypeError in StepOne | resetKey remounting caused prop loss | Added unique key strings per step |
| Password rules all green immediately | Visual bug | Wrong condition on list items | Replaced length check with correct regex |
| Zod chain broken | Schema not validating | Extra comma between chained methods | Removed comma between `.regex()` calls |

---

## Professional Decisions Made During the Sprint

These were design and UX decisions I suggested myself during the session:

- Password requirements should appear only when the user starts typing — not before
- Requirements list should be left aligned with bullet points, not centered
- Show and Hide button should use a professional eye icon, not text
- The review page should show dots for the password, not the actual value
- The success page should greet the user by their first name
- A Reset button should be available at every step in red to signal a destructive action
- Dark mode toggle should have a hover scale effect to feel interactive

---

## YouTube Channels Used

- **Codevolution** — react-hook-form full playlist, Zod validation, lifting state up, conditional rendering
- **Traversy Media** — React form validation, real-time onChange patterns
- **Web Dev Simplified** — React Fragments explained
- **Kevin Powell** — CSS Flexbox layout, responsive design
- **CodeWithHarry** — A whole web development playlist for the all concepts with the projects making videos available for easy understanding.

---

## What I Learned About CMD This Sprint

Every terminal operation in this project was done through Windows Command Prompt — no GUI tools. This included:

- `mkdir` to create folders
- `echo.` to create empty files
- `npm create vite@latest` to scaffold the project
- `npm install` to add packages
- `npm run dev` to start the dev server
- `git init`, `git add .`, `git commit`, `git push` for version control
- `gh auth login` and `gh repo create` to manage GitHub entirely from terminal
- `vercel` CLI for deployment

Console.log was used throughout development to verify the form data object was updating correctly at each step before the success flow was connected.

---

## Summary

Phase 1 and Phase 2 came together smoothly because the foundational concepts of state lifting and controlled inputs were explained and tested through questions before any code was written.

Phase 3 was the real challenge. Zod was completely new and the schema pattern felt abstract at first. Getting stuck on the `.refine()` method and the comma bug cost significant time. But overcoming it was the most valuable learning of the sprint — because react-hook-form and Zod are the actual tools used in production codebases at companies like Razorpay, Zepto, and CRED.

Every mistake in this project is documented above because the mistakes are where the real learning happened.
