import React from 'react';
import { FaFacebook, FaInstagram, FaGithub, FaEnvelope, FaPhoneAlt } from 'react-icons/fa';

const TeamCard = ({ image, name, description, facebook, instagram, github, email, phone }) => {
  return (
    <div className="card bg-white dark:bg-neutral-800 dark:text-white shadow-lg rounded-xl overflow-hidden transition-all duration-300 h-full">
      {/* Image Header with Gradient Overlay */}
      <div className="relative overflow-hidden h-60">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover transition-all duration-500 hover:scale-110" 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-70"></div>
      </div>
      
      {/* Profile Info */}
      <div className="relative px-6 pt-16 pb-6 -mt-12">
        <div className="absolute -top-16 left-1/2 transform -translate-x-1/2">
          <div className="w-24 h-24 rounded-full border-4 border-white dark:border-neutral-700 overflow-hidden shadow-lg">
            <img 
              src={image} 
              alt={name} 
              className="w-full h-full object-cover" 
            />
          </div>
        </div>
        
        <h2 className="text-2xl font-bold text-center mb-1">{name}</h2>
        <p className="text-neutral-600 dark:text-neutral-400 text-center mb-4">{description}</p>
        
        {/* Social Links */}
        <div className="flex justify-center space-x-4 mb-4">
          {facebook && (
            <a 
              href={facebook} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors duration-300"
              aria-label={`${name}'s Facebook`}
            >
              <FaFacebook size={18} />
            </a>
          )}
          
          {instagram && (
            <a 
              href={instagram} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="bg-gradient-to-br from-purple-600 to-pink-500 text-white p-2 rounded-full hover:from-purple-700 hover:to-pink-600 transition-colors duration-300"
              aria-label={`${name}'s Instagram`}
            >
              <FaInstagram size={18} />
            </a>
          )}
          
          {github && (
            <a 
              href={github} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="bg-gray-800 text-white p-2 rounded-full hover:bg-gray-900 transition-colors duration-300"
              aria-label={`${name}'s GitHub`}
            >
              <FaGithub size={18} />
            </a>
          )}
          
          {email && (
            <a 
              href={`mailto:${email}`} 
              className="bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition-colors duration-300"
              aria-label={`Email ${name}`}
            >
              <FaEnvelope size={18} />
            </a>
          )}
        </div>
        
        {/* Contact Info */}
        {phone && (
          <div className="text-green-600 dark:text-green-400 flex items-center justify-center space-x-2 text-sm">
            <FaPhoneAlt size={14} />
            <span>{phone}</span>
          </div>
        )}
        
        {/* View Profile Button */}
        {/* <button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-full w-full transition-colors duration-300 text-sm font-medium">
          View Full Profile
        </button> */}
      </div>
    </div>
  );
};

export default TeamCard;