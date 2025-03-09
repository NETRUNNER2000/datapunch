import React, {useState, useEffect} from 'react'
import { supabase } from '../supabaseClient';
import CalendarSelect from './CalendarSelect';

const CreateNewEvent = () => {

    const [formData, setFormData] = useState({
        name: '',
        host: '',
        organiser: '',
        date: ''
    });
    const [message, setMessage] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { data, error } = await supabase.from('events').insert([formData]);
        if (error) {
            setMessage({ type: 'error', text: error.message });
        } else {
            setMessage({ type: 'success', text: 'Event added successfully!' });
            setFormData({ name: '', host: '', organiser: '', date: '' });
            console.log('Event added successfully!');
        }
    };

    
  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-gray-800 rounded-xl shadow-md space-y-4 text-white">
    <h2 className="text-xl font-bold text-gray-700">Add New Event</h2>
    {message && (
        <p className={`p-2 rounded text-white ${message.type === 'error' ? 'bg-red-500' : 'bg-green-500'}`}>{message.text}</p>
    )}
    <form onSubmit={handleSubmit} className="space-y-4">
        <input
            type="text"
            name="name"
            placeholder="Event Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            required
        />
        <input
            type="text"
            name="host"
            placeholder="Host"
            value={formData.host}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            required
        />
        <input
            type="text"
            name="organiser"
            placeholder="Organiser"
            value={formData.organiser}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            required
        />
        <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            required
        />
        {/* <CalendarSelect/> */}
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700">
            Submit
        </button>
    </form>
</div>
);
}

export default CreateNewEvent
