import styles from "../styles/Home.module.css";
import Link from "next/link";

export const Layout: React.FC = ({ children }) => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link href="/">Games Center </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link href="/games/allgames">
                <a className="nav-link active">All Games</a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/platforms/allplatforms">
                <a className="nav-link active">All Platforms</a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/genres/allgenres">
                <a className="nav-link active">All Genres</a>
              </Link>
            </li>
            <li>
              <Link href="/api/auth/login">
                <a className="nav-link active">Login</a>
              </Link>
            </li>
            <li>
              <Link href="/api/auth/logout">
                <a className="nav-link active">Logout</a>
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      <div>{children}</div>

      {/* <footer className={styles.footer}>Powered by Nordine 2022</footer> */}
    </div>
  );
};
