import { GetServerSideProps } from "next";
import styles from "../../styles/Home.module.css";
import Link from "next/link";
import Image from "next/image";
import { Layout } from "../../components/layout";

// This gets called on every request
export const getServerSideProps: GetServerSideProps = async (request) => {
  const response = await fetch(`http://videogame-api.fly.dev/platforms  `);
  const games = await response.json();

  // Pass data to the page via props
  return {
    props: {
      games: games,
    },
  };
};

type AllPlatformsTyped = {
  platforms: {
    id: string;
    name: string;
    slug: string;
    category: string;
    platforms: {
      id: string;
      name: string;
    }[];
    logo: {
      url: string;
      width: string | number;
      height: string | number;
    };
  }[];
};

const AllPlatforms: React.FC<{ games: AllPlatformsTyped }> = ({ games }) => {
  return (
    <Layout>
      <div className={styles.container}>
        <main className={styles.main}>
          <div className={styles.grid}>
            {games.platforms.map((element) => {
              // console.log(element.logo);
              return element.logo ? (
                <Link key={element.id} href="/">
                  <a>
                    <div className={styles.card}>
                      {/* <h2>{element.name}</h2> */}
                      <Image
                        src={element.logo.url}
                        alt="logo img"
                        width={160}
                        height={160}
                      />
                    </div>
                  </a>
                </Link>
              ) : (
                <Link key={element.id} href="/">
                  <a className={styles.card}>
                    <div className={styles.card}>
                      <h2>{element.name}</h2>
                      {/* <Image
                        src="/no-logo-game.png"
                        alt="nologo img"
                        width={160}
                        height={160}
                      /> */}
                    </div>
                  </a>
                </Link>
              );
            })}
          </div>
        </main>
      </div>
    </Layout>
  );
};

export default AllPlatforms;
