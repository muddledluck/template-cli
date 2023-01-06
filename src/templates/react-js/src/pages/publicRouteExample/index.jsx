import React from "react";
import { Link } from "react-router-dom";
import IMAGES from "../../assets/images";
import SVG from "../../assets/svg";
import { NormalButton } from "../../components/button";
import styles from "./styles.module.css";

function PublicRouteExample() {
  return (
    <div>
      <img
        src={IMAGES.ReactBanner}
        alt="banner"
        className={styles.react_banner}
      />
      <div>PublicRouteExample</div>
      <div>
        <Link to="/authenticated">
          <NormalButton>AuthenticatedPage</NormalButton>
        </Link>
        <Link to="/unauthenticated">
          <NormalButton>UnauthenticatedPage</NormalButton>
        </Link>
      </div>
      <div>
        <p>SVG Example: </p>
        <div className={styles.icon_style}>
          <SVG.BagIcon />
        </div>
      </div>
    </div>
  );
}

export default PublicRouteExample;
