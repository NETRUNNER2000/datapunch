import React, {useState, useEffect} from 'react'
import { useLocation } from 'react-router-dom';
import CompetitionTiers from './CompetitionTiers';
import { supabase } from '../supabaseClient';
import { UserAuth } from '../context/AuthContext';
import DivisionSelector from './DivisionSelector';

const Event = () => {

    const location = useLocation();
    const { event_id } = location.state || {};
    const [event, setEvent] = useState([]);
    const [divisions, setDivisions] = useState([]);
    const {session} = UserAuth();
    const [selectedDivision, setSelectedDivision] = useState(null);
    const [tiers, setTiers] = useState([]); // Initial fights per tier
    
    useEffect(() => {
        
        console.log('fetching event data');
        if(!session) return;

        const fetchEvent = async () => {
            const { data, error } = await supabase.from("events").select("*").eq('event_id', event_id).single();
            if (error) {
                console.error("Error fetching fighters:", error);
            } else {
                setEvent(data);
            }
        };
        
        const fetchDivisions = async () => {
            const { data, error } = await supabase.from("divisions").select("*").eq('event_id', event_id);
            if (error) {
                console.error("Error fetching fighters:", error);
            } else {
                setDivisions(data || []);
            }
        }

        fetchEvent();
        fetchDivisions();
        }, []);
    
    useEffect(() => {
        setTiers(selectedDivision?.tiers?.tiers || []);
    }, [selectedDivision]);

    useEffect(() => {
        console.log(tiers);
    }, [tiers]);
  return (
    <div>
      <p>Event ID: {event_id}</p>
      <p>Event Name: {event.name}</p>
      <p>Host: {event.host}</p>
      <p>Organiser: {event.organiser}</p>
      <p>Date: {event.date}</p>
      <br></br>
      <DivisionSelector divisions={divisions} selectedDivision={selectedDivision} setSelectedDivision={setSelectedDivision}></DivisionSelector>
      <CompetitionTiers tiers={tiers} setTiers={setTiers}></CompetitionTiers>
    </div>
  )
}

export default Event
