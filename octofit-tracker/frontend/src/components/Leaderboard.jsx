import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

function Leaderboard() {
  const [entries, setEntries] = useState([])
  const [state, setState] = useState('loading')

  useEffect(() => {
    fetchCollection('leaderboard').then(setEntries).then(() => setState('ready')).catch(() => setState('error'))
  }, [])

  return <section className="resource-view"><div className="eyebrow">Competition / live standings</div><div className="resource-heading"><div><h1>Leaderboard</h1><p>{state === 'error' ? 'The API could not be reached.' : 'Every point counts.'}</p></div><span className="count-badge">{entries.length}</span></div>{state === 'loading' && <p className="notice">Loading standings...</p>}{state === 'error' && <p className="notice error">Check that the API is running on port 8000.</p>}{state === 'ready' && entries.length === 0 && <p className="notice">No standings posted yet.</p>}<div className="resource-list">{entries.map((entry, index) => <article className="resource-row rank-row" key={entry._id || entry.id || index}><span className="rank">{String(index + 1).padStart(2, '0')}</span><strong>{entry.name || entry.username || entry.team || `Competitor ${index + 1}`}</strong><span className="score">{entry.points ?? entry.score ?? 0} pts</span></article>)}</div></section>
}

export default Leaderboard