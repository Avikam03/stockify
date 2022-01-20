import { useRouter } from 'next/router'
import styles from '../../styles/Home.module.css'
import { useState, useEffect } from 'react';
import axios from 'axios';



export default function Stock(){
  const router = useRouter()
  var { symbol } = router.query;
  const [data, setData] = useState([]);

  const baseUrl = "https://sandbox.iexapis.com/stable/"


  useEffect(() => {
    
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


//   avgTotalVolume: 84816394
// calculationPrice: "close"
// change: -3.59
// changePercent: -0.02134
// close: 166.64
// closeSource: "cliafoif"
// closeTime: 1720154785923
// companyName: "Apple Inc"
// currency: "USD"
// delayedPrice: 171.75
// delayedPriceTime: 1705691565911
// extendedChange: -0.47
// extendedChangePercent: -0.00276
// extendedPrice: 172.09
// extendedPriceTime: 1660143371632
// high: 179.3
// highSource: "rnd eyma dieuci51ple te"
// highTime: 1716547456819
// iexAskPrice: 0
// iexAskSize: 0
// iexBidPrice: 0
// iexBidSize: 0
// iexClose: 166.52
// iexCloseTime: 1669715161307
// iexLastUpdated: 1644991631194
// iexMarketPercent: 0.01166902881080025
// iexOpen: 171.11
// iexOpenTime: 1666926970598
// iexRealtimePrice: 172.64
// iexRealtimeSize: 73
// iexVolume: 1105932
// isUSMarketOpen: false
// lastTradeTime: 1713811275029
// latestPrice: 166.29
// latestSource: "Close"
// latestTime: "January 19, 2022"
// latestUpdate: 1672826604265
// latestVolume: 96422426
// low: 166.64
// lowSource: "ineyu ecd ier1da5 petml"
// lowTime: 1696858425113
// marketCap: 2782319991397
// oddLotDelayedPrice: 169.269
// oddLotDelayedPriceTime: 1658691600112
// open: 174.74
// openSource: "ocfiilfa"
// openTime: 1647732519041
// peRatio: 15.2
// previousClose: 174.5
// previousVolume: 91692223
// primaryExchange: "NAQASD"
// symbol: "AAPL"
// volume: 97502620
// week52High: 191.59
// week52Low: 117.96
// ytdChange: -0.06482640749457655

  return(
    
    <div className={styles.container}>
      <main className={styles.main}>
      <h1>
        <span className="text-5xl font-medium leading-tight mt-0 mb-2 text-blue-600">
        {data['companyName']}
        </span> 
        <span className="text-5xl font-medium leading-tight mt-0 mb-2 text-black-600">({data['symbol']})</span>
      </h1>

      <p>${data['latestPrice']}</p>

      <p>{data['change']}%</p>
      <p>Market Cap: ${data['marketCap']}</p>
      <p>Open: ${data['open']}</p>
      <p>High: ${data['high']}</p>
      <p>Low: ${data['low']}</p>
      <p>PE Ratio{data['peRatio']}</p>
      {/* <p>${data['marketCap'].toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}</p> */}

      </main>
    </div>
  )
}


export async function getServerSideProps(context) {
  return {
    props: {}, // will be passed to the page component as props
  }
}