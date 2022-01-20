import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import axios from 'axios';
import { useState, useEffect } from 'react';
import Link from 'next/link'

// import { Autocomplete } from '@mui/material';
// import TextField from '@mui/material/TextField';
// import Navbar from '../components/navbar'

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
      // for (let i = 0; i < response.data.length; i++) {
      //   listofstocks.push(response.data[i]["symbol"])
      // }
      // console.log(listofstocks)
    })
  
    axios({
      method: 'get',
      url: baseUrl + "stock/market/list/mostactive/?token=" + process.env.secret,
      responseType: 'json'
    })
    .then(function (response) {
        // console.log(response.data[0]["symbol"])
        setData(response.data)
        console.log(response.data)
    });


  }, [])

  return (
    <div className={styles.container}>
      <Head>
        <title>home</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className="text-5xl font-medium leading-tight mt-0 mb-2 text-blue-600">
          Stock App
        </h1>

        <div className="flex justify-center">
          <div className="mb-3 xl:w-96">
            <input
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
              placeholder="Text input"
            />
          </div>
        </div>

        {suggestions && suggestions.map((suggestion, i) =>
          <div key={i}>
            <Link href={`/stock/${suggestion.symbol}`}><a> {suggestion.symbol} </a></Link>
          </div>
        )}





      <ul style={{listStyleType: "none"}}>

        {data.map(function(d, idx){
          link = "/stock/" + d["symbol"];
        return (
          <li key={idx}>
          <div className="flex justify-center">
          <div className="rounded-lg shadow-lg bg-white max-w-sm">
            <div className="p-8">
              <h5 className="text-gray-900 text-xl font-medium mb-2">{d["symbol"]}</h5>
              <h6>{d["companyName"]}</h6>
              {/* <p className="text-gray-700 text-base mb-4">
                ${d["latestPrice"]}
              </p> */}
              <Link href={link}>
                  <a class="inline-block px-6 py-2.5 bg-gray-800 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-gray-900 hover:shadow-lg focus:bg-gray-900 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-900 active:shadow-lg transition duration-150 ease-in-out">${d["latestPrice"]}</a>
              </Link>
            </div>
          </div>
        </div>
        </li>
        )
       })}

      </ul>  



        

      </main>



      <footer className={styles.footer}>
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
      </footer>
    </div>
  )
}
