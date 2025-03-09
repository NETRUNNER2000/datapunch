import React from 'react';
import { useLocation } from 'react-router-dom';
import SearchFights from './SearchFights';

const FighterInformation = (props) => {

  const location = useLocation();
  const { fighter_id } = location.state || {};
  return (
    <div>
      <h3>Fighter Information</h3>

      <h3>Your Fight Records</h3>
      <SearchFights fighter_id={fighter_id}></SearchFights>
    </div>
  )
}

export default FighterInformation
