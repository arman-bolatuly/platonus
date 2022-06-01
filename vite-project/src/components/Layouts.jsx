import {Link, Outlet} from 'react-router-dom'


const Layouts = () => {
    return (
    <>
        <header>
            <Link to="/">Введение реквизитов</Link>
        </header>
        <Outlet />
        <footer>2022</footer>
    </>
    )
}

export {Layouts}

{/* <Link to="/posts/:id">Проверка реквизитов</Link>
<Link to="/posts">Просмотр реквизитов</Link> */}