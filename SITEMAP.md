# Swiftly AI English Tutor - Sitemap & Navigation Flow

## 🗺️ Complete Site Structure

```
/                           (Landing Page)
├── /auth/
│   └── anonymous/          (Anonymous Auth Page)
├── /quiz                   (Quiz Container)
├── /voice/                 (Voice Assessment Hub)
│   ├── accept/            (Voice Call Interface)
│   ├── skip/              (Skip Assessment)
│   │   └── confirmation/  (Skip Confirmation)
│   └── results/           (Call Results & Analysis)
├── /payment/              (Subscription Plans)
├── /payment-processing/   (Payment Processing)
├── /email/                (Email Collection - redirects to /auth/anonymous)
├── /terms/                (Terms of Service)
├── /privacy/              (Privacy Policy)
├── /error/                (Error Page)
└── /test/                 (Test Page)
```

## 🔄 Navigation Flow Diagram

### Primary User Journey

```mermaid
graph TD
    A[/ - Landing Page] --> B[createAnonymousSession]
    B --> C[/quiz - Quiz Container]

    C --> D{Quiz Question Type}
    D -->|Regular Question| E[Next Question]
    D -->|Question with redirect| F[/voice - Voice Assessment Hub]
    D -->|Final Question| G[/payment?type=test]

    F --> H{User Choice}
    H -->|Accept| I[/voice/accept - Call Interface]
    H -->|Skip| J[/voice/skip]

    I --> K[Voice Call Session]
    K --> L[/voice/results - Call Results]

    J --> M[/voice/skip/confirmation]
    M --> N[/quiz?q=15 - Continue Quiz]

    L --> O[/payment?type=voice]
    G --> P[/payment - Subscription Plans]
    O --> P
    P --> Q[/payment-processing - Payment Processing]
```

### Detailed Page-by-Page Navigation

## 📄 Page Navigation Details

### **/ (Landing Page)**

- **Purpose**: Welcome screen and entry point
- **Navigation**:
  - `Get Started!` button → `createAnonymousSession()` → `/quiz`

### **/auth/anonymous (Anonymous Auth)**

- **Purpose**: Authentication fallback
- **Navigation**:
  - `Go Home` link → `/`
  - Auto-redirects authenticated users

### **/quiz (Quiz Container)**

- **Purpose**: Interactive questionnaire
- **Navigation**:
  - `Continue` button → Next question (`/quiz?q={n+1}`)
  - Question with `redirect: '/voice'` → `/voice`
  - Final question → `/payment?type=test`
  - **Dynamic routing**: Uses `?q=` parameter for question number

### **/voice (Voice Assessment Hub)**

- **Purpose**: Voice assessment introduction
- **Navigation**:
  - `Skip` button → `/voice/skip`
  - `Get Started` button → `/voice/accept`

### **/voice/accept (Voice Call Interface)**

- **Purpose**: Live voice conversation with AI
- **Navigation**:
  - Unauthenticated users → `redirect('/auth/anonymous')`
  - Call completion → `/voice/results`
  - **Features**: Real-time voice call, transcription, AI feedback

### **/voice/skip (Skip Assessment)**

- **Purpose**: Option to skip voice assessment
- **Navigation**:
  - `Continue` button → `/voice/skip/confirmation`

### **/voice/skip/confirmation (Skip Confirmation)**

- **Purpose**: Confirmation of skipping assessment
- **Navigation**:
  - `Continue to Quiz` button → `/quiz?q=15`

### **/voice/results (Call Results)**

- **Purpose**: Display voice assessment results and analysis
- **Navigation**:
  - `Unlock Full Analysis` button → `/payment?type=voice`
  - Error states → `Start New Session` → `/voice`
  - **Features**: 4-stage results flow, detailed metrics, vocabulary analysis

### **/payment (Subscription Plans)**

- **Purpose**: Subscription plan selection
- **Navigation**:
  - `Get My Plan` button → `/payment-processing?plan={planName}`
  - `Terms of Service` link → `/terms`
  - `Privacy Policy` link → `/privacy`
  - **Query Parameters**:
    - `?type=voice` - Shows voice metrics summary
    - `?type=test` - Shows vocabulary stats summary

### **/payment-processing (Payment Processing)**

- **Purpose**: Payment processing (currently shows error message)
- **Navigation**:
  - Currently displays failure message
  - **Query Parameters**: `?plan={planName}`

### **/terms (Terms of Service)**

- **Purpose**: Legal terms
- **Navigation**:
  - `info@swiftly.ai` mailto link

### **/privacy (Privacy Policy)**

- **Purpose**: Privacy policy
- **Navigation**:
  - `info@swiftly.ai` mailto link

### **/error (Error Page)**

- **Purpose**: Error handling
- **Navigation**:
  - `Try Anonymous Access` → `/auth/anonymous`
  - `Go Home` → `/`

### **/email (Email Collection)**

- **Purpose**: Email collection (legacy)
- **Navigation**:
  - Auto-redirects → `/auth/anonymous`

## 🎯 Key User Paths

### **Path 1: Complete Voice Assessment**

```
/ → /quiz → /voice → /voice/accept → /voice/results → /payment
```

### **Path 2: Skip Voice Assessment**

```
/ → /quiz → /voice → /voice/skip → /voice/skip/confirmation → /quiz?q=15 → /payment
```

### **Path 3: Quiz Only**

```
/ → /quiz → [multiple questions] → /payment?type=test
```

## 🔐 Authentication Flow

- **Entry Point**: `/` creates anonymous session
- **Protected Routes**: `/voice/accept` requires authentication
- **Fallback**: Unauthenticated users redirected to `/auth/anonymous`
- **Session Creation**: `createAnonymousSession()` in `/lib/auth/actions.ts`

## 📊 Analytics Integration

- **PostHog Events Tracked**:
  - `user_started_quiz` - Quiz initiation
  - `user_opened_payment_page` - Payment page views
  - `user_initialized_payment` - Payment processing

## 🎨 Design Consistency

- **Theme**: Light blue gradient (`from-blue-100 to-white`)
- **Components**: Consistent card design with backdrop blur
- **Loading States**: Reusable `<Loader />` component
- **Animations**: Framer Motion throughout

## 🔄 State Management

- **Quiz State**: Zustand store (`/store/quiz.tsx`)
- **Call Polling**: Custom hook (`/hooks/useCallPolling`)
- **URL Parameters**: Next.js `useSearchParams()` with Suspense boundaries
