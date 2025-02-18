"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import styles from "./nav-menu.module.css";
import { signOut, signIn, useSession } from "next-auth/react";

const Navbar = () => {
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <nav className={styles.navbar}>
      <div className={styles["left-section"]}>
        <Link href="/" className={styles["logo-link"]}>
          <img src="/images/logo.jpeg" alt="Logo" className={styles.logo} />
          <span className={styles["app-name"]}>Eventify</span>
        </Link>
      </div>

      <div className={styles["right-section"]}>
        <Link
          href="/dashboard"
          className={`${styles["nav-link"]} ${
            pathname === "/dashboard" ? styles.active : ""
          }`}
        >
          Dashboard
        </Link>
        {session && session?.user?.name} <br />
        {session ? (
          <button onClick={() => signOut()} className={styles["logout-button"]}>
            Sign out
          </button>
        ) : (
          <button onClick={() => signIn()} className={styles["logout-button"]}>
            Sign in
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
