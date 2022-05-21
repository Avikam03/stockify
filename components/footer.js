import styles from '../styles/Home.module.css'


export default function Footer() {
    return(
        <footer className="p-4 bg-white rounded-lg shadow md:flex md:items-center md:justify-between md:p-6 dark:bg-gray-50">
            <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2022 <a href="https://avikam.xyz" className="hover:underline">Avikam Mangla™</a>. All Rights Reserved.
            </span>
            <ul className="flex flex-wrap items-center mt-3 text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
                <li>
                    <a href="https://linkedin.com/in/avikammangla" className="mr-4 hover:underline md:mr-6 ">Linkedin</a>
                </li>
                <li>
                    <a href="https://github.com/avikam03" className="mr-4 hover:underline md:mr-6">Github</a>
                </li>
                <li>
                    <a href="https://instagram.com/avikammangla" className="mr-4 hover:underline md:mr-6">Instagram</a>
                </li>
                <li>
                    <a href="mailto:avikam03@gmail.com" className="hover:underline">Email</a>
                </li>
            </ul>
        </footer>
    )
}