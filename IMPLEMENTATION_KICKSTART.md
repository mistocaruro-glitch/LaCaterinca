# Mistocaru.ro - Implementation Kickstart Plan

## Project Overview

**Platform:** Prank call entertainment platform (Romanian market)
**Scope:** Frontend-only MVP with mock data (backend integration later)
**Stack:** Next.js 16, TypeScript, Tailwind CSS, shadcn/ui

---

## Phase 1: Foundation & Design System

### 1.1 Theme Configuration
- [ ] Configure "Midnight Rogue" dark theme in `globals.css`
  - Primary: Deep purple/violet accents
  - Background: Dark charcoal/near-black
  - Surface: Glassmorphism cards with backdrop-blur
  - Text: High-contrast whites and muted grays
  - Accent: Neon/electric highlights for CTAs

### 1.2 Typography Setup
- [ ] Configure Google Fonts in `layout.tsx`
  - Headings: Bold, modern sans-serif (e.g., Inter, Manrope)
  - Body: Clean, readable sans-serif
- [ ] Define text scale with Tailwind classes

### 1.3 Component Library Extensions
- [ ] Create glassmorphism card component (`components/glass-card.tsx`)
- [ ] Create gradient button variants
- [ ] Create animated icon components for steps

---

## Phase 2: Layout & Navigation

### 2.1 Root Layout (`app/layout.tsx`)
- [ ] Dark theme setup with proper meta tags
- [ ] Font configuration
- [ ] SEO metadata (Romanian language)

### 2.2 Header Component (`components/header.tsx`)
- [ ] Logo: "Mistocaru" with phone icon
- [ ] Navigation: Cum Funcționează, Prețuri, FAQ
- [ ] Auth buttons: Conectare, Înregistrare (mock state)
- [ ] Mobile hamburger menu

### 2.3 Footer Component (`components/footer.tsx`)
- [ ] Copyright text
- [ ] Quick links
- [ ] Social media icons (optional)

---

## Phase 3: Landing Page (`app/page.tsx`)

### 3.1 Hero Section
- [ ] Headline: "Sună-ți Prietenii cu Farse Epice"
- [ ] Subheadline with value proposition
- [ ] Primary CTA: "Începe Acum" button
- [ ] Secondary CTA: "Vezi Cum Funcționează"
- [ ] Animated phone/prank illustration or mockup

### 3.2 "Cum Funcționează" Section
- [ ] 3-step visual process:
  1. "Alege Personajul" - Character grid icon
  2. "Introdu Numărul" - Phone input icon
  3. "Te pui pe râs" - Laughter/play icon
- [ ] Animated step indicators
- [ ] Brief descriptions for each step

### 3.3 Pricing Section (`components/pricing-section.tsx`)
- [ ] 3-tier pricing grid:
  - **Începător** - 15 RON / 3 credite
  - **Popular** - 35 RON / 8 credite (highlighted)
  - **Maestru** - 60 RON / 15 credite
- [ ] Feature list per tier
- [ ] "Garanția Fără Țeapă" badge (auto-refund for <10s calls)
- [ ] CTA buttons linking to checkout (mock)

### 3.4 FAQ Section (`components/faq-section.tsx`)
- [ ] Accordion component with questions:
  - Ce este Mistocaru?
  - Cum funcționează sistemul de credite?
  - Ce este "Garanția Fără Țeapă"?
  - Este legal să folosesc Mistocaru?
  - Cum primesc înregistrarea?

### 3.5 Final CTA Section
- [ ] Compelling headline
- [ ] Large "Începe Prima Farsă" button
- [ ] Trust indicators (if any)

---

## Phase 4: Prank Configuration Flow

### 4.1 New Prank Page (`app/farse/nou/page.tsx`)

#### Step 1: Character Selection
- [ ] Avatar grid component (`components/prank/character-grid.tsx`)
  - 6-12 character cards with:
    - Avatar image/illustration
    - Name (e.g., "Țiganul Vesel", "Polițistul Strict")
    - Audio preview button (mock)
  - Selection highlight state
  - Hover effects with glassmorphism

#### Step 2: Phone Input
- [ ] Phone input component (`components/prank/phone-input.tsx`)
  - Romanian flag + "+40" prefix (fixed)
  - 9-digit input with formatting
  - Validation feedback
  - "Victim" name input (optional)

#### Step 3: Scheduling
- [ ] Schedule selector (`components/prank/schedule-selector.tsx`)
  - Options: Acum, 10 min, 30 min, 1 oră
  - Radio/toggle button group
  - Visual time indicator

#### Step 4: Confirmation
- [ ] Summary card with all selections
- [ ] Credit cost display
- [ ] "Lansează Farsa" CTA button
- [ ] Cancel/back option

### 4.2 Prank Status Page (`app/farse/[id]/page.tsx`)
- [ ] Real-time status display (mock states):
  - "În Așteptare" - Pending
  - "În Desfășurare" - Active call animation
  - "Reușit" - Success with recording
  - "Eșuat" - Failed with refund notice
- [ ] Call duration timer (mock)
- [ ] Recording player (mock audio)
- [ ] Share button ("Distribuie")
- [ ] "Farsă Nouă" CTA

---

## Phase 5: User Profile & History

### 5.1 Profile Page (`app/profil/page.tsx`)
- [ ] User info card (mock data):
  - Avatar
  - Name/email
  - Member since date
- [ ] Credit balance display with "Cumpără Credite" button
- [ ] Quick stats: Total pranks, Success rate

