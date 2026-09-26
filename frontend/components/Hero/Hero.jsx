"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowUp,
  ArrowRight,
  Banknote,
  Beef,
  CakeSlice,
  CookingPot,
  Sparkles,
} from "lucide-react";

import { useAuth } from "@/hooks/useAuth";
import { loginWithGoogle } from "@/api/auth.api";

import "./Hero.scss";

const HERO_CARDS = [
  {
    id: "budget",
    className: "budget-card",
    img: "/her1.png",
  },
  {
    id: "craving",
    className: "craving-card",
    img: "/hero3.png",
  },
  {
    id: "nutrition",
    className: "nutrition-card",
    img: "/hero2.png",
  },
  {
    id: "pantry",
    className: "pantry-card",
    img: "/hero4.png",
  },
];

// Title / description / chat box cascade in, one after another
const contentVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.1,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

// Main dish image rises in shortly after the text above it
const imageVariants = {
  hidden: { opacity: 0, y: 50 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] },
  },
};

// Floating cards pop in one after another, once the image has landed
const cardsVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.85,
    },
  },
};

const cardPop = {
  hidden: { opacity: 0, scale: 0.6, y: 16 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    // Slight overshoot on the ease for a "pop" feel.
    transition: { duration: 0.55, ease: [0.34, 1.56, 0.64, 1] },
  },
};

export default function Hero() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const [question, setQuestion] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmedQuestion = question.trim();

    if (!trimmedQuestion) return;

    if (isAuthenticated) {
      router.push(`/planner?prompt=${encodeURIComponent(trimmedQuestion)}`);
    } else {
      loginWithGoogle(trimmedQuestion);
    }
  };
  return (
    <section className="hero">
      {/* Hero Content */}
      <motion.div
        className="hero-content"
        variants={contentVariants}
        initial="hidden"
        animate="show"
      >
        <motion.h1 className="hero-title" variants={fadeUp}>
          Tell me what you have.
          {" "}
          <span className="hero-title-highlight">
            I&apos;ll figure out what to eat.
          </span>
        </motion.h1>

        <motion.p className="hero-description" variants={fadeUp}>
          Your budget, cravings, nutrition goals, or whatever&apos;s in your
          kitchen — Savora turns it into a meal that works for you.
        </motion.p>

        <motion.form
          className="hero-chat"
          variants={fadeUp}
          onSubmit={handleSubmit}
        >
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask anything you want... 🥗"
            rows={1}
          />

          <button
            type="submit"
            className="hero-chat-send"
            disabled={!question.trim()}
            aria-label="Send question"
          >
            <ArrowUp size={18} strokeWidth={2.5} />
          </button>
        </motion.form>
      </motion.div>

      {/* Hero Visual */}
      <div className="hero-visual">
        {/* White decorative rings */}
        <div className="hero-ring hero-ring-one" />
        <div className="hero-ring hero-ring-two" />
        <div className="hero-ring hero-ring-three" />

        {/* Orange glow */}
        <div className="hero-image-glow" />

        {/* Main Hero Image */}
        <motion.div
          className="hero-main-image"
          variants={imageVariants}
          initial="hidden"
          animate="show"
        >
          <Image
            src="/hero-main.png"
            alt="Savora AI meal planner"
            fill
            priority
            sizes="(max-width: 650px) 240px, 420px"
          />
        </motion.div>

        {/* Floating Cards */}
        <motion.div
          className="hero-cards"
          variants={cardsVariants}
          initial="hidden"
          animate="show"
        >
          {HERO_CARDS.map((card) => (
            <motion.article
              key={card.id}
              className={`hero-card ${card.className}`}
              variants={cardPop}
            >
              <Image
                src={card.img}
                alt=""
                fill
                sizes="300px"
                className="hero-card-image"
              />
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
