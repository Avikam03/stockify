import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import axios from 'axios';
import { useState, useEffect } from 'react';
import Link from 'next/link'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; 
import { faBars } from "@fortawesome/free-solid-svg-icons";
import Footer from './../components/footer'


import Navbar from '../components/navbar'

export default function Home() {

  const [searchBar, searchBarChange] = useState('');
  const [data, setData] = useState([]);
  const [suggestions, setSuggestions] = useState('');
  var link = '';
  // var listofstocks = [];
  const [listofstocks, setListofStocks] = useState([]);

  const baseUrl = "https://sandbox.iexapis.com/stable/"

  const onChangeHandler = (text) => {
    let matches = []
    if (text.length>0){
      matches = listofstocks.filter(stock => {
        const regex = new RegExp(`${text}`, "gi")
        return stock.symbol.match(regex)
      })
    }
    console.log('matches:', matches)
    setSuggestions(matches.slice(0, 10));
    searchBarChange(text);
    

  }
  
  useEffect(() => {

    axios({
      method: 'get',
      url: baseUrl + "ref-data/iex/symbols/?token=" + process.env.secret,
      responseType: 'json',
    })
    .then(function (response) {

      setListofStocks(response.data)
      console.log(response.data)
    })
  
    axios({
      method: 'get',
      url: baseUrl + "stock/market/list/mostactive/?token=" + process.env.secret,
      responseType: 'json'
    })
    .then(function (response) {
        var temp = response.data
        temp.forEach(function (element) {
          if (element['change'].toString().charAt(0) === '-'){
            element['changeclassname'] = "inline-block py-1.5 px-2.5 leading-none text-center whitespace-nowrap align-baseline font-bold bg-[#EC6B70] text-white rounded"
            // bg-red-50
          } else {
            element['changeclassname'] = "inline-block py-1.5 px-2.5 leading-none text-center whitespace-nowrap align-baseline font-bold bg-[#49D897] text-white rounded"
            // bg-green-500
          }
        });
        setData(temp)
        console.log(temp)
        // console.log(response.data[0]["symbol"])
        // setData(response.data)
        // console.log(response.data)
    });


  }, [])

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
      {/* <main> */}
        {/* <h1 className="text-5xl font-medium leading-tight mt-0 mb-2 text-blue-600">
          Stock App
        </h1> */}

        <h1 className="mt-20 text-center text-6xl text-black-800 font-bold	 md:text-6xl lg:text-6xl">
          <span className="text-indigo-400">Stock</span>ify
        </h1>

        {/* <div className="flex justify-center mt-10"> */}
        <div className="flex items-center justify-center mt-10 ">
          <div className="relative text-gray-600 focus-within:text-gray-400">

            <div>
            {/* <span class="absolute inset-y-0 left-0 flex items-center pl-2">
              <button type="submit" class="p-1 focus:outline-none focus:shadow-outline">
                <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" class="w-6 h-6"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
              </button>
            </span> */}
            <input
              type="search"
              name="q"
              // class="py-2 text-sm text-white bg-gray-900 rounded-md pl-10 focus:outline-none focus:bg-white focus:text-gray-900"
              // class="w-50 h-12 py-2 px-20 text-sm text-white bg-zinc-800 rounded-md pl-10 focus:outline-none"
              // xl:w-96
              className="w-80 md:w-96 h-12 py-2 px-20 text-sm text-black bg-zinc-200 rounded-md pl-10 focus:outline-none"
              placeholder="Search for a Stock"
              value={searchBar}
              onChange={e => onChangeHandler(e.target.value)}
              // autocomplete="off"/>
              autoComplete="off"/>

            </div>

            <div>
            {suggestions && suggestions.map((suggestion, i) =>  
              <div className="xl:w-96 h-9 font-normal text-gray-700 bg-white bg-clip-padding border-top border-solid border-gray-300 rounded hover:bg-gray-100 cursor-pointer" key={i}>
                {/* <Link href={`/stock/${suggestion.symbol}`}><a className="ml-3 align-middle text-base font-medium leading-tight mt-0 mb-2 text-black-400"> {suggestion.symbol} </a></Link> */}
                {/* <Link href={`/stock/${suggestion.symbol}`}><a className="ml-3 align-middle text-base font-medium leading-tight mt-0 mb-2 text-black-400"> {suggestion.symbol} </a></Link> */}
                <a href={`/stock/${suggestion.symbol}`} className="ml-3 align-middle text-base font-medium leading-tight mt-0 mb-2 text-black-400"> {suggestion.symbol} </a>

              </div>
              )}
            </div>
              
          </div>
          
        </div>  
          {/* <div className="xl:w-96">
            <input
              autocomplete="new-password"
              type="text"
              value={searchBar}
              onChange={e => onChangeHandler(e.target.value)}
              className="
                form-control
                block
                w-full
                px-3
                py-1.5
                text-base
                font-normal
                text-gray-700
                bg-white bg-clip-padding
                border border-solid border-gray-300
                rounded
                transition
                ease-in-out
                m-0
                focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
              "
              id="exampleText0"
              placeholder="Search for Stocks"
            />
          </div> */}
        {/* </div> */}
        
        {/* {suggestions && suggestions.map((suggestion, i) =>  
        <div className="xl:w-96 h-9 font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded hover:bg-gray-100 cursor-pointer" key={i}>
          <Link href={`/stock/${suggestion.symbol}`}><a className="ml-3 align-middle text-base font-medium leading-tight mt-0 mb-2 text-black-400"> {suggestion.symbol} </a></Link>
        </div>
        )} */}

        

        
      <br></br>
      <br></br>
      <br></br>
      <br></br>




      {/* 
      <ul style={{listStyleType: "none"}}>

        {data.map(function(d, idx){
          link = "/stock/" + d["symbol"];
        return (
          <li key={idx}>
          <div className="flex justify-center">
          <div className="rounded-lg shadow-lg bg-white max-w-sm">
            <div className="p-8">
              <Link href={link}>
                <a className="text-xl font-medium leading-tight mt-0 mb-2 text-black-600">{d["companyName"].split(' ').slice(0, 2).join(' ')}</a>
              </Link>

              <h4 className="text-neutral-500 text-base font-medium mb-2">{d["symbol"]}</h4>
              <h6 className="inline-block py-1.5 px-2.5 leading-none text-center whitespace-nowrap align-baseline font-bold bg-gray-900 text-white rounded">

                ${d["latestPrice"]}
              </h6>
              
              <div className={`${d["changeclassname"]}`}>
                {d["change"]}%
              </div>
            </div>
          </div>
        </div>
        </li>
        )
       })}

      </ul>   
      */}

      <ul style={{listStyleType: "none"}}>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">



      {data.map(function(d, idx){
        link = "/stock/" + d["symbol"];
      return (
        <li key={idx}>
        {/* <div className="flex justify-center"> */}
        {/* max-w-sm */}
        <div className="justify-center mx-3 h-40 w-60 lg:h-40 lg:w-1/10 rounded-lg shadow-md bg-white">
          <div className="p-8">
            <Link href={link}>
              <a className="text-xl font-medium leading-tight mt-0 mb-2 text-black-600">{d["companyName"].split(' ').slice(0, 3).join(' ')}</a>
            </Link>

            <h4 className="text-[#A0A0A0] text-base font-medium mb-2">{d["symbol"]}</h4>
            {/* text-neutral-500 */}
            <h6 className="mr-3 inline-block py-1.5 px-2.5 leading-none text-center whitespace-nowrap align-baseline font-bold bg-[#525252] text-white rounded">
              {/* gray-900 */}

              ${d["latestPrice"]}
            </h6>
            
            <div className={`${d["changeclassname"]}`}>
              {d["change"]}%
            </div>
          </div>
        </div>
        {/* </div> */}
        </li>
      )
      })}
      </div>
      </ul>   





        

      </main>



      {/* <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer> */
      }
      
    </div>
    <Footer></Footer>
    </div>
  )
}
