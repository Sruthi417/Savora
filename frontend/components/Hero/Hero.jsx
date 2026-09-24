"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
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
    // icon: Banknote,
    // title: "Budget-Based Meals",
    // description: "Tell us your budget, and we'll find meals that fit.",
    img: "/her1.png",
  },
  {
    id: "craving",
    className: "craving-card",
    // icon: CakeSlice,
    // title: "Craving Something?",
    // description:
    //   "Sweet, spicy, healthy, or comforting — tell Savora what you're craving.",
    img: "/hero3.png",
  },
  {
    id: "nutrition",
    className: "nutrition-card",
    // icon: Beef,
    // title: "Your Nutrition Goal",
    // description: "Choose what you need — protein, calories, or balanced meals.",
    img: "/hero2.png",
    
  },
  {
    id: "pantry",
    className: "pantry-card",
    // icon: CookingPot,
    // title: "Cook With What You Have",
    // description:
    //   "Add your available ingredients and discover what you can make.",
    img: "/hero4.png",
  },
];

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
      {/* Background */}
      {/* <div className="hero-background-glow" /> */}

      {/* Hero Content */}
      <div className="hero-content">
        {/* <div className="hero-eyebrow">
          <Sparkles size={14} />
          <span>Your AI kitchen companion</span>
        </div> */}

        <h1 className="hero-title">
          Tell me what you have.
          <span>I&apos;ll figure out what to eat.</span>
        </h1>

        <p className="hero-description">
          Your budget, cravings, nutrition goals, or whatever&apos;s in your
          kitchen — Savora turns it into a meal that works for you.
        </p>

        <form className="hero-chat" onSubmit={handleSubmit}>
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
        </form>
      </div>

      {/* Hero Visual */}
      <div className="hero-visual">
        {/* White decorative rings */}
        <div className="hero-ring hero-ring-one" />
        <div className="hero-ring hero-ring-two" />
        <div className="hero-ring hero-ring-three" />

        {/* Orange glow */}
        <div className="hero-image-glow" />

        {/* Main Hero Image */}
        <div className="hero-main-image">
          <Image
            src="/hero-main.png"
            alt="Savora AI meal planner"
            fill
            priority
            sizes="(max-width: 650px) 240px, 420px"
          />
        </div>

        {/* Floating Cards */}
        <div className="hero-cards">
          {HERO_CARDS.map((card) => (
            <article key={card.id} className={`hero-card ${card.className}`}>
              <Image
                src={card.img}
                alt=""
                fill
                sizes="300px"
                className="hero-card-image"
              />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
