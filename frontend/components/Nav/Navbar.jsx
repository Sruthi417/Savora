"use client";

import Image from "next/image";
import Link from "next/link";

import "./Navbar.scss";

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-inner">

        {/* Logo */}
        <Link href="/" className="navbar-logo">
          <Image
            src="/logo.png"
            alt="Savora"
            width={150}
            height={50}
            priority
          />
        </Link>

        {/* Center Navigation */}
        <nav className="navbar-links">
          <Link href="#features">Features</Link>
          <Link href="#process">Process</Link>
          <Link href="#faq">FAQ</Link>
        </nav>

        {/* Planner Button */}
        <Link href="/planner" className="planner-btn">
          Planner
        </Link>

      </div>
    </header>
  );
}