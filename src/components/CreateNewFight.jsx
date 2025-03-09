import React, {useEffect, useState} from 'react'
import SearchEvents from './SearchEvents'
import DivisionSelector from './DivisionSelector';
import { UserAuth } from '../context/AuthContext';
import { supabase } from '../supabaseClient';
import CompetitionTiers from './CompetitionTiers';
import SearchFighters from './SearchFighters';

const CreateNewFight = () => {
  
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [selectedFighter1, setSelectedFighter1] = useState(null);
    const [selectedFighter2, setSelectedFighter2] = useState(null);
    const [divisions, setDivisions] = useState([]);
    const {session} = UserAuth();
    const [selectedDivision, setSelectedDivision] = useState(null);
    const [tiers, setTiers] = useState([]);
    const [selectedTier, setSelectedTier] = useState(null);
    const [winner, setWinner] = useState(null);
    const [showCreateFight, setShowCreateFight] = useState(false);

    useEffect(() => { fetchDivisions()}, [selectedEvent]);

    const handleWinnerChange = (event) => {
      setWinner(event.target.value);
    };

    useEffect(() => {
            setTiers(selectedDivision?.tiers?.tiers || []);
            console.log("Selected division: ", selectedDivision);
        }, [selectedDivision]);

    useEffect(() => {
      console.log(selectedFighter1);
    }, [selectedFighter1]);

    useEffect(() => {
      console.log(winner);
    }, [winner]);

    const fetchDivisions = async () => {
        if(!session) return;
        if(!selectedEvent) return;
        const { data, error } = await supabase.from("divisions").select("*").eq('event_id', selectedEvent?.event_id);
        if (error) {
            console.error("Error fetching fighters:", error);
        } else {
            setDivisions(data || []);
        }
    }

    const insertFight = async () => {
      
      const { data, error } = await supabase.from("fights").insert([
        {
          fighter_id_red: selectedFighter1.fighter_id,
          fighter_id_blue: selectedFighter2.fighter_id,
          winner_id: winner === 'fighter1' ? selectedFighter1.fighter_id : selectedFighter2.fighter_id,
          tier: 1,
          division_id: selectedDivision.division_id,
        },
      ]);
    
      if (error) {
        console.error("Error inserting fight:", error);
      } else {
        console.log("Fight inserted successfully:", data);
      }
    };

    return (
    <div>
      <h4>Record Fight</h4>
      <p>Selected Event: {selectedEvent?.event_id || ''}</p>
      <SearchEvents selectedEvent={selectedEvent} setSelectedEvent={setSelectedEvent}></SearchEvents>
      <DivisionSelector divisions={divisions} selectedDivision={selectedDivision} setSelectedDivision={setSelectedDivision}></DivisionSelector>
      
      <div className="flex w-full">
        
        <CompetitionTiers
         showCreateFight={showCreateFight}
         setShowCreateFight={setShowCreateFight}
         tiers={tiers} 
         setTiers={setTiers}
         divisionId={selectedDivision?.division_id}
         />
      
        {showCreateFight && (<div>
            <h3>Fighter 1</h3>
            <SearchFighters 
            selectedFighter={selectedFighter1}
            setSelectedFighter={setSelectedFighter1}
            maxHeight='200px'
            />
            <h3>Fighter 2</h3>
            <SearchFighters 
            selectedFighter={selectedFighter2}
            setSelectedFighter={setSelectedFighter2}
            maxHeight='200px'
            />
            <h3>Winner</h3>
            <select id="winner" value={winner} onChange={handleWinnerChange}>
                <option value="fighter1">Fighter 1</option>
                <option value="fighter2">Fighter 2</option>
            </select>
            <button onClick={insertFight}>Submit</button>
        </div>)}
    
      </div>



    </div>
  )
}

export default CreateNewFight
