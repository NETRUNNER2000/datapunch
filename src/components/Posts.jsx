import React, { useEffect, useState } from 'react';
import { UserAuth } from '../context/AuthContext';
import { supabase } from "../supabaseClient"; 

const Posts = () => {
    const {session} = UserAuth();
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        console.log('fetching posts');
    if(!session) return;
    const fetchPosts = async () => {
        const { data, error } = await supabase.from("posts").select("*");
        if (error) {
            console.error("Error fetching fighters:", error);
        } else {
            setPosts(data);
        }
    };
    fetchPosts();
    }, []);

    return (
    <div>
      {JSON.stringify(posts)}
    </div>
  )
}

export default Posts
