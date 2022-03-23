import { GetServerSideProps } from "next";
import styles from "../../styles/Home.module.css";
import Link from "next/link";
import Image from "next/image";
import { Layout } from "../../components/layout";

// This gets called on every request
export const getServerSideProps: GetServerSideProps = async (request) => {
  // Fetch data from external API
  // const reqParam = JSON.stringify(request.params);
  // const slug = reqParam.slice(13, reqParam.length - 2);
  // console.log(slug);

  const response = await fetch(`http://videogame-api.fly.dev/games`);
  const joke = await response.json();

  // Pass data to the page via props
  return {
    props: {
      joke: joke,
      // slug: slug,
    },
  };
};

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

const AllGames: React.FC<{ joke: AllGamesTyped }> = ({ joke }) => {
  // console.log(joke.games[0].name);

  return (
    <Layout>
      <div className={styles.container}>
        <main className={styles.main}>
          <div className={styles.grid}>
            {joke.games.map((element) => {
              // console.log(element.cover);
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
      </div>
    </Layout>
  );
};

export default AllGames;
