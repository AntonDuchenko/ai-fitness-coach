# PRODUCT REQUIREMENTS DOCUMENT (PRD)
# AI Fitness Coach - Your Personal AI Trainer & Nutritionist

**Document Version:** 1.0  
**Last Updated:** March 20, 2026  
**Product Owner:** [Your Name]  
**Target Launch:** Q2 2026 (May-June)  
**Status:** Ready for Development

---

## EXECUTIVE SUMMARY

### Product Vision
AI Fitness Coach — персональный фитнес-тренер и нутрициолог с искусственным интеллектом, который создает индивидуальные планы тренировок, подбирает питание и отвечает на любые вопросы 24/7, заменяя дорогого персонального тренера за $20/месяц вместо $400.

### The Problem
**Проблема, которую мы решаем:**
- **Персональные тренеры стоят $50-100/час** → недоступно для большинства ($400-800/месяц)
- **Готовые программы не работают** → generic подход, не учитывают индивидуальность
- **YouTube и блоги** → информационный перегруз, непонятно что выбрать
- **Нет с кем посоветоваться** → "Что делать если болит спина?", "Почему не растут мышцы?"
- **Существующие приложения** → просто трекеры, нет персонализации и советов

### The Solution
**AI-powered персональный тренер который:**
- Создает индивидуальные программы тренировок под твой уровень, цели, оборудование
- Рассчитывает персональное питание (калории, макросы, меню)
- Отвечает на любые вопросы в режиме чата (как настоящий тренер)
- Адаптируется в реальном времени (травмы, нехватка времени, плато)
- Помнит всю историю тренировок и прогресс
- Доступен 24/7 в кармане

### Market Opportunity
- **Personal Training Market:** $12B (только США)
- **Online Fitness Coaching:** $6B (растет 33% в год)
- **Nutrition Coaching:** $8B
- **Total Addressable Market:** $20B+ globally
- **Target Segment:** Люди которые хотят результатов но не могут платить $400/месяц за тренера

### Competitive Advantage
| Feature | Традиционный Тренер | Готовые Программы | ChatGPT | **AI Fitness Coach** |
|---------|---------------------|-------------------|---------|----------------------|
| Персонализация | ✅ Высокая | ❌ Нет | ⚠️ Частичная | ✅ Высокая |
| Цена | ❌ $400/мес | ✅ $10/мес | ✅ $20/мес | ✅ $20/мес |
| Доступность | ❌ По расписанию | ✅ 24/7 | ✅ 24/7 | ✅ 24/7 |
| Адаптивность | ✅ Высокая | ❌ Нет | ⚠️ Низкая | ✅ Высокая |
| Контекст/Память | ✅ Да | ❌ Нет | ❌ Нет | ✅ Да |
| Специализация | ✅ Да | ⚠️ Частичная | ❌ Нет | ✅ Да |
| Тренировки + Питание | ⚠️ Обычно раздельно | ⚠️ Редко вместе | ❌ Без структуры | ✅ Всё в одном |

### Business Model
**Freemium SaaS:**
- **Free Tier:** 5 сообщений/день, базовый workout plan, калькулятор калорий
- **Premium:** $20/месяц
  - Unlimited чат с AI
  - Полные персональные планы (workouts + nutrition)
  - Progress tracking & analytics
  - Recipe generator
  - Meal prep planner
  - Priority support

**Revenue Target:**
- Month 3: 50 users × 10% paid = 5 × $20 = **$100 MRR**
- Month 6: 100 users × 20% paid = 20 × $20 = **$400 MRR**
- Year 1: 500 users × 30% paid = 150 × $20 = **$3,000 MRR**

---

## 1. ЦЕЛЕВАЯ АУДИТОРИЯ

### Primary Audience
- **Возраст:** 25-45 лет
- **Доход:** $30K-100K+ (могут платить $20/мес)
- **Психография:**
  - Хотят быть в форме но нет времени/денег на тренера
  - Tech-savvy (комфортно с AI)
  - Ищут convenience и персонализацию
  - Ценят результаты больше чем "крутой интерфейс"
- **Фитнес-уровень:** Новички до среднего (продвинутые сами всё знают)
- **Геолокация:** Глобально, приоритет: США, Европа, страны СНГ

---

### User Personas

#### Persona 1: "Максим" — Занятой Программист (30 лет)
**Профиль:**
- Software Engineer, работает удаленно
- Зарплата: $60K/год
- Сидячий образ жизни, набрал 15кг за 3 года
- Хочет похудеть и быть здоровым
- Пробовал YouTube программы — бросил через 2 недели

**Goals:**
- Похудеть на 10-15кг
- Не терять мышцы в процессе
- Тренироваться дома (нет времени на зал)
- Простые рецепты (готовить не умеет)

**Pain Points:**
- Не знает с чего начать
- Информационный перегруз (YouTube, Reddit, блоги)
- Боится травм (неправильная техника)
- Нет accountability (бросает через 2 недели)
- $400/месяц на тренера — слишком дорого

**Quote:** *"Я потратил 20 часов на изучение фитнеса и до сих пор не знаю что мне делать. Платить $400 за тренера я не готов."*

**Job to be Done:**
- "Дай мне простой план что делать каждый день (тренировки + еда) и отвечай на вопросы когда застрял"

**How AI Coach Helps:**
- Onboarding за 5 минут → персональный план
- Тренировки дома с собственным весом
- Простые рецепты на 1500 калорий
- Чат доступен 24/7 для вопросов
- $20/месяц вместо $400

---

#### Persona 2: "Анна" — Молодая Мама (28 лет)
**Профиль:**
- Маркетинг менеджер + мама 2 детей
- Хочет вернуться в форму после родов
- Тренируется дома когда дети спят
- Бюджет ограничен (семья)

**Goals:**
- Сбросить вес после беременности
- Укрепить мышцы кора
- Короткие тренировки (20-30 минут)
- Правильное питание (готовит для всей семьи)

**Pain Points:**
- Нет времени на зал
- Дети могут прервать тренировку
- Не знает что можно/нельзя после родов
- Хочет быстрых результатов (мотивация падает)

**Quote:** *"Мне нужен тренер который понимает что у меня 20 минут между сном детей. Все программы рассчитаны на час в зале."*

**How AI Coach Helps:**
- Адаптивные тренировки 20-30 минут
- Упражнения без оборудования
- Советы по постродовому восстановлению
- Семейные рецепты (калорийность под нее)
- Чат когда нужна поддержка

---

#### Persona 3: "Дмитрий" — Начинающий Атлет (24 года)
**Профиль:**
- Студент/молодой специалист
- Ходит в зал 3 месяца
- Хочет набрать мышечную массу
- Сбит с толку противоречивой информацией

**Goals:**
- Набрать 5-7кг мышц
- Научиться правильной технике
- Понять как питаться для роста
- Не тратить деньги на спортпит (пока)

**Pain Points:**
- "Bro science" в зале — все советуют разное
- Не понимает как прогрессировать нагрузку
- Набирает жир вместе с мышцами
- Плато через 2 месяца

**Quote:** *"В зале все дают разные советы. Один говорит делать 5×5, другой 3×12. Кого слушать?"*

**How AI Coach Helps:**
- Программа на массу с прогрессией нагрузки
- Расчет калорий для чистого набора
- Ответы на конкретные вопросы (техника, питание)
- Корректировка плана если плато

---

## 2. PRODUCT GOALS & SUCCESS METRICS

### Business Goals
1. **Достичь Product-Market Fit** за 6 месяцев
2. **$1,000 MRR** к концу года 1
3. **20%+ Free-to-Paid конверсия** (выше чем у обычных SaaS)
4. **Построить базу 500+ пользователей** в год 1

### Product Goals
1. **AI качество на уровне настоящего тренера** — пользователи получают результаты
2. **Retention выше 60% на месяц** — люди не бросают
3. **Viral coefficient 1.2+** — каждый user приводит 1+ новых (word of mouth)

### Key Performance Indicators (KPIs)

