import { GetServerSideProps } from "next";
import styles from "../../styles/Home.module.css";
import Link from "next/link";
import Image from "next/image";
import { Layout } from "../../components/layout";

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

// This gets called on every request
export const getServerSideProps: GetServerSideProps = async (request) => {
  const reqParam = JSON.stringify(request.params);
  const slugString = reqParam.slice(17, reqParam.length - 2);
  let slug: number = parseInt(slugString);

  const reg = new RegExp("^[0-9]*$");
  if (reg.test(slugString) == false) {
    slug = 1;
  }

  const response = await fetch(
    `http://videogame-api.fly.dev/platforms?page=${slug}`
  );
  const games = await response.json();

  // Pass data to the page via props
  return {
    props: {
      games: games,
      slug: slug,
    },
  };
};

const AllPlatforms: React.FC<{ games: AllPlatformsTyped; slug: number }> = ({
  games,
  slug,
}) => {
  const next = slug + 1;
  const previous = slug - 1;
  return (
    <Layout>
      <div className={styles.container}>
        <main className={styles.main}>
          <div className={styles.grid}>
            {games.platforms.map((element) => {
              return element.logo ? (
                <Link key={element.id} href="/">
                  <a>
                    <div className={styles.card}>
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
                    </div>
                  </a>
                </Link>
              );
            })}
          </div>
          {slug === 1 ? (
            <div>
              <Link href={`/platforms/${next}`} passHref>
                <button>next</button>
              </Link>
            </div>
          ) : (
            <div>
              <Link href={`/platforms/${previous}`} passHref>
                <button>previous</button>
              </Link>
              <Link href={`/platforms/${next}`} passHref>
                <button>next</button>
              </Link>
            </div>
          )}
        </main>
      </div>
    </Layout>
  );
};

export default AllPlatforms;
