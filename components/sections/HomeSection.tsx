"use client";

import { motion } from "framer-motion";

import { Ticker } from "@/components/ui/Ticker";
import { profile } from "@/data/profile";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay,
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

export function HomeSection() {
  return (
    <section id="home" className="page-gutter flex min-h-dvh flex-col justify-between pb-[calc(env(safe-area-inset-bottom)+1.5rem)] pt-[calc(env(safe-area-inset-top)+5.5rem)] sm:pt-[calc(env(safe-area-inset-top)+6rem)] lg:pb-6 lg:pt-[calc(env(safe-area-inset-top)+4.75rem)]">
      <div className="mx-auto grid w-full max-w-7xl flex-1 content-center gap-8 sm:gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-center">
        <div>
          <motion.p
            className="mb-4 text-xs uppercase tracking-[0.28em] text-muted sm:mb-6 sm:text-sm sm:tracking-[0.35em]"
            initial="hidden"
            animate="show"
            variants={fadeUp}
            custom={0.1}
          >
            Personal Homepage
          </motion.p>
          <motion.h1
            className="display-title max-w-5xl"
            initial="hidden"
            animate="show"
            variants={fadeUp}
            custom={0.2}
          >
            {profile.headline}
          </motion.h1>
          <motion.p
            className="mt-6 max-w-2xl text-lg leading-7 text-muted sm:mt-8 sm:text-xl sm:leading-8"
            initial="hidden"
            animate="show"
            variants={fadeUp}
            custom={0.35}
          >
            {profile.description}
          </motion.p>
        </div>
        <motion.div
          className="rounded-[2rem] border border-line bg-ink p-4 text-paper shadow-sm sm:rounded-[2.5rem] sm:p-6"
          initial="hidden"
          animate="show"
          variants={fadeUp}
          custom={0.45}
        >
          <div className="flex flex-col gap-6 rounded-[1.5rem] border border-paper/20 p-4 sm:gap-8 sm:rounded-[2rem] sm:p-6">
            <span className="text-xs uppercase tracking-[0.28em] text-paper/60 sm:text-sm sm:tracking-[0.35em]">Now</span>
            <p className="font-display text-3xl leading-tight sm:text-4xl">Reading, writing, and rebuilding this site.</p>
          </div>
        </motion.div>
      </div>
      <motion.div
        initial="hidden"
        animate="show"
        variants={fadeUp}
        custom={0.6}
      >
        <div className="bleed-gutter">
          <Ticker items={profile.ticker} />
        </div>
      </motion.div>
    </section>
  );
}
