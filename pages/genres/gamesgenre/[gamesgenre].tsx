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
  const slug = reqParam.slice(15, reqParam.length - 3);
  // let slug: number = parseInt(slugString);
  console.log("---" + slug + "---");

  // const reg = new RegExp("^[0-9]*$");
  // if (reg.test(slugString) == false) {
  //   slug = 1;
  // }

  const response = await fetch(
    `http://videogame-api.fly.dev/games/genres/137bcfbe-be08-0b36-b66e-1bfef14ca49a?page=1`
  );
  const game = await response.json();
  console.log(game);

  // Pass data to the page via props
  return {
    props: {
      game: game,
    },
  };
};

const AllGames: React.FC<{ game: AllGamesTyped }> = ({ game }) => {
  // <div>
  //   {console.log(game)}
  //   <Link href={`/`} passHref>
  //     <button></button>
  //   </Link>
  // </div>
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
          {/* {slug === 1 ? (
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
            )} */}
        </main>
      </div>
    </Layout>
  );
};

export default AllGames;
