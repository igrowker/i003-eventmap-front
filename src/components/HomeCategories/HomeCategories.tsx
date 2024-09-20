import React from 'react';
import CardContainer from '../CardCategories/CardCategories';
import ArteIcon from '../../../public/arteIcon.svg';
import DeporteIcon from '../../../public/deporteIcon.svg';
import GastronomiaIcon from '../../../public/gastronomiaIcon.svg';

function HomeCategories() {
    return (
      <div className="flex justify-center mt-2">
        <CardContainer gradient="bg-arte-gradient">
          <div className="flex flex-col items-center">
            <ArteIcon/>
            <p className="text-white text-xs mt-2">Arte</p>
          </div>
        </CardContainer>
        <CardContainer gradient="bg-deportes-gradient">
          <div className="flex flex-col items-center">
            <DeporteIcon/>
            <p className="text-white text-xs mt-2">Deportes</p>
          </div>
        </CardContainer>
        <CardContainer gradient="bg-gastronomia-gradient">
          <div className="flex flex-col items-center">
            <GastronomiaIcon/>
            <p className="text-white text-xs mt-2">Gastronomía</p>
          </div>
        </CardContainer>
      </div>
    );
  }

export default HomeCategories;
