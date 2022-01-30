import { useRouter } from 'next/router'
import styles from '../../styles/Home.module.css'
import { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../../components/navbar'

import Chart from 'chart.js/auto'

import {Line} from 'react-chartjs-2';



export default function Stock(){
  const router = useRouter()
  var { symbol } = router.query;
  const [data, setData] = useState([]);
  const [logo, setLogo] = useState('');
  const [graph, setGraph] = useState('')
  const [labels, setlabels] = useState('')
  const [about, setabout] = useState([])

  const baseUrl = "https://sandbox.iexapis.com/stable/"

  const lol = {
    labels: labels,
    datasets: [
      {
        label: '1 Month',
        fill: false,
        lineTension: 0.1,
        // backgroundColor: 'rgba(75,192,192,0.4)',
        // borderColor: 'rgba(75,192,192,1)',
        backgroundColor: "hsl(252, 82.9%, 67.8%)",
        borderColor: "hsl(252, 82.9%, 67.8%)",
        // backgroundColor: "#hsl(234, 89%, 74%)",
        // borderColor: "#hsl(234, 89%, 74%)",
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: graph
      }
    ]
  };


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
        url: baseUrl + "stock/" + symbol + "/chart/1m/?token=" + process.env.secret,
        responseType: 'json'
      })
      .then(function (response) {
          var temp = response.data
          var graphdata = []
          var labeldata = []
          temp.forEach(function (element) {
            graphdata.push(element["close"])
            labeldata.push(element["date"])
          });
          setlabels(labeldata)
          setGraph(graphdata)
          console.log(response.data)
      });
    
      axios({
        method: 'get',
        url: baseUrl + "stock/" + symbol + "/company/?token=" + process.env.secret,
        responseType: 'json'
      })
      .then(function (response) {
          setabout(response.data)
          console.log(response.data)
      });

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
      <main className={styles.main2}>
      {/* <img src={logo}></img> */}
      
      <h1 className="text-center text-4xl font-medium leading-tight mt-0 mb-5 text-black-600">{data['companyName']}</h1>

      <div class="grid grid-row-2 grid-cols-3 gap-4 mb-4">
        <div class="py-3 col-span-2 bg-white rounded-lg border border-gray-200 shadow-md">
            <Line
            data={lol}
            width={300}
            height={135}
          />
        </div>

        <div class="row-span-1  bg-white rounded-lg border border-gray-200 shadow-md">
          <h1 className="text-2xl font-medium leading-tight mt-5 mb-3 ml-5 text-black-600">About</h1>
          {/* <p className="mx-5 my-2">{about['description']}</p> */}
          <p className="text-gray-400 mx-5 my-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dignissim mauris, porttitor ac ac augue tellus orci eu. Dictumst quisque malesuada ultrices morbi cras est, magna nec. Est faucibus leo aenean eu magna. Lectus  magna nec. Est faucibus leo aenean eu magna. Lectus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dignissim mauris, porttitor ac ac augue tellus orci eu. Dictumst quisque malesuada ultrices morbi cras est, magna nec. Est faucibus leo aenean eu magna. Lectus  magna nec. Est faucibus leo aenean eu  </p>
        </div>
      </div>


      <div class="grid grid-row-2 grid-cols-3 gap-4 mb-4">
        {/* bg-white rounded-lg border border-gray-200 shadow-md */}
        <div class="py-3 col-span-2 ">
            <div className="grid grid-flow-row-dense grid-cols-4 grid-rows-2">
                  <div className="mx-3 bg-white rounded-lg border border-gray-200 shadow-md p-2">
                        <h1 className="text-lg mt-1 ml-2">Latest Price</h1>
                        <p className="text-gray-500 mt-1 ml-2">${data['latestPrice']}</p>
                  </div>
                  <div className="mx-3 bg-white rounded-lg border border-gray-200 shadow-md p-2">
                        <h1 className="text-lg mt-1 ml-2">Market Cap</h1>
                        <p className="text-gray-500 mt-1 ml-2">${data['marketCap']}</p>
                  </div>
                  <div className="mx-3 bg-white rounded-lg border border-gray-200 shadow-md p-2">
                        <h1 className="text-lg mt-1 ml-2">High / Low</h1>
                        <p className="text-gray-500 mt-1 ml-2">{data['high']} / {data['low']}</p>
                  </div>
                  <div className="mx-3 bg-white rounded-lg border border-gray-200 shadow-md p-2">
                        <h1 className="text-lg mt-1 ml-2">PE Ratio</h1>
                        <p className="text-gray-500 mt-1 ml-2">{data['peRatio']}</p>
                  </div>
                  <div className="mx-3 mt-3 bg-white rounded-lg border border-gray-200 shadow-md p-2">
                        <h1 className="text-lg mt-1 ml-2">Change</h1>
                        <p className="text-gray-500 mt-1 ml-2">{data['change']}%</p>
                  </div>
                  <div className="mx-3 mt-3 bg-white rounded-lg border border-gray-200 shadow-md p-2">
                        <h1 className="text-lg mt-1 ml-2">YTD Change</h1>
                        <p className="text-gray-500 mt-1 ml-2">{(data['ytdChange'] + '').slice(0, 4)}%</p>
                  </div>
                  <div className="mx-3 mt-3 bg-white rounded-lg border border-gray-200 shadow-md p-2">
                        <h1 className="text-lg mt-1 ml-2">52 Weeks High</h1>
                        <p className="text-gray-500 mt-1 ml-2">{data['week52High']}</p>
                  </div>
                  <div className="mx-3 mt-3 bg-white rounded-lg border border-gray-200 shadow-md p-2">
                        <h1 className="text-lg mt-1 ml-2">52 Weeks Low</h1>
                        <p className="text-gray-500 mt-1 ml-2">{data['week52Low']}</p>
                  </div>
            </div>
        </div>

        <div class="my-3 row-span-1  bg-white rounded-lg border border-gray-200 shadow-md">
              <h1 className="text-lg mx-2 my-2">Is the Market Open Right now: {data['isUSMarketOpen'] ? 'Yes' : 'No'}</h1>
        </div>

      </div>




      {/* <div class="mt-3 px-10 py-3 w-fit bg-white rounded-lg border border-gray-200 shadow-md">

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

      <div>
        {about['description']}
      </div>

      <div className="object-cover h-96 w-96">
      <Line
        data={lol}
        width={400}
        height={400}
      />
      </div>

      </div> */}

      </main>
    </div>
  )
}


export async function getServerSideProps(context) {
  return {
    props: {}, // will be passed to the page component as props
  }
}