#### Acquisition Metrics
| Metric | Month 1 | Month 3 | Month 6 | Year 1 |
|--------|---------|---------|---------|--------|
| Sign-ups | 20 | 50 | 100 | 500 |
| Organic % | 90% | 70% | 60% | 50% |
| Word of Mouth % | 10% | 30% | 40% | 50% |
| CAC | $0 | <$10 | <$20 | <$30 |

#### Engagement Metrics
| Metric | Target | Measurement |
|--------|--------|-------------|
| Messages per Active User | 10+ per week | Core action frequency |
| Daily Active Users (DAU) | 30% of total | Login daily |
| Weekly Active Users (WAU) | 60% of total | Login weekly |
| Avg Session Duration | 5-10 min | Time in app |

#### Retention Metrics
| Metric | Target | Why Important |
|--------|--------|---------------|
| Day 1 Retention | 70%+ | High initial value |
| Day 7 Retention | 50%+ | Habit formation |
| Day 30 Retention | 30%+ | True retention |
| Month 3 Retention | 20%+ | Product stickiness |

#### Monetization Metrics
| Metric | Month 1 | Month 6 | Year 1 |
|--------|---------|---------|--------|
| Free to Paid Conversion | 10% | 20% | 30% |
| MRR | $40 (2 paid) | $400 (20 paid) | $3,000 (150 paid) |
| ARPU | $20/mo | $20/mo | $20/mo |
| LTV | $240 (12mo) | $480 (24mo) | $720 (36mo) |
| Churn (monthly) | <15% | <10% | <8% |

#### Product Health Metrics
| Metric | Target | Why Important |
|--------|--------|---------------|
| Workout Plan Completion Rate | 60%+ | Users follow plans |
| Questions Answered Satisfactorily | 85%+ | AI quality |
| % Users Who Hit Goals | 40%+ | Product delivers results |
| NPS (Net Promoter Score) | 40+ | Word of mouth potential |

### Success Criteria for MVP Launch
✅ **20+ active users** in first week  
✅ **AI response quality rated 4+/5** by beta users  
✅ **50%+ Day 7 retention**  
✅ **10+ messages per active user** per week  
✅ **3+ paid conversions** in first month  
✅ **Zero critical AI hallucinations** (giving dangerous advice)

---

## 3. CORE FEATURES & USER STORIES

### Epic 1: User Onboarding & Profile

#### US-001: Complete Comprehensive Onboarding
**As a** new user  
**I want to** complete a detailed onboarding questionnaire  
**So that** AI can create a truly personalized fitness and nutrition plan for me

**Acceptance Criteria:**
- [ ] Onboarding accessible immediately after signup
- [ ] Cannot skip (required for personalization)
- [ ] Multi-step wizard with progress indicator

**Step 1: Basic Info**
- [ ] Age (number input, 16-80 range)
- [ ] Gender (Male / Female / Other / Prefer not to say)
- [ ] Height (cm or ft/in)
- [ ] Current Weight (kg or lbs)
- [ ] Target Weight (optional, only if goal is weight loss/gain)

**Step 2: Goals**
- [ ] Primary Goal (select one):
  - Lose Weight / Fat Loss
  - Build Muscle / Gain Mass
  - Get Toned / Recomp
  - Improve Health / Fitness
  - Athletic Performance
- [ ] Secondary Goals (select multiple, optional):
  - Increase Strength
  - Improve Endurance
  - Better Flexibility
  - Injury Recovery
  - Stress Relief

**Step 3: Experience Level**
- [ ] Fitness Experience:
  - Complete Beginner (never trained)
  - Beginner (trained <6 months)
  - Intermediate (trained 6mo-2yrs)
  - Advanced (trained 2+ years)
