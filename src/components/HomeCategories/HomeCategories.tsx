import React from 'react';
import Link from 'next/link'; // Importar Link de Next.js
import CardContainer from '../CardCategories/CardCategories';
import ArteIcon from '../../../public/arteIcon.svg';
import DeporteIcon from '../../../public/deporteIcon.svg';
import GastronomiaIcon from '../../../public/gastronomiaIcon.svg';

function HomeCategories() {
  return (
    <div className="flex justify-center mt-2">
      <Link href="/events?type=Artistico">
        <CardContainer>
          <div className="flex flex-col items-center">
            <ArteIcon />
            <p className="text-black font-medium text-xs mt-2">Arte</p>
          </div>
        </CardContainer>
      </Link>
      <Link href="/events?type=Deportivo">
        <CardContainer>
          <div className="flex flex-col items-center">
            <DeporteIcon />
            <p className="text-black font-medium text-xs mt-2">Deportes</p>
          </div>
        </CardContainer>
      </Link>
      <Link href="/events?type=Gastronomico">
        <CardContainer>
          <div className="flex flex-col items-center">
            <GastronomiaIcon />
            <p className="text-black font-medium text-xs mt-2">Gastronomía</p>
          </div>
        </CardContainer>
      </Link>
    </div>
  );
}

export default HomeCategories;
