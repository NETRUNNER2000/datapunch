import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
import React, { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";

const SearchFighters = ({ maxHeight = "400px", selectedFighter, setSelectedFighter }) => {
  const [fighters, setFighters] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const navigate = useNavigate();

  const handleRowClick = (id) => {
    const fighter = fighters.find(fighter => fighter.fighter_id === id);
    setSelectedId(id);
    if(setSelectedFighter){
      setSelectedFighter(fighter);
      setSearch(`${fighter.first_name} ${fighter.last_name}`);
    }
    else{
        navigate(`/fighterinfo`, { state: { fighter_id: id } });
    }
  };

  const fetchFighters = async () => {
    const { data, error } = await supabase.from("fighters").select("*");
    if (error) {
      console.error("Error fetching fighters:", error);
    } else {
      setFighters(data);
    }
  };

  useEffect(() => {
    fetchFighters();
  }, []);

  return (
    <div className="w-full">
      <form className="w-full">
        <div className="flex items-center border-b border-teal-500 py-2">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="appearance-none bg-transparent border-none w-full text-white-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
            type="text"
            placeholder="John Snow"
            aria-label="Full name"
          />
          <button
            className="flex-shrink-0 border-transparent border-4 text-teal-500 hover:text-teal-800 text-sm py-1 px-2 rounded"
            type="button"
            onClick={() => setSearch("")}
          >
            Clear
          </button>
        </div>
      </form>
     
      <div className="relative overflow-x-auto" style={{ maxHeight, overflowY: "auto" }}>
      <Table>   
        <TableHeader className="bg-transparent">
                    <TableRow className="hover:bg-transparent">
                      <TableHead>Fighter Id</TableHead>
                      <TableHead>First Name</TableHead>
                      <TableHead>Last Name</TableHead>
                      <TableHead>DOB</TableHead>
                      {/* <TableHead className="text-right">Balance</TableHead> */}
                    </TableRow>
                  </TableHeader>
                  <tbody aria-hidden="true" className="table-row h-2"></tbody>
                  <TableBody className="[&_td:first-child]:rounded-l-lg [&_td:last-child]:rounded-r-lg">
                  {fighters
                    .filter((fighter) => {
                        const fullName = `${fighter.first_name} ${fighter.last_name}`.toLowerCase();
                        return search.toLowerCase() === ""
                        ? true
                        : fighter.first_name.toLowerCase().includes(search.toLowerCase()) ||
                            fighter.last_name.toLowerCase().includes(search.toLowerCase()) ||
                            fullName.includes(search.toLowerCase());
                    })
                    .map((fighter) => (
                      <TableRow
                        key={fighter.fighter_id}
                        onClick={() => handleRowClick(fighter.fighter_id)}
                        className="odd:bg-muted/50 odd:hover:bg-muted/50 border-none hover:bg-transparent"
                      >
                        <TableCell className="py-2.5 font-medium">{fighter.fighter_id}</TableCell>
                        <TableCell className="py-2.5">{fighter.first_name}</TableCell>
                        <TableCell className="py-2.5">{fighter.last_name}</TableCell>
                        <TableCell className="py-2.5">{fighter.dob}</TableCell>
                        {/* <TableCell className="py-2.5 text-right">$0.00</TableCell> */}
                      </TableRow>
                    ))}
                  </TableBody>
                  <tbody aria-hidden="true" className="table-row h-2"></tbody>
                  
                
      </Table>
      </div>
    </div>
  );
};

export default SearchFighters;
