import { GetServerSideProps } from "next";
import styles from "../../styles/Home.module.css";
import Link from "next/link";

// This gets called on every request
export const getServerSideProps: GetServerSideProps = async (request) => {
  // Fetch data from external API
  // const reqParam = JSON.stringify(request.params);
  // const slug = reqParam.slice(13, reqParam.length - 2);
  // console.log(slug);

  const response = await fetch(`http://videogame-api.fly.dev/games`);
  const joke = await response.json();
  // console.log(joke.games[0]);

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
    category: string;
    cover: {
      height: string | number;
      url: string;
      width: string | number;
    };
    id: string;
    name: string;
    platforms: {
      id: string;
      name: string;
    }[];
    slug: string;
  };
}[];

const AllGames: React.FC<{ joke: AllGamesTyped }> = ({ joke }) => {
  console.log(joke);

  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        <Link href="/">
          <a>
            <div className={styles.card}>
              <h2>
                {"Hello "}
                {/* {joke[0].name} */}
                {/* {console.log(joke.games[0])} */}
                &rarr;
              </h2>
            </div>
          </a>
        </Link>
      </div>
    </div>
  );
};

export default AllGames;
