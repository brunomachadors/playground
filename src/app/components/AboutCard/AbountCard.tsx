import React from 'react';
import SocialLinks from '../SocialLinks/SocialLinks';

const AboutCard = () => {
  return (
    <div
      id="aboutCard"
      className="bg-gray-800 border border-gray-100 p-8 rounded-lg shadow-lg max-w-3xl w-full"
    >
      <h1
        id="aboutTitle"
        className="text-3xl font-bold text-gray-100 mb-6 text-center"
      >
        Sobre Mim
      </h1>

      <div id="aboutDescription" className="mb-8 text-gray-300 text-center">
        <p>Sou um engenheiro de testes apaixonado por tecnologia</p>
        <p>e mentor na área de automação de testes.</p>
      </div>

      <SocialLinks />
    </div>
  );
};

export default AboutCard;
