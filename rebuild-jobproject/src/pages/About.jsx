import React from 'react';
import '../components/About/About.css';
import "animate.css";
import logo from '../assets/Logo.png';
import jai from '../assets/jai.jpg'
import bell from '../assets/bell.jpg'
import earth from '../assets/earth.jpg'
import TeamCard from '../components/About/TeamCard';

function About() {
  return (
    <div>
      <div className="w-full h-50 overflow-hidden">
        <img
          src="https://images.pexels.com/photos/6804068/pexels-photo-6804068.jpeg"
          className="about-img dark:bg-neutral-600"
          alt="About Background"
        />
      </div>
      <div className="about-container">
        <h1 className="abt-title animate__animated animate__slideInUp">ABOUT US</h1>
        <div className="abt-logo">
          <img src={logo} alt="Logo" className='animate__animated animate__slideInUp' />
          <div>
            <h1 className='animate__animated animate__slideInUp dark:text-neutral-600'>Overview of JOB Explore Website</h1>
            <h2 className='animate__animated animate__slideInUp job-des dark:text-neutral-600'>
              JOB Explore is a website created for recent graduates and anyone interested in the career
              paths of computer engineers. It provides insights into the available job roles, their
              responsibilities, and the required skills to pursue these careers. Additionally, it summarizes
              which professions are currently in high demand.
            </h2>
          </div>
        </div>

        <div>
          <h1 className="creator-title animate__animated animate__fadeInUpBig">Meet Our Team</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 ">
            {/* การ์ด 1 */}
            <TeamCard
              image={jai}
              name="Kritsadagorn Punnapanich "
              description=" "
              facebook="https://www.facebook.com/kritsadagorn"
              instagram="https://www.instagram.com/k.kritx_/"
              github="https://github.com/kritsadagorn"
              email="catsamotyba@gmail.com"
            />
            {/* การ์ด 2 */}
            <TeamCard
              image={bell}
              name="Theeraphat Gunthong"
              description=" "
              facebook="https://www.facebook.com/theeraphat.gunthong"
              instagram="https://www.instagram.com/perish_sunflower/"
              github="https://github.com/TheerapatGunthog"
              email="Bellbelieve.work@gmail.com"
            />
            {/* การ์ด 3 */}
            <TeamCard
              image={earth}
              name="Wuttipat Srikham"
              description=" "
              facebook="https://www.facebook.com/profile.php?id=100002190974853"
              instagram="https://www.instagram.com/earth.wut_ti/"
              github="https://github.com/michaellee"
              email="wuttipat2004@gmail.com"
            />
          </div>
        </div>
        <h1 className='w-full text-4xl mt-40 my-10 text-neutral-700 flex justify-center items-center font-semibold'>Thank You!! For Visit Our Site</h1>
      </div>
    </div>
  );
}

export default About;
