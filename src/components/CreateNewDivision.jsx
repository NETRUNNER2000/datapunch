import React, {useState, useEffect} from 'react'
import SearchEvents from './SearchEvents'
import { supabase } from '../supabaseClient';

const CreateNewDivision = () => {
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [showDivisionSelect, setShowDivisionSelect] = useState(false);
    console.log(selectedEvent);
    const [formData, setFormData] = useState({
        sex: '',
        age: '',
        weight: '',
        styles: '',
        event_id: ''
    });
    const [message, setMessage] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        if (selectedEvent) {
            setFormData((prevFormData) => ({
                ...prevFormData,
                event_id: selectedEvent.event_id, // Assuming selectedEvent has an `event_id` property
            }));
            setShowDivisionSelect(!showDivisionSelect);
        }
    }, [selectedEvent]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { data, error } = await supabase.from('divisions').insert([formData]);
        if (error) {
            setMessage({ type: 'error', text: error.message });
        } else {
            setMessage({ type: 'success', text: 'Division added successfully!' });
            setFormData({ sex: '', age: '', weight: '', styles: '', event_id: '' });
        }
    };
  return (
    <div>
      <h3>Create A New Division</h3>
      <h2>Select an event</h2>

      {!showDivisionSelect && (<SearchEvents selectedEvent={selectedEvent} setSelectedEvent={setSelectedEvent}></SearchEvents>)}
    
      {showDivisionSelect && (
        <>
            <button onClick={() => setShowDivisionSelect(!showDivisionSelect)}>Change Event</button>
            <div className="max-w-md mx-auto mt-10 p-6 bg-gray-100 rounded-xl shadow-md space-y-4 text-gray-900">
                <h2 className="text-xl font-bold">Add New Division</h2>
                {message && (
                    <p className={`p-2 rounded text-white ${message.type === 'error' ? 'bg-red-500' : 'bg-green-500'}`}>{message.text}</p>
                )}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        name="sex"
                        placeholder="Sex"
                        value={formData.sex}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-md"
                        required
                    />
                    <input
                        type="text"
                        name="age"
                        placeholder="Age"
                        value={formData.age}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-md"
                        required
                    />
                    <input
                        type="text"
                        name="weight"
                        placeholder="Weight"
                        value={formData.weight}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-md"
                        required
                    />
                    <input
                        type="text"
                        name="styles"
                        placeholder="Styles"
                        value={formData.styles}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-md"
                        required
                    />
                    <input
                        type="number"
                        name="event_id"
                        placeholder="Event ID"
                        value={formData.event_id}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-md"
                        readonly
                        disabled
                    />
                    <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700">
                        Submit
                    </button>
                </form>
            </div>
        </>)}
    </div>
  )
}

export default CreateNewDivision
