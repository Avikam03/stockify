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


  return(
    
    <div className={styles.container}>
      <main className={styles.main}>
      <h1><span className="text-5xl font-medium leading-tight mt-0 mb-2 text-blue-600">{data['companyName']}</span> <span className="text-5xl font-medium leading-tight mt-0 mb-2 text-black-600">({data['symbol']})</span></h1>
      </main>
    </div>
  )
}


export async function getServerSideProps(context) {
  return {
    props: {}, // will be passed to the page component as props
  }
}