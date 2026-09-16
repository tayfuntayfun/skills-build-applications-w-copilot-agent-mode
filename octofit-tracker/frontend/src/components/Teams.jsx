import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

function Teams() {
  const [teams, setTeams] = useState([])
  const [state, setState] = useState('loading')

  useEffect(() => {
    fetchCollection('teams').then(setTeams).then(() => setState('ready')).catch(() => setState('error'))
  }, [])

  return <CollectionView title="Teams" kicker="Find your people" state={state} items={teams} empty="No teams created yet." />
}

function CollectionView({ title, kicker, state, items, empty }) {
  return <section className="resource-view"><div className="eyebrow">{kicker} / directory</div><div className="resource-heading"><div><h1>{title}</h1><p>{state === 'error' ? 'The API could not be reached.' : `${items.length} ${items.length === 1 ? 'team' : 'teams'} in the directory`}</p></div><span className="count-badge">{items.length}</span></div>{state === 'loading' && <p className="notice">Loading {title.toLowerCase()}...</p>}{state === 'error' && <p className="notice error">Check that the API is running on port 8000.</p>}{state === 'ready' && items.length === 0 && <p className="notice">{empty}</p>}<div className="resource-list">{items.map((item, index) => <article className="resource-row" key={item._id || item.id || index}><strong>{item.name || item.title || `Team ${index + 1}`}</strong><span>{item.members?.length ?? item.memberCount ?? 0} members</span></article>)}</div></section>
}

export default Teams