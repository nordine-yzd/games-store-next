import React from "react";
import { useUser } from "@auth0/nextjs-auth0";
import { Layout } from "../components/layout";
import styles from "../styles/Home.module.css";
import Image from "next/image";

export default function Profile() {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;
  console.log(user);

  return (
    user && (
      <Layout>
        <div className={styles.container}>
          <main className={styles.main}>
            <h2>User conected</h2>

            <div className={styles.grid}>
              <div className={styles.card}>
                <h2>mail : {user.name}</h2>
                <Image
                  src={`${user.picture}`}
                  alt="cover img"
                  width={150}
                  height={150}
                />
              </div>
            </div>
          </main>
        </div>
      </Layout>
    )
  );
}
