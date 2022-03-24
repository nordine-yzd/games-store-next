import { GetServerSideProps } from "next";
import styles from "../../styles/Home.module.css";
import Link from "next/link";
import { Layout } from "../../components/layout";
import React from "react";

type AllGenresTyped = {
  genres: {
    id: string;
    name: string;
    slug: string;
  }[];
};

// This gets called on every request
export const getServerSideProps: GetServerSideProps = async (request) => {
  // pagination
  const reqParam = JSON.stringify(request.params);
  const slugString = reqParam.slice(14, reqParam.length - 2);
  let slug: number = parseInt(slugString);
  const reg = new RegExp("^[0-9]*$");
  if (reg.test(slugString) == false) {
    slug = 1;
  }
  //  fetch data
  const response = await fetch(
    `http://videogame-api.fly.dev/genres?page=${slug}`
  );
  const genre = await response.json();

  // Pass data to the page via props
  return {
    props: {
      genre: genre,
      slug: slug,
      // gamesPerGenre: gamesPerGenre,
    },
  };
};

const AllGenres: React.FC<{ genre: AllGenresTyped; slug: number }> = ({
  genre,
  slug,
}) => {
  let [state, setstate] = React.useState(true);
  const next = slug + 1;
  const previous = slug - 1;
  console.log(state);

  if (state) {
    return (
      <Layout>
        <div className={styles.container}>
          <main className={styles.main}>
            <div className={styles.grid}>
              {genre.genres.map((element) => {
                return (
                  <Link
                    key={element.id}
                    href={`/genres/gamesgenre/${element.id}-1`}
                  >
                    <a>
                      <div
                        key={element.id}
                        className={styles.card}
                        onClick={() => setstate((state = false))}
                      >
                        <h2>{element.name}</h2>
                        {console.log(element.id)}
                      </div>
                    </a>
                  </Link>
                );
              })}
            </div>
            {slug === 1 ? (
              <div>
                <Link href={`/genres/${next}`} passHref>
                  <button>next</button>
                </Link>
              </div>
            ) : (
              <div>
                <Link href={`/genres/${previous}`} passHref>
                  <button>previous</button>
                </Link>
              </div>
            )}
          </main>
        </div>
      </Layout>
    );
  } else {
    return (
      <Layout>
        <div className={styles.container}>
          <main className={styles.main}>
            <div className={styles.grid}>
              {genre.genres.map((element) => {
                return (
                  // <Link key={element.id}  >
                  //   <a>
                  <div
                    key={element.id}
                    className={styles.card}
                    onClick={() => setstate((state = true))}
                  >
                    <h2>{element.name}</h2>
                  </div>
                  //   </a>
                  // </Link>
                );
              })}
            </div>
            {slug === 1 ? (
              <div>
                <Link href={`/genres/${next}`} passHref>
                  <button>next</button>
                </Link>
              </div>
            ) : (
              <div>
                <Link href={`/genres/${previous}`} passHref>
                  <button>previous</button>
                </Link>
              </div>
            )}
          </main>
        </div>
      </Layout>
    );
  }
};

export default AllGenres;
