import React from "react";
import { iconProg } from "../data/icon";
import BoxCarousel from "./BoxCarousel";

function AppBox() {
  return (
    <section className="section2 text-white flex flex-col items-center justify-center py-10 w-full">
      <div className="px-4 max-w-screen-xl w-full">
        <BoxCarousel data={iconProg} />
      </div>
    </section>
  );
}

export default AppBox;
