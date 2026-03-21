"use client";

import {
  Activity,
  Dumbbell as DumbbellIcon,
  Flame,
  Heart,
  MessageSquare,
} from "lucide-react";

const card =
  "absolute rounded-2xl border border-white/[0.06] bg-[#161618]/90 backdrop-blur-xl";

const days = ["M", "T", "W", "T", "F", "S", "S"];
const bars = [20, 35, 28, 45, 38, 55, 64];
const barColors = [
  "bg-primary/40",
  "bg-primary/60",
  "bg-primary/50",
  "bg-primary/70",
  "bg-primary/60",
  "bg-gradient-to-t from-primary to-blue-400",
  "bg-gradient-to-t from-primary to-blue-400",
];

export function FloatingCards() {
  return (
    <>
      {/* Streak — left */}
      <div
        className={`${card} left-[11%] top-[40%] flex items-center gap-2 rounded-[14px] px-3.5 py-3`}
      >
        <span className="text-xl">🔥</span>
        <div>
          <p className="font-heading text-[22px] font-bold text-white">
            14 days
          </p>
          <p className="text-[11px] text-slate-500">Current streak</p>
        </div>
      </div>

      {/* Calories — bottom-left */}
      <div
        className={`${card} left-[4%] top-[59%] flex w-[200px] flex-col gap-2 p-4`}
      >
        <div className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-gradient-to-br from-success to-emerald-400">
          <Flame className="size-[18px] text-white" />
        </div>
        <p className="font-heading text-[28px] font-bold text-white">2,450</p>
        <p className="text-xs text-slate-400">Calories burned today</p>
        <div className="h-1 w-full rounded-full bg-white/[0.08]">
          <div className="h-1 w-[70%] rounded-full bg-gradient-to-r from-success to-emerald-400" />
        </div>
      </div>

      {/* Weekly Progress — center */}
      <div
        className={`${card} left-[35%] top-[50%] flex w-[280px] flex-col gap-3 p-4`}
      >
        <div className="flex items-center justify-between">
          <p className="text-[13px] font-semibold text-white">
            Weekly Progress
          </p>
          <span className="rounded-full bg-success/20 px-2 py-0.5 text-[10px] font-medium text-success">
            <Activity className="mr-1 inline size-3" />
            +18%
          </span>
        </div>
        <div className="flex items-end gap-1.5" style={{ height: 64 }}>
          {bars.map((h, i) => (
            <div
              key={days[i]}
              className={`flex-1 rounded-sm ${barColors[i]}`}
              style={{ height: h }}
            />
          ))}
        </div>
        <div className="flex gap-1.5">
          {days.map((d, i) => (
            <span
              key={d + String(i)}
              className={`flex-1 text-center text-[10px] font-medium ${i >= 5 ? "text-primary" : "text-slate-500"}`}
            >
              {d}
            </span>
          ))}
        </div>
      </div>

      {/* Workout — right */}
      <div
        className={`${card} right-[4%] top-[48%] flex w-[220px] flex-col gap-2.5 p-4`}
      >
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-gradient-to-br from-primary to-blue-400">
            <DumbbellIcon className="size-[18px] text-white" />
          </div>
          <div>
            <p className="text-sm font-semibold text-white">Upper Body Power</p>
            <p className="text-[11px] text-slate-500">Today&apos;s workout</p>
          </div>
        </div>
        <div className="flex gap-4 text-xs text-slate-400">
          <span>45 min</span>
          <span>8 exercises</span>
        </div>
      </div>

      {/* AI Chat — bottom center (purple) */}
      <div
        className={`${card} left-[33%] top-[78%] flex w-[240px] flex-col gap-2.5 p-3.5`}
      >
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-violet-400">
            <MessageSquare className="size-3.5 text-white" />
          </div>
          <p className="text-xs font-semibold text-violet-400">AI Coach</p>
        </div>
        <p className="text-[11px] leading-relaxed text-slate-300">
          Great job! Your upper body strength increased by 12% this week. Ready
          for today&apos;s session?
        </p>
      </div>

      {/* Heart Rate — top right */}
      <div
        className={`${card} right-[2%] top-[18%] flex w-[120px] flex-col gap-1 rounded-xl p-3`}
      >
        <div className="flex items-center gap-1.5">
          <Heart className="size-3.5 text-red-500" />
          <span className="text-[13px] font-semibold text-white">128 bpm</span>
        </div>
        <p className="text-[10px] text-slate-500">Heart rate</p>
      </div>

      {/* Weekly Goal — right side */}
      <div
        className={`${card} right-[1%] top-[27%] flex w-[160px] flex-col gap-2 rounded-[14px] p-3.5`}
      >
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-violet-400">
            <Activity className="size-3.5 text-white" />
          </div>
          <p className="text-xs font-semibold text-white">Weekly Goal</p>
        </div>
        <p className="text-[11px] text-slate-400">4 of 5 workouts</p>
        <div className="h-1 w-full rounded-full bg-white/[0.08]">
          <div className="h-1 w-[80%] rounded-full bg-gradient-to-r from-violet-500 to-violet-400" />
        </div>
      </div>

      {/* Body Stats — bottom right */}
      <div
        className={`${card} right-[3%] top-[63%] flex w-[180px] flex-col gap-2.5 rounded-[14px] p-3.5`}
      >
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-amber-500 to-amber-400">
            <Flame className="size-3.5 text-white" />
          </div>
          <p className="text-xs font-semibold text-white">Body Stats</p>
        </div>
        <div className="flex justify-between text-[11px]">
          <span className="text-slate-500">Weight</span>
          <span className="font-semibold text-white">78.5 kg</span>
        </div>
        <div className="flex justify-between text-[11px]">
          <span className="text-slate-500">Body Fat</span>
          <span className="font-semibold text-success">15.2%</span>
        </div>
        <div className="flex justify-between text-[11px]">
          <span className="text-slate-500">Muscle</span>
          <span className="font-semibold text-white">42.1 kg</span>
        </div>
      </div>

      {/* Decorative rings */}
      <div className="absolute right-[5%] top-[7%] size-[180px] rounded-full border border-primary/[0.12]" />
      <div className="absolute right-[3%] top-[9%] size-[140px] rounded-full border border-primary/[0.08]" />
      <div className="absolute -left-[4%] top-[72%] size-[200px] rounded-full border border-success/[0.08]" />
    </>
  );
}
