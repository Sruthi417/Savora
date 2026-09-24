"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useAuth } from "@/hooks/useAuth";
import { loginWithGoogle } from "@/api/auth.api";

import "./Navbar.scss";

export default function Navbar() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  const handlePlannerClick = (e) => {
    e.preventDefault();

    if (isAuthenticated) {
      router.push("/planner");
    } else {
      loginWithGoogle();
    }
  };

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
        <Link
          href="/planner"
          className="planner-btn"
          onClick={handlePlannerClick}
        >
          Planner
        </Link>

      </div>
    </header>
  );
}
