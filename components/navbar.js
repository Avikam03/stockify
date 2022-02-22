import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; 
import { faBars } from "@fortawesome/free-solid-svg-icons"; 
import Link from 'next/link'

export default function NavBar(){
  return(
    <nav className="container flex items-center py-4 sm:mt-1">
      <div className="py-1">
        <Link href="/">
          <img className="cursor-pointer object-cover h-10 w-25" src="https://i.ibb.co/ncWKcVc/image.png" />
        </Link>
      </div>

      <ul className="hidden sm:flex flex-1 justify-end items-center gap-12 text-bookmark-blue uppercase text-xs">
        <li className="cursor-pointer">Features</li>
        <li className="cursor-pointer"><Link href="/about">About</Link></li>
        <li className="cursor-pointer ">Dashboard</li>
      </ul>
      <div className="flex sm:hidden flex-1 justify-end">
          <FontAwesomeIcon icon={faBars}></FontAwesomeIcon>
      </div>
    </nav>

  )
}

// export default function Navbar(){
//     const [navbarOpen, setNavbarOpen] = React.useState(false);
//     return(
//         <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 bg-gray-900 mb-3">
//         <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
//           <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
//             <a
//               className="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white"
//             //   href="#"
//             >
//               App Name
//             </a>
//             <button
//               className="text-white cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
//               type="button"
//               onClick={() => setNavbarOpen(!navbarOpen)}
//             >
//               <i className="fas fa-bars"></i>
//             </button>
//           </div>
//           <div
//             className={
//               "lg:flex flex-grow items-center" +
//               (navbarOpen ? " flex" : " hidden")
//             }
//             id="example-navbar-danger"
//           >
//             <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
//               <li className="nav-item">
//                 <a
//                   className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
//                   href="#pablo"
//                 >
//                   <i className="fab fa-facebook-square text-lg leading-lg text-white opacity-75"></i><span className="ml-2">Share</span>
//                 </a>
//               </li>
//               <li className="nav-item">
//                 <a
//                   className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
//                   href="#pablo"
//                 >
//                   <i className="fab fa-twitter text-lg leading-lg text-white opacity-75"></i><span className="ml-2">Tweet</span>
//                 </a>
//               </li>
//               <li className="nav-item">
//                 <a
//                   className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
//                   href="#pablo"
//                 >
//                   <i className="fab fa-pinterest text-lg leading-lg text-white opacity-75"></i><span className="ml-2">Pin</span>
//                 </a>
//               </li>
//             </ul>
//           </div>
//         </div>
//       </nav>

//     )
// }