import { NavLink, Navigate, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import { API_BASE_URL } from './api.js'
import './App.css'

const navigation = [
  { label: 'Overview', path: '/' },
  { label: 'Activities', path: '/activities' },
  { label: 'Leaderboard', path: '/leaderboard' },
  { label: 'Teams', path: '/teams' },
  { label: 'Users', path: '/users' },
  { label: 'Workouts', path: '/workouts' },
]

function Overview() {
  return (
    <section className="overview">
      <div className="eyebrow">Octofit Tracker / command center</div>
      <h1>Train with your team.<br /><span>Keep your edge.</span></h1>
      <p className="intro">A clear view of movement, momentum, and the people pushing alongside you.</p>
      <div className="overview-grid">
        {navigation.slice(1).map(({ label, path }) => (
          <NavLink className="overview-link" key={path} to={path}>
            <span>{label}</span><span aria-hidden="true">↗</span>
          </NavLink>
        ))}
      </div>
    </section>
  )
}

function App() {
  return (
    <div className="app-shell">
      <header className="topbar">
        <NavLink className="brand" to="/" aria-label="Octofit Tracker home">
          <span className="brand-mark">O</span>
          <span>Octofit<span className="brand-muted">/tracker</span></span>
        </NavLink>
        <div className="api-status"><span className="status-dot" /> API connected <span className="api-host">{API_BASE_URL}</span></div>
      </header>
      <nav className="nav-strip" aria-label="Primary navigation">
        {navigation.map(({ label, path }) => (
          <NavLink className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} end={path === '/'} key={path} to={path}>
            {label}
          </NavLink>
        ))}
      </nav>
      <main className="content">
        <Routes>
          <Route path="/" element={<Overview />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="*" element={<Navigate replace to="/" />} />
        </Routes>
      </main>
      <footer className="footer">Octofit Tracker <span>•</span> Move well, together.</footer>
    </div>
  )
}

export default App