git clone https://github.com/ArmanBulatovich/platonus.git
!!!after cloning you should do:
cd platonus


DATABASE: sqlite
first CLI:
cd server
npm install
npx prisma migrate dev /-/ migrate prisma-db
npx prisma generate /-/ generated prisma-db
npx prisma studio /-/ start prisma-client server or start 
/-/ db User Interface started on PORT 5555 => localhost:5555

BACKEND:
second CLI:
cd server
npm run dev


FRONTEND:
third CLI:
cd vite-project
npm install
npm run dev
