"use client";

import "./Footer.scss";

import Image from "next/image";
import Link from "next/link";

import {
  FaInstagram,
  FaLinkedinIn,
  FaGithub,
  FaXTwitter,
} from "react-icons/fa6";

import { Mail, ArrowRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="footer">
      {/* =====================================================
          NEWSLETTER
      ===================================================== */}

      <div className="footer-newsletter">
        {/* Food Image */}

        <div className="footer-newsletter-image">
          <Image
            src="/footer.png"
            alt="Savora food"
            fill
            sizes="(max-width: 768px) 100vw, 40vw"
            className="footer-food-image"
          />
        </div>

        {/* Newsletter Content */}

        <div className="footer-newsletter-content">
          <span className="footer-newsletter-label">SAVORA</span>

          <h2>
            Get delicious ideas
            <br />
            delivered to you.
          </h2>

          <p>
            Get meal inspiration, cooking ideas, and helpful food tips straight
            to your inbox.
          </p>

          {/* Email Form */}

          <form className="footer-newsletter-form">
            <div className="footer-input-wrapper">
              <Mail size={17} />

              <input
                type="email"
                placeholder="Enter your email"
                aria-label="Email address"
              />
            </div>

            <button type="submit">
              Subscribe
              <ArrowRight size={16} />
            </button>
          </form>

          <span className="footer-newsletter-note">
            No spam. Just good food ideas.
          </span>
        </div>
      </div>

      {/* =====================================================
          FOOTER MAIN
      ===================================================== */}

      <div className="footer-main">
        {/* Brand */}

        <div className="footer-brand">
          <Link href="/" className="footer-logo">
            <Image
              src="/logo.png"
              alt="Savora"
              width={160}
              height={60}
              priority
            />
          </Link>

          <p>
            Your AI-powered meal planner for smarter, easier, and more delicious
            everyday meals.
          </p>

          {/* Socials */}

          <div className="footer-socials">
            <a href="#" aria-label="Instagram">
              <FaInstagram size={18} />
            </a>

            <a href="#" aria-label="Twitter">
              <FaXTwitter size={18} />
            </a>

            <a href="#" aria-label="LinkedIn">
              <FaLinkedinIn size={18} />
            </a>

            <a href="#" aria-label="GitHub">
              <FaGithub size={18} />
            </a>
          </div>
        </div>

        {/* Explore */}

        <div className="footer-column">
          <h3>Explore</h3>

          <Link href="/">Home</Link>

          <Link href="/#features">Features</Link>

          <Link href="/#how-it-works">How It Works</Link>

          <Link href="/#faq">FAQ</Link>
        </div>

        {/* Savora */}

        <div className="footer-column">
          <h3>Savora</h3>

          <Link href="/planner">AI Planner</Link>

          <Link href="/#features">Meal Planning</Link>

          <Link href="/#how-it-works">How Savora Works</Link>

          <Link href="/#about">About Savora</Link>
        </div>

        {/* Contact */}

        <div className="footer-column footer-contact">
          <h3>Contact Us</h3>

          <a href="mailto:hello@savora.ai">
            <Mail size={17} />
            hello@savora.ai
          </a>

          {/* <a href="tel:+919876543210">
            <Phone size={17} />
            +91 98765 43210
          </a> */}
        </div>
      </div>

      {/* =====================================================
          BOTTOM BAR
      ===================================================== */}

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Savora. All rights reserved.</p>

        <div className="footer-legal">
          <Link href="/privacy">Privacy Policy</Link>

          <Link href="/terms">Terms of Use</Link>

          <Link href="/cookies">Cookies</Link>
        </div>
      </div>
    </footer>
  );
}
