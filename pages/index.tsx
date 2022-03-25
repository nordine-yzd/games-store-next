import type { NextPage } from "next";

import Link from "next/link";
import { Layout } from "../components/layout";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <Layout>
      <div className={styles.container}>
        <main className={styles.main}>
          <h1 className={styles.title}>Welcome to Video Games Center</h1>

          {/* <p className={styles.description}>
            Get started by editing{" "}
            <code className={styles.code}>pages/index.tsx</code>
          </p> */}

          <div className={styles.grid}>
            <Link href="/games/1">
              <a className={styles.card}>
                <h2>All Games &rarr;</h2>
              </a>
            </Link>

            <Link href="/platforms/1">
              <a className={styles.card}>
                <h2>All Platforms</h2>
              </a>
            </Link>

            <Link href="/genres/1">
              <a className={styles.card}>
                <h2>All Genres</h2>
              </a>
            </Link>
          </div>
        </main>
        {/* <footer className={styles.footer}>
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Powered by{" "}
          </a>
        </footer> */}
      </div>
    </Layout>
  );
};

export default Home;
