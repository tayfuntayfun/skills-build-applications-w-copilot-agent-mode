import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

function Activities() {
  const [activities, setActivities] = useState([])
  const [state, setState] = useState('loading')

  useEffect(() => {
    fetchCollection('activities').then(setActivities).then(() => setState('ready')).catch(() => setState('error'))
  }, [])

  return <ResourceView title="Activities" kicker="Keep moving" state={state} items={activities} empty="No activity logged yet." fields={['type', 'duration', 'distance', 'date']} />
}

function ResourceView({ title, kicker, state, items, empty, fields }) {
  return <section className="resource-view">
    <div className="eyebrow">{kicker} / data feed</div>
    <div className="resource-heading"><div><h1>{title}</h1><p>{state === 'error' ? 'The API could not be reached.' : `${items.length} ${items.length === 1 ? 'record' : 'records'} available`}</p></div><span className="count-badge">{items.length}</span></div>
    {state === 'loading' && <p className="notice">Loading {title.toLowerCase()}...</p>}
    {state === 'error' && <p className="notice error">Check that the API is running on port 8000.</p>}
    {state === 'ready' && items.length === 0 && <p className="notice">{empty}</p>}
    <div className="resource-list">{items.map((item, index) => <article className="resource-row" key={item._id || item.id || index}><strong>{item.name || item.title || item.type || `Activity ${index + 1}`}</strong><div className="row-details">{fields.filter((field) => item[field] !== undefined).map((field) => <span key={field}>{field}: {String(item[field])}</span>)}</div></article>)}</div>
  </section>
}

export default Activities