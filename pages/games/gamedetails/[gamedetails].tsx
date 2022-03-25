import { GetServerSideProps } from "next";
import Image from "next/image";
import { Layout } from "../../../components/layout";
import React from "react";

type GamesTyped = {
  id: string;
  name: string;
  slug: string;
  category: string;
  platforms: {
    id: string;
    name: string;
    logo: {
      url: string;
      width: number | string;
      height: number | string;
    };
  }[];
  cover: {
    url: string;
    width: string | number;
    height: string | number;
  };
  screenshots: {
    url: string;
    width: string | number;
    height: string | number;
  }[];
  rating: any;
  rating_count: any;
  genres: {
    id: string;
    name: string;
  }[];
};
// This gets called on every request
export const getServerSideProps: GetServerSideProps = async (request) => {
  const reqParam = JSON.stringify(request.params);
  const slug = reqParam.slice(16, reqParam.length - 2);
  const response = await fetch(`http://videogame-api.fly.dev/games/${slug}`);
  const game = await response.json();
  console.log(game);

  // Pass data to the page via props
  return {
    props: {
      game: game,
    },
  };
};

const AllGames: React.FC<{
  game: GamesTyped;
}> = ({ game }) => {
  return (
    <Layout>
      <br />
      <div className="container">
        {/* <main className={styles.main}> */}
        <div className="row">
          <div className="col-md-7 col-xs-12">
            <Image
              src={game.cover.url}
              alt="cover img"
              width={400}
              height={450}
            />
          </div>
          <div className="col ">
            <h2>{game.name}</h2>
            <p>cart here</p>
          </div>
        </div>
        <br />
        <h2>platforms</h2>
        <div className="row">
          {game.platforms.map((e) => {
            return (
              <div key={e.id} className="col-4 ">
                <p>{e.name}</p>
                <Image
                  src={e.logo.url}
                  alt="cover img"
                  width={100}
                  height={100}
                />
              </div>
            );
          })}
          <div className="row">
            <h2>platforms</h2>
            {game.genres.map((e) => {
              return (
                <div key={e.id}>
                  <p>{e.name}</p>
                </div>
              );
            })}
          </div>

          <h2>screenshots</h2>
          <div className="row">
            {game.screenshots.map((e) => {
              return (
                <div key={e.url} className="col-md-6 col-xs-">
                  <Image src={e.url} alt="cover img" width={600} height={500} />
                </div>
              );
            })}
          </div>
        </div>

        {/* </main> */}
      </div>
    </Layout>
  );
};

export default AllGames;
