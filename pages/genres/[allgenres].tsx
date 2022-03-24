import { GetServerSideProps } from "next";
import styles from "../../styles/Home.module.css";
import Link from "next/link";
import { Layout } from "../../components/layout";

type AllGenresTyped = {
  genres: {
    id: string;
    name: string;
    slug: string;
  }[];
};

// This gets called on every request
export const getServerSideProps: GetServerSideProps = async (request) => {
  const reqParam = JSON.stringify(request.params);
  const slugString = reqParam.slice(14, reqParam.length - 2);
  let slug: number = parseInt(slugString);

  const reg = new RegExp("^[0-9]*$");
  if (reg.test(slugString) == false) {
    slug = 1;
  }

  const response = await fetch(
    `http://videogame-api.fly.dev/genres?page=${slug}`
  );
  const genre = await response.json();

  // Pass data to the page via props
  return {
    props: {
      genre: genre,
      slug: slug,
    },
  };
};

const AllGenres: React.FC<{ genre: AllGenresTyped; slug: number }> = ({
  genre,
  slug,
}) => {
  const next = slug + 1;
  const previous = slug - 1;
  return (
    <Layout>
      <div className={styles.container}>
        <main className={styles.main}>
          <div className={styles.grid}>
            {genre.genres.map((element) => {
              return (
                <Link key={element.id} href="/">
                  <a>
                    <div className={styles.card}>
                      <h2>{element.name}</h2>
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
};

export default AllGenres;
