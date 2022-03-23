import { GetServerSideProps } from "next";
import styles from "../../styles/Home.module.css";
import Link from "next/link";
// import Image from "next/image";
import { Layout } from "../../components/layout";

// This gets called on every request
export const getServerSideProps: GetServerSideProps = async (request) => {
  const response = await fetch(`http://videogame-api.fly.dev/genres`);
  const genre = await response.json();

  // Pass data to the page via props
  return {
    props: {
      genre: genre,
    },
  };
};

type AllGenresTyped = {
  genres: {
    id: string;
    name: string;
    slug: string;
  }[];
};

const AllGenres: React.FC<{ genre: AllGenresTyped }> = ({ genre }) => {
  return (
    <Layout>
      <div className={styles.container}>
        <main className={styles.main}>
          <div className={styles.grid}>
            {genre.genres.map((element) => {
              console.log(element.name);
              return (
                <Link key={element.id} href="/">
                  <a>
                    <div className={styles.card}>
                      <h2>{element.name}</h2>
                      {/* <Image
                        src={element.logo.url}
                        alt="logo img"
                        width={160}
                        height={160}
                      /> */}
                    </div>
                  </a>
                </Link>
              );
              // ) : (
              //   <Link key={element.id} href="/">
              //     <a className={styles.platform}>
              //       <div className={styles.card}>
              //         <h2>{element.name}</h2>
              //         {/* <Image
              //           src="/no-logo-game.png"
              //           alt="nologo img"
              //           width={160}
              //           height={160}
              //         /> */}
              //       </div>
              //     </a>
              //   </Link>
              // );
              //
            })}
          </div>
        </main>
      </div>
    </Layout>
  );
};

export default AllGenres;
