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
