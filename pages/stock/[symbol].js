import { useRouter } from 'next/router'
import styles from '../../styles/Home.module.css'
import { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../../components/navbar'



export default function Stock(){
  const router = useRouter()
  var { symbol } = router.query;
  const [data, setData] = useState([]);
  const [logo, setLogo] = useState('');

  const baseUrl = "https://sandbox.iexapis.com/stable/"

  useEffect(() => {
      // axios({
      //   method: "get",
      //   url: baseUrl + "stock/" + symbol + "/logo/?token=" + process.env.secret,
      //   responseType: "json"
      // })
      // .then(function (response) {
      //     setLogo(response.data)
      //     console.log(response.data)
      // })
      const temp = "https://storage.googleapis.com/iex/api/logos/" + symbol +".png" 
      setLogo(temp)
    
      axios({
        method: 'get',
        url: baseUrl + "stock/" + symbol + "/quote/?token=" + process.env.secret,
        responseType: 'json'
      })
      .then(function (response) {
          setData(response.data)
          console.log(response.data)
      });

  }, [router])


  return(
    
    <div className={styles.container}>
      <Navbar></Navbar>
      <main className={styles.main}>
      {/* <img src={logo}></img> */}
      
      {/* max-w-fit */}
      <div class="mt-3 px-10 py-3 w-fit bg-white rounded-lg border border-gray-200 shadow-md">

      <h1>
        <span className="text-4xl font-medium leading-tight mt-0 mb-2 text-black-600">
        {data['companyName']}
        </span> 
        <span className="text-4xl font-medium leading-tight mt-0 mb-2 text-black-600">({data['symbol']})</span>
      </h1>

      <button className="text-white bg-gray-800 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 mt-4">${data['latestPrice']}</button>


      <div class="flex flex-wrap overflow-hidden border-2 p-2 mt-5 mb-5">

        <div class="w-1/3 overflow-hidden p-1">
          <p><span className="text-gray-500">Market Cap</span> {data['marketCap']}</p>
        </div>

        <div class="w-1/3 overflow-hidden p-1">
          <p><span className="text-gray-500">Open</span> {data['open']}%</p>
        </div>

        <div class="w-1/3 overflow-hidden p-1">
          <p><span className="text-gray-500">High / Low</span> {data['high']} / {data['low']}%</p>
        </div>

        <div class="w-1/3 overflow-hidden p-1">
          <p><span className="text-gray-500">PE Ratio</span> {data['peRatio']}%</p>
        </div>

        <div class="w-1/3 overflow-hidden p-1">
          <p><span className="text-gray-500">Change</span> {data['change']}%</p>
        </div>

        <div class="w-1/3 overflow-hidden p-1">
          <p><span className="text-gray-500">YTD Change</span> {data['ytdChange']}%</p>
        </div>

      </div>

      {/* <p>{data['change']}%</p>
      <p>Market Cap ${data['marketCap']}</p>
      <p>Open: ${data['open']}</p>
      <p>High: ${data['high']}</p>
      <p>Low: ${data['low']}</p>
      <p>PE Ratio{data['peRatio']}</p> */}
      {/* <p>${data['marketCap'].toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}</p> */}

      </div>

      </main>
    </div>
  )
}


export async function getServerSideProps(context) {
  return {
    props: {}, // will be passed to the page component as props
  }
}