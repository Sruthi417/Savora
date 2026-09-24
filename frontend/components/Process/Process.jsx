"use client";

import "./Process.scss";

import Image from "next/image";
import { motion } from "framer-motion";

import {
  Utensils,
  Sparkles,
  CookingPot,
  CircleCheck,
} from "lucide-react";

const EASE = [0.22, 1, 0.36, 1];


// Header animation
const headerContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};


const item = {
  hidden: {
    opacity: 0,
    y: 24,
  },

  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: EASE,
    },
  },
};


// Step animation
const rowVariant = {
  hidden: {
    opacity: 0,
    y: 40,
  },

  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: EASE,
    },
  },
};


// Savora process steps
const STEPS = [
  {
    id: 1,

    title: "Tell Savora What You Have",

    image: "/process1.png",

    icon: Utensils,

    description:
      "Enter the ingredients you have, your cravings, or simply tell Savora what kind of meal you're looking for.",

    points: [
      "Quickly add your ingredients",
      "Share your cravings or preferences",
      "Tell Savora your budget or nutrition goal",
    ],
  },

  {
    id: 2,

    title: "Get Personalized Ideas",

    image: "/process2.png",

    icon: Sparkles,

    description:
      "Savora understands your inputs and suggests meals that match what you're looking for.",

    points: [
      "Personalized meal suggestions",
      "Budget-friendly options",
      "Nutrition-aware recommendations",
    ],
  },

  {
    id: 3,

    title: "Cook & Enjoy",

    image: "/process3.png",

    icon: CookingPot,

    description:
      "Choose a meal you like and get everything you need to prepare it at home.",

    points: [
      "Simple step-by-step recipes",
      "Ingredients and estimated cost",
      "Easy cooking instructions",
    ],
  },
];


const StepContent = ({ step }) => {
  const Icon = step.icon;

  return (
    <motion.div
      className="fs-content"
      variants={rowVariant}
      initial="hidden"
      whileInView="show"
      viewport={{
        once: true,
        amount: 0.25,
      }}
    >

      {/* Step icon */}
      <div className="fs-icon">
        <Icon
          size={22}
          strokeWidth={2}
          color="#ff7a00"
        />
      </div>


      {/* Step title */}
      <h3 className="fs-heading">
        {step.title}
      </h3>


      {/* Step description */}
      <p className="fs-description">
        {step.description}
      </p>


      {/* Step points */}
      <ul className="fs-list">

        {step.points.map((point) => (
          <li key={point}>

            <span className="fs-check">
              <CircleCheck
                size={18}
                strokeWidth={2}
                color="#ff7a00"
              />
            </span>

            <span>{point}</span>

          </li>
        ))}

      </ul>

    </motion.div>
  );
};


const StepImage = ({ image, title }) => (
  <motion.div
    className="fs-image"
    variants={rowVariant}
    initial="hidden"
    whileInView="show"
    viewport={{
      once: true,
      amount: 0.25,
    }}
  >

    <div className="fs-img-wrapper">

      <Image
        src={image}
        alt={title}
        fill
        className="fs-img"
        sizes="(max-width: 900px) 100vw, 560px"
      />

    </div>

  </motion.div>
);


export default function Process() {
  return (
    <section
      className="fs-section"
      id="get-started"
    >

      {/* ---------- Header ---------- */}

      <motion.div
        className="fs-head"
        variants={headerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{
          once: true,
          amount: 0.5,
        }}
      >

        {/* Badge */}

        <motion.div
          className="fs-eyebrow"
          variants={item}
        >
          <span className="fs-eyebrow-dot" />
          HOW SAVORA WORKS
        </motion.div>


        {/* Title */}

        <motion.h2
          className="fs-title"
          variants={item}
        >
          From Ingredients to
          <br />
          Delicious Meals
        </motion.h2>


        {/* Subtitle */}

        <motion.p
          className="fs-subtitle"
          variants={item}
        >
          Tell Savora what you have, get personalized meal ideas,
          and discover simple recipes you can actually make.
        </motion.p>

      </motion.div>


      {/* ---------- Steps ---------- */}

      <div className="fs-wrapper">

        {STEPS.map((step, index) => {

          const reverse = index % 2 === 1;

          return (
            <section
              key={step.id}
              className={`fs-row ${
                reverse ? "reverse" : ""
              }`}
            >

              {!reverse && (
                <>
                  <StepContent step={step} />

                  <StepImage
                    image={step.image}
                    title={step.title}
                  />
                </>
              )}


              {reverse && (
                <>
                  <StepImage
                    image={step.image}
                    title={step.title}
                  />

                  <StepContent step={step} />
                </>
              )}

            </section>
          );

        })}

      </div>

    </section>
  );
}