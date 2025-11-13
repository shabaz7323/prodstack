import React, { useEffect, useState } from 'react';

const API = import.meta.env.VITE_API_URL || "/api";

export default function App(){
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(()=>{ fetchUsers() }, []);

  async function fetchUsers(){
    const res = await fetch(`${API}/users`);
    const data = await res.json();
    setUsers(data);
  }

  async function addUser(e){
    e.preventDefault();
    await fetch(`${API}/users`, {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({ name, email })
    });
    setName(''); setEmail('');
    fetchUsers();
  }

  async function deleteUser(id){
    await fetch(`${API}/users/`+id, { method: 'DELETE' });
    fetchUsers();
  }

  return (
    <div style={{maxWidth:800, margin:'2rem auto', fontFamily:'sans-serif'}}>
      <h1>ProdStack — Users (CRUD)</h1>
      <form onSubmit={addUser} style={{display:'flex', gap:8, marginBottom:16}}>
        <input placeholder="Name" value={name} onChange={e=>setName(e.target.value)} required />
        <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required />
        <button type="submit">Add</button>
      </form>
      <ul>
        {users.map(u=>(
          <li key={u._id} style={{marginBottom:8}}>
            <strong>{u.name}</strong> — {u.email}
            <button onClick={()=>deleteUser(u._id)} style={{marginLeft:8}}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}