### 5.2 Prank History (`components/profile/prank-history.tsx`)
- [ ] List/grid of past pranks
- [ ] Each item shows:
  - Character avatar
  - Victim name/number (masked)
  - Date/time
  - Status badge (Reușit/Eșuat/În Așteptare)
  - Duration
- [ ] Expandable for recording playback
- [ ] Filter by status (optional)
- [ ] Pagination or infinite scroll

---

## Phase 6: Authentication Pages (Mock UI)

### 6.1 Login Page (`app/conectare/page.tsx`)
- [ ] Email input
- [ ] Password input
- [ ] "Conectare" button
- [ ] "Ai uitat parola?" link
- [ ] "Nu ai cont? Înregistrează-te" link
- [ ] Social login buttons (mock): Google, Facebook

### 6.2 Register Page (`app/inregistrare/page.tsx`)
- [ ] Name input
- [ ] Email input
- [ ] Password input
- [ ] Confirm password
- [ ] Terms acceptance checkbox
- [ ] "Creează Cont" button
- [ ] "Ai deja cont? Conectează-te" link

---

## Phase 7: Checkout Flow (Mock UI)

### 7.1 Checkout Page (`app/checkout/page.tsx`)
- [ ] Selected plan summary
- [ ] Order details (credits, price)
- [ ] Mock payment form:
  - Card number input
  - Expiry date
  - CVV
  - Cardholder name
- [ ] "Finalizează Plata" button
- [ ] Security badges
- [ ] Back to pricing link

### 7.2 Success Page (`app/checkout/succes/page.tsx`)
- [ ] Success animation/icon
- [ ] "Plata a fost procesată cu succes!"
- [ ] Credits added confirmation
- [ ] "Începe Prima Farsă" CTA
- [ ] "Vezi Istoricul" secondary link

---

## Phase 8: Shared Components

### 8.1 UI Components
- [ ] `components/glass-card.tsx` - Glassmorphism container
- [ ] `components/gradient-button.tsx` - Animated CTA buttons
- [ ] `components/status-badge.tsx` - Prank status indicators
- [ ] `components/credit-display.tsx` - Credit balance widget
- [ ] `components/audio-player.tsx` - Recording playback (mock)

### 8.2 Layout Components
- [ ] `components/page-header.tsx` - Consistent page titles
- [ ] `components/section-wrapper.tsx` - Spacing/container
- [ ] `components/mobile-nav.tsx` - Mobile navigation drawer

---

## Phase 9: Mock Data & State

### 9.1 Mock Data Files (`lib/mock-data.ts`)
```typescript
// Characters
export const characters = [...]

// User profile
export const mockUser = {
  id: "1",
  name: "Ion Popescu",
  email: "ion@example.com",
  credits: 5,
  memberSince: "2024-01-15"
}

// Prank history
export const mockPranks = [...]

// Pricing tiers
export const pricingTiers = [...]

// FAQ items
export const faqItems = [...]
```

### 9.2 Client State Management
- [ ] Use React Context for mock auth state
- [ ] Use SWR for data that would be fetched
- [ ] Local state for form flows

---

## Phase 10: Polish & Animations

### 10.1 Micro-interactions
- [ ] Button hover/press states
- [ ] Card hover lift effects
- [ ] Page transitions (optional)
- [ ] Loading skeletons

### 10.2 Accessibility
- [ ] Proper heading hierarchy
- [ ] ARIA labels for interactive elements
- [ ] Focus states for keyboard navigation
- [ ] Color contrast compliance

### 10.3 Responsive Design
- [ ] Mobile-first breakpoints
- [ ] Touch-friendly tap targets
- [ ] Collapsible navigation
- [ ] Stacked layouts on small screens

---

## File Structure

```
app/
├── page.tsx                    # Landing page
├── layout.tsx                  # Root layout
├── globals.css                 # Theme & global styles
├── conectare/
│   └── page.tsx               # Login
├── inregistrare/
│   └── page.tsx               # Register
├── farse/
│   ├── nou/
│   │   └── page.tsx           # New prank wizard
│   └── [id]/
│       └── page.tsx           # Prank status/details
├── profil/
│   └── page.tsx               # User profile & history
├── checkout/
│   ├── page.tsx               # Payment form
│   └── succes/
│       └── page.tsx           # Payment success

components/
├── header.tsx
├── footer.tsx
├── glass-card.tsx
├── gradient-button.tsx
├── status-badge.tsx
├── credit-display.tsx
├── audio-player.tsx
├── pricing-section.tsx
├── faq-section.tsx
├── prank/
│   ├── character-grid.tsx
│   ├── phone-input.tsx
│   └── schedule-selector.tsx
├── profile/
│   └── prank-history.tsx
└── ui/                         # shadcn components

lib/
├── mock-data.ts
└── utils.ts
```

---

## Implementation Order

1. **Foundation** - Theme, fonts, layout, header/footer
2. **Landing Page** - Hero, how it works, pricing, FAQ
3. **Prank Flow** - Character selection, phone input, scheduling, confirmation
4. **Profile** - User info, credit display, prank history
5. **Auth Pages** - Login, register (mock forms)
6. **Checkout** - Payment form, success page
7. **Polish** - Animations, responsive fixes, accessibility

---

## Future Backend Integration (Not in MVP)

- Supabase Auth (email/password, OAuth)
- Supabase Database (users, pranks, credits, transactions)
- Stripe Checkout (payment processing)
- VAPI Agents (voice call execution)
- Vercel Blob (recording storage)

---

## Notes

- All data is mocked for this phase
- Auth state is simulated with React Context
- Payment flow is UI-only (no real transactions)
- Call functionality is represented with mock statuses
- Romanian language throughout (no i18n needed yet)
