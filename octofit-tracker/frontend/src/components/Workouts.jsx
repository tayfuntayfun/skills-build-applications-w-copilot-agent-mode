import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [state, setState] = useState('loading')

  useEffect(() => {
    fetchCollection('workouts').then(setWorkouts).then(() => setState('ready')).catch(() => setState('error'))
  }, [])

  return <section className="resource-view"><div className="eyebrow">Training / your next effort</div><div className="resource-heading"><div><h1>Workouts</h1><p>{state === 'error' ? 'The API could not be reached.' : `${workouts.length} ${workouts.length === 1 ? 'workout' : 'workouts'} ready to explore`}</p></div><span className="count-badge">{workouts.length}</span></div>{state === 'loading' && <p className="notice">Loading workouts...</p>}{state === 'error' && <p className="notice error">Check that the API is running on port 8000.</p>}{state === 'ready' && workouts.length === 0 && <p className="notice">No workouts suggested yet.</p>}<div className="resource-list">{workouts.map((workout, index) => <article className="resource-row" key={workout._id || workout.id || index}><strong>{workout.name || workout.title || `Workout ${index + 1}`}</strong><div className="row-details"><span>{workout.type || 'Training session'}</span><span>{workout.duration || 'Flexible duration'}</span><span>{workout.difficulty || 'All levels'}</span></div></article>)}</div></section>
}

export default Workouts