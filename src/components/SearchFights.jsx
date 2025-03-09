import React, {useState, useEffect} from 'react'
import { supabase } from "../supabaseClient"; 
import { Link, useNavigate } from 'react-router-dom'

const SearchFights = ({fighter_id}) => {

    
    const [fights, setFights] = useState([]);
    const [search, setSearch] = useState("");


    const navigate = useNavigate();

    const handleRowClick = (fight) => {
        
      };

    const fetchFights = async () => {
        if(!fighter_id) return;
        const { data, error } = await supabase.from("fights").select("*").or(`fighter_id_blue.eq.${fighter_id},fighter_id_red.eq.${fighter_id}`);
        if (error) {
            console.error("Error fetching fights:", error);
        } else {
            setFights(data);
        }
    };

      useEffect(() => {
        fetchFights();
      }, [])


  return (
    <div>

    <form className="w-full">
    <div className="flex items-center border-b border-teal-500 py-2">
        <input onChange={(e) => setSearch(e.target.value)} className="appearance-none bg-transparent border-none w-full text-white-700 mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" placeholder="John Snow" aria-label="Full name"/>

        <button className="flex-shrink-0 border-transparent border-4 text-teal-500 hover:text-teal-800 text-sm py-1 px-2 rounded" type="button">
        Clear
        </button>
    </div>
    </form>

    <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" className="px-6 py-3">
                        Fight ID
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Division
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Tier
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Winner
                    </th>

                </tr>
            </thead>
            <tbody>
                {fights.filter((fight) => {
                    return search.toLowerCase() === '' 
                    ? fight 
                    : fight.name.toLowerCase().includes(search.toLowerCase()) ||
                      fight.host.toLowerCase().includes(search.toLowerCase())

                }).map((fight) => (
                    <tr key={fight.event_id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200" onClick={() => handleRowClick(fight)}>
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {fight.fight_id}
                    </th>
                    <td className="px-6 py-4">
                        {fight.division_id}
                    </td>
                    <td className="px-6 py-4">
                        {fight.tier}
                    </td>
                    <td className="px-6 py-4">
                        {fight.winner_id}
                    </td>
   
                </tr>
                ))}
            </tbody>
        </table>
    </div>


   </div>
  )
}

export default SearchFights
