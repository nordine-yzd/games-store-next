import { GetServerSideProps } from "next";
import styles from "../../styles/Home.module.css";
import Link from "next/link";
import Image from "next/image";
import { Layout } from "../../components/layout";
import React from "react";

type AllGamesTyped = {
  games: {
    id: string;
    name: string;
    slug: string;
    category: string;
    platforms: {
      id: string;
      name: string;
    }[];
    cover: {
      height: string | number;
      url: string;
      width: string | number;
    };
  }[];
};

// This gets called on every request
export const getServerSideProps: GetServerSideProps = async (request) => {
  const reqParam = JSON.stringify(request.params);
  const slugString = reqParam.slice(13, reqParam.length - 2);
  let slug: number = parseInt(slugString);

  const reg = new RegExp("^[0-9]*$");
  if (reg.test(slugString) == false) {
    slug = 1;
  }

  const response = await fetch(
    `http://videogame-api.fly.dev/games?page=${slug}`
  );
  const game = await response.json();

  // Pass data to the page via props
  return {
    props: {
      game: game,
      slug: slug,
    },
  };
};

const AllGames: React.FC<{ game: AllGamesTyped; slug: number }> = ({
  game,
  slug,
}) => {
  const next = slug + 1;
  const previous = slug - 1;

  return (
    <Layout>
      <div className={styles.container}>
        <main className={styles.main}>
          <div className={styles.grid}>
            {game.games.map((element) => {
              return element.cover ? (
                <Link key={element.id} href="/">
                  <a>
                    <div className={styles.card}>
                      <h2>{element.name}</h2>
                      <Image
                        src={element.cover.url}
                        alt="cover img"
                        width={250}
                        height={300}
                      />
                    </div>
                  </a>
                </Link>
              ) : (
                <Link key={element.id} href="/">
                  <a>
                    <div className={styles.card}>
                      <h2>{element.name}</h2>
                      <Image
                        src="/no-cover-game.png"
                        alt="nocover img"
                        width={250}
                        height={300}
                      />
                    </div>
                  </a>
                </Link>
              );
            })}
          </div>
        </main>
        {slug === 1 ? (
          <div>
            <Link href={`/games/${next}`} passHref>
              <button>next</button>
            </Link>
          </div>
        ) : (
          <div>
            <Link href={`/games/${previous}`} passHref>
              <button>previous</button>
            </Link>
            <Link href={`/games/${next}`} passHref>
              <button>next</button>
            </Link>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default AllGames;