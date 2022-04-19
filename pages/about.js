import styles from '../styles/Home.module.css'
import Navbar from '../components/navbar'


export default function About() {
    return(
        
        <div className={styles.container}>
          <Head>
            <title>Stockify</title>
            <meta name="description" content="simple stock visualising app" />
            <link rel="icon" href="/favicon.ico" />
          </Head>

        <Navbar />

        <main className={styles.main}>
        <section className="relative">
          <div className="container flex flex-col reverse lg:flex-row items-center gap-12 mt-14 lg:mt-20">
            <div className="flex flex-1 flex-col items-center lg:items-start">
              <h2 className="text-bookmark-blue text-3xl md:text-4 lg:text-5xl text-center lg:text-left mb-6">
                A Simple Stock App
              </h2>
              <p className="text-bookmark-grey text-lg text-center lg:text-left mb-6">
                A very noice app lmao
              </p>
              <div className="flex justify-center flex-wrap gap-6">
                <button type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Purple to Blue</button>
                <button type="button" className="text-white bg-gray-800 hover:bg-gray-900 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-800 dark:border-gray-700">Dark</button>
              </div>
            </div>

            <div className="flex justify-center flex-1 mb-10 md:mb-16 lg:mb-0">
              <img className="w-5/6 h-5/6 sm:w-3/4 sm:h-3/4 md:w-full md:h-full" src="https://svgur.com/i/dd3.svg"/>
            </div>
          </div>

        </section>
        </main>

        </div>

    )
}