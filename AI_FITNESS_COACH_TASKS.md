# AI FITNESS COACH - DEVELOPMENT TASKS
## Project Roadmap & Task Breakdown

**Project:** AI Fitness Coach  
**Tech Stack:** Next.js 14 + NestJS 10 (Turborepo Monorepo)  
**Timeline:** 8 weeks MVP  
**Last Updated:** March 20, 2026

---

## 📋 TABLE OF CONTENTS

1. [Phase 0: Setup & Infrastructure (Week 1)](#phase-0-setup--infrastructure-week-1)
2. [Phase 1: Authentication & Onboarding (Week 1-2)](#phase-1-authentication--onboarding-week-1-2)
3. [Phase 2: AI Integration & Chat (Week 3-4)](#phase-2-ai-integration--chat-week-3-4)
4. [Phase 3: Workout System (Week 5)](#phase-3-workout-system-week-5)
5. [Phase 4: Nutrition System (Week 6)](#phase-4-nutrition-system-week-6)
6. [Phase 5: Progress Tracking (Week 7)](#phase-5-progress-tracking-week-7)
7. [Phase 6: Payments & Launch (Week 8)](#phase-6-payments--launch-week-8)
8. [Post-MVP Backlog](#post-mvp-backlog)

---

## PHASE 0: Setup & Infrastructure (Week 1)

### 🎯 Goal: Get monorepo running with basic architecture

---

### Task 0.1: Monorepo Setup
**Priority:** 🔴 Critical  
**Estimated Time:** 4 hours  
**Assignee:** DevOps/Lead Dev

#### Subtasks:
- [ ] Initialize Turborepo
  ```bash
  npx create-turbo@latest ai-fitness-coach
  cd ai-fitness-coach
  ```
- [ ] Configure pnpm workspace
  - [ ] Create `pnpm-workspace.yaml`
  - [ ] Configure root `package.json`
- [ ] Setup turbo.json pipeline
  - [ ] Define `build`, `dev`, `lint`, `test` tasks
  - [ ] Configure caching strategy
- [ ] Create folder structure:
  ```
  ai-fitness-coach/
  ├── apps/
  │   ├── web/         # Next.js
  │   └── api/         # NestJS
  ├── packages/
  │   ├── types/       # Shared TypeScript types
  │   ├── ui/          # Shared components (optional)
  │   └── utils/       # Shared utilities
  ├── turbo.json
  ├── pnpm-workspace.yaml
  └── package.json
  ```
- [ ] Test monorepo commands:
  - [ ] `pnpm dev` (runs both apps)
  - [ ] `pnpm build`
  - [ ] `pnpm lint`

**Acceptance Criteria:**
- ✅ Both `apps/web` and `apps/api` run simultaneously
- ✅ Shared packages importable in both apps
- ✅ Turbo caching works (second build is instant)

**Documentation:**
- Document setup process in `README.md`
- Add development commands reference

---

### Task 0.2: Next.js (Frontend) Setup
**Priority:** 🔴 Critical  
**Estimated Time:** 3 hours  
**Assignee:** Frontend Dev

#### Subtasks:
- [ ] Create Next.js app in `apps/web/`
  ```bash
  cd apps/web
  npx create-next-app@latest . --typescript --tailwind --app
  ```
- [ ] Configure TypeScript
  - [ ] Set `strict: true` in `tsconfig.json`
  - [ ] Configure path aliases (`@/components`, `@/lib`, etc.)
- [ ] Setup Tailwind CSS
  - [ ] Configure `tailwind.config.js` with project colors
  - [ ] Add custom color palette:
    ```js
    colors: {
      'red-primary': '#FF3B30',
      'red-hover': '#FF6B6B',
      'dark-bg': '#0A0A0A',
      // ... rest of colors from design system
    }
    ```
- [ ] Install shadcn/ui
  ```bash
  npx shadcn-ui@latest init
  ```
  - [ ] Install components: button, input, card, dialog, toast
- [ ] Setup folder structure:
  ```
  apps/web/src/
  ├── app/              # Next.js App Router
  ├── components/       # React components
  ├── lib/             # Utilities
  ├── styles/          # Global styles
  └── types/           # Local types
  ```
- [ ] Configure ESLint + Prettier
  - [ ] Install and configure
  - [ ] Add pre-commit hook (husky)

**Acceptance Criteria:**
- ✅ Next.js dev server runs on `localhost:3000`
- ✅ Tailwind classes work
- ✅ shadcn/ui button renders correctly
- ✅ TypeScript has no errors

---

### Task 0.3: NestJS (Backend) Setup
**Priority:** 🔴 Critical  
**Estimated Time:** 4 hours  
**Assignee:** Backend Dev

#### Subtasks:
- [ ] Create NestJS app in `apps/api/`
  ```bash
  cd apps/api
  npx @nestjs/cli new . --package-manager pnpm
  ```
- [ ] Configure TypeScript
  - [ ] Set `strict: true`
  - [ ] Configure path aliases
- [ ] Setup modular structure:
  ```
  apps/api/src/
  ├── modules/
  │   ├── auth/
  │   ├── users/
  │   ├── chat/
  │   ├── ai/
  │   ├── workouts/
  │   ├── nutrition/
  │   └── payments/
  ├── common/          # Shared utilities
  ├── config/          # Configuration
  └── main.ts
  ```
- [ ] Install core dependencies:
  ```bash
  pnpm add @nestjs/config @nestjs/jwt @nestjs/passport passport passport-jwt bcrypt
  pnpm add class-validator class-transformer
  pnpm add -D @types/passport-jwt @types/bcrypt
  ```
- [ ] Configure environment variables
  - [ ] Create `.env.example`
  - [ ] Setup ConfigModule
- [ ] Enable CORS for Next.js app
  ```typescript
  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true,
  });
  ```
- [ ] Setup global validation pipe
- [ ] Configure Swagger (API documentation)

**Acceptance Criteria:**
- ✅ NestJS server runs on `localhost:4000`
- ✅ Swagger docs available at `/api/docs`
- ✅ CORS configured correctly
- ✅ Environment variables loaded

---

### Task 0.4: Database Setup (Prisma + PostgreSQL)
**Priority:** 🔴 Critical  
**Estimated Time:** 3 hours  
**Assignee:** Backend Dev

#### Subtasks:
- [ ] Choose database hosting:
  - Option A: Supabase (recommended - includes pgvector for AI)
  - Option B: Railway
  - Option C: Local PostgreSQL (development)
- [ ] Install Prisma in `apps/api/`
  ```bash
  cd apps/api
  pnpm add prisma @prisma/client
  npx prisma init
  ```
- [ ] Configure `schema.prisma`:
  - [ ] Copy schema from PRD
  - [ ] Set up PostgreSQL connection
- [ ] Create initial models:
  - [ ] User
  - [ ] UserProfile
  - [ ] ChatMessage
  - [ ] WorkoutPlan
  - [ ] WorkoutLog
  - [ ] NutritionPlan
  - [ ] WeightLog
  - [ ] StripeEvent
- [ ] Run migration:
  ```bash
  npx prisma migrate dev --name init
  ```
- [ ] Generate Prisma Client:
  ```bash
  npx prisma generate
  ```
- [ ] Create PrismaService in NestJS
- [ ] Test database connection

**Acceptance Criteria:**
- ✅ Database connected successfully
- ✅ All tables created
- ✅ Prisma Studio accessible (`npx prisma studio`)
- ✅ Can create/read test records

**Database Schema Reference:**
```prisma
// See AI_FITNESS_COACH_PRD.md Section 4.3 for full schema
```

---

### Task 0.5: Development Infrastructure
**Priority:** 🟡 High  
**Estimated Time:** 2 hours  
**Assignee:** DevOps

#### Subtasks:
- [ ] Setup Git repository
  - [ ] Initialize Git
  - [ ] Create `.gitignore`
  - [ ] First commit
  - [ ] Push to GitHub
- [ ] Configure environment variables
  - [ ] `.env.local` (frontend)
  - [ ] `.env` (backend)
  - [ ] `.env.example` files for both
- [ ] Setup development scripts in root `package.json`:
  ```json
  {
    "scripts": {
      "dev": "turbo run dev",
      "build": "turbo run build",
      "lint": "turbo run lint",
      "test": "turbo run test",
      "clean": "turbo run clean && rm -rf node_modules"
    }
  }
  ```
- [ ] Configure VSCode workspace settings
  - [ ] Recommended extensions list
  - [ ] TypeScript settings
  - [ ] Prettier/ESLint config
- [ ] Create development README
  - [ ] Setup instructions
  - [ ] Running the project
  - [ ] Environment variables guide
  - [ ] Troubleshooting

**Acceptance Criteria:**
- ✅ `pnpm dev` starts both frontend and backend
- ✅ Environment variables documented
- ✅ README has clear setup instructions

---

## PHASE 1: Authentication & Onboarding (Week 1-2)

### 🎯 Goal: Users can sign up, log in, and complete onboarding

---

### Task 1.1: Authentication Backend
**Priority:** 🔴 Critical  
**Estimated Time:** 6 hours  
**Assignee:** Backend Dev

#### Subtasks:
- [ ] Create Auth module (`apps/api/src/modules/auth/`)
- [ ] Implement JWT strategy
  - [ ] Create `jwt.strategy.ts`
  - [ ] Configure JWT secret in env
  - [ ] Set token expiration (7 days)
- [ ] Create auth endpoints:
  - [ ] `POST /auth/signup`
    - Validate email (unique)
    - Hash password (bcrypt, 10 rounds)
    - Create user + empty profile
    - Return JWT token
  - [ ] `POST /auth/login`
    - Validate credentials
    - Return JWT token
  - [ ] `GET /auth/me`
    - Return current user (protected route)
  - [ ] `POST /auth/logout` (optional, blacklist token)
- [ ] Create DTOs:
  ```typescript
  // signup.dto.ts
  export class SignupDto {
    @IsEmail()
    email: string;
    
    @IsString()
    @MinLength(8)
    password: string;
    
    @IsString()
    @IsOptional()
    name?: string;
  }
  ```
- [ ] Implement password hashing
- [ ] Create JwtAuthGuard
- [ ] Add error handling (email exists, wrong password, etc.)
- [ ] Write unit tests

**Acceptance Criteria:**
- ✅ User can signup with email/password
- ✅ User can login and receive JWT
- ✅ Protected routes reject invalid tokens
- ✅ Passwords are hashed (never stored plain)
- ✅ Proper error messages

**API Endpoints:**
```
POST   /auth/signup     { email, password, name? }
POST   /auth/login      { email, password }
GET    /auth/me         (requires JWT)
```

---

### Task 1.2: Authentication Frontend
**Priority:** 🔴 Critical  
**Estimated Time:** 5 hours  
**Assignee:** Frontend Dev

#### Subtasks:
- [ ] Create auth pages:
  - [ ] `/signup` - Signup form
  - [ ] `/login` - Login form
  - [ ] `/forgot-password` (optional for MVP)
- [ ] Create authentication context
  ```typescript
  // contexts/AuthContext.tsx
  interface AuthContextType {
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    signup: (email: string, password: string) => Promise<void>;
    logout: () => void;
    isLoading: boolean;
  }
  ```
- [ ] Implement JWT storage
  - [ ] Store in httpOnly cookie (preferred)
  - [ ] OR localStorage (simpler but less secure)
- [ ] Create ProtectedRoute component
  - [ ] Redirect to `/login` if not authenticated
- [ ] Create auth forms with validation:
  - [ ] Email validation
  - [ ] Password strength indicator
  - [ ] Error display
  - [ ] Loading states
- [ ] Implement auto-login on page refresh
  - [ ] Check for valid token
  - [ ] Fetch user data
- [ ] Add logout functionality
- [ ] Style with shadcn/ui components

**Acceptance Criteria:**
- ✅ User can signup from `/signup`
- ✅ User can login from `/login`
- ✅ User stays logged in after page refresh
- ✅ Protected pages redirect to login
- ✅ Logout works correctly
- ✅ Forms have proper validation

---

### Task 1.3: Onboarding Backend (User Profile)
**Priority:** 🔴 Critical  
**Estimated Time:** 4 hours  
**Assignee:** Backend Dev

#### Subtasks:
- [ ] Create Users module (`apps/api/src/modules/users/`)
- [ ] Create profile endpoints:
  - [ ] `GET /users/profile` - Get current user profile
  - [ ] `POST /users/profile` - Create/update profile (onboarding)
  - [ ] `PATCH /users/profile` - Partial update
- [ ] Create UserProfileDto:
  ```typescript
  export class UserProfileDto {
    @IsInt()
    @Min(16)
    @Max(80)
    age: number;
    
    @IsEnum(['male', 'female', 'other', 'not_specified'])
    gender: string;
    
    @IsNumber()
    height: number; // cm
    
    @IsNumber()
    weight: number; // kg
    
    // ... rest of fields from PRD
  }
  ```
- [ ] Implement TDEE calculation:
  ```typescript
  calculateTDEE(profile: UserProfile): number {
    // Mifflin-St Jeor equation
    const bmr = profile.gender === 'male'
      ? 10 * profile.weight + 6.25 * profile.height - 5 * profile.age + 5
      : 10 * profile.weight + 6.25 * profile.height - 5 * profile.age - 161;
    
    const activityMultiplier = this.getActivityMultiplier(profile.trainingDaysPerWeek);
    return bmr * activityMultiplier;
  }
  ```
- [ ] Implement macro calculation:
  ```typescript
  calculateMacros(profile: UserProfile, tdee: number) {
    const goalCalories = this.getGoalCalories(tdee, profile.primaryGoal);
    const protein = profile.weight * 2.2; // g
    const fat = profile.weight * 1.0; // g
    const carbs = (goalCalories - protein * 4 - fat * 9) / 4;
    return { calories: goalCalories, protein, fat, carbs };
  }
  ```
- [ ] Save calculated values to profile
- [ ] Set `onboardingCompleted: true` flag
- [ ] Return updated profile

**Acceptance Criteria:**
- ✅ Profile can be created/updated
- ✅ TDEE calculated correctly (test with known values)
- ✅ Macros calculated correctly
- ✅ Validation works (age 16-80, etc.)

---

### Task 1.4: Onboarding Frontend (8 Steps)
**Priority:** 🔴 Critical  
**Estimated Time:** 8 hours  
**Assignee:** Frontend Dev

#### Subtasks:
- [ ] Create onboarding layout component
  - [ ] Progress bar (8 steps)
  - [ ] Step indicator (1/8, 2/8, etc.)
  - [ ] Navigation buttons (Back, Continue)
- [ ] Create onboarding context for state management
  ```typescript
  interface OnboardingState {
    step: number;
    data: Partial<UserProfile>;
    setStep: (step: number) => void;
    updateData: (data: Partial<UserProfile>) => void;
  }
  ```
- [ ] Create Step 1: Basic Info
  - [ ] Age input (number with steppers)
  - [ ] Gender selection (radio cards)
  - [ ] Height input (cm/ft toggle)
  - [ ] Weight inputs (kg/lbs toggle)
  - [ ] Target weight (optional)
- [ ] Create Step 2: Goals
  - [ ] Primary goal selection (4 cards)
  - [ ] Secondary goals (checkboxes)
- [ ] Create Step 3: Experience
  - [ ] Fitness level (4 options)
  - [ ] Nutrition knowledge (4 options)
- [ ] Create Step 4: Schedule
  - [ ] Training days per week (1-7 selector)
  - [ ] Session duration (dropdown)
  - [ ] Preferred time (select)
- [ ] Create Step 5: Equipment
  - [ ] Training location (radio cards)
  - [ ] Equipment checklist (conditional)
- [ ] Create Step 6: Limitations
  - [ ] Injuries (textarea)
  - [ ] Medical conditions (textarea)
  - [ ] Dietary restrictions (checkboxes)
- [ ] Create Step 7: Nutrition Preferences
  - [ ] Meals per day (2-6 slider)
  - [ ] Cooking level (select)
  - [ ] Cuisine preferences (checkboxes)
  - [ ] Disliked foods (tags input)
  - [ ] Budget (number input)
- [ ] Create Step 8: Motivation
  - [ ] Why starting? (textarea)
  - [ ] Previous attempts (yes/no + details)
  - [ ] Biggest challenges (checkboxes)
- [ ] Create final loading screen
  - [ ] "Generating your plan..." animation
  - [ ] Task indicators (Analyzing, Calculating, Designing, etc.)
  - [ ] Progress percentage
- [ ] Implement form validation per step
- [ ] Implement state persistence (localStorage)
  - [ ] Save on every change
  - [ ] Resume if page refreshed
- [ ] Submit all data on completion
- [ ] Redirect to dashboard after success

**Acceptance Criteria:**
- ✅ All 8 steps render correctly
- ✅ Navigation works (back/continue)
- ✅ Progress bar updates
- ✅ Form validation prevents invalid data
- ✅ Data persists if page refreshed
- ✅ Final submission works
- ✅ Redirects to dashboard
- ✅ Loading animation shows during submission

**Design Reference:**
- Use Pencil prompts from `ai_fitness_coach_pencil_prompts_DARK.md`
- Match design specifications exactly

---

### Task 1.5: Plan Generation Trigger
**Priority:** 🟡 High  
**Estimated Time:** 3 hours  
**Assignee:** Backend Dev

#### Subtasks:
- [ ] Create queue system (Bull + Redis)
  - [ ] Install dependencies: `pnpm add @nestjs/bull bull`
  - [ ] Configure Redis connection
  - [ ] Create queue module
- [ ] Create plan generation job:
  ```typescript
  @Processor('plan-generation')
  export class PlanGenerationProcessor {
    @Process('generate-plans')
    async handlePlanGeneration(job: Job<{ userId: string }>) {
      // Will implement AI generation in Phase 2
      // For now, just mark as complete
      await this.userService.setOnboardingComplete(job.data.userId);
    }
  }
  ```
- [ ] Trigger job after onboarding completion
- [ ] Return job ID to frontend for polling
- [ ] Create status endpoint:
  - [ ] `GET /users/onboarding-status`
  - [ ] Return: `{ status: 'pending' | 'processing' | 'complete', progress: 0-100 }`

**Acceptance Criteria:**
- ✅ Job is queued after onboarding
- ✅ Frontend can poll status
- ✅ User marked as complete when done

---

## PHASE 2: AI Integration & Chat (Week 3-4)

### 🎯 Goal: AI chat works with context and generates plans

---

### Task 2.1: OpenAI Setup
**Priority:** 🔴 Critical  
**Estimated Time:** 2 hours  
**Assignee:** Backend Dev

#### Subtasks:
- [ ] Create OpenAI account
- [ ] Get API key
- [ ] Add to environment variables:
  ```
  OPENAI_API_KEY=sk-...
  ```
- [ ] Install OpenAI SDK:
  ```bash
  pnpm add openai
  ```
- [ ] Create AI module (`apps/api/src/modules/ai/`)
- [ ] Create AiService:
  ```typescript
  import OpenAI from 'openai';
  
  @Injectable()
  export class AiService {
    private openai: OpenAI;
    
    constructor(private configService: ConfigService) {
      this.openai = new OpenAI({
        apiKey: this.configService.get('OPENAI_API_KEY'),
      });
    }
  }
  ```
- [ ] Test API connection with simple call
- [ ] Implement error handling (rate limits, API errors)
- [ ] Add retry logic with exponential backoff

**Acceptance Criteria:**
- ✅ OpenAI client initialized
- ✅ Test call works
- ✅ Errors handled gracefully

---

### Task 2.2: AI Context Building
**Priority:** 🔴 Critical  
**Estimated Time:** 4 hours  
**Assignee:** Backend Dev

#### Subtasks:
- [ ] Create ContextService in AI module
- [ ] Implement context builder:
  ```typescript
  async buildContext(userId: string): Promise<AiContext> {
    // Fetch all relevant data in parallel
    const [
      profile,
      conversationHistory,
      currentWorkoutPlan,
      currentNutritionPlan,
      recentWorkouts
    ] = await Promise.all([
      this.prisma.userProfile.findUnique({ where: { userId } }),
      this.prisma.chatMessage.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
        take: 20, // Last 20 messages
      }),
      this.workoutService.getCurrentPlan(userId),
      this.nutritionService.getCurrentPlan(userId),
      this.prisma.workoutLog.findMany({
        where: { userId },
        orderBy: { completedAt: 'desc' },
        take: 5,
      }),
    ]);
    
    return {
      profile,
      conversationHistory: conversationHistory.reverse(),
      workoutPlan: currentWorkoutPlan,
      nutritionPlan: currentNutritionPlan,
      recentWorkouts,
      language: profile?.language || 'en',
    };
  }
  ```
- [ ] Create system prompt builder:
  ```typescript
  buildSystemPrompt(context: AiContext): string {
    return `You are a certified personal fitness trainer and nutritionist.

User Profile:
${JSON.stringify(context.profile, null, 2)}

Current Workout Plan:
${context.workoutPlan || 'Not yet created'}

Current Nutrition Plan:
${context.nutritionPlan || 'Not yet created'}

Recent Workouts:
${JSON.stringify(context.recentWorkouts, null, 2)}

Guidelines:
- Always respond in ${context.language}
- Be supportive but honest
- Provide specific, actionable advice
- Reference user's profile and history
- If medical issue, recommend seeing a doctor
- Use Markdown for formatting
- Keep responses concise (200-400 words) unless detail requested

Previous conversation:
${context.conversationHistory.map(m => `${m.role}: ${m.content}`).join('\n')}
`;
  }
  ```
- [ ] Optimize context size (token limits)
  - [ ] Summarize old messages if >10
  - [ ] Truncate long workout logs
- [ ] Cache context for 5 minutes (Redis)

**Acceptance Criteria:**
- ✅ Context fetches all relevant data
- ✅ System prompt includes profile
- ✅ Context size optimized (<4000 tokens)

---

### Task 2.3: Chat Backend
**Priority:** 🔴 Critical  
**Estimated Time:** 6 hours  
**Assignee:** Backend Dev

#### Subtasks:
- [ ] Create Chat module (`apps/api/src/modules/chat/`)
- [ ] Create chat endpoints:
  - [ ] `POST /chat/send` - Send message
  - [ ] `GET /chat/history?limit=50` - Get conversation history
  - [ ] `DELETE /chat/clear` - Clear conversation
- [ ] Implement message sending:
  ```typescript
  async sendMessage(userId: string, message: string): Promise<string> {
    // 1. Check free tier limit
    const user = await this.userService.findById(userId);
    if (!user.isPremium) {
      const todayMessages = await this.checkDailyLimit(userId);
      if (todayMessages >= 5) {
        throw new ForbiddenException('Daily limit reached. Upgrade to Premium.');
      }
    }
    
    // 2. Save user message
    await this.saveMessage(userId, 'user', message);
    
    // 3. Build context
    const context = await this.contextService.buildContext(userId);
    
    // 4. Select model based on message type
    const model = this.selectModel(message);
    
    // 5. Call AI
    const aiResponse = await this.aiService.generateResponse({
      userMessage: message,
      context,
      model,
    });
    
    // 6. Save AI response
    await this.saveMessage(userId, 'assistant', aiResponse);
    
    // 7. Update usage tracking
    await this.updateUsageTracking(userId);
    
    return aiResponse;
  }
  ```
- [ ] Implement model selection logic:
  ```typescript
  selectModel(message: string): string {
    // Simple heuristic (improve later)
    const isSimple = message.length < 50;
    const isComplex = message.includes('?') && message.length > 100;
    
    if (isComplex) return 'gpt-4o-mini';
    return 'gpt-3.5-turbo';
  }
  ```
- [ ] Implement daily limit checking:
  ```typescript
  async checkDailyLimit(userId: string): Promise<number> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const count = await this.prisma.chatMessage.count({
      where: {
        userId,
        role: 'user',
        createdAt: { gte: today },
      },
    });
    
    return count;
  }
  ```
- [ ] Save messages to database with metadata:
  ```typescript
  async saveMessage(userId: string, role: string, content: string, metadata?: any) {
    return this.prisma.chatMessage.create({
      data: {
        userId,
        role,
        content,
        model: metadata?.model,
        tokens: metadata?.tokens,
        cost: metadata?.cost,
      },
    });
  }
  ```
- [ ] Implement streaming response (optional for v1.1)
- [ ] Add rate limiting (10 requests per minute per user)
- [ ] Track token usage and cost
- [ ] Add safety checks (inappropriate content)

**Acceptance Criteria:**
- ✅ User can send message and get AI response
- ✅ Free tier limited to 5 messages/day
- ✅ Premium users unlimited
- ✅ Messages saved to database
- ✅ Context included in AI calls
- ✅ Appropriate model selected
- ✅ Token usage tracked

**API Endpoints:**
```
POST   /chat/send         { message: string }
GET    /chat/history      ?limit=50&offset=0
DELETE /chat/clear
GET    /chat/usage        (messages used today)
```

---

### Task 2.4: Chat Frontend
**Priority:** 🔴 Critical  
**Estimated Time:** 8 hours  
**Assignee:** Frontend Dev

#### Subtasks:
- [ ] Create Chat page (`/chat` or `/dashboard/chat`)
- [ ] Create chat UI components:
  - [ ] ChatHeader (title, status, actions)
  - [ ] MessageList (scrollable container)
  - [ ] MessageBubble (AI and User variants)
  - [ ] TypingIndicator (3 dots animation)
  - [ ] ChatInput (textarea + send button)
- [ ] Implement message display:
  ```tsx
  <MessageBubble
    role="assistant"
    content={message.content}
    timestamp={message.createdAt}
    avatar="/ai-avatar.png"
  />
  ```
- [ ] Add Markdown rendering for AI messages:
  ```bash
  pnpm add react-markdown
  ```
  - [ ] Support bold, lists, code blocks, links
- [ ] Implement auto-scroll to bottom
  - [ ] On new message
  - [ ] On page load
  - [ ] "Scroll to bottom" button if scrolled up
- [ ] Create chat state management:
  ```typescript
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [input, setInput] = useState('');
  ```
- [ ] Implement send message:
  ```typescript
  const handleSend = async () => {
    if (!input.trim()) return;
    
    // Add user message optimistically
    const userMessage = { role: 'user', content: input, timestamp: new Date() };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/chat/send', {
        method: 'POST',
        body: JSON.stringify({ message: input }),
      });
      const data = await response.json();
      
      // Add AI response
      const aiMessage = { role: 'assistant', content: data.response, timestamp: new Date() };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      // Handle error
    } finally {
      setIsLoading(false);
    }
  };
  ```
- [ ] Load conversation history on mount
- [ ] Implement free tier limit UI:
  - [ ] Message counter "3/5 messages left today"
  - [ ] Warning at 4/5
  - [ ] Upgrade modal at 5/5
  - [ ] Disable input when limit reached
- [ ] Add keyboard shortcuts:
  - [ ] Enter to send
  - [ ] Shift+Enter for newline
- [ ] Add copy button on AI messages (hover)
- [ ] Show timestamp on hover
- [ ] Implement typing indicator while waiting
- [ ] Add empty state (first visit)
  - [ ] Welcome message
  - [ ] Suggestion chips
- [ ] Add error states (network error, API error)
- [ ] Make responsive (mobile)

**Acceptance Criteria:**
- ✅ Messages display correctly (AI left, User right)
- ✅ Markdown renders in AI messages
- ✅ Auto-scrolls to bottom
- ✅ Send message works
- ✅ Loading indicator shows while waiting
- ✅ Free tier limit enforced
- ✅ Conversation history loads
- ✅ Mobile responsive

**Design Reference:**
- Use Chat design from `ai_fitness_coach_pencil_prompts_DARK.md` PAGE 3

---

### Task 2.5: Workout Plan Generation (AI)
**Priority:** 🔴 Critical  
**Estimated Time:** 6 hours  
**Assignee:** Backend Dev

#### Subtasks:
- [ ] Create workout plan generation prompt:
  ```typescript
  buildWorkoutPlanPrompt(profile: UserProfile): string {
    return `Generate a personalized workout plan for this user:

Profile:
- Age: ${profile.age}, Gender: ${profile.gender}
- Goal: ${profile.primaryGoal}
- Experience: ${profile.fitnessLevel}
- Training days: ${profile.trainingDaysPerWeek} days/week
- Session duration: ${profile.sessionDuration} minutes
- Equipment: ${profile.equipment.join(', ')}
- Injuries/limitations: ${profile.injuries || 'None'}

Requirements:
- Create ${profile.trainingDaysPerWeek}-day split
- Each workout ~${profile.sessionDuration} minutes
- Use only available equipment
- Appropriate for ${profile.fitnessLevel} level
- Progressive overload scheme
- Include warm-up and cool-down

Return JSON format:
{
  "name": "Program name",
  "durationWeeks": 8,
  "weeklySchedule": [
    {
      "dayOfWeek": "Monday",
      "focus": "Upper Push",
      "duration": 60,
      "exercises": [
        {
          "name": "Barbell Bench Press",
          "muscleGroup": "Chest",
          "sets": 4,
          "reps": "6-8",
          "rest": "2-3 min",
          "notes": "Control eccentric, explosive concentric",
          "alternatives": ["Dumbbell Bench Press", "Push-ups"]
        }
      ]
    }
  ],
  "progressionScheme": "Linear progression: +2.5kg when hit top of rep range",
  "deloadWeek": 4,
  "notes": "Additional coach notes"
}

Generate complete plan with all ${profile.trainingDaysPerWeek} days.`;
  }
  ```
- [ ] Implement plan generation:
  ```typescript
  async generateWorkoutPlan(userId: string): Promise<WorkoutPlan> {
    const profile = await this.prisma.userProfile.findUnique({ where: { userId } });
    const prompt = this.buildWorkoutPlanPrompt(profile);
    
    const response = await this.openai.chat.completions.create({
      model: 'gpt-4', // Use GPT-4 for quality
      messages: [
        { role: 'user', content: prompt }
      ],
      response_format: { type: 'json_object' },
      temperature: 0.8,
      max_tokens: 4000,
    });
    
    const planData = JSON.parse(response.choices[0].message.content);
    
    // Save to database
    const plan = await this.prisma.workoutPlan.create({
      data: {
        userId,
        name: planData.name,
        weeklySchedule: planData.weeklySchedule,
        durationWeeks: planData.durationWeeks,
        progressionScheme: planData.progressionScheme,
        deloadWeek: planData.deloadWeek,
        notes: planData.notes,
        isActive: true,
      },
    });
    
    return plan;
  }
  ```
- [ ] Add retry logic (if JSON parsing fails)
- [ ] Validate generated plan structure
- [ ] Handle errors gracefully
- [ ] Test with different profiles
- [ ] Fine-tune prompt based on results

**Acceptance Criteria:**
- ✅ Generates valid workout plan
- ✅ Respects user constraints (equipment, days, etc.)
- ✅ Returns proper JSON structure
- ✅ Saved to database correctly
- ✅ Appropriate exercises for level

---

### Task 2.6: Nutrition Plan Generation (AI)
**Priority:** 🔴 Critical  
**Estimated Time:** 6 hours  
**Assignee:** Backend Dev

#### Subtasks:
- [ ] Create nutrition plan generation prompt:
  ```typescript
  buildNutritionPlanPrompt(profile: UserProfile, calories: number, macros: Macros): string {
    return `Generate a personalized nutrition plan for this user:

Profile:
- Goal: ${profile.primaryGoal}
- Current weight: ${profile.weight}kg
- Meals per day: ${profile.mealsPerDay}
- Dietary restrictions: ${profile.dietaryRestrictions.join(', ') || 'None'}
- Cooking level: ${profile.cookingLevel}
- Cuisine preferences: ${profile.cuisinePreferences.join(', ')}
- Disliked foods: ${profile.dislikedFoods.join(', ') || 'None'}
- Budget: $${profile.foodBudget}/day

Daily Targets:
- Calories: ${calories} kcal
- Protein: ${macros.protein}g
- Carbs: ${macros.carbs}g
- Fat: ${macros.fat}g

Requirements:
- Create ${profile.mealsPerDay} meals
- Respect dietary restrictions
- Simple recipes (${profile.cookingLevel} cook)
- Stay within budget
- Hit macro targets (±5%)

Return JSON format:
{
  "name": "Plan name",
  "dailyCalories": ${calories},
  "proteinGrams": ${macros.protein},
  "carbsGrams": ${macros.carbs},
  "fatGrams": ${macros.fat},
  "mealsPerDay": ${profile.mealsPerDay},
  "mealPlan": [
    {
      "mealType": "Breakfast",
      "time": "7:00 AM",
      "name": "Oatmeal with Protein",
      "calories": 700,
      "protein": 35,
      "carbs": 95,
      "fat": 20,
      "ingredients": [
        { "amount": 80, "unit": "g", "name": "oats" },
        { "amount": 300, "unit": "ml", "name": "milk (2%)" }
      ],
      "instructions": "Mix oats with milk, microwave 2min...",
      "prepTime": 5,
      "cookTime": 2
    }
  ],
  "groceryList": {
    "proteins": ["2kg chicken breast - $15"],
    "carbs": ["1kg oats - $4"],
    "fats": ["1 jar peanut butter - $6"],
    "vegetables": ["Broccoli, peppers - $8"],
    "dairy": ["4L milk - $5"]
  }
}

Generate complete daily plan with all ${profile.mealsPerDay} meals.`;
  }
  ```
- [ ] Implement plan generation (similar to workout)
- [ ] Calculate TDEE and macros first
- [ ] Call OpenAI with prompt
- [ ] Parse and validate response
- [ ] Save to database
- [ ] Handle edge cases (vegans, allergies, etc.)
- [ ] Test with various profiles

**Acceptance Criteria:**
- ✅ Generates valid nutrition plan
- ✅ Hits macro targets accurately (±5%)
- ✅ Respects dietary restrictions
- ✅ Appropriate for cooking level
- ✅ Includes grocery list
- ✅ Saved to database

---

### Task 2.7: Plan Generation in Onboarding
**Priority:** 🟡 High  
**Estimated Time:** 3 hours  
**Assignee:** Backend Dev

#### Subtasks:
- [ ] Update plan generation job processor:
  ```typescript
  @Process('generate-plans')
  async handlePlanGeneration(job: Job<{ userId: string }>) {
    const userId = job.data.userId;
    
    try {
      // Update progress
      await job.progress(10);
      
      // 1. Generate workout plan
      await job.progress(30);
      await this.workoutService.generateWorkoutPlan(userId);
      
      // 2. Generate nutrition plan
      await job.progress(60);
      await this.nutritionService.generateNutritionPlan(userId);
      
      // 3. Create welcome message
      await job.progress(90);
      await this.chatService.sendWelcomeMessage(userId);
      
      // 4. Mark complete
      await job.progress(100);
      await this.userService.setOnboardingComplete(userId);
      
      return { success: true };
    } catch (error) {
      throw error; // Job will retry
    }
  }
  ```
- [ ] Add progress tracking
- [ ] Implement retry logic (max 3 attempts)
- [ ] Send error notification if all retries fail
- [ ] Create welcome message:
  ```typescript
  async sendWelcomeMessage(userId: string) {
    const profile = await this.prisma.userProfile.findUnique({ where: { userId } });
    
    const message = `Hi ${profile.name || 'there'}! 👋

I'm your AI fitness coach, and I've just created personalized workout and nutrition plans for you based on your profile.

Here's what I've prepared:
• **${profile.trainingDaysPerWeek}-day workout plan** targeting ${profile.primaryGoal}
• **Nutrition plan** with ${profile.dailyCalories} calories and balanced macros
• **24/7 support** - ask me anything!

Ready to start? Check out your plans in the dashboard, or ask me any questions you have!`;

    await this.saveMessage(userId, 'assistant', message);
  }
  ```

**Acceptance Criteria:**
- ✅ Both plans generated during onboarding
- ✅ Progress updates work
- ✅ Welcome message sent
- ✅ Errors handled gracefully

---

## PHASE 3: Workout System (Week 5)

### 🎯 Goal: Users can view plans, log workouts, and track progress

---

### Task 3.1: Workout Plan Display Backend
**Priority:** 🔴 Critical  
**Estimated Time:** 3 hours  
**Assignee:** Backend Dev

#### Subtasks:
- [ ] Create Workouts module
- [ ] Create workout endpoints:
  - [ ] `GET /workouts/plan` - Get active workout plan
  - [ ] `GET /workouts/plan/:id` - Get specific plan
  - [ ] `GET /workouts/day/:dayOfWeek` - Get today's workout
  - [ ] `POST /workouts/plan/regenerate` - Generate new plan
- [ ] Implement getCurrentPlan:
  ```typescript
  async getCurrentPlan(userId: string): Promise<WorkoutPlan | null> {
    return this.prisma.workoutPlan.findFirst({
      where: {
        userId,
        isActive: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
  ```
- [ ] Implement getTodaysWorkout:
  ```typescript
  async getTodaysWorkout(userId: string): Promise<WorkoutDay | null> {
    const plan = await this.getCurrentPlan(userId);
    if (!plan) return null;
    
    const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
    const workout = plan.weeklySchedule.find(w => w.dayOfWeek === today);
    
    return workout || null;
  }
  ```
- [ ] Add ability to regenerate plan
- [ ] Archive old plan when regenerating

**Acceptance Criteria:**
- ✅ Can fetch current plan
- ✅ Can get today's workout
- ✅ Can regenerate plan
- ✅ Old plans archived

---

### Task 3.2: Workout Plan Display Frontend
**Priority:** 🔴 Critical  
**Estimated Time:** 6 hours  
**Assignee:** Frontend Dev

#### Subtasks:
- [ ] Create Workout Plan page (`/dashboard/workouts`)
- [ ] Create week selector component
  - [ ] Tabs for Week 1-8
  - [ ] Progress bar showing current week
- [ ] Create day cards component
  - [ ] Training day card (with exercises preview)
  - [ ] Rest day card (different styling)
  - [ ] Status indicators (Scheduled, Completed, Missed)
- [ ] Create workout day detail view (modal or slide-out):
  ```tsx
  <WorkoutDayDetail
    workout={selectedWorkout}
    onClose={() => setSelectedWorkout(null)}
    onStartWorkout={() => handleStartWorkout()}
  />
  ```
- [ ] Display exercises with:
  - [ ] Exercise name
  - [ ] Muscle group tag (colored)
  - [ ] Sets × Reps
  - [ ] Rest time
  - [ ] Form notes (collapsible)
  - [ ] Video tutorial link
  - [ ] Alternative exercises (collapsible)
- [ ] Add "Start Workout" button
- [ ] Add "Regenerate Plan" functionality
  - [ ] Confirmation modal
  - [ ] Loading state
  - [ ] Success/error feedback
- [ ] Make responsive (mobile)
  - [ ] Stack day cards vertically
  - [ ] Full-screen workout detail
  - [ ] Collapsible exercise details

**Acceptance Criteria:**
- ✅ Weekly workout plan displays
- ✅ Can view each day's workout
- ✅ Exercise details are clear
- ✅ Can navigate between weeks
- ✅ Mobile responsive
- ✅ Matches design (colored left borders, etc.)

**Design Reference:**
- Use Workout Plan design from `ai_fitness_coach_pencil_prompts_DARK.md` PAGE 4

---

### Task 3.3: Workout Logging Backend
**Priority:** 🔴 Critical  
**Estimated Time:** 4 hours  
**Assignee:** Backend Dev

#### Subtasks:
- [ ] Create workout logging endpoints:
  - [ ] `POST /workouts/log` - Log completed workout
  - [ ] `GET /workouts/logs?limit=10` - Get workout history
  - [ ] `GET /workouts/log/:id` - Get specific log
  - [ ] `DELETE /workouts/log/:id` - Delete log
- [ ] Create WorkoutLogDto:
  ```typescript
  export class WorkoutLogDto {
    @IsString()
    workoutPlanId: string;
    
    @IsString()
    workoutName: string; // "Upper Push"
    
    @IsArray()
    @ValidateNested({ each: true })
    exercises: ExerciseLogDto[];
    
    @IsNumber()
    @IsOptional()
    duration?: number; // actual minutes
    
    @IsInt()
    @Min(1)
    @Max(5)
    @IsOptional()
    rating?: number;
    
    @IsString()
    @IsOptional()
    notes?: string;
  }
  
  export class ExerciseLogDto {
    @IsString()
    exerciseName: string;
    
    @IsArray()
    sets: SetLogDto[];
    
    @IsString()
    @IsOptional()
    notes?: string;
  }
  
  export class SetLogDto {
    @IsInt()
    setNumber: number;
    
    @IsNumber()
    weight: number; // kg
    
    @IsInt()
    reps: number;
    
    @IsInt()
    @Min(1)
    @Max(10)
    @IsOptional()
    rpe?: number; // Rate of Perceived Exertion
  }
  ```
- [ ] Implement logWorkout:
  ```typescript
  async logWorkout(userId: string, dto: WorkoutLogDto): Promise<WorkoutLog> {
    const log = await this.prisma.workoutLog.create({
      data: {
        userId,
        workoutPlanId: dto.workoutPlanId,
        workoutName: dto.workoutName,
        exercises: dto.exercises,
        duration: dto.duration,
        rating: dto.rating,
        notes: dto.notes,
        completedAt: new Date(),
      },
    });
    
    // Award XP (if gamification implemented)
    // await this.xpService.awardWorkoutXP(userId, log);
    
    // Update user stats
    await this.updateUserStats(userId);
    
    return log;
  }
  ```
- [ ] Implement getWorkoutHistory
- [ ] Calculate workout streaks
- [ ] Track personal records (PRs)

**Acceptance Criteria:**
- ✅ Can log workout with all exercise data
- ✅ Can fetch workout history
- ✅ Streaks calculated correctly
- ✅ PRs tracked

---

### Task 3.4: Workout Logging Frontend
**Priority:** 🔴 Critical  
**Estimated Time:** 8 hours  
**Assignee:** Frontend Dev

#### Subtasks:
- [ ] Create workout logging modal/page
  - [ ] Triggered from "Start Workout" button
- [ ] Create logging UI:
  - [ ] Header: Workout name, progress (Exercise 1 of 6)
  - [ ] Current exercise card
  - [ ] Set logging table:
    ```tsx
    <SetLogger
      exercise={currentExercise}
      onComplete={(sets) => handleSetComplete(sets)}
    />
    ```
- [ ] Implement set logging table:
  - [ ] Columns: Set #, Target, Weight, Reps, RPE, ✓
  - [ ] Weight input with +/- steppers
  - [ ] Reps number input
  - [ ] RPE dropdown (1-10)
  - [ ] Auto-check when weight and reps entered
- [ ] Add quick actions:
  - [ ] "+2.5kg" button (adds to all sets)
  - [ ] "+5kg" button
  - [ ] "Same as Last Time" button
    - [ ] Fetch previous workout
    - [ ] Pre-fill weights/reps
- [ ] Show previous workout reference:
  - [ ] "Last time: 80kg × 8, 8, 7, 6"
  - [ ] Expandable section
- [ ] Implement navigation:
  - [ ] "← Previous Exercise" button
  - [ ] "Next Exercise →" button
  - [ ] Save current exercise before navigating
  - [ ] On last exercise: "Complete Workout"
- [ ] Create workout completion screen:
  - [ ] Summary stats (exercises, duration, volume)
  - [ ] Rating (1-5 stars)
  - [ ] Notes textarea
  - [ ] "Save Workout" button
- [ ] Add success state:
  - [ ] Confetti animation
  - [ ] "+54 XP" badge
  - [ ] "Level Up!" if applicable
  - [ ] Streak update
- [ ] Implement auto-save (draft):
  - [ ] Save to localStorage every 30 seconds
  - [ ] Resume if modal closed accidentally
- [ ] Add rest timer (optional):
  - [ ] Countdown timer between sets
  - [ ] Notification when time's up
  - [ ] Can skip or add time
- [ ] Make mobile friendly:
  - [ ] Full screen modal
  - [ ] Larger input fields
  - [ ] Swipe between exercises

**Acceptance Criteria:**
- ✅ Can log all sets for each exercise
- ✅ Navigation works (prev/next)
- ✅ Previous workout data shown
- ✅ Quick actions work (+2.5kg, etc.)
- ✅ Workout saves correctly
- ✅ Success animation shows
- ✅ Draft auto-saves
- ✅ Mobile responsive

**Design Reference:**
- Workout Logging Modal design specification

---

### Task 3.5: Dashboard "Today's Workout" Widget
**Priority:** 🟡 High  
**Estimated Time:** 2 hours  
**Assignee:** Frontend Dev

#### Subtasks:
- [ ] Create TodaysWorkout component for dashboard
- [ ] Fetch today's workout on page load:
  ```typescript
  useEffect(() => {
    const fetchTodaysWorkout = async () => {
      const response = await fetch('/api/workouts/day/today');
      const data = await response.json();
      setTodaysWorkout(data);
    };
    fetchTodaysWorkout();
  }, []);
  ```
- [ ] Display workout card:
  - [ ] Workout name
  - [ ] Scheduled time
  - [ ] First 3 exercises preview
  - [ ] "Start Workout" button
  - [ ] "View Full Plan" link
- [ ] Handle rest days:
  - [ ] Show rest day card
  - [ ] Different styling
  - [ ] Recovery tips
- [ ] Handle completed workout:
  - [ ] Show checkmark
  - [ ] "View Workout Log" button
  - [ ] Option to log again if done outside app

**Acceptance Criteria:**
- ✅ Shows correct workout for today
- ✅ Displays preview of exercises
- ✅ Launches workout logger
- ✅ Handles rest days and completed workouts

---

## PHASE 4: Nutrition System (Week 6)

### 🎯 Goal: Users can view meal plans and get recipes

---

### Task 4.1: Nutrition Plan Display Backend
**Priority:** 🔴 Critical  
**Estimated Time:** 3 hours  
**Assignee:** Backend Dev

#### Subtasks:
- [ ] Create Nutrition module
- [ ] Create nutrition endpoints:
  - [ ] `GET /nutrition/plan` - Get active nutrition plan
  - [ ] `GET /nutrition/plan/:id` - Get specific plan
  - [ ] `POST /nutrition/plan/regenerate` - Generate new plan
  - [ ] `GET /nutrition/recipes?search=&type=` - Search recipes
- [ ] Implement getCurrentPlan (similar to workout)
- [ ] Implement regeneratePlan
- [ ] Add recipe database (or generate on-demand)

**Acceptance Criteria:**
- ✅ Can fetch nutrition plan
- ✅ Can regenerate plan
- ✅ Plan includes all meal details

---

### Task 4.2: Nutrition Plan Display Frontend
**Priority:** 🔴 Critical  
**Estimated Time:** 6 hours  
**Assignee:** Frontend Dev

#### Subtasks:
- [ ] Create Nutrition page (`/dashboard/nutrition`)
- [ ] Create macro targets card:
  - [ ] 4 columns: Calories, Protein, Carbs, Fat
  - [ ] Large numbers with colored icons
  - [ ] Pie chart or bar showing split
- [ ] Create meal tabs:
  - [ ] "Sample Meal Plan" (default)
  - [ ] "Grocery List"
  - [ ] "Recipes"
- [ ] Display meal cards:
  - [ ] Meal name and time
  - [ ] Food photo
  - [ ] Macro pills (colored)
  - [ ] Ingredients (collapsible)
  - [ ] Instructions (collapsible)
  - [ ] "View Recipe" button
  - [ ] "Swap Meal" button
- [ ] Implement day navigation:
  - [ ] Day 1-7 selector
  - [ ] Or "Today" / arrows
- [ ] Create daily summary:
  - [ ] Total macros for day
  - [ ] Checkmarks if targets hit
- [ ] Implement "Swap Meal" functionality:
  - [ ] Show 3 alternative recipes
  - [ ] Same meal type
  - [ ] Similar macros
  - [ ] "Use This" button
- [ ] Create Grocery List tab:
  - [ ] Organized by category
  - [ ] Checkboxes
  - [ ] Total cost estimate
  - [ ] "Export to Email" button
- [ ] Create Recipes tab:
  - [ ] Search bar
  - [ ] Filters (meal type, protein, prep time)
  - [ ] Recipe cards grid
- [ ] Make responsive (mobile)

**Acceptance Criteria:**
- ✅ Macro targets displayed clearly
- ✅ All meals shown with details
- ✅ Can collapse/expand ingredients and instructions
- ✅ Can swap meals
- ✅ Grocery list generated
- ✅ Mobile responsive
- ✅ Matches design (colored macro pills, etc.)

**Design Reference:**
- Nutrition Plan design from `ai_fitness_coach_pencil_prompts_DARK.md` PAGE 5

---

### Task 4.3: Recipe Generator (AI)
**Priority:** 🟡 High  
**Estimated Time:** 4 hours  
**Assignee:** Backend Dev

#### Subtasks:
- [ ] Create recipe generation endpoint:
  - [ ] `POST /nutrition/recipe/generate`
  - [ ] Body: `{ mealType, targetMacros, restrictions }`
- [ ] Implement recipe generation prompt:
  ```typescript
  buildRecipePrompt(params: RecipeParams): string {
    return `Generate a ${params.mealType} recipe with these requirements:

Target Macros:
- Calories: ${params.calories} kcal (±50)
- Protein: ${params.protein}g (±5g)
- Carbs: ${params.carbs}g (±10g)
- Fat: ${params.fat}g (±5g)

Restrictions:
- Dietary: ${params.restrictions.join(', ') || 'None'}
- Disliked: ${params.disliked.join(', ') || 'None'}
- Cooking level: ${params.cookingLevel}
- Prep time: <${params.maxPrepTime} minutes

Return JSON:
{
  "name": "Recipe name",
  "servings": 1,
  "prepTime": 10,
  "cookTime": 15,
  "difficulty": "easy",
  "calories": 700,
  "protein": 35,
  "carbs": 95,
  "fat": 20,
  "ingredients": [
    { "amount": 80, "unit": "g", "name": "oats" }
  ],
  "instructions": [
    "Step 1...",
    "Step 2..."
  ],
  "notes": "Optional tips"
}`;
  }
  ```
- [ ] Call OpenAI (GPT-4o-mini for cost)
- [ ] Validate macro accuracy (within 10%)
- [ ] Cache common recipes (Redis)
- [ ] Save to database (optional)

**Acceptance Criteria:**
- ✅ Generates recipe with accurate macros
- ✅ Respects restrictions
- ✅ Appropriate difficulty
- ✅ Returns valid JSON

---

### Task 4.4: Meal Swapping
**Priority:** 🟡 High  
**Estimated Time:** 3 hours  
**Assignee:** Full Stack

#### Backend:
- [ ] Create swap meal endpoint:
  - [ ] `POST /nutrition/swap-meal`
  - [ ] Body: `{ mealId, currentMeal }`
- [ ] Generate 3 alternative recipes
- [ ] Update nutrition plan with new meal

#### Frontend:
- [ ] Create swap meal modal
- [ ] Display 3 alternatives
- [ ] Show macro comparison
- [ ] "Use This" button updates plan
- [ ] Optimistic UI update

**Acceptance Criteria:**
- ✅ Can swap any meal
- ✅ Alternatives have similar macros
- ✅ Plan updates correctly

---

## PHASE 5: Progress Tracking (Week 7)

### 🎯 Goal: Users can track weight, see analytics, view progress

---

### Task 5.1: Weight Logging
**Priority:** 🔴 Critical  
**Estimated Time:** 3 hours  
**Assignee:** Full Stack

#### Backend:
- [ ] Create weight logging endpoint:
  - [ ] `POST /progress/weight`
  - [ ] Body: `{ weight, date?, notes? }`
- [ ] Implement logWeight:
  ```typescript
  async logWeight(userId: string, weight: number, date?: Date) {
    // Prevent duplicate entries for same day
    const existing = await this.prisma.weightLog.findUnique({
      where: { userId_date: { userId, date: date || new Date() } }
    });
    
    if (existing) {
      return this.prisma.weightLog.update({
        where: { id: existing.id },
        data: { weight },
      });
    }
    
    return this.prisma.weightLog.create({
      data: { userId, weight, date: date || new Date() },
    });
  }
  ```
- [ ] Get weight history endpoint:
  - [ ] `GET /progress/weight?period=3months`

#### Frontend:
- [ ] Create quick weight log component
  - [ ] Can be on Dashboard or Progress page
  - [ ] Number input
  - [ ] Unit toggle (kg/lbs)
  - [ ] "Log Weight" button
- [ ] Add to Dashboard (quick action)

**Acceptance Criteria:**
- ✅ Can log weight
- ✅ Can't duplicate same day
- ✅ Can fetch history

---

### Task 5.2: Progress Analytics Backend
**Priority:** 🔴 Critical  
**Estimated Time:** 4 hours  
**Assignee:** Backend Dev

#### Subtasks:
- [ ] Create Progress module
- [ ] Create analytics endpoints:
  - [ ] `GET /progress/weight?period=` - Weight over time
  - [ ] `GET /progress/strength/:exercise?period=` - Strength progression
  - [ ] `GET /progress/volume?period=` - Training volume
  - [ ] `GET /progress/consistency?period=` - Workout consistency
  - [ ] `GET /progress/summary` - All stats
- [ ] Implement weight analytics:
  ```typescript
  async getWeightProgress(userId: string, period: string) {
    const startDate = this.getStartDate(period);
    
    const logs = await this.prisma.weightLog.findMany({
      where: {
        userId,
        date: { gte: startDate },
      },
      orderBy: { date: 'asc' },
    });
    
    const startWeight = logs[0]?.weight;
    const currentWeight = logs[logs.length - 1]?.weight;
    const change = currentWeight - startWeight;
    const changePercent = (change / startWeight) * 100;
    
    return {
      logs,
      startWeight,
      currentWeight,
      change,
      changePercent,
      trend: this.calculateTrend(logs),
    };
  }
  ```
- [ ] Implement strength analytics:
  ```typescript
  async getStrengthProgress(userId: string, exercise: string, period: string) {
    const startDate = this.getStartDate(period);
    
    const workouts = await this.prisma.workoutLog.findMany({
      where: {
        userId,
        completedAt: { gte: startDate },
      },
      orderBy: { completedAt: 'asc' },
    });
    
    // Extract data for specific exercise
    const exerciseData = workouts
      .map(w => {
        const ex = w.exercises.find(e => e.exerciseName === exercise);
        if (!ex) return null;
        
        const maxWeight = Math.max(...ex.sets.map(s => s.weight));
        const volume = ex.sets.reduce((sum, s) => sum + s.weight * s.reps, 0);
        
        return {
          date: w.completedAt,
          maxWeight,
          volume,
          sets: ex.sets,
        };
      })
      .filter(Boolean);
    
    return {
      exercise,
      data: exerciseData,
      startWeight: exerciseData[0]?.maxWeight,
      currentWeight: exerciseData[exerciseData.length - 1]?.maxWeight,
      improvement: /* calculate */,
    };
  }
  ```
- [ ] Implement consistency analytics (workout heatmap data)
- [ ] Calculate streaks (current, best)
- [ ] Calculate summary stats

**Acceptance Criteria:**
- ✅ Weight data formatted for charts
- ✅ Strength data per exercise
- ✅ Consistency data (workouts per week)
- ✅ Streaks calculated

---

### Task 5.3: Progress Page Frontend
**Priority:** 🔴 Critical  
**Estimated Time:** 8 hours  
**Assignee:** Frontend Dev

#### Subtasks:
- [ ] Create Progress page (`/dashboard/progress`)
- [ ] Install charting library:
  ```bash
  pnpm add recharts
  ```
- [ ] Create quick stats row:
  - [ ] Starting weight → Current
  - [ ] Weight change (kg and %)
  - [ ] Workouts completed
  - [ ] Current streak
- [ ] Create weight chart section:
  - [ ] Line chart with gradient fill
  - [ ] X-axis: dates
  - [ ] Y-axis: weight
  - [ ] Data points clickable
  - [ ] Hover shows exact weight and date
  - [ ] Starting weight line (dashed)
  - [ ] Goal weight line (dashed, if set)
  - [ ] Trend line
- [ ] Add date range selector:
  - [ ] Dropdown: Last Week, Month, 3 Months, 6 Months, Year, All Time
  - [ ] Updates all charts
- [ ] Create strength progress section:
  - [ ] Exercise selector dropdown
  - [ ] Chart showing weight progression
  - [ ] Bar chart or line chart
  - [ ] Show volume (sets × reps × weight)
  - [ ] Highlight PRs with star
  - [ ] Stats below: Starting, Current, Improvement %
- [ ] Create consistency calendar:
  - [ ] Heatmap (GitHub-style)
  - [ ] Each day is a square
  - [ ] Color intensity based on workouts:
    - No workout: light gray
    - 1 workout: light green
    - 2+ workouts: dark green
  - [ ] Hover shows workout name and XP
  - [ ] Click navigates to workout log
  - [ ] Show last 12 weeks
  - [ ] Stats: Total workouts, average per week
- [ ] Create volume tracking section:
  - [ ] Bar chart by muscle group
  - [ ] Shows total volume per muscle
  - [ ] Identifies imbalances
  - [ ] Insight: "⚠️ Legs volume 30% lower than upper body"
- [ ] Add "Log Weight" quick action
- [ ] Make all charts responsive
- [ ] Add loading states
- [ ] Add empty states (no data yet)

**Acceptance Criteria:**
- ✅ All charts display correctly
- ✅ Date range selector works
- ✅ Hover states show tooltips
- ✅ Can select different exercises for strength chart
- ✅ Consistency heatmap accurate
- ✅ Mobile responsive
- ✅ Matches design

**Design Reference:**
- Progress page design specification

---

## PHASE 6: Payments & Launch (Week 8)

### 🎯 Goal: Stripe integration, payment flow, launch preparation

---

### Task 6.1: Stripe Setup
**Priority:** 🔴 Critical  
**Estimated Time:** 2 hours  
**Assignee:** Backend Dev

#### Subtasks:
- [ ] Create Stripe account
- [ ] Get API keys (test and live)
- [ ] Add to environment:
  ```
  STRIPE_SECRET_KEY=sk_test_...
  STRIPE_WEBHOOK_SECRET=whsec_...
  STRIPE_PRICE_ID_MONTHLY=price_...
  STRIPE_PRICE_ID_ANNUAL=price_...
  ```
- [ ] Install Stripe SDK:
  ```bash
  pnpm add stripe
  ```
- [ ] Create Payments module
- [ ] Initialize Stripe:
  ```typescript
  @Injectable()
  export class StripeService {
    private stripe: Stripe;
    
    constructor(private config: ConfigService) {
      this.stripe = new Stripe(config.get('STRIPE_SECRET_KEY'), {
        apiVersion: '2023-10-16',
      });
    }
  }
  ```
- [ ] Create products and prices in Stripe:
  - [ ] Premium Monthly: $20/month
  - [ ] Premium Annual: $200/year
- [ ] Test mode setup complete

**Acceptance Criteria:**
- ✅ Stripe client initialized
- ✅ Test API calls work
- ✅ Products created in Stripe

---

### Task 6.2: Checkout Flow Backend
**Priority:** 🔴 Critical  
**Estimated Time:** 5 hours  
**Assignee:** Backend Dev

#### Subtasks:
- [ ] Create payment endpoints:
  - [ ] `POST /payments/create-checkout-session`
  - [ ] `POST /payments/webhook` (Stripe webhooks)
  - [ ] `POST /payments/create-portal-session` (manage subscription)
  - [ ] `GET /payments/subscription` (current subscription)
- [ ] Implement checkout session creation:
  ```typescript
  async createCheckoutSession(userId: string, priceId: string) {
    const user = await this.userService.findById(userId);
    
    const session = await this.stripe.checkout.sessions.create({
      customer_email: user.email,
      client_reference_id: userId,
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${process.env.FRONTEND_URL}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/pricing`,
    });
    
    return { sessionId: session.id, url: session.url };
  }
  ```
- [ ] Implement webhook handler:
  ```typescript
  @Post('webhook')
  async handleWebhook(@Req() req: RawBodyRequest<Request>) {
    const sig = req.headers['stripe-signature'];
    
    let event: Stripe.Event;
    try {
      event = this.stripe.webhooks.constructEvent(
        req.rawBody,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET,
      );
    } catch (err) {
      throw new BadRequestException('Webhook signature verification failed');
    }
    
    switch (event.type) {
      case 'checkout.session.completed':
        await this.handleCheckoutComplete(event.data.object);
        break;
      case 'customer.subscription.updated':
        await this.handleSubscriptionUpdate(event.data.object);
        break;
      case 'customer.subscription.deleted':
        await this.handleSubscriptionCancel(event.data.object);
        break;
      case 'invoice.payment_failed':
        await this.handlePaymentFailed(event.data.object);
        break;
    }
    
    return { received: true };
  }
  ```
- [ ] Implement webhook handlers:
  ```typescript
  async handleCheckoutComplete(session: Stripe.Checkout.Session) {
    const userId = session.client_reference_id;
    const customerId = session.customer as string;
    const subscriptionId = session.subscription as string;
    
    await this.prisma.user.update({
      where: { id: userId },
      data: {
        isPremium: true,
        stripeCustomerId: customerId,
        subscriptionId: subscriptionId,
        subscriptionStatus: 'active',
      },
    });
    
    // Send welcome email
    await this.emailService.sendPremiumWelcome(userId);
  }
  
  async handleSubscriptionCancel(subscription: Stripe.Subscription) {
    await this.prisma.user.update({
      where: { stripeCustomerId: subscription.customer as string },
      data: {
        isPremium: false,
        subscriptionStatus: 'canceled',
        subscriptionEndsAt: new Date(subscription.current_period_end * 1000),
      },
    });
  }
  ```
- [ ] Create customer portal session:
  ```typescript
  async createPortalSession(userId: string) {
    const user = await this.userService.findById(userId);
    
    const session = await this.stripe.billingPortal.sessions.create({
      customer: user.stripeCustomerId,
      return_url: `${process.env.FRONTEND_URL}/dashboard/settings`,
    });
    
    return { url: session.url };
  }
  ```
- [ ] Store webhook events in database
- [ ] Test with Stripe CLI

**Acceptance Criteria:**
- ✅ Can create checkout session
- ✅ Webhooks process correctly
- ✅ User upgraded to Premium on payment
- ✅ Customer portal works
- ✅ Cancellation works

---

### Task 6.3: Pricing Page Frontend
**Priority:** 🔴 Critical  
**Estimated Time:** 4 hours  
**Assignee:** Frontend Dev

#### Subtasks:
- [ ] Create Pricing page (`/pricing`)
- [ ] Create pricing toggle:
  - [ ] Monthly / Annual switch
  - [ ] Annual shows "Save 17%" badge
- [ ] Create pricing cards (3):
  - [ ] Free: $0
  - [ ] Premium: $20/mo or $200/yr
  - [ ] Enterprise: Custom (optional for MVP)
- [ ] Highlight Premium card:
  - [ ] Raised above others
  - [ ] Red border and glow
  - [ ] "MOST POPULAR" badge
  - [ ] Larger size
- [ ] Add feature comparison table
- [ ] Add testimonials section
- [ ] Add FAQ section (accordion)
- [ ] Add final CTA section
- [ ] Implement "Upgrade" button:
  ```typescript
  const handleUpgrade = async (priceId: string) => {
    const response = await fetch('/api/payments/create-checkout-session', {
      method: 'POST',
      body: JSON.stringify({ priceId }),
    });
    const { url } = await response.json();
    window.location.href = url; // Redirect to Stripe Checkout
  };
  ```
- [ ] Make responsive (mobile)

**Acceptance Criteria:**
- ✅ Pricing cards display correctly
- ✅ Toggle switches between monthly/annual
- ✅ Premium card stands out
- ✅ Upgrade button redirects to Stripe
- ✅ Mobile responsive
- ✅ Matches design

**Design Reference:**
- Pricing section from Landing Page (PAGE 1, Section 8)

---

### Task 6.4: Subscription Management Frontend
**Priority:** 🟡 High  
**Estimated Time:** 3 hours  
**Assignee:** Frontend Dev

#### Subtasks:
- [ ] Create Subscription section in Settings
- [ ] Display current plan:
  - [ ] Plan name (Free / Premium)
  - [ ] Price
  - [ ] Next billing date (if Premium)
  - [ ] Status (active, canceled, past_due)
- [ ] Add "Manage Subscription" button:
  ```typescript
  const handleManageSubscription = async () => {
    const response = await fetch('/api/payments/create-portal-session', {
      method: 'POST',
    });
    const { url } = await response.json();
    window.location.href = url; // Redirect to Stripe Portal
  };
  ```
- [ ] Show upgrade CTA if free user
- [ ] Show benefits comparison
- [ ] Handle different states:
  - [ ] Active subscription
  - [ ] Canceled (access until period end)
  - [ ] Past due (payment failed)

**Acceptance Criteria:**
- ✅ Shows correct subscription info
- ✅ Manage button works
- ✅ Upgrade CTA for free users
- ✅ Handles all subscription states

---

### Task 6.5: Free Tier Enforcement
**Priority:** 🔴 Critical  
**Estimated Time:** 2 hours  
**Assignee:** Backend Dev

#### Subtasks:
- [ ] Add Premium checks to all endpoints:
  ```typescript
  // Example: Chat endpoint
  @Post('send')
  async sendMessage(@User() user, @Body() dto: SendMessageDto) {
    if (!user.isPremium) {
      const todayMessages = await this.checkDailyLimit(user.id);
      if (todayMessages >= 5) {
        throw new ForbiddenException({
          message: 'Daily limit reached',
          upgradeUrl: '/pricing',
        });
      }
    }
    // ... rest of logic
  }
  ```
- [ ] Implement limits:
  - [ ] Chat: 5 messages/day (free) vs unlimited (premium)
  - [ ] Workout plans: Basic (free) vs Advanced (premium)
  - [ ] Nutrition: Calorie calc only (free) vs Full plans (premium)
  - [ ] Progress: Basic charts (free) vs Advanced analytics (premium)
- [ ] Add @RequiresPremium() decorator:
  ```typescript
  @Injectable()
  export class PremiumGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
      const request = context.switchToHttp().getRequest();
      const user = request.user;
      
      if (!user.isPremium) {
        throw new ForbiddenException('Premium subscription required');
      }
      
      return true;
    }
  }
  ```
- [ ] Use guard on premium endpoints

**Acceptance Criteria:**
- ✅ Free users limited correctly
- ✅ Premium users have full access
- ✅ Clear error messages
- ✅ Includes upgrade link in errors

---

### Task 6.6: Landing Page
**Priority:** 🔴 Critical  
**Estimated Time:** 6 hours  
**Assignee:** Frontend Dev

#### Subtasks:
- [ ] Create Landing page (`/`)
- [ ] Implement all sections from design:
  - [ ] Hero (dark background, red accent)
  - [ ] Stats bar
  - [ ] Problem section (3 cards)
  - [ ] Solution section (Bento grid)
  - [ ] How It Works (3 steps)
  - [ ] Features (6 cards)
  - [ ] Testimonials (3 cards)
  - [ ] Pricing (3 plans)
  - [ ] Final CTA (red background)
  - [ ] Footer
- [ ] Add smooth scroll animations:
  ```bash
  pnpm add framer-motion
  ```
- [ ] Implement scroll-triggered animations:
  - [ ] Fade in on scroll
  - [ ] Slide up on scroll
  - [ ] Number counters for stats
- [ ] Add "Start Free Trial" CTA:
  - [ ] Redirects to `/signup`
- [ ] Make fully responsive
- [ ] Optimize images (lazy loading)
- [ ] Add meta tags (SEO)

**Acceptance Criteria:**
- ✅ All sections implemented
- ✅ Matches design exactly
- ✅ Animations smooth
- ✅ CTAs work
- ✅ Mobile responsive
- ✅ Fast loading (<3s)

**Design Reference:**
- `ai_fitness_coach_pencil_prompts_DARK.md` PAGE 1 (full landing page)

---

### Task 6.7: Pre-Launch Checklist
**Priority:** 🔴 Critical  
**Estimated Time:** 4 hours  
**Assignee:** Lead Dev

#### Subtasks:
- [ ] Testing:
  - [ ] Test all user flows end-to-end
  - [ ] Test payment flow (test cards)
  - [ ] Test free tier limits
  - [ ] Test AI responses quality
  - [ ] Test mobile responsiveness
  - [ ] Cross-browser testing (Chrome, Safari, Firefox)
- [ ] Performance:
  - [ ] Lighthouse score >90
  - [ ] API response times <500ms
  - [ ] Database query optimization
  - [ ] Image optimization
  - [ ] Bundle size optimization
- [ ] Security:
  - [ ] HTTPS enabled
  - [ ] CORS configured correctly
  - [ ] Environment variables secured
  - [ ] Rate limiting active
  - [ ] Input validation everywhere
  - [ ] SQL injection prevention (Prisma handles)
  - [ ] XSS prevention
- [ ] SEO:
  - [ ] Meta tags all pages
  - [ ] Open Graph tags
  - [ ] Sitemap generated
  - [ ] robots.txt configured
  - [ ] Analytics setup (Plausible/Posthog)
- [ ] Legal:
  - [ ] Privacy Policy page
  - [ ] Terms of Service page
  - [ ] Cookie consent (if needed)
  - [ ] Disclaimer (not medical advice)
- [ ] Monitoring:
  - [ ] Error tracking setup (Sentry)
  - [ ] Uptime monitoring
  - [ ] Performance monitoring
  - [ ] Database backups scheduled
- [ ] Documentation:
  - [ ] API documentation (Swagger)
  - [ ] README updated
  - [ ] Deployment guide
  - [ ] Environment variables documented

**Acceptance Criteria:**
- ✅ All tests pass
- ✅ Lighthouse >90
- ✅ Security checklist complete
- ✅ Legal pages live
- ✅ Monitoring active

---

### Task 6.8: Deployment
**Priority:** 🔴 Critical  
**Estimated Time:** 4 hours  
**Assignee:** DevOps

#### Subtasks:
- [ ] Frontend deployment (Vercel):
  - [ ] Connect GitHub repo
  - [ ] Configure build settings
  - [ ] Set environment variables
  - [ ] Deploy to production
  - [ ] Configure custom domain
  - [ ] Enable SSL
- [ ] Backend deployment (Railway/Render):
  - [ ] Connect GitHub repo
  - [ ] Configure build command
  - [ ] Set environment variables
  - [ ] Deploy to production
  - [ ] Configure custom domain
  - [ ] Enable SSL
- [ ] Database (Supabase/Railway):
  - [ ] Already set up from Phase 0
  - [ ] Run production migrations
  - [ ] Enable backups
  - [ ] Configure connection pooling
- [ ] Redis (Upstash):
  - [ ] Create production instance
  - [ ] Configure connection
- [ ] Stripe:
  - [ ] Switch to live mode
  - [ ] Update webhook endpoint
  - [ ] Test live payment
- [ ] Domain:
  - [ ] Point DNS to Vercel/Railway
  - [ ] Verify SSL certificates
- [ ] Email:
  - [ ] Configure email service (Resend/SendGrid)
  - [ ] Set up transactional emails
  - [ ] Test email delivery

**Acceptance Criteria:**
- ✅ Frontend live at custom domain
- ✅ Backend API accessible
- ✅ Database connected
- ✅ Stripe live mode working
- ✅ SSL enabled
- ✅ No errors in production

---

### Task 6.9: Launch
**Priority:** 🔴 Critical  
**Estimated Time:** Ongoing  
**Assignee:** Marketing/Growth

#### Subtasks:
- [ ] Pre-launch (1 week before):
  - [ ] Beta test with 10 users
  - [ ] Fix critical bugs
  - [ ] Collect testimonials
  - [ ] Prepare launch posts
  - [ ] Build email list (landing page)
- [ ] Launch Day:
  - [ ] Product Hunt launch (Tuesday/Wednesday)
  - [ ] Hacker News "Show HN" post
  - [ ] Reddit posts (r/fitness, r/loseit, r/Entrepreneur)
  - [ ] Twitter announcement thread
  - [ ] LinkedIn post
  - [ ] Email to waitlist
- [ ] Post-launch (Week 1):
  - [ ] Monitor analytics
  - [ ] Respond to feedback
  - [ ] Fix bugs quickly
  - [ ] Engage on social media
  - [ ] Track sign-ups and conversions
- [ ] Marketing ongoing:
  - [ ] Content marketing (blog posts)
  - [ ] SEO optimization
  - [ ] Social media presence
  - [ ] Community engagement
  - [ ] Influencer outreach

**Success Metrics (Week 1):**
- Target: 100 sign-ups
- Target: 10 paid conversions
- Target: Product Hunt top 5 of day
- Target: >4.5 rating on Product Hunt

---

## POST-MVP BACKLOG

### Features for V1.1 (Month 3-4)

#### 1. Enhanced Workout Logging
- [ ] Exercise video library (YouTube integration)
- [ ] Form check with GPT-4 Vision (upload video)
- [ ] Personal record notifications
- [ ] Workout templates (save custom workouts)
- [ ] Superset/circuit support
- [ ] Rest timer with notifications

#### 2. Advanced Analytics
- [ ] Body measurements tracking (chest, waist, arms)
- [ ] Progress photos (before/after comparison)
- [ ] Muscle group volume analysis
- [ ] Predicted 1RM calculator
- [ ] Training volume vs recovery correlation
- [ ] Export data to CSV

#### 3. Nutrition Enhancements
- [ ] Meal logging (track what you eat)
- [ ] Barcode scanner (food database)
- [ ] Recipe generator with images (DALL-E)
- [ ] Meal prep planner (batch cooking)
- [ ] Restaurant meal suggestions
- [ ] Water intake tracker

#### 4. Social Features
- [ ] Share workouts with friends
- [ ] Community challenges
- [ ] Leaderboards
- [ ] Workout buddies matching
- [ ] Coach marketplace (real trainers can use platform)

#### 5. Gamification (from Fitness Quest)
- [ ] XP system
- [ ] Levels (1-50)
- [ ] Achievements/Badges
- [ ] Streaks
- [ ] Classes (Warrior, Scout, Mage, Cleric)
- [ ] Weekly challenges

---

### Features for V1.2 (Month 5-6)

#### 1. Mobile App
- [ ] React Native app (iOS + Android)
- [ ] Offline workout logging
- [ ] Apple Health / Google Fit integration
- [ ] Push notifications
- [ ] Apple Watch app (workout tracking)

#### 2. AI Voice Chat
- [ ] Voice input (speech-to-text)
- [ ] Voice output (text-to-speech)
- [ ] Hands-free coaching during workouts

#### 3. Integrations
- [ ] Strava sync
- [ ] MyFitnessPal integration
- [ ] Fitbit / Garmin sync
- [ ] Spotify workout playlists
- [ ] Calendar integration (workout scheduling)

---

### Features for V2.0 (Month 7-12)

#### 1. Advanced AI
- [ ] Multi-modal AI (text + image + video)
- [ ] Workout form analysis (GPT-4 Vision)
- [ ] Personalized coaching style (adjust tone)
- [ ] Predictive analytics (injury prevention)
- [ ] Habit coaching (beyond fitness)

#### 2. Marketplace
- [ ] Sell custom programs
- [ ] Coach certification program
- [ ] Premium content library
- [ ] Affiliate program

#### 3. Team Features
- [ ] Team dashboards
- [ ] Coach accounts (manage multiple clients)
- [ ] Group training programs
- [ ] Corporate wellness programs

---

## PRIORITIES SUMMARY

### Must Have (MVP - Week 1-8):
🔴 Critical:
1. Authentication & Onboarding
2. AI Chat (with free tier limits)
3. Workout plan generation & display
4. Nutrition plan generation & display
5. Basic progress tracking (weight, workouts)
6. Stripe payment integration
7. Landing page
8. Deployment

### Should Have (V1.1 - Month 3-4):
🟡 High:
1. Workout logging with history
2. Advanced analytics (charts, PRs)
3. Recipe generator
4. Meal swapping
5. Progress photos

### Could Have (V1.2 - Month 5-6):
🟢 Medium:
1. Mobile app
2. Voice chat
3. Integrations
4. Social features

### Won't Have (V2.0+):
⚪ Low:
1. Marketplace
2. Multi-modal AI
3. Team features
4. Corporate programs

---

## DEVELOPMENT TIMELINE

```
Week 1: Setup & Infrastructure
├── Days 1-2: Monorepo setup
├── Days 3-4: Next.js + NestJS setup
└── Days 5-7: Database + Dev environment

Week 2: Authentication & Onboarding
├── Days 1-2: Auth backend
├── Days 3-4: Auth frontend
└── Days 5-7: Onboarding (8 steps)

Week 3: AI Integration (Part 1)
├── Days 1-2: OpenAI setup + Context building
├── Days 3-4: Chat backend
└── Days 5-7: Chat frontend

Week 4: AI Integration (Part 2)
├── Days 1-3: Workout plan generation
├── Days 4-5: Nutrition plan generation
└── Days 6-7: Integrate with onboarding

Week 5: Workout System
├── Days 1-2: Workout plan display
├── Days 3-5: Workout logging
└── Days 6-7: Dashboard integration

Week 6: Nutrition System
├── Days 1-3: Nutrition plan display
├── Days 4-5: Recipe generator
└── Days 6-7: Meal swapping

Week 7: Progress Tracking
├── Days 1-2: Weight logging
├── Days 3-4: Analytics backend
└── Days 5-7: Progress page frontend

Week 8: Payments & Launch
├── Days 1-2: Stripe setup
├── Days 3-4: Checkout & subscription
├── Days 5-6: Landing page
└── Day 7: Deploy & Launch 🚀
```

---

## TASK ESTIMATION SUMMARY

**Total MVP Time:** ~270 hours (8 weeks × 40 hours = 320 hours budget)

**Breakdown by Phase:**
- Phase 0: Setup (20 hours)
- Phase 1: Auth & Onboarding (26 hours)
- Phase 2: AI & Chat (37 hours)
- Phase 3: Workouts (26 hours)
- Phase 4: Nutrition (19 hours)
- Phase 5: Progress (19 hours)
- Phase 6: Payments & Launch (30 hours)
- Buffer: 50 hours (for unexpected issues)

**Team Composition (Recommended):**
- 1 Full-stack Developer (can do both FE and BE)
- OR:
  - 1 Frontend Developer (Next.js)
  - 1 Backend Developer (NestJS)

**Working Solo?**
Expect **10-12 weeks** for MVP instead of 8.

---

## NOTES

**Important Reminders:**
- Use PRD (`AI_FITNESS_COACH_PRD.md`) as single source of truth
- Use design prompts (`ai_fitness_coach_pencil_prompts_DARK.md`) for UI
- Test with real users early and often
- Don't skip security (auth, rate limits, input validation)
- Monitor costs (OpenAI API can get expensive)
- Keep code quality high (will save time later)

**Cost Estimates:**
- OpenAI API: ~$63/month (100 premium users)
- Infrastructure: ~$50/month (Vercel + Railway + Supabase)
- Stripe fees: 2.9% + $0.30 per transaction
- Total monthly cost (100 users): ~$115
- Revenue (100 users, 20% paid): $400/month
- **Profit: $285/month** (71% margin)

**At 500 users (Year 1 target):**
- Costs: ~$200/month
- Revenue (30% paid): $3,000/month
- **Profit: $2,800/month** (93% margin) 🎉

---

**Document Version:** 1.0  
**Status:** Ready for Development  
**Next Review:** After each phase completion

Good luck! 🚀💪
