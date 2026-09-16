import express from 'express';

type ResourceName = 'users' | 'teams' | 'activities' | 'leaderboard' | 'workouts';

const app = express();
const port = Number(process.env.PORT) || 8000;
const host = '0.0.0.0';
const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${port}`;
const resources: Record<ResourceName, unknown[]> = {
  users: [],
  teams: [],
  activities: [],
  leaderboard: [],
  workouts: [],
};

app.use(express.json());

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok', apiBaseUrl });
});

function registerResourceRoutes(resourceName: ResourceName) {
  app
    .route(`/api/${resourceName}/`)
    .get((_request, response) => {
      response.json(resources[resourceName]);
    })
    .post((request, response) => {
      const resource = request.body;
      resources[resourceName].push(resource);
      response.status(201).json(resource);
    });
}

(['users', 'teams', 'activities', 'leaderboard', 'workouts'] as ResourceName[]).forEach(
  registerResourceRoutes,
);

app.listen(port, host, () => {
  console.log(`OctoFit API listening at ${apiBaseUrl}`);
});
