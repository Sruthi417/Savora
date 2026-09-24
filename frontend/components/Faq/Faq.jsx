"use client";

import "./Faq.scss";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { Squircle } from "@squircle-js/react";

const EASE = [0.22, 1, 0.36, 1];

/* ================= ANIMATIONS ================= */

const container = {
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

/* ================= SAVORA FAQS ================= */

const DEFAULT_FAQS = [
  {
    q: "What is Savora?",
    a: "Savora is an AI-powered meal planner that helps you decide what to eat based on the ingredients you have, your budget, cravings, nutrition goals, and preferences.",
  },

  {
    q: "Can Savora suggest meals using ingredients I already have?",
    a: "Yes. Tell Savora what ingredients you have at home, and it can suggest meals you can prepare using them along with suitable recipes.",
  },

  {
    q: "Can I plan meals within a specific budget?",
    a: "Yes. You can tell Savora your budget, and it can suggest practical homemade meals using affordable ingredients while considering your spending limit.",
  },

  {
    q: "Can Savora suggest meals based on my nutrition goals?",
    a: "Yes. You can mention goals such as eating more protein, having balanced meals, or choosing lighter options. Savora uses these preferences when suggesting meals.",
  },

  {
    q: "Can I get a recipe for the meal I choose?",
    a: "Yes. Once you choose a meal, Savora can provide the ingredients, estimated cost, and simple step-by-step cooking instructions.",
  },

  {
    q: "Can Savora suggest food based on my location?",
    a: "When you allow location access, Savora can use your general location to make food suggestions more regionally relevant. You can also use Savora without sharing your location.",
  },
];

/* ================= FAQ COMPONENT ================= */

const Faq = ({
  faqs = DEFAULT_FAQS,

  title = "Frequently Asked",

  highlight = "Questions",

  sub = "Everything you need to know about planning meals, discovering recipes, and eating better with Savora.",
}) => {
  const [open, setOpen] = useState(null);

  return (
    <section className="faq-sec" id="faq">

      <div className="faq-grid">

        {/* ==================================================
            LEFT COLUMN
        ================================================== */}

        <motion.div
          className="faq-left"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{
            once: true,
            amount: 0.4,
          }}
        >

          {/* Badge */}

          <motion.div
            className="faq-tag"
            variants={item}
          >
            <span className="faq-tag-dot" />
            FAQ
          </motion.div>


          {/* Title */}

          <motion.h2
            className="faq-title"
            variants={item}
          >
            {title}{" "}

            <span className="faq-hl">

              <motion.span
                className="faq-hl-bg"
                initial={{
                  scaleX: 0,
                }}
                whileInView={{
                  scaleX: 1,
                }}
                viewport={{
                  once: true,
                  amount: 0.6,
                }}
                transition={{
                  duration: 0.6,
                  delay: 0.4,
                  ease: EASE,
                }}
              />

              <span className="faq-hl-tx">
                {highlight}
              </span>

            </span>
          </motion.h2>


          {/* Subtitle */}

          <motion.p
            className="faq-sub"
            variants={item}
          >
            {sub}
          </motion.p>

        </motion.div>


        {/* ==================================================
            RIGHT COLUMN — FAQ ACCORDION
        ================================================== */}

        <motion.div
          className="faq-list"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{
            once: true,
            amount: 0.15,
          }}
        >

          {faqs.map((faq, index) => {

            const isOpen = open === index;

            return (
              <Squircle
                asChild
                key={index}
                cornerRadius={28}
                cornerSmoothing={0.8}
              >

                <motion.div
                  className={`faq-item ${
                    isOpen ? "open" : ""
                  }`}
                  variants={item}
                >

                  {/* Question */}

                  <button
                    type="button"
                    className="faq-q"
                    aria-expanded={isOpen}
                    onClick={() =>
                      setOpen(
                        isOpen
                          ? null
                          : index
                      )
                    }
                  >

                    {/* Number */}

                    <span className="faq-number">
                      {index + 1}
                    </span>


                    {/* Question text */}

                    <span className="faq-q-text">
                      {faq.q}
                    </span>


                    {/* Plus button */}

                    <Squircle
                      asChild
                      cornerRadius={24}
                      cornerSmoothing={0.8}
                    >

                      <span className="faq-toggle">

                        <Plus
                          size={23}
                          strokeWidth={1.8}
                        />

                      </span>

                    </Squircle>

                  </button>


                  {/* Answer */}

                  <AnimatePresence
                    initial={false}
                  >

                    {isOpen && (

                      <motion.div
                        className="faq-a-wrap"
                        initial={{
                          height: 0,
                          opacity: 0,
                        }}
                        animate={{
                          height: "auto",
                          opacity: 1,
                        }}
                        exit={{
                          height: 0,
                          opacity: 0,
                        }}
                        transition={{
                          duration: 0.35,
                          ease: EASE,
                        }}
                      >

                        <p className="faq-a">
                          {faq.a}
                        </p>

                      </motion.div>

                    )}

                  </AnimatePresence>

                </motion.div>

              </Squircle>
            );
          })}

        </motion.div>

      </div>

    </section>
  );
};

export default Faq;