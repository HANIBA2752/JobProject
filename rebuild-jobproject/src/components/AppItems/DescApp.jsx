import React, { useEffect } from "react";
import "./DescApp.css";
import { Typewriter } from 'react-simple-typewriter'

function DescApp() {
  return (
    <section className="section3 flex justify-center items-center px-4">
      <div className="flex flex-wrap justify-around items-center">
        <div className="desc-container">
          <div className="desc-bg">
            <span>
              <Typewriter 
              words={['Unlock your potential, explore endless career possibilities']}
              typeSpeed={70}
              deleteSpeed={0}
              delaySpeed={5000}
              cursor
              loop={true}
              />
            </span>
          </div>
          <div className="animate-border"></div>
        </div>
      </div>
    </section>
  );
}

export default DescApp;
