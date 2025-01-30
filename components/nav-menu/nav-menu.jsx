"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./nav-menu.module.css";
import { signOut, signIn, useSession } from "next-auth/react";

const Navbar = () => {
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <nav className={styles.navbar}>
      <div className={styles.leftSection}>
        <Link href="/" className={styles.logoLink}>
          <img src="/images/logo.jpeg" alt="Logo" className={styles.logo} />
          <span className={styles.appName}>Eventify</span>
        </Link>
      </div>

      <div className={styles.rightSection}>
        <Link
          href="/dashboard"
          className={`${styles.navLink} ${
            pathname === "/dashboard" ? styles.active : ""
          }`}
        >
          Go Create Event
        </Link>
        {session && session?.user?.name} <br />
        {session ? (
          <button onClick={() => signOut()} className={styles.logoutButton}>
            Sign out
          </button>
        ) : (
          <button onClick={() => signIn()} className={styles.logoutButton}>
            Sign in
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
