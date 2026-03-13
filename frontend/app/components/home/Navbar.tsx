export default function Navbar () {
  return (
    <header className="fixed w-full top-0 left-0 right-0 h-16 flex items-center justify-center">
      <nav className="bg-white shadow-md flex items-center justify-between">
        <div className="flex">
          <img src="/logo.png" alt="Team 18" />
        </div>
        <ul className="flex items-center gap-6">
          <li>
            <a href="/#">HOME</a>
          </li>
         <li>
            <a href="/#">ABOUT</a>
          </li>
        </ul>
        <div>
          Sign In
        </div>
      </nav>
    </header>
  )
}
