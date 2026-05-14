import { Outlet } from "react-router-dom";
import { Header } from "./header";
import type { CSSProperties } from "react";
import Footer from "./footer";

export default function Layout() {
  return (
    <div style={styles.container}>
      <Header />
      <main style={styles.main}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

const styles: Record<string, CSSProperties> = {
  container: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    width: "100%",
  },
  main: {
    flex: 1,
    width: "100%",
    padding: "0 16px 32px",
  },
};
