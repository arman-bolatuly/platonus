import './App.css'
import {Routes, Route, Link} from 'react-router-dom'
import Page1 from './pages/Page1'
import Page2 from './pages/Page2'
import Page3 from './pages/Page3'
import EditPage from './pages/EditPage'
import {Layouts} from './components/Layouts'

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Layouts />}>
          <Route index element={<Page1 />} />
          <Route path='posts' element={<Page3 />} />
          <Route path='posts/:id' element={<Page2 />} />
          <Route path='posts/edit/:id' element={<EditPage />} />
          <Route
      path="*" element={
        <main style={{ padding: "1rem" }}>
          <p>There's nothing here!</p>
          <Link to="/">Page 1</Link>
        </main>
      }
    />
        </Route>
      </Routes>
    </>
  )
}

export default App
