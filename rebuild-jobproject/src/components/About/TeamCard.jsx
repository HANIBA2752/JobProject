import React from 'react';
import { FaFacebook, FaInstagram, FaGithub, FaEnvelope, FaPhoneAlt } from 'react-icons/fa'; // import ไอคอนจาก react-icons

const TeamCard = ({ image, name, description, facebook, instagram, github, email, phone }) => {
  return (
    <div className="card dark:bg-neutral-800 dark:text-white bg-white shadow-lg rounded-lg p-6 text-center mx-auto min-w-[284px] max-w-[300px]">
      <img 
        src={image} 
        alt={name} 
        className="w-32 h-32 mx-auto rounded-full object-cover mb-4" 
      />
      <h2 className="text-xl font-semibold">{name}</h2>
      <p className="text-neutral-600">{description}</p>

      {/* แสดงไอคอน และลิงค์ */}
      <div className="flex justify-center space-x-6 mt-4">
        {facebook && (
          <a href={facebook} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
            <FaFacebook size={24} />
          </a>
        )}
        {instagram && (
          <a href={instagram} target="_blank" rel="noopener noreferrer" className="text-pink-600 hover:text-pink-800">
            <FaInstagram size={24} />
          </a>
        )}
        {github && (
          <a href={github} target="_blank" rel="noopener noreferrer" className="text-gray-800 hover:text-gray-600">
            <FaGithub size={24} />
          </a>
        )}
        {email && (
          <a href={`mailto:${email}`} className="text-red-600 hover:text-red-800">
            <FaEnvelope size={24} />
          </a>
        )}
        {phone && (
          <div className="text-green-600 flex items-center space-x-2">
            <FaPhoneAlt size={24} />
            <span>{phone}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamCard;
