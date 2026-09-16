import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

function Users() {
  const [users, setUsers] = useState([])
  const [state, setState] = useState('loading')

  useEffect(() => {
    fetchCollection('users').then(setUsers).then(() => setState('ready')).catch(() => setState('error'))
  }, [])

  return <section className="resource-view"><div className="eyebrow">Community / athlete directory</div><div className="resource-heading"><div><h1>Users</h1><p>{state === 'error' ? 'The API could not be reached.' : `${users.length} ${users.length === 1 ? 'athlete' : 'athletes'} registered`}</p></div><span className="count-badge">{users.length}</span></div>{state === 'loading' && <p className="notice">Loading users...</p>}{state === 'error' && <p className="notice error">Check that the API is running on port 8000.</p>}{state === 'ready' && users.length === 0 && <p className="notice">No users registered yet.</p>}<div className="resource-list">{users.map((user, index) => <article className="resource-row" key={user._id || user.id || index}><span className="avatar">{(user.name || user.username || 'A').charAt(0).toUpperCase()}</span><strong>{user.name || user.username || `Athlete ${index + 1}`}</strong><span>{user.email || user.level || 'Octofit member'}</span></article>)}</div></section>
}

export default Users