import { GetServerSideProps } from "next";
import styles from "../../styles/Home.module.css";
import Link from "next/link";
import Image from "next/image";
import { Layout } from "../../components/layout";

// This gets called on every request
export const getServerSideProps: GetServerSideProps = async (request) => {
  const response = await fetch(`http://videogame-api.fly.dev/games?page=2`);
  const joke = await response.json();
  // console.log(request.params);
  console.log("ici");

  console.log(request.params);
  console.log(typeof request.params);
  const reqPa = await JSON.stringify(request.params);
  const slug = JSON.stringify(request.params);
  // const slug = reqParam.slice(12, reqParam.length - 2);
  // console.log(reqParam);
  // Pass data to the page via props
  return {
    props: {
      joke: joke,
      slug: { slug },
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
type SlugTyped = {};
const AllGames: React.FC<{ joke: AllGamesTyped; slug: SlugTyped }> = (
  { joke },
  { slug }
) => {
  console.log("here");
  // console.log(joke);

  console.log(slug);
  console.log("after here");

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
        <Link href="/">
          <button>previous</button>
        </Link>
        <Link href="/">
          <button>next</button>
        </Link>
      </div>
    </Layout>
  );
};

export default AllGames;
