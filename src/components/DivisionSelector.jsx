import React, { useState } from 'react';

const DivisionSelector = ({ divisions, selectedDivision, setSelectedDivision }) => {
  
  const handleDivisionClick = (division) => {
    setSelectedDivision(division);
  };

  return (
    <div>
      <h3>Select a Division</h3>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {divisions.map((division) => (
          <div
            key={division.division_id}
            style={{
              padding: '10px 20px',
              margin: '5px',
              border: '2px solid #007bff',
              borderRadius: '5px',
              cursor: 'pointer',
              backgroundColor: selectedDivision?.division_id === division.division_id ? '#cce7ff' : '#f8f9fa',
              color: '#333', // Ensure the text is dark for contrast
              fontSize: '14px',
              textAlign: 'center',
              transition: 'background-color 0.3s',
              width: '120px',
            }}
            onClick={() => handleDivisionClick(division)}
          >
            <h4 style={{ fontSize: '16px', marginBottom: '5px' }}>Division {division.division_id}</h4>
            <p style={{ margin: '0' }}>Age: {division.age}</p>
            <p style={{ margin: '0' }}>Weight: {division.weight}</p>
          </div>
        ))}
      </div>
     
    </div>
  );
};

export default DivisionSelector;
