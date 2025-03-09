import React, { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";

const CompetitionTiers = ({ divisionId, tiers, setTiers, setShowCreateFight, showCreateFight }) => {
  const [fights, setFights] = useState([]);
  const [renderable, setRenderable] = useState({});

  const fetchFights = async () => {
    console.log("Fetching fights for division id: ", divisionId);
    if (!divisionId) return;
    const divisionIdInt = parseInt(divisionId, 10);

    // Fetch fights data
    const { data: fightsData, error: fightsError } = await supabase
      .from('fights')
      .select(`
        fight_id,
        tier,
        division_id,
        fighter_id_blue,
        fighter_id_red,
        winner_id
      `)
      .eq('division_id', divisionIdInt);  // Use divisionIdInt instead of hardcoding '1'

    if (fightsError) {
      console.error("Error fetching fights:", fightsError);
      return;
    }

    // Fetch fighters data (blue, red, and winner)
    const fighterIds = [
      ...new Set(
        fightsData.map(fight => [fight.fighter_id_blue, fight.fighter_id_red, fight.winner_id]).flat()
      ),
    ];

    const { data: fighters, error: fightersError } = await supabase
      .from('fighters')
      .select('fighter_id, first_name')
      .in('fighter_id', fighterIds);

    if (fightersError) {
      console.error('Error fetching fighters:', fightersError);
      return;
    }

    // Map fighters by their fighter_id for easy lookup
    const fighterMap = {};
    fighters.forEach(fighter => {
      fighterMap[fighter.fighter_id] = fighter;
    });

    // Combine the fight data with the corresponding fighter data
    const fightResults = fightsData.map(fight => {
      const blueFighter = fighterMap[fight.fighter_id_blue];
      const redFighter = fighterMap[fight.fighter_id_red];
      const winnerFighter = fighterMap[fight.winner_id];

      return {
        fight_id: fight.fight_id,
        tier: fight.tier,
        division_id: fight.division_id,
        blue_fighter_id: blueFighter.fighter_id,
        blue_fighter_name: blueFighter.first_name,
        red_fighter_id: redFighter.fighter_id,
        red_fighter_name: redFighter.first_name,
        winner_id: fight.winner_id,
        winner_name: winnerFighter.first_name,
      };
    });

    setFights(fightResults);
  };

  const updateRenderabletiers = () => {
    console.log("Creating renderable tiers");
    const renderableTiers = {};
    // 1. Get distinct tiers from the fights
    const distinctTiers = [...new Set(fights.map(fight => fight.tier))];

    // 2. Filter fights by a specific tier (e.g., tier = 1)
    distinctTiers.forEach(tier => {
      const filteredFights = fights.filter(fight => fight.tier === tier);
      renderableTiers[tier] = filteredFights;
    });

    setRenderable(renderableTiers);
  };

  useEffect(() => {
    fetchFights();
  }, [divisionId]);

  useEffect(() => {
    console.log("Generated renderable data structure:", renderable);
  }, [renderable]);

  useEffect(() => {
    console.log("Successfully fetched fights: ", fights);
    updateRenderabletiers();
  }, [fights]);

  const updateTierFights = (tierIndex, delta) => {
    console.log("Tier index, delta: ", tierIndex, delta);
    // Make a shallow copy of the renderable object
    setRenderable(prevRenderable => {
      // Copy the previous state object
      const updatedRenderable = { ...prevRenderable };

      // If the tier already exists, create a new copy of the array and push a new object
      updatedRenderable[tierIndex + 1] = [
        ...updatedRenderable[tierIndex + 1],
        {},
      ];

      console.log("Updating tier fights: ", updatedRenderable);

      // Return the updated object
      return updatedRenderable;
    });
    setShowCreateFight(!showCreateFight)
  };

  return (
    <div className="flex flex-col items-center gap-6 p-6">
      <h2 className="text-4xl font-bold">Competition Tiers</h2>
      <div className="flex flex-col gap-6">
        {Object.entries(renderable)?.map((fights, tierIndex) => (
          <div key={tierIndex} className="flex flex-col items-center">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              Tier {tierIndex + 1}
              <button
                onClick={() => updateTierFights(tierIndex, 1)}
                className="px-2 bg-green-500 text-white rounded"
              >
                +
              </button>
            </h3>
            <div className="flex gap-4 mt-2">
              {renderable[tierIndex + 1]?.map((_, fightIndex) => (
                <div
                  key={fightIndex}
                  className="w-24 h-24 flex items-center justify-center bg-blue-500 text-white font-bold rounded-lg shadow-md"
                >
                  {renderable[tierIndex + 1][fightIndex].red_fighter_name} vs{" "}
                  {renderable[tierIndex + 1][fightIndex].blue_fighter_name}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompetitionTiers;
