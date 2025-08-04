import React from 'react'
import "./ing.css"
import { useLocation } from 'react-router-dom'

const Ing = () => {
  const location = useLocation();
  const ingredient = location.state;

  return (
    <>
      <div className='ing_container'>
        <div className='ing_wrapper'>
          <div style={{ display: "flex", flexDirection: "row", alignItems: 'center', justifyContent: 'space-between' }}>
            <h4>General Information</h4>
            <img src="" alt="herb" />
          </div>

          <h3>Citraka</h3>

          <h4>Description</h4>
          <p>{ingredient.description}</p>

          <h3>Why Chitrak</h3>
          <ul>
            {ingredient.chitrak?.map((value, index) => (
              <li key={`chitrak-${index}`}>{value}</li>
            ))}
          </ul>

          <h3>Prakriti Impact</h3>
          <ul>
            {ingredient.prakati?.map((value, index) => (
              <li key={`prakati-${index}`}>{value}</li>
            ))}
          </ul>

          <h3>Benefits</h3>
          <ul>
            {ingredient.benefits?.map((value, index) => (
              <li key={`benefit-${index}`}>{value}</li>
            ))}
          </ul>

          <h3>Ayurvedic Properties</h3>
          <ul>
            {ingredient.ayurvedic_properties?.map((value, index) => (
              <li key={`property-${index}`}>{value}</li>
            ))}
          </ul>

          <h3>Therapeutic Uses</h3>
          <ul>
            {ingredient.therapeutic_uses?.map((value, index) => (
              <li key={`therapeutic-${index}`}>{value}</li>
            ))}
          </ul>

          <h3>Important Formulations</h3>
          <ul>
            {ingredient.important_formulations?.map((value, index) => (
              <li key={`formulation-${index}`}>{value}</li>
            ))}
          </ul>

          <h3>Plant Parts and Its Purpose</h3>
          <ul>
            {ingredient.plant_parts?.map((value, index) => (
              <li key={`part-${index}`}>{value}</li>
            ))}
          </ul>
            <h3>Best combined with</h3>
            <p></p>
            <h3>Geographical Locations</h3>
            <p></p>
        </div>
      </div>
    </>
  );
}

export default Ing;
