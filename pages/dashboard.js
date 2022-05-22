import Head from 'next/head'
import styles from '../styles/Home.module.css'
import axios from 'axios';
import { useState, useEffect } from 'react';
import Footer from './../components/footer'



import Navbar from '../components/navbar'
import Tablestocks from '../components/tablestocks'
import Tablestocks2 from '../components/tablestocks2'

export default function Home() {


  const [number, setNumber] = useState('')
//   const [tickerlist, settickerlist] = useEffect('')
  const [qms, setqms] = useState({});
  // var qms = []
  // var tickerlist = []
  const [qvs, setQvs] = useState({});
  const [tickerlist, setTickerlist] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  // const [tickerlist, settickerlist] = useState({});

  const baseUrl = "https://limitless-stream-87095.herokuapp.com/"
    
  
  const onChangeHandler = (x) => {
    setNumber(x)
    // console.log(number)
  }

  const qmsdisplay = async () => {
    setIsLoading(true)
    await axios({
        method: 'get',
        url: baseUrl + 'hqm?value=' + number,
        responseType: 'json',
      })
      .then(function (response) {
        console.log(response.data)
        // var qms = response.data
        setqms(response.data)
        // console.log(qms)
        console.log(response.data['Ticker'])
        // settickerlist(response.data['Ticker'])
        var temp = Object.values(response.data['Ticker'])
        tickerlist = temp
        console.log(qms)
        console.log(tickerlist)
        console.log(tickerlist[1])
        // settickerlist(qms['Ticker'])
        setIsLoading(false)
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  const qvsdisplay = async () => {
    setIsLoading(true)
    await axios({
        method: 'get',
        url: baseUrl + 'qvs?value=' + number,
        responseType: 'json',
      })
      .then(function (response) {
  
        setQvs(response.data)
        console.log(response.data)
        console.log(qvs)
        var temp = Object.values(response.data['Ticker'])
        console.log(temp)
        setTickerlist(temp)
        console.log(tickerlist)
        setIsLoading(false)
      })
      .catch(function (error) {
        console.log(error);
      })
  }   

  // useEffect(() => {
  //   if (qvs.length > 0) {
  //     qvs.map(function(item, i){
  //       console.log(item)
  //     })
  //   }
  // })

    return (
      <div>
      <div className={styles.container}>
      <Navbar />
        <Head>
          <title>Stockify</title>
          <meta name="description" content="simple stock visualising app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
  
        
  
        <main className={styles.main}>
  
          <h1 className="mt-20 text-center text-6xl text-black-800 font-bold	 md:text-6xl lg:text-6xl">
            <span className="text-indigo-400">Dashboard</span>
          </h1>
  
          <div className="flex items-center justify-center mt-10 ">
            <div className="relative text-gray-600 focus-within:text-gray-400">
  
              <div>
              <input
                type="search"
                name="q"
                className="w-80 md:w-96 h-12 py-2 px-20 text-sm text-black bg-zinc-200 rounded-md pl-10 focus:outline-none"
                placeholder="Enter Investment Amount (> $1000)"
                value={number}
                onChange={e => onChangeHandler(e.target.value)}
                autoComplete="off"/>
              </div>              
          </div>
          
          </div>  
  
          <div className="flex justify-center mt-5">
              <button className="bg-[#525252] hover:bg-black-700 text-white font-bold py-2 px-4 rounded content-center mx-5"	onClick={qmsdisplay}>
                  Quantitative Momentum Strategy
              </button>
              <button className="bg-[#525252] hover:bg-black-700 text-white font-bold py-2 px-4 rounded content-center mx-5" onClick={qvsdisplay}>
                  Quantitative Value Strategy
              </button>
          </div>
          {/* <h1>{tickerlist.length}</h1> */}

          {/* {
            <ul>
              {tickerlist.map(function(item, index){
                return (<li key={index}>{item}</li>)
              })}
            </ul>
          } */}


          
          {/* <Tablestocks data={qvs} /> */}
          {Object.keys(qms).length > 0 ? <h1 className="font-bold leading-tight text-3xl mt-10 text-center">Quantitative Momentum Strategy</h1> : null}
          {Object.keys(qms).length > 0 ? <Tablestocks name="hello" data={qms}/> : null}
          {Object.keys(qvs).length > 0 ? <h1 className="font-bold leading-tight text-3xl mt-10 text-center">Quantitative Value Strategy</h1> : null}

          {Object.keys(qvs).length > 0 ? <Tablestocks2 name="hello" data={qvs}/> : null}


          {isLoading ? 
          <div className="flex justify-center items-center mt-10">
          <h1 className="font-medium leading-tight text-3xl mx-5">Loading</h1>
          <svg role="status" className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
          </svg>
          </div>
          : null}
          





  
        </main>
      </div>
      {/* <Footer></Footer> */}
      </div>
    )
  
  
}


