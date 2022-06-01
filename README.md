git clone
!!!after cloning you should do:
cd platonus
npm install

DATABASE: sqlite
first CLI:
cd server
npx prisma init /-/
npx prisma studio /-/ start prisma-client server or start 
db server on PORT 5555 => localhost:5555
npx prisma migrate dev /-/ migrate prisma-db
npx prisma generate /-/ generated prisma-db

BACKEND: 
    the first, you must create new file ".env"
    .env file for BACKEND:
        DATABASE_URL="file:./dev"
        PORT=3001
second CLI:
cd server
npm run dev

FRONTEND:
third CLI:
cd vite-project
npm run dev