- [ ] Nutrition Knowledge:
  - No knowledge (don't count calories)
  - Basic (know about calories)
  - Intermediate (track macros sometimes)
  - Advanced (track everything)

**Step 4: Schedule & Availability**
- [ ] How many days per week can you train? (1-7)
- [ ] How long per session? (15min, 30min, 45min, 60min, 90min+)
- [ ] Preferred training time:
  - Morning (6-10am)
  - Midday (10am-2pm)
  - Afternoon (2-6pm)
  - Evening (6-10pm)
  - Flexible

**Step 5: Equipment & Location**
- [ ] Where will you train?
  - Home (no equipment)
  - Home (basic equipment: dumbbells, bands)
  - Home Gym (barbell, rack, bench)
  - Commercial Gym (full equipment)
  - Outdoor / Bodyweight
- [ ] Available Equipment (if home):
  - Checkboxes: Dumbbells, Barbell, Bench, Pull-up bar, Resistance bands, Kettlebells, etc.

**Step 6: Limitations & Health**
- [ ] Do you have any injuries or physical limitations? (textarea)
- [ ] Any medical conditions? (diabetes, heart conditions, etc.) (textarea)
- [ ] Are you taking any medications? (optional, textarea)
- [ ] Allergies or dietary restrictions? (textarea)
  - Common options: Vegetarian, Vegan, Gluten-free, Lactose intolerant, Nut allergy

**Step 7: Nutrition Preferences**
- [ ] How many meals per day do you prefer? (2-6)
- [ ] Do you cook? (Yes regularly / Sometimes / Rarely / Never)
- [ ] Preferred cuisine? (checkboxes: Italian, Asian, Mediterranean, American, etc.)
- [ ] Foods you dislike? (textarea, optional)
- [ ] Budget per day for food? ($5, $10, $15, $20, $25+)

**Step 8: Motivation & History**
- [ ] What motivated you to start? (textarea)
- [ ] Have you tried fitness programs before? (Yes / No)
  - If Yes: What happened? Why did you stop? (textarea)
- [ ] What's your biggest challenge with fitness? (select multiple):
  - Lack of time
  - Don't know what to do
  - Lack of motivation
  - No accountability
  - Previous injuries
  - Don't see results
  - Too expensive

**Final Screen:**
- [ ] Summary of profile
- [ ] "AI is generating your personalized plan... This will take 30-60 seconds"
- [ ] Loading animation
- [ ] On completion: redirect to Dashboard with plan ready

**Data Stored:**
```typescript
interface UserProfile {
  // Basic
  age: number;
  gender: 'male' | 'female' | 'other' | 'not_specified';
  height: number; // cm
  weight: number; // kg
  targetWeight?: number; // kg
  
  // Goals
  primaryGoal: 'weight_loss' | 'muscle_gain' | 'recomp' | 'health' | 'performance';
  secondaryGoals: string[];
  
  // Experience
  fitnessLevel: 'complete_beginner' | 'beginner' | 'intermediate' | 'advanced';
  nutritionKnowledge: 'none' | 'basic' | 'intermediate' | 'advanced';
  
  // Schedule
  trainingDaysPerWeek: number; // 1-7
  sessionDuration: number; // minutes
  preferredTime: string;
  
  // Equipment
  trainingLocation: 'home_none' | 'home_basic' | 'home_gym' | 'commercial_gym' | 'outdoor';
  equipment: string[]; // ['dumbbells', 'barbell', etc.]
  
  // Limitations
  injuries: string;
  medicalConditions: string;
  medications: string;
  dietaryRestrictions: string[];
  
  // Nutrition
  mealsPerDay: number; // 2-6
  cookingLevel: 'regular' | 'sometimes' | 'rarely' | 'never';
  cuisinePreferences: string[];
  dislikedFoods: string[];
  foodBudget: number; // USD per day
  
  // Motivation
  motivation: string;
  previousAttempts: boolean;
  previousAttemptsDetails: string;
  biggestChallenges: string[];
  
  // Metadata
  onboardingCompleted: boolean;
  onboardingCompletedAt: Date;
}
```

**AI Plan Generation:**
After onboarding, backend calls AI to generate:
1. Workout Plan (weekly split, exercises, sets/reps)
2. Nutrition Plan (calories, macros, meal ideas)
3. Initial motivation message

**Technical Notes:**
- Store all data in PostgreSQL `user_profiles` table
- Trigger async job to generate plan (NestJS queue)
- Use GPT-4 for plan generation (higher quality)
- Cache plan generation (similar profiles → similar plans)

---

#### US-002: View & Edit Profile
**As a** user  
**I want to** view and update my profile information  
**So that** AI can adjust my plan as my situation changes

**Acceptance Criteria:**
- [ ] Profile accessible from Settings or Dashboard
- [ ] All onboarding fields displayed
- [ ] Edit mode: click field to edit
- [ ] Save changes button
- [ ] On save:
  - Profile updated in database
  - AI notified of changes
  - Option to regenerate plan: "Your profile changed. Regenerate your plan?"
- [ ] Can update weight weekly (progress tracking)

---

### Epic 2: AI Chat Interface

#### US-003: Chat with AI Trainer
**As a** user  
**I want to** have a conversation with AI trainer  
**So that** I can ask questions and get personalized advice anytime

**Acceptance Criteria:**

**Chat Interface:**
- [ ] Chat page accessible from main navigation
- [ ] Clean chat UI similar to ChatGPT:
  - User messages: right-aligned, blue background
  - AI messages: left-aligned, gray background
- [ ] Message input:
  - Textarea that expands (max 3 lines before scroll)
  - Character limit: 1000 chars
  - "Send" button (disabled if empty)
  - Enter to send, Shift+Enter for new line
- [ ] Loading indicator while AI responds
- [ ] Messages display:
  - Markdown support (bold, lists, code blocks)
  - Auto-scroll to bottom on new message
  - Timestamp on hover
- [ ] Conversation history loads on page load (last 50 messages)
- [ ] "Load more" button for older messages

**Free Tier Limits:**
- [ ] 5 messages per day
- [ ] Message counter displayed: "3/5 messages left today"
- [ ] When limit reached: upsell modal
  - "You've reached your daily limit. Upgrade to Premium for unlimited messages."
  - [Upgrade to Premium] button
- [ ] Resets at midnight UTC

**Premium Tier:**
- [ ] Unlimited messages
- [ ] No counter displayed

**AI Behavior:**
- [ ] AI responds in user's language (auto-detect or profile setting)
- [ ] AI has context from user profile
- [ ] AI has context from conversation history (last 10 messages)
- [ ] AI can reference workout plan and nutrition plan
- [ ] AI can log workouts if user mentions completion
- [ ] AI suggests actions (e.g., "Would you like me to adjust your plan?")

**Safety & Quality:**
- [ ] AI never gives medical advice
- [ ] Disclaimer shown on first chat: "I'm an AI fitness coach, not a doctor. Consult medical professional for health issues."
- [ ] AI flags dangerous questions: "That sounds serious. Please consult a doctor."
- [ ] Response time <10 seconds (95th percentile)
- [ ] If AI unsure, says so honestly

**Example Conversations:**

**Example 1: Technique Question**
```
User: "Как правильно делать приседания? Колени болят."

AI: "Боль в коленях при приседаниях может быть из-за техники. Давай проверим:

1. **Глубина**: Колени не должны выходить за носки. Отводи таз назад, как будто садишься на стул.
2. **Стопы**: Расставь на ширине плеч, носки слегка врозь (10-15°).
3. **Нагрузка**: Начни с собственным весом, без штанги.

**Попробуй:**
- Гоблет-приседания с легкой гантелью (5-10кг)
- Приседания с эспандером вокруг колен (активирует ягодицы)

Если боль продолжается после исправления техники — проконсультируйся с врачом. Возможно, стоит временно заменить приседания на жим ногами или выпады.

Хочешь, чтобы я скорректировал твою программу?"
```

**Example 2: Nutrition Question**
```
User: "Не могу набрать вес, ем много но не расту"

AI: "Понимаю твою проблему! Давай разберемся:

**1. Считаешь калории?**
Часто кажется что "ем много", но на деле недобор. 

Твой профиль:
- Вес: 70кг
- Цель: набор массы
- TDEE: ~2400 ккал (поддержка)
- Для роста нужно: 2900-3000 ккал (+500)

**2. Проверь белок:**
Нужно минимум 140г белка в день (2г на кг веса).

**3. Жидкие калории:**
Попробуй смузи на 600-800 ккал:
- 300мл молока
- 2 банана
- 2 ложки арахисовой пасты
- 1 скуп протеина
= ~750 ккал

Хочешь, создам тебе meal plan на 3000 ккал?"
```

**Example 3: Motivation/Progress**
```
User: "Тренируюсь месяц, результатов нет, хочу бросить"

AI: "Понимаю твоё разочарование, но месяц — это очень мало! 

**Реальность фитнеса:**
- Видимые изменения: 6-8 недель минимум
- Серьезные результаты: 3-6 месяцев
- Первый месяц: адаптация организма

**Что уже произошло (даже если не видно):**
- Нервная система адаптировалась (техника лучше)
- Мышцы начали откликаться (сила растет?)
- Привычка формируется (ты не пропускал тренировки?)

**Давай проверим прогресс:**
- Стал ли ты сильнее? (вес на штанге вырос?)
- Изменился ли вес тела?
- Как себя чувствуешь? (энергия, сон, настроение)

Покажи мне твои текущие рабочие веса, сравним с началом месяца!"
```

**Technical Implementation:**

**Backend (NestJS):**
```typescript
// chat.controller.ts
@Post('send-message')
async sendMessage(@Body() dto: SendMessageDto, @User() user) {
  // 1. Check free tier limit
  if (!user.isPremium) {
    const todayMessages = await this.checkDailyLimit(user.id);
    if (todayMessages >= 5) {
      throw new ForbiddenException('Daily limit reached');
    }
  }
  
  // 2. Save user message
  await this.chatService.saveMessage({
    userId: user.id,
    role: 'user',
    content: dto.message,
  });
  
  // 3. Build context
  const context = await this.buildContext(user);
  // context includes:
  // - User profile
  // - Last 10 messages
  // - Current workout plan
  // - Current nutrition plan
  // - Recent workout logs
  
  // 4. Call AI
  const aiResponse = await this.aiService.generateResponse({
    userMessage: dto.message,
    context,
  });
  
  // 5. Save AI response
  await this.chatService.saveMessage({
    userId: user.id,
    role: 'assistant',
    content: aiResponse,
  });
  
  // 6. Return
  return { response: aiResponse };
}
```

**AI Service (using OpenAI):**
```typescript
async generateResponse({ userMessage, context }) {
  const systemPrompt = `You are a certified personal fitness trainer and nutritionist.

User Profile:
${JSON.stringify(context.profile, null, 2)}

Current Workout Plan:
${context.workoutPlan}

Current Nutrition Plan:
${context.nutritionPlan}

Recent Workouts:
${context.recentWorkouts}

Guidelines:
- Always respond in ${context.profile.language}
- Be supportive but honest
- Provide specific, actionable advice
- Reference user's profile and history
- If medical issue, recommend seeing doctor
- Use Markdown for formatting (bold, lists)
- Keep responses concise (300 words max unless asked for detail)

Previous conversation:
${context.conversationHistory}
`;

  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini', // cheaper, good enough for most questions
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userMessage },
    ],
    temperature: 0.7,
    max_tokens: 800,
  });
  
  return response.choices[0].message.content;
}
```

---

### Epic 3: Workout Plan Generation & Management

#### US-004: Generate Personalized Workout Plan
**As a** user  
**I want to** receive a personalized workout plan based on my profile  
**So that** I know exactly what to do each training day

**Acceptance Criteria:**

**Plan Generation (Backend):**
- [ ] Triggered after onboarding completion
- [ ] Uses GPT-4 (higher quality for plan generation)
- [ ] Generates weekly workout split based on:
  - Training days per week (3, 4, 5, etc.)
  - Session duration
  - Equipment available
  - Fitness level
  - Primary goal
  - Limitations/injuries

**Plan Structure:**
```typescript
interface WorkoutPlan {
  id: string;
  userId: string;
  weeklySchedule: WorkoutDay[];
  startDate: Date;
  durationWeeks: number; // e.g., 8-week program
  progressionScheme: string; // "Linear progression: +2.5kg/week"
  deloadWeek: number; // e.g., week 4
  notes: string; // Additional coach notes
}

interface WorkoutDay {
  dayOfWeek: string; // 'Monday', 'Wednesday', etc.
  focus: string; // 'Upper Body Push', 'Lower Body', 'Full Body', etc.
  duration: number; // minutes
  exercises: Exercise[];
}

interface Exercise {
  name: string; // 'Barbell Bench Press'
  muscleGroup: string; // 'Chest'
  sets: number;
  reps: string; // '8-10', '3x5', 'AMRAP', etc.
  rest: string; // '90 seconds', '2 min'
  notes: string; // 'Control eccentric, explosive concentric'
  videoUrl?: string; // YouTube tutorial link
  alternatives: string[]; // ['Dumbbell Bench Press', 'Push-ups']
}
```

**Example Generated Plan (Intermediate, 4 days/week, Gym access, Muscle Gain):**

```markdown
# 8-Week Muscle Building Program

## Weekly Split:
- **Monday**: Upper Body Push (Chest, Shoulders, Triceps)
- **Tuesday**: Lower Body (Quads, Hamstrings, Glutes)
- **Thursday**: Upper Body Pull (Back, Biceps)
- **Friday**: Lower Body + Accessories (Legs, Abs, Calves)

## Progression:
- Linear progression: Add +2.5kg when you hit top of rep range
- If you fail to hit reps 2 weeks in a row, deload 10%
- Deload week 4: 60% volume

---

### Monday - Upper Push

**1. Barbell Bench Press**
- 4 sets × 6-8 reps
- Rest: 2-3 min
- Notes: Lower to chest, pause 1 sec, press explosively
- Alternatives: Dumbbell Bench, Incline Barbell

**2. Overhead Press**
- 3 sets × 8-10 reps  
- Rest: 2 min
- Notes: Tight core, don't arch back excessively

**3. Incline Dumbbell Press**
- 3 sets × 10-12 reps
- Rest: 90 sec
- Notes: 30-45° bench angle

**4. Lateral Raises**
- 3 sets × 12-15 reps
- Rest: 60 sec
- Notes: Slight bend in elbow, control the eccentric

**5. Tricep Dips** (or Close-Grip Bench)
- 3 sets × 8-12 reps
- Rest: 90 sec

**6. Overhead Tricep Extension**
- 2 sets × 12-15 reps
- Rest: 60 sec

Total: ~60 minutes

---

[... Tuesday, Thursday, Friday plans similar structure ...]
```

**Plan Display (Frontend):**
- [ ] Workout Plan page shows weekly schedule
- [ ] Calendar view with days highlighted
- [ ] Click day → see exercises for that day
- [ ] Each exercise shows:
  - Name with muscle group
  - Sets × Reps
  - Rest period
  - Notes/form cues
  - Video tutorial link (YouTube embed or link)
  - "Mark as Complete" checkbox
- [ ] Progress tracking per exercise (log weights/reps)

**Plan Updates:**
- [ ] AI can regenerate plan if profile changes significantly
- [ ] User can request adjustments via chat
  - Example: "Knee hurts, replace squats"
  - AI modifies plan, saves new version

**Technical Notes:**
- Use GPT-4 for plan generation (better structure and detail)
- Prompt engineering critical (include examples of good plans)
- Store plan as JSON in database
- Version plans (user can see history)

---

#### US-005: Log Workout Completion
**As a** user  
**I want to** log my completed workouts with weights and reps  
**So that** I can track progress and AI can adjust my plan

**Acceptance Criteria:**
- [ ] "Start Workout" button on today's scheduled workout
- [ ] Workout logging interface:
  - List of exercises for today
  - Each exercise has input fields:
    - Weight used (kg or lbs)
    - Reps completed per set
    - Checkbox "Completed"
  - Notes field (optional): "How did it feel? Any issues?"
- [ ] Submit button: "Complete Workout"
- [ ] On submit:
  - Workout saved to database with timestamp
  - AI notified (can analyze progress)
  - Congratulations message
  - Streak updated (if applicable)

**Progress Tracking:**
- [ ] "Progress" page shows:
  - Weight progression per exercise (chart)
  - Volume (sets × reps × weight) over time
  - Personal records
  - Consistency (workouts per week)

**Technical Schema:**
```typescript
interface WorkoutLog {
  id: string;
  userId: string;
  workoutPlanId: string;
  workoutDayId: string;
  completedAt: Date;
  duration: number; // actual minutes
  exercises: ExerciseLog[];
  notes: string;
  rating: number; // 1-5 how it felt
}

interface ExerciseLog {
  exerciseName: string;
  sets: SetLog[];
  notes: string;
}

interface SetLog {
  setNumber: number; // 1, 2, 3, 4
  weight: number; // kg
  reps: number;
  rpe: number; // Rate of Perceived Exertion, 1-10 (optional)
}
```

---

### Epic 4: Nutrition Plan Generation & Tracking

#### US-006: Generate Personalized Nutrition Plan
**As a** user  
**I want to** receive a personalized nutrition plan  
**So that** I know how much and what to eat to reach my goals

**Acceptance Criteria:**

**Nutrition Calculation (Backend):**
- [ ] Calculate TDEE (Total Daily Energy Expenditure):
  ```
  BMR (Basal Metabolic Rate) = Mifflin-St Jeor Equation:
    Men: 10 × weight(kg) + 6.25 × height(cm) - 5 × age + 5
    Women: 10 × weight(kg) + 6.25 × height(cm) - 5 × age - 161
  
  TDEE = BMR × Activity Multiplier:
    Sedentary (office job, no training): 1.2
    Light (training 1-2x/week): 1.375
    Moderate (training 3-4x/week): 1.55
    Active (training 5-6x/week): 1.725
    Very Active (training 2x/day): 1.9
  ```

- [ ] Adjust for goal:
  ```
  Fat Loss: TDEE - 500 kcal (1kg/week loss)
  Maintenance: TDEE
  Muscle Gain: TDEE + 300-500 kcal (lean bulk)
  ```

- [ ] Calculate Macros:
  ```
  Protein: 2.0-2.2g per kg bodyweight (muscle preservation/growth)
  Fat: 0.8-1.0g per kg bodyweight (hormonal health)
  Carbs: Remaining calories (energy for training)
  
  Example (80kg male, muscle gain, TDEE 2400, goal 2900 kcal):
  Protein: 80kg × 2.2 = 176g × 4 kcal = 704 kcal
  Fat: 80kg × 1.0 = 80g × 9 kcal = 720 kcal
  Carbs: (2900 - 704 - 720) / 4 = 369g
  
  Daily: 2900 kcal | 176g protein | 80g fat | 369g carbs
  ```

**Meal Plan Generation:**
- [ ] AI generates sample daily meal plan:
  - Number of meals = user preference (3-6 meals)
  - Considers dietary restrictions (vegetarian, allergies, etc.)
  - Considers cooking level (simple recipes if can't cook)
  - Budget-friendly (uses user's budget)
  - Culturally appropriate (cuisine preferences)

**Example Generated Meal Plan:**

```markdown
# Personalized Nutrition Plan

**Daily Targets:**
- Calories: 2900 kcal
- Protein: 176g
- Fat: 80g
- Carbs: 369g

**Meal Split (4 meals):**
1. Breakfast: 700 kcal
2. Lunch: 900 kcal
3. Pre-Workout Snack: 400 kcal
4. Dinner: 900 kcal

---

## Sample Day 1

### Breakfast (700 kcal | 35g P | 20g F | 95g C)
**Oatmeal with Protein:**
- 80g oats
- 300ml milk (2%)
- 1 scoop whey protein (vanilla)
- 1 banana
- 1 tbsp peanut butter

**Prep:** Mix oats with milk, microwave 2min, add protein powder and toppings

---

### Lunch (900 kcal | 55g P | 25g F | 100g C)
**Chicken Rice Bowl:**
- 200g chicken breast (grilled)
- 150g white rice (cooked)
- Mixed vegetables (broccoli, peppers)
- 1 tbsp olive oil for cooking
- Soy sauce / spices

**Prep:** Meal prep on Sunday - grill 1kg chicken, cook rice, portion into containers

---

### Pre-Workout Snack (400 kcal | 25g P | 10g F | 50g C)
**Protein Smoothie:**
- 1 scoop whey protein
- 1 banana
- 200ml milk
- 1 tbsp peanut butter
- Ice

---

### Dinner (900 kcal | 61g P | 25g F | 124g C)
**Beef Pasta:**
- 120g ground beef (90% lean)
- 120g pasta (dry weight)
- Tomato sauce
- Parmesan cheese (20g)
- Side salad with olive oil dressing

---

## Alternative Meals

**Breakfast Options:**
1. Scrambled eggs (4 eggs) + toast + avocado
2. Greek yogurt (300g) + granola + berries
3. Protein pancakes (100g oats + 3 eggs + 1 scoop protein)

**Lunch Options:**
1. Tuna sandwich + fruit
2. Salmon + sweet potato + greens
3. Turkey wrap + hummus

**Dinner Options:**
1. Steak + rice + vegetables
2. Fish tacos + beans + salsa
3. Chicken curry + rice + naan

---

## Grocery List (Week 1)

**Proteins:**
- Chicken breast: 2kg
- Ground beef: 1kg
- Eggs: 24
- Whey protein: 1 tub
- Greek yogurt: 2kg

**Carbs:**
- Oats: 1kg
- Rice: 2kg
- Pasta: 500g
- Bread: 1 loaf
- Bananas: 10

**Fats:**
- Peanut butter: 1 jar
- Olive oil: 1 bottle
- Avocados: 4

**Vegetables:**
- Broccoli, peppers, spinach, tomatoes, lettuce

**Dairy:**
- Milk (2%): 4L
- Cheese: 200g

**Total Cost:** ~$60-80/week
```

**Nutrition Dashboard (Frontend):**
- [ ] Shows daily calorie and macro targets
- [ ] Sample meal plan with recipes
- [ ] Alternative meal options
- [ ] Grocery list generator
- [ ] "Ask AI for recipe" button (chat integration)

**Meal Logging (Post-MVP):**
- [ ] Log what you ate
- [ ] Track calories/macros
- [ ] See if you hit targets

**Technical Notes:**
- Use GPT-4 for meal plan generation (better recipes)
- Include detailed prompts with examples
- Store meal plan as JSON
- Regenerate if profile/goals change

---

#### US-007: Get AI Recipe Suggestions
**As a** user  
**I want to** ask AI for specific recipe suggestions  
**So that** I can have variety while hitting my macros

**Acceptance Criteria:**
- [ ] User can ask in chat: "Give me a high-protein dinner recipe"
- [ ] AI generates recipe with:
  - Ingredients list
  - Step-by-step instructions
  - Nutrition facts (calories, macros)
  - Prep and cook time
  - Servings
- [ ] AI considers user's dietary restrictions and preferences
- [ ] Recipes fit into user's macro targets

**Example:**
```
User: "Мне надоела курица. Дай рецепт с говядиной на ужин, ~60г белка"

AI: "Конечно! Вот отличный вариант:

**Говяжий стир-фрай с овощами**

**Макросы (1 порция):**
- Калории: 520 kcal
- Белки: 62g ✓
- Жиры: 18g
- Углеводы: 28g

**Ингредиенты:**
- 250г говядины (вырезка или филей)
- 200г брокколи
- 1 болгарский перец
- 100г грибов
- 2 зубчика чеснока
- 2 ст.л. соевого соуса
- 1 ст.л. оливкового масла
- Специи: имбирь, чили (опционально)

**Приготовление:**
1. Нарежь говядину тонкими полосками
2. Разогрей вок или сковороду на сильном огне
3. Обжарь говядину 3-4 минуты, отложи в сторону
4. В той же сковороде обжарь чеснок 30 сек
5. Добавь овощи, жарь 5 минут
6. Верни говядину, добавь соус, перемешай
7. Подавай с 100г риса (если нужны углеводы)

**Время:** 15 минут

Попробуешь сегодня?"
```

---

### Epic 5: Progress Tracking & Analytics

#### US-008: View Progress Dashboard
**As a** user  
**I want to** see visual charts of my progress  
**So that** I stay motivated and can identify trends

**Acceptance Criteria:**

**Dashboard includes:**

**1. Weight Tracking:**
- [ ] Line chart: weight over time
- [ ] Shows trend line (gaining/losing/maintaining)
- [ ] Weekly average (smooths daily fluctuations)
- [ ] Input field to log weight (quick access)

**2. Strength Progress:**
- [ ] Select exercise from dropdown
- [ ] Chart shows weight × reps over time
- [ ] Highlights personal records
- [ ] Shows estimated 1RM (one-rep max) progression

**3. Workout Consistency:**
- [ ] Calendar heatmap (like GitHub contributions)
- [ ] Shows workouts per week
- [ ] Current streak displayed
- [ ] Best streak all-time

**4. Volume Tracking:**
- [ ] Total volume (sets × reps × weight) per week
- [ ] Bar chart by muscle group
- [ ] Detects if under-training or over-training

**5. Body Measurements (Optional, Post-MVP):**
- [ ] Track: chest, waist, arms, legs
- [ ] Progress photos comparison

**Technical Implementation:**
```typescript
// Backend API
GET /api/progress/weight?period=3months
// Returns: { dates: [...], weights: [...], trend: 'losing' }

GET /api/progress/exercise/:exerciseId
// Returns: { dates: [...], maxWeight: [...], volume: [...], pr: [...] }

GET /api/progress/consistency?period=year
// Returns: { dates: [...], workouts: [...], streak: 12, bestStreak: 28 }
```

**Charts Library:**
- Frontend: Recharts (React charting library)
- Responsive, interactive
- Export as image (share progress)

---

### Epic 6: Monetization & Premium Features

#### US-009: Upgrade to Premium
**As a** free user  
**I want to** upgrade to Premium  
**So that** I can access unlimited messaging and advanced features

**Acceptance Criteria:**

**Pricing Page:**
- [ ] Accessible from navigation or upsell prompts
- [ ] Shows comparison:

| Feature | Free | Premium |
|---------|------|---------|
| AI Chat Messages | 5/day | ✅ Unlimited |
| Workout Plan | ✅ Basic | ✅ Advanced + Progression |
| Nutrition Plan | ✅ Calories only | ✅ Full meal plans |
| Progress Tracking | ✅ Basic | ✅ Advanced analytics |
| Recipe Generator | ❌ | ✅ Unlimited recipes |
| Meal Prep Planner | ❌ | ✅ Weekly meal prep |
| Priority Support | ❌ | ✅ 24h response time |
| **Price** | **Free** | **$20/month or $200/year** |

- [ ] "Upgrade Now" CTA button
- [ ] Testimonials from paid users (later)

**Payment Flow (Stripe):**
- [ ] Click "Upgrade" → redirect to Stripe Checkout
- [ ] Plans:
  - Monthly: $20/month
  - Annual: $200/year (save $40, 17% discount)
- [ ] After payment:
  - User.isPremium = true
  - Redirect to Dashboard
  - Welcome email: "Welcome to Premium!"
  - Chat unlocked (no message limit)

**Subscription Management:**
- [ ] Settings page shows:
  - Current plan (Free / Premium)
  - If Premium: next billing date, amount
  - "Manage Subscription" button (Stripe Customer Portal)
    - Can cancel, update payment method
  - "Cancel Subscription" link
    - Premium active until end of billing period
    - No partial refunds

**Upsell Triggers:**
- [ ] When free user hits 5 messages: modal with upgrade CTA
- [ ] After 7 days: email "You've been using AI Coach for a week. Upgrade to unlock full potential"
- [ ] When trying to access Premium feature: "This is a Premium feature. Upgrade to access."

**Technical Implementation:**
```typescript
// Backend: Stripe webhook handler
@Post('stripe/webhook')
async handleStripeWebhook(@Body() event) {
  switch (event.type) {
    case 'checkout.session.completed':
      // User subscribed
      await this.userService.setPremium(event.data.customer, true);
      break;
    
    case 'customer.subscription.deleted':
      // User cancelled
      await this.userService.setPremium(event.data.customer, false);
      break;
    
    case 'invoice.payment_failed':
      // Payment failed, send email
      await this.emailService.sendPaymentFailedEmail(event.data.customer);
      break;
  }
}
```

**Churn Reduction:**
- [ ] Exit survey when user cancels: "Why are you leaving?"
- [ ] Offer discount if cancelling: "Stay for $15/month?"
- [ ] Win-back email after 30 days: "We miss you! Come back for 50% off first month"

---

## 4. TECHNICAL ARCHITECTURE

### 4.1 Monorepo Structure

```
ai-fitness-coach/
├── apps/
│   ├── web/                    # Next.js frontend
│   │   ├── src/
│   │   │   ├── app/           # App router pages
│   │   │   ├── components/    # React components
│   │   │   ├── lib/          # Client utilities
│   │   │   └── styles/       # Global styles
│   │   ├── public/            # Static assets
│   │   ├── next.config.js
│   │   └── package.json
│   │
│   └── api/                    # NestJS backend
│       ├── src/
│       │   ├── modules/
│       │   │   ├── auth/      # Authentication
│       │   │   ├── users/     # User management
│       │   │   ├── chat/      # Chat with AI
│       │   │   ├── workouts/  # Workout plans & logs
│       │   │   ├── nutrition/ # Nutrition plans
│       │   │   ├── ai/        # AI service (OpenAI integration)
│       │   │   └── payments/  # Stripe integration
│       │   ├── common/        # Shared utilities
│       │   ├── config/        # Configuration
│       │   └── main.ts
│       ├── prisma/
│       │   ├── schema.prisma
│       │   └── migrations/
│       └── package.json
│
├── packages/                   # Shared packages
│   ├── types/                 # Shared TypeScript types
│   ├── ui/                    # Shared UI components (optional)
│   └── utils/                 # Shared utilities
│
├── package.json               # Root package.json (workspace)
├── turbo.json                 # Turborepo config
├── pnpm-workspace.yaml
└── README.md
```

### 4.2 Technology Stack

**Frontend (Next.js 14+):**
- Framework: Next.js 14 with App Router
- Language: TypeScript (strict mode)
- Styling: Tailwind CSS 3+
- UI Components: shadcn/ui
- State Management: Zustand (global state), React Context (local)
- Forms: React Hook Form + Zod validation
- Charts: Recharts
- Markdown: react-markdown
- API Client: Fetch API with custom wrapper

**Backend (NestJS 10+):**
- Framework: NestJS (Express underneath)
- Language: TypeScript (strict mode)
- Database: PostgreSQL 15+
- ORM: Prisma 5+
- Authentication: JWT (jsonwebtoken), bcrypt for passwords
- Validation: class-validator, class-transformer
- AI Integration: OpenAI SDK (GPT-4, GPT-4o-mini, GPT-3.5-turbo)
- Vector Database: Pinecone or Supabase pgvector (for RAG)
- Queue: Bull (Redis-based) for async jobs
- File Upload: Cloudinary (for user avatars, progress photos)
- Payments: Stripe SDK
- Email (Post-MVP): Resend or SendGrid

**Infrastructure:**
- Monorepo Tool: Turborepo (for fast builds)
- Package Manager: pnpm (workspace support)
- Hosting:
  - Frontend: Vercel
  - Backend: Railway or Render
  - Database: Supabase (PostgreSQL + pgvector) or Railway
  - Redis: Upstash (serverless Redis)
- CDN: Cloudinary for images
- Domain: Custom domain with SSL

**Development Tools:**
- Version Control: Git + GitHub
- Linter: ESLint
- Formatter: Prettier
- Testing: Jest (unit), Playwright (E2E)
- CI/CD: GitHub Actions
- Error Tracking: Sentry (Post-MVP)
- Analytics: Posthog (Post-MVP)

### 4.3 Database Schema (Prisma)

```prisma
// prisma/schema.prisma

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

// ============================================
// USER & AUTH
// ============================================

model User {
  id            String    @id @default(cuid())
  email         String    @unique
  passwordHash  String
  name          String?
  avatarUrl     String?
  
  // Subscription
  isPremium     Boolean   @default(false)
  stripeCustomerId String? @unique
  subscriptionId String?
  subscriptionStatus String? // 'active', 'canceled', 'past_due'
  subscriptionEndsAt DateTime?
  
  // Usage tracking (for free tier)
  messagesToday Int       @default(0)
  messagesResetAt DateTime @default(now())
  
  // Metadata
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  lastLoginAt   DateTime?
  
  // Relations
  profile       UserProfile?
  chatMessages  ChatMessage[]
  workoutPlans  WorkoutPlan[]
  workoutLogs   WorkoutLog[]
  nutritionPlans NutritionPlan[]
  weightLogs    WeightLog[]
  
  @@index([email])
  @@index([stripeCustomerId])
}

// ============================================
// USER PROFILE
// ============================================

model UserProfile {
  id        String @id @default(cuid())
  userId    String @unique
  user      User   @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  // Basic Info
  age       Int
  gender    String // 'male', 'female', 'other', 'not_specified'
  height    Float  // cm
  weight    Float  // kg (current)
  targetWeight Float? // kg
  
  // Goals
  primaryGoal String // 'weight_loss', 'muscle_gain', 'recomp', 'health', 'performance'
  secondaryGoals Json  // ['strength', 'endurance', etc.]
  
  // Experience
  fitnessLevel String // 'complete_beginner', 'beginner', 'intermediate', 'advanced'
  nutritionKnowledge String // 'none', 'basic', 'intermediate', 'advanced'
  
  // Schedule
  trainingDaysPerWeek Int // 1-7
  sessionDuration Int     // minutes
  preferredTime String    // 'morning', 'midday', 'afternoon', 'evening', 'flexible'
  
  // Equipment & Location
  trainingLocation String  // 'home_none', 'home_basic', 'home_gym', 'commercial_gym', 'outdoor'
  equipment Json           // ['dumbbells', 'barbell', etc.]
  
  // Health & Limitations
  injuries String?
  medicalConditions String?
  medications String?
  dietaryRestrictions Json // ['vegetarian', 'gluten_free', etc.]
  
  // Nutrition Preferences
  mealsPerDay Int        // 2-6
  cookingLevel String    // 'regular', 'sometimes', 'rarely', 'never'
  cuisinePreferences Json
  dislikedFoods Json
  foodBudget Float      // USD per day
  
  // Motivation & History
  motivation String
  previousAttempts Boolean
  previousAttemptsDetails String?
  biggestChallenges Json
  
  // Calculated values (cached)
  tdee Float?    // Total Daily Energy Expenditure
  bmr Float?     // Basal Metabolic Rate
  targetCalories Float?
  targetProtein Float?  // grams
  targetFat Float?      // grams
  targetCarbs Float?    // grams
  
  // Metadata
  onboardingCompleted Boolean @default(false)
  onboardingCompletedAt DateTime?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  @@index([userId])
}

// ============================================
// CHAT
// ============================================

model ChatMessage {
  id        String   @id @default(cuid())
  userId    String
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  role      String   // 'user' or 'assistant'
  content   String   @db.Text
  
  // Context used for this message (for debugging/improvement)
  contextUsed Json?
  
  // AI metadata
  model     String?  // 'gpt-4', 'gpt-3.5-turbo', etc.
  tokens    Int?     // token count
  cost      Float?   // cost in USD
  
  createdAt DateTime @default(now())
  
  @@index([userId, createdAt])
  @@index([userId])
}

// ============================================
// WORKOUT PLANS
// ============================================

model WorkoutPlan {
  id        String   @id @default(cuid())
  userId    String
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  name      String   // "8-Week Muscle Building Program"
  weeklySchedule Json // Array of WorkoutDay objects
  
  startDate DateTime
  durationWeeks Int
  progressionScheme String
  deloadWeek Int?
  notes     String?  @db.Text
  
  isActive  Boolean  @default(true)
  
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  // Relations
  workoutLogs WorkoutLog[]
  
  @@index([userId, isActive])
}

model WorkoutLog {
  id            String   @id @default(cuid())
  userId        String
  user          User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  workoutPlanId String?
  workoutPlan   WorkoutPlan? @relation(fields: [workoutPlanId], references: [id], onDelete: SetNull)
  
  workoutName   String   // "Upper Push", "Lower Body"
  exercises     Json     // Array of ExerciseLog objects
  
  completedAt   DateTime @default(now())
  duration      Int?     // actual minutes
  rating        Int?     // 1-5 how it felt
  notes         String?  @db.Text
  
  createdAt     DateTime @default(now())
  
  @@index([userId, completedAt])
  @@index([userId])
}

// ============================================
// NUTRITION PLANS
// ============================================

model NutritionPlan {
  id        String   @id @default(cuid())
  userId    String
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  name      String   // "Muscle Gain Meal Plan"
  
  // Targets
  dailyCalories Float
  proteinGrams  Float
  fatGrams      Float
  carbsGrams    Float
  
  // Meal structure
  mealsPerDay Int
  mealPlan    Json     // Array of Meal objects with recipes
  groceryList Json     // Shopping list
  
  isActive    Boolean  @default(true)
  
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  @@index([userId, isActive])
}

// ============================================
// PROGRESS TRACKING
// ============================================

model WeightLog {
  id        String   @id @default(cuid())
  userId    String
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  weight    Float    // kg
  date      DateTime @default(now())
  notes     String?
  
  createdAt DateTime @default(now())
  
  @@unique([userId, date])
  @@index([userId, date])
}

// ============================================
// PAYMENTS (Stripe)
// ============================================

model StripeEvent {
  id        String   @id @default(cuid())
  eventId   String   @unique // Stripe event ID
  type      String   // 'checkout.session.completed', etc.
  data      Json     // Full event data
  processed Boolean  @default(false)
  createdAt DateTime @default(now())
  
  @@index([eventId])
  @@index([processed])
}
```

### 4.4 API Architecture (NestJS)

**Modular Structure:**

```
api/src/modules/
├── auth/
│   ├── auth.controller.ts    # POST /auth/signup, /auth/login, etc.
│   ├── auth.service.ts
│   ├── strategies/
│   │   └── jwt.strategy.ts
│   └── guards/
│       └── jwt-auth.guard.ts
│
├── users/
│   ├── users.controller.ts   # GET /users/me, PATCH /users/me
│   ├── users.service.ts
│   └── dto/
│       └── update-user.dto.ts
│
├── chat/
│   ├── chat.controller.ts    # POST /chat/send, GET /chat/history
│   ├── chat.service.ts
│   └── chat.gateway.ts       # WebSocket for real-time (optional)
│
├── ai/
│   ├── ai.service.ts         # Core AI logic (OpenAI calls)
│   ├── context.service.ts    # Build context for AI
│   ├── prompts/
│   │   ├── trainer.prompt.ts
│   │   ├── workout-plan.prompt.ts
│   │   └── nutrition-plan.prompt.ts
│   └── embeddings.service.ts # Vector embeddings (RAG)
│
├── workouts/
│   ├── workouts.controller.ts
│   ├── workouts.service.ts
│   ├── plans.service.ts      # Generate workout plans
│   └── logs.service.ts       # Log workouts
│
├── nutrition/
│   ├── nutrition.controller.ts
│   ├── nutrition.service.ts
│   ├── calculations.service.ts # TDEE, macros
│   └── recipes.service.ts
│
└── payments/
    ├── payments.controller.ts
    ├── stripe.service.ts
    └── webhooks.controller.ts # Stripe webhooks
```

**Key Services:**

**AI Service (ai.service.ts):**
```typescript
@Injectable()
export class AiService {
  constructor(private configService: ConfigService) {}
  
  private openai = new OpenAI({
    apiKey: this.configService.get('OPENAI_API_KEY'),
  });
  
  async generateChatResponse(params: {
    userMessage: string;
    context: any;
    model?: string;
  }) {
    const systemPrompt = this.buildSystemPrompt(params.context);
    
    const response = await this.openai.chat.completions.create({
      model: params.model || 'gpt-4o-mini', // Default to cheaper model
      messages: [
        { role: 'system', content: systemPrompt },
        ...params.context.conversationHistory,
        { role: 'user', content: params.userMessage },
      ],
      temperature: 0.7,
      max_tokens: 800,
    });
    
    return response.choices[0].message.content;
  }
  
  async generateWorkoutPlan(profile: UserProfile) {
    const prompt = buildWorkoutPlanPrompt(profile);
    
    const response = await this.openai.chat.completions.create({
      model: 'gpt-4', // Use GPT-4 for higher quality plans
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.8,
      max_tokens: 3000,
      response_format: { type: 'json_object' }, // Structured output
    });
    
    return JSON.parse(response.choices[0].message.content);
  }
  
  async generateNutritionPlan(profile: UserProfile, calories: number, macros: any) {
    const prompt = buildNutritionPlanPrompt(profile, calories, macros);
    
    const response = await this.openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.8,
      max_tokens: 3000,
      response_format: { type: 'json_object' },
    });
    
    return JSON.parse(response.choices[0].message.content);
  }
  
  private buildSystemPrompt(context: any): string {
    return `You are a certified personal fitness trainer and nutritionist with 10+ years of experience.

**User Profile:**
${JSON.stringify(context.profile, null, 2)}

**Current Workout Plan:**
${context.workoutPlan || 'Not yet created'}

**Current Nutrition Plan:**
${context.nutritionPlan || 'Not yet created'}

**Recent Workouts (last 5):**
${JSON.stringify(context.recentWorkouts, null, 2)}

**Guidelines:**
- Always respond in ${context.language || 'English'}
- Be supportive, motivational, but honest
- Provide specific, actionable advice based on user's profile
- Reference user's history and progress when relevant
- If question is medical/serious injury: recommend seeing a doctor
- Use Markdown formatting for readability (bold, lists, etc.)
- Keep responses concise (200-400 words) unless detail requested
- Never give dangerous advice (e.g., extreme diets, unsafe exercises)

**Conversation History (last 10 messages):**
${context.conversationHistory.map(m => `${m.role}: ${m.content}`).join('\n')}
`;
  }
}
```

**Context Service (context.service.ts):**
```typescript
@Injectable()
export class ContextService {
  constructor(
    private prisma: PrismaService,
    private workoutService: WorkoutService,
    private nutritionService: NutritionService,
  ) {}
  
  async buildContext(userId: string) {
    // Fetch all relevant data in parallel
    const [profile, conversationHistory, currentWorkoutPlan, currentNutritionPlan, recentWorkouts] = await Promise.all([
      this.prisma.userProfile.findUnique({ where: { userId } }),
      this.prisma.chatMessage.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
        take: 20, // Last 20 messages (10 pairs)
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
      conversationHistory: conversationHistory.reverse(), // Chronological order
      workoutPlan: currentWorkoutPlan,
      nutritionPlan: currentNutritionPlan,
      recentWorkouts,
      language: profile?.language || 'en',
    };
  }
}
```

### 4.5 Cost Optimization Strategy

**AI API Costs (Biggest expense):**

**Model Selection:**
```typescript
// Decision tree for model selection
function selectModel(messageType: string): string {
  // GPT-4: Higher quality, more expensive ($0.03/1K tokens)
  if (messageType === 'plan_generation') {
    return 'gpt-4'; // Workout/nutrition plan generation
  }
  
  // GPT-4o-mini: Good balance ($0.15/1M input, $0.6/1M output)
  if (messageType === 'complex_question') {
    return 'gpt-4o-mini'; // Detailed technique explanations
  }
  
  // GPT-3.5-turbo: Cheapest ($0.5/1M input, $1.5/1M output)
  return 'gpt-3.5-turbo'; // Simple questions, general chat
}
```

**Cost Calculation Example:**

100 Premium users × 30 messages/day × 30 days = 90,000 messages/month

Using GPT-3.5-turbo:
- Average: 500 input tokens + 300 output tokens per message
- Input: 90K × 500 = 45M tokens = $22.50
- Output: 90K × 300 = 27M tokens = $40.50
- **Total: ~$63/month**

Revenue: 100 users × $20 = $2,000/month
Gross margin: 96.8% 🎉

**Optimization Techniques:**

1. **Caching:**
```typescript
// Cache similar questions
const cacheKey = hashQuestion(userMessage);
const cached = await redis.get(cacheKey);
if (cached) return cached;

const response = await ai.generate(...);
await redis.setex(cacheKey, 3600, response); // 1 hour cache
```

2. **Prompt Compression:**
```typescript
// Don't send full workout plan if not relevant
if (!questionAboutWorkouts(userMessage)) {
  delete context.workoutPlan; // Save 500-1000 tokens
}
```

3. **Token Limits:**
```typescript
// Truncate conversation history
const recentMessages = conversationHistory.slice(-10); // Only last 10
```

4. **Batch Processing:**
```typescript
// Generate all weekly meals in one API call instead of 7 separate calls
const weeklyMeals = await ai.generateMealPlan({ days: 7 });
```

---

## 5. GO-TO-MARKET STRATEGY

### 5.1 Launch Plan

**Pre-Launch (2 weeks before):**
- [ ] Build landing page with email capture
- [ ] Post on Reddit (r/fitness, r/loseit, r/gainit) - soft launch, no spam
- [ ] Ask 10 friends to try beta
- [ ] Collect testimonials

**Launch Week:**
- [ ] Product Hunt launch (Tuesday or Wednesday)
- [ ] Post on Hacker News "Show HN: AI Fitness Coach"
- [ ] Reddit launch posts with value (not spam)
- [ ] Twitter/X announcement
- [ ] Email beta users: "We're live!"

**Post-Launch (ongoing):**
- [ ] Content marketing (blog posts, Medium articles)
- [ ] SEO optimization
- [ ] Community engagement (Reddit, forums)
- [ ] Influencer outreach (micro-influencers)

### 5.2 Acquisition Channels

**Primary (MVP focus):**
1. **Reddit** - r/fitness (20M), r/loseit (3M), r/gainit (400K)
2. **Product Hunt** - Tech-savvy early adopters
3. **Word of Mouth** - Best customers bring more customers
4. **Content Marketing** - Blog posts, tutorials, comparisons

**Secondary (Post-MVP):**
5. **SEO** - "AI personal trainer", "free workout plan generator"
6. **YouTube** - Tutorial videos, app walkthroughs
7. **Partnerships** - Fitness YouTubers, influencers
8. **Paid Ads** - Google, Facebook (when profitable)

### 5.3 Pricing Experiments

**Month 1-3: Test pricing:**
- Start: $20/month
- If conversion <5%: lower to $15
- If conversion >15%: raise to $25
- Find sweet spot

**Annual Plan Discount:**
- $200/year (17% off) vs $240 if monthly
- Tests show annual plans improve LTV significantly

**Student Discount (Post-MVP):**
- 50% off ($10/month) with .edu email
- Acquire young users, hope they stay after graduation

---

## 6. SUCCESS METRICS & MILESTONES

### Month 1: Foundation
**Target:**
- [ ] 20 sign-ups
- [ ] 10 Daily Active Users
- [ ] 2 paid conversions ($40 MRR)
- [ ] 50%+ Day 7 retention
- [ ] 4+/5 AI quality rating

### Month 3: Validation
**Target:**
- [ ] 50 total users
- [ ] 10 paid users ($200 MRR)
- [ ] 40%+ Day 30 retention
- [ ] 10+ user testimonials
- [ ] NPS score 30+

### Month 6: Growth
**Target:**
- [ ] 100 total users
- [ ] 20 paid users ($400 MRR)
- [ ] 30%+ paid conversion
- [ ] Product-Market Fit signals clear

### Year 1: Scale
**Target:**
- [ ] 500 total users
- [ ] 150 paid users ($3,000 MRR)
- [ ] 30%+ paid conversion
- [ ] Profitable (revenue > costs)
- [ ] Clear roadmap for $10K MRR

---

## 7. ROADMAP

### MVP (Month 1-2):
- [ ] User auth & onboarding
- [ ] AI chat (with free tier limits)
- [ ] Workout plan generation
- [ ] Nutrition plan generation
- [ ] Basic progress tracking (weight log)
- [ ] Stripe payment integration

### V1.1 (Month 3-4):
- [ ] Workout logging
- [ ] Advanced progress charts
- [ ] Recipe generator
- [ ] Meal prep planner
- [ ] Email notifications

### V1.2 (Month 5-6):
- [ ] Mobile app (React Native)
- [ ] Progress photos
- [ ] Body measurements tracking
- [ ] Exercise video library
- [ ] Social sharing

### V2.0 (Month 7-12):
- [ ] AI voice chat (speech-to-text)
- [ ] Workout form check (video analysis with GPT-4 Vision)
- [ ] Community features (forums, groups)
- [ ] Marketplace (sell meal plans, workout programs)
- [ ] Coach dashboard (for real trainers to use AI as assistant)

---

## 8. RISKS & MITIGATIONS

### Risk 1: AI Gives Bad/Dangerous Advice
**Mitigation:**
- Comprehensive system prompts with safety guidelines
- Testing with fitness professionals
- Disclaimer: "Not medical advice"
- User reporting of bad responses
- Regular prompt improvements

### Risk 2: OpenAI API Costs Too High
**Mitigation:**
- Use cheaper models (GPT-3.5-turbo) for most queries
- Caching frequently asked questions
- Prompt compression techniques
- Move to self-hosted LLaMA if needed (later)

### Risk 3: Users Don't Convert to Paid
**Mitigation:**
- Strong free tier (demonstrate value)
- Clear premium benefits
- Pricing experiments
- User interviews to understand blockers

### Risk 4: Retention Too Low
**Mitigation:**
- Email reminders ("Don't lose your streak")
- Push notifications (mobile app)
- Gamification (badges, streaks)
- Community features (social accountability)

### Risk 5: Solo Developer Burnout
**Mitigation:**
- Strict MVP scope (no feature creep)
- Use existing libraries/services
- 2-month realistic timeline
- Celebrate small wins

---

## 9. OUT OF SCOPE (MVP)

**Not in MVP:**
- ❌ Mobile app (web only for MVP)
- ❌ Social features (community, friends)
- ❌ Meal logging/tracking
- ❌ Integrations (MyFitnessPal, Strava, etc.)
- ❌ Video exercise library
- ❌ Form check (video analysis)
- ❌ Voice chat
- ❌ Wearable integration (Apple Watch, Fitbit)
- ❌ Marketplace
- ❌ Multi-language (English + Russian only for MVP)

**Deferred to Post-MVP:**
- Email notifications
- Progress photos
- Body measurements
- Advanced analytics
- Export data

---

## 10. APPENDIX: AI IMPLEMENTATION GUIDELINES

### For Cursor / AI Assistants

**Setup Priority:**
1. Initialize monorepo with Turborepo
2. Setup Next.js (apps/web)
3. Setup NestJS (apps/api)
4. Setup Prisma + PostgreSQL
5. Configure OpenAI API

**Implementation Order:**
1. **Week 1-2:** Auth + Onboarding + User Profile
2. **Week 3-4:** AI Chat + Context Building
3. **Week 5-6:** Workout Plan Generation + Display
4. **Week 7-8:** Nutrition Plan + Payments

**Critical Files to Create First:**
```
apps/api/src/modules/ai/ai.service.ts
apps/api/src/modules/ai/prompts/trainer.prompt.ts
apps/api/src/modules/ai/context.service.ts
```

**Business Logic Must-Follow:**
- TDEE calculations exact (Mifflin-St Jeor equation)
- Macro calculations exact (protein 2g/kg, fat 1g/kg)
- Free tier: exactly 5 messages/day, reset at midnight UTC
- Premium check before every AI call

**Don't Deviate From:**
- AI model selection logic (use GPT-3.5 for most, GPT-4 for plans)
- System prompt structure (must include profile, history, plans)
- Free tier limits (5 messages, not 4 or 6)
- Pricing ($20/month Premium)

**Ask for Clarification If:**
- User requests feature not in PRD
- Technical approach has multiple options
- AI safety concern (prompt might produce bad advice)

---

## DOCUMENT END

**Version:** 1.0  
**Status:** Ready for Development  
**Next Review:** After MVP Launch

**Approvals:**
- [ ] Product Owner
- [ ] Tech Lead

This PRD is the single source of truth for AI Fitness Coach development.
