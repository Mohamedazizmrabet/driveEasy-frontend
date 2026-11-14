# DriveEasy Frontend

Angular standalone frontend for the DriveEasy vehicle-rental management platform. The project will use Angular 22 and communicate with backend services through the API Gateway on port 8080.

Business data lives in service memory only. Restarting a backend service resets its data to the sample set. See [`../PROJECT_PROGRESS.md`](../PROJECT_PROGRESS.md) for implementation status.

## Local setup

Install dependencies with `npm install`, then start the development server with `npm start`. The application runs at http://localhost:4200. Angular 22 requires Node.js 22.22.3+, 24.15.0+, or 26.x and TypeScript 6.0; this workspace's Node 26.13.0 meets that requirement. Backend API access is through http://localhost:8080.
