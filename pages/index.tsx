import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { Layout } from "../components/layout";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <Layout>
      <div className={styles.container}>
        <main className={styles.main}>
          <h1 className={styles.title}>Welcome to Video Games Center</h1>

          <p className={styles.description}>
            Get started by editing{" "}
            <code className={styles.code}>pages/index.tsx</code>
          </p>

          <div className={styles.grid}>
            <Link href="./games/allgames">
              <a className={styles.card}>
                <h2>All Games &rarr;</h2>
                <p>Find in-depth information about Next.js features and API.</p>
              </a>
            </Link>

            <Link href="./genres/genre">
              <a className={styles.card}>
                <h2>All Platforms</h2>
                <p>
                  Learn about Next.js in an interactive course with quizzes!
                </p>
              </a>
            </Link>

            <Link href="./genres/genre">
              <a className={styles.card}>
                <h2>All Genres</h2>
                <p>Discover and deploy boilerplate example Next.js projects.</p>
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
