import React, {useState, useEffect} from 'react'
import { supabase } from "../supabaseClient";

const CreateNewFighter = () => {

     const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        sex: '',
        dob: ''
    });
    const [message, setMessage] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { data, error } = await supabase.from('fighters').insert([formData]);
        if (error) {
            setMessage({ type: 'error', text: error.message });
        } else {
            setMessage({ type: 'success', text: 'Fighter added successfully!' });
            setFormData({ first_name: '', last_name: '', sex: '', dob: '' });
        }
    };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-gray-100 rounded-xl shadow-md space-y-4 text-gray-900">
    <h2 className="text-xl font-bold">Add New Fighter</h2>
    {message && (
        <p className={`p-2 rounded text-white ${message.type === 'error' ? 'bg-red-500' : 'bg-green-500'}`}>{message.text}</p>
    )}
    <form onSubmit={handleSubmit} className="space-y-4">
        <input
            type="text"
            name="first_name"
            placeholder="First Name"
            value={formData.first_name}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            required
        />
        <input
            type="text"
            name="last_name"
            placeholder="Last Name"
            value={formData.last_name}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            required
        />
        <select
            name="sex"
            value={formData.sex}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            required
        >
            <option value="">Select Sex</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
        </select>
        <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            required
        />
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700">
            Submit
        </button>
    </form>
</div>
  )
}

export default CreateNewFighter
