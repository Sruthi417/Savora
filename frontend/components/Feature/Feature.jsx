"use client";

import "./Feature.scss";
import Image from "next/image";
import { motion } from "framer-motion";
import { Squircle } from "@squircle-js/react";


const headVars = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.05,
    },
  },
};


const item = {
  hidden: {
    opacity: 0,
    y: 35,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};


// Savora features
const CARDS = [
  {
    img: "/card1.png",
    title: "Cook With What You Have",
    desc: "Tell Savora the ingredients in your kitchen and discover delicious meals you can make with them.",
  },
  {
    img: "/card2.png",
    title: "Meals Within Your Budget",
    desc: "Set your budget and get practical meal ideas using affordable ingredients you can cook at home.",
  },
  {
    img: "/card3.png",
    title: "Eat For Your Goal",
    desc: "Whether you want more protein, balanced meals, or something light, Savora plans food around your needs.",
  },
];


// Feature card
const FeatureCard = ({ card, index }) => {
  return (
    <Squircle
      asChild
      cornerRadius={28}
      cornerSmoothing={0.8}
    >
      <motion.div
        className="pp-card"
        initial={{
          opacity: 0,
          y: 60,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{
          once: true,
          amount: 0.2,
        }}
        transition={{
          duration: 0.65,
          delay: index * 0.12,
          ease: [0.22, 1, 0.36, 1],
        }}
      >

        <div className="pp-card-media">
          <Image
            src={card.img}
            alt={card.title}
            fill
            sizes="(max-width: 768px) 90vw, 380px"
            className="pp-card-img"
          />
        </div>

        <div className="pp-card-foot">
          <h3 className="pp-card-title">
            {card.title}
          </h3>

          <p className="pp-card-desc">
            {card.desc}
          </p>
        </div>

      </motion.div>
    </Squircle>
  );
};


const Services = () => {
  return (
    <section className="pp-sec" id="services">

      <div className="pp-wrap">

        <motion.div
          className="pp-heading"
          variants={headVars}
          initial="hidden"
          whileInView="show"
          viewport={{
            once: true,
            amount: 0.5,
          }}
        >

          <motion.div
            className="pp-badge"
            variants={item}
          >
            <span className="pp-badge-dot" />
            Your AI food assistant
          </motion.div>


          <motion.h2
            className="pp-title"
            variants={item}
          >
            Food Planning Made Simple
          </motion.h2>


          <motion.p
            className="pp-subtitle"
            variants={item}
          >
            From the ingredients in your kitchen to your budget
            and nutrition goals, Savora helps you figure out
            what to eat next.
          </motion.p>

        </motion.div>


        <div className="pp-cards">

          {CARDS.map((card, index) => (
            <FeatureCard
              key={card.title}
              card={card}
              index={index}
            />
          ))}

        </div>

      </div>

    </section>
  );
};


export default Services;