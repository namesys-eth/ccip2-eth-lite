import Head from "next/head";
import React from "react";
import { useRouter } from "next/router";
import styles from "./page.module.css";
import SearchBox from "../components/Search";
import Loading from "../components/Loading";
import { isMobile } from "react-device-detect";

export default function Home() {
  const router = useRouter();
  const [mobile, setMobile] = React.useState(false);
  const [loading, setLoading] = React.useState(false); // Loading Records marker

  // Triggers search of ENS domain
  const handleNameSearch = (query: string) => {
    setLoading(true);
    router.push(`/profile?query=${query}`);
  };

  // INIT
  React.useEffect(() => {
    if (isMobile) {
      setMobile(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Head>
        <title>NameSys Lite</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <main className="flex-column">
        <div style={{ fontFamily: "SF Mono" }}></div>
        <div style={{ fontFamily: "Spotnik" }}></div>
        <div style={{ marginTop: "7.5%" }}></div>
        <div className="flex-column">
          {!loading && mobile && (
            <img
              alt="namesys-logo"
              src="logo.png"
              width={"100px"}
              style={{ marginBottom: "-10px" }}
            />
          )}
          {!mobile && (
            <img
              alt="namesys-logo"
              src="logo.png"
              width={"100px"}
              style={{ marginBottom: "-10px" }}
            />
          )}
          <div className="flex-column">
            <h1 style={{ color: "#ff2600" }}>NameSys</h1>
            <h4 style={{ color: "#fc4e14", marginTop: "-25px" }}>Lite</h4>
          </div>
        </div>
        {!loading && (
          <div
            className="main-search-container"
            style={{
              maxHeight: "520px",
              overflowY: "auto",
              marginBottom: "50px",
            }}
          >
            <SearchBox onSearch={handleNameSearch} />
          </div>
        )}
        {loading && <Loading height={50} width={50} />}
        <div className={styles.grid} style={{ marginTop: "50px" }}>
          <a
            href="https://app.namesys.xyz"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#ff2600" }}
          >
            <h1 style={{ fontSize: "24px" }}>
              NAMESYS APP <span className="material-icons micon">settings</span>
            </h1>
            <p>NameSys Advanced Client</p>
          </a>

          <a
            href="https://namesys.xyz/readme/readme.htm?src=https://namesys-eth.github.io/ccip2-eth-resources/GUIDE.md"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h1 style={{ fontSize: "24px" }}>
              DOCS <span className="material-icons micon">library_books</span>
            </h1>
            <p>Learn More</p>
          </a>

          <a
            href="https://github.com/namesys-eth"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h1 style={{ fontSize: "24px" }}>
              CODE <span className="material-icons micon">developer_mode</span>
            </h1>
            <p>Source Codes</p>
          </a>
        </div>
        <div
          className="flex-column"
          style={{
            paddingBottom: "10px",
            marginTop: mobile ? "60px" : "100px",
          }}
        >
          <span
            style={{
              color: "grey",
              fontWeight: "700",
              fontSize: mobile ? "12px" : "14px",
              paddingBottom: "5px",
            }}
          >
            {"Funded By"}
          </span>
          <span
            style={{
              color: "skyblue",
              fontWeight: "700",
              fontSize: mobile ? "14px" : "16px",
            }}
          >
            {"ENS DAO"}
          </span>
        </div>
      </main>
    </>
  );
}
