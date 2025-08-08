import React from 'react';
import './ing.css';
import { useLocation } from 'react-router-dom';
import Navbar from '../nav/Navbar';
import Footer from '../footer/footer';

const Ing = () => {
  const location = useLocation();
  const ingredient = location.state;

  console.log(ingredient);

  return (
    <>
    <Navbar/>
      <div className="ing_container">
        <div className="ing_wrapper">
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <h2>General Information</h2>
            <img
              src={`http://localhost:3001/uploads/${ingredient.image[0]}`}
              alt="herb"
            />
          </div>

          

          <h2>Benefits</h2>
          <ul>
            {ingredient?.benefits?.map((benefit, index) => (
              <li key={`benefit-${index}`}>
                <p>{benefit.text}</p>
                <img
                  src={`http://localhost:3001/uploads/${benefit.image}`}
                  alt="benefit"
                  style={{ width: '100px' }}
                />
              </li>
            ))}
          </ul>

          <h2>Ayurvedic Properties</h2>
          <p>Guna: {ingredient.guna}</p>
          <p>Rasa: {ingredient.rasa}</p>
          <p>Vipaka: {ingredient.vipaka}</p>
          <p>Veerya: {ingredient.veerya}</p>
          <p>Vata: {ingredient.vata}</p>
          <p>Kapha: {ingredient.kapha}</p>

          <h2>Therapeutic Uses</h2>
          <ul>
            {ingredient?.therapeutic_uses?.map((use, index) => (
              <li key={`use-${index}`}>
                <p>{use.text}</p>
                <img
                  src={`http://localhost:3001/uploads/${use.image}`}
                  alt="therapeutic"
                  style={{ width: '100px' }}
                />
              </li>
            ))}
          </ul>

          <h2>Important Formulations</h2>
          <ul>
            {ingredient?.formulations?.map((formulation, index) => (
              <li key={`formulation-${index}`}>
                <p>{formulation.text}</p>
                <img
                  src={`http://localhost:3001/uploads/${formulation.image}`}
                  alt="formulation"
                  style={{ width: '100px' }}
                />
              </li>
            ))}
          </ul>

          <h2>Plant Parts and Its Purpose</h2>
          <ul>
            {ingredient?.plantParts?.map((part, index) => (
              <li key={`part-${index}`}>
                <strong>{part.part}:</strong> {part.description}
              </li>
            ))}
          </ul>

          <h2>Best Combined With</h2>
          <p>{ingredient.combinedWith}</p>

          <h2>Geographical Locations</h2>
          <p>{ingredient.geographicalLocations}</p>
        </div>
      </div>
            <Footer/>
    </>
  );
};

export default Ing;
