# Calendar App

This is a simple calendar application that allows users to view and manage events. It integrates authentication using NextAuth with GitHub and Google, and stores event data in a MongoDB database.

## Installation

1. **Clone the repository:**

   ```sh
   git clone https://gitlab.dsr-corporation.com/jasurbek.juraev/shokhrukh-karimov-calendar-events
   ```

2. **Install dependencies:**

   ```sh
   npm install
   ```

3. **Set up environment variables:**

   - Create a `.env.local` file in the root directory.
   - Copy and paste the following environment variables:

   ```env
   NEXTAUTH_SECRET="your-random-secret"

   GITHUB_ID="your-github-client-id"
   GITHUB_SECRET="your-github-client-secret"

   GOOGLE_CLIENT_ID="your-google-client-id"
   GOOGLE_CLIENT_SECRET="your-google-client-secret"

   MONGODB_URI="your-mongodb-connection-string"
   ```

   Replace the placeholder values with your actual credentials.

4. **Run the development server:**

   ```sh
   npm run dev
   ```

   The application will be available at `http://localhost:3000`.

# Setting Up MongoDB

## 1. Create a MongoDB Atlas Account (Cloud)

If you don’t have a MongoDB instance yet, follow these steps to create one using MongoDB Atlas:

1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas) and sign up.
2. Create a new project and a free-tier cluster.
3. Choose a cloud provider and region.
4. Once the cluster is created, go to **Database Access** and create a database user with a username and password.
5. Navigate to **Network Access** and allow access from your IP address (`0.0.0.0/0` for global access, not recommended for production).
6. Click on **Connect** → **Connect your application** and copy the provided **MongoDB URI**.
