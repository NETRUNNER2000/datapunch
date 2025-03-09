import React, {useState, useEffect} from 'react'
import { supabase } from "../supabaseClient"; 
import { Link, useNavigate } from 'react-router-dom'

import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";

const SearchEvents = ({selectedEvent, setSelectedEvent}) => {

    const [events, setEvents] = useState([]);
    const [search, setSearch] = useState("");


    const navigate = useNavigate();

    const handleRowClick = (event) => {
        // Navigate to another page, passing the ID as part of the URL
        try{setSelectedEvent(event);}
        catch{
            navigate(`/eventinfo`, { state: { event_id: event.event_id } });
        }
      };

    const fetchEvents = async () => {
        const { data, error } = await supabase.from("events").select("*");
        if (error) {
            console.error("Error fetching events:", error);
        } else {
            setEvents(data);
        }
    };

      useEffect(() => {
        fetchEvents();
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
           <Table>   
                <TableHeader className="bg-transparent">
                            <TableRow className="hover:bg-transparent">
                              <TableHead>Event ID</TableHead>
                              <TableHead>Event Name</TableHead>
                              <TableHead>Host</TableHead>
                              <TableHead>Organiser</TableHead>
                              <TableHead>Date</TableHead>
                              {/* <TableHead className="text-right">Balance</TableHead> */}
                            </TableRow>
                          </TableHeader>
                          <tbody aria-hidden="true" className="table-row h-2"></tbody>
                          <TableBody className="[&_td:first-child]:rounded-l-lg [&_td:last-child]:rounded-r-lg">
                          {events.filter((event) => {
                            return search.toLowerCase() === '' 
                            ? event 
                            : event.name.toLowerCase().includes(search.toLowerCase()) ||
                            event.host.toLowerCase().includes(search.toLowerCase())

                            }).map((event)=> (
                              <TableRow
                                key={event.event_id}
                                onClick={() => handleRowClick(event)}
                                className="odd:bg-muted/50 odd:hover:bg-muted/50 border-none hover:bg-transparent"
                              >
                                <TableCell className="py-2.5 font-medium">{event.event_id}</TableCell>
                                <TableCell className="py-2.5">{event.name}</TableCell>
                                <TableCell className="py-2.5">{event.host}</TableCell>
                                <TableCell className="py-2.5">{event.organiser}</TableCell>
                                <TableCell className="py-2.5">{event.date}</TableCell>
                                {/* <TableCell className="py-2.5 text-right">$0.00</TableCell> */}
                              </TableRow>
                            ))}
                          </TableBody>
                          <tbody aria-hidden="true" className="table-row h-2"></tbody>                        
              </Table>

    </div>


   </div>
  )
}

export default SearchEvents
