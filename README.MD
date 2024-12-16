# Countries Around The World

This project is a web application that displays information about countries, including their flags, borders, and population history.

## Technologies Used

- **Frontend**: Next.js (React)
- **Backend**: Node.js (Express)
- **Database**: Not used (data is fetched via API)
- **API**: A custom API to fetch country data
- **Docker**: For containerization and running the app with Docker Compose

## Prerequisites

Before running the application, make sure you have the following installed:

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/)
- [Node.js](https://nodejs.org/) (if running the app without Docker)

## Setting Up the Application

### Running the app

1. Clone the repository:

   ```
   git clone https://github.com/luiz-felipe-b/developstoday-challenge.git

2. Navigate to both applications folders and run

   ```
   npm install

3. Run the docker-compose command:

   ```
   docker-compose up --build

4. Or start both applications with:
   1. Frontend:
      ```
      npm run dev
   2. Backend
      ```
      node index.js

OBS: Remind to check if there are any applications that are running at the ports 3000 and 4000



