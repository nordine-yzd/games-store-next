import { GetServerSideProps } from "next";
import styles from "../../../styles/Home.module.css";
import Link from "next/link";
import Image from "next/image";
import { Layout } from "../../../components/layout";
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
  const slug = reqParam.slice(19, reqParam.length - 4);
  const SlugPageString = reqParam.slice(56, reqParam.length - 2);
  let slugPage: number = parseInt(SlugPageString);
  console.log(reqParam);
  console.log(SlugPageString);
  console.log(slug);

  const reg = new RegExp("^[0-9]*$");
  if (reg.test(SlugPageString) == false) {
    slugPage = 1;
  }
  console.log(
    `http://videogame-api.fly.dev/games/platforms/${slug}?page=${slugPage}`
  );

  const response = await fetch(
    `http://videogame-api.fly.dev/games/platforms/${slug}?page=${slugPage}`
  );
  const game = await response.json();
  // console.log(game);

  // Pass data to the page via props
  return {
    props: {
      game: game,
      slug: slug,
      slugPage: slugPage,
    },
  };
};

const AllGames: React.FC<{
  game: AllGamesTyped;
  slug: string;
  slugPage: number;
}> = ({ game, slug, slugPage }) => {
  const next = slugPage + 1;
  const previous = slugPage - 1;

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
          {slugPage === 1 ? (
            <div>
              <Link href={`/platforms/gamesplatforms/${slug}-${next}`} passHref>
                <button>next</button>
              </Link>
            </div>
          ) : (
            <div>
              <Link
                href={`/platforms/gamesplatforms/${slug}-${previous}`}
                passHref
              >
                <button>previous</button>
              </Link>
              <Link href={`/platforms/gamesplatforms/${slug}-${next}`} passHref>
                <button>next</button>
              </Link>
            </div>
          )}
        </main>
      </div>
    </Layout>
  );
};

export default AllGames;
