import React, { useState } from 'react';
import '../components/Learn/Learn.css';
import "animate.css";
import { learnData } from '@/components/data/learn-data';
import LearnCard from '../components/Learn/LearnCard';

function Learn() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = learnData.filter(item =>
    item.Description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='learn-container '>
      <h1 className="title animate__animated animate__backInRight">Unlock your potential</h1>
      <p className="title animate__animated animate__backInRight"> — your future starts here!</p>

      {/* Search Bar */}
      <div className="searchbar bg-[#a5a5a5] p-8">
        {/* <input
          type="text"
          className="search-box"
          placeholder="Search Here!"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="search-btn">Go!</button> */}
      </div>

      {/* Card Container */}
      <div className='item-con flex flex-wrap justify-center gap-6 p-6'>
        {filteredData.map((item) => (
          <LearnCard 
            key={item.index} 
            index={item.index} 
            Website={item.Website} 
            Description={item.Description}
            img={item.img}
          />
        ))}
      </div>
    </div>
  );
}

export default Learn;
