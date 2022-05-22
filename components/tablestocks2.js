import { useState, useEffect } from 'react';
import Link from 'next/link'

export default function Tablestocks2(props){
    const [x, setx] = useState({})

    useEffect(() => {
        console.log(props.data)
        console.log(props.name)
        // console.log(typeof props.data)
        setx(props.data)
        console.log(typeof props.data['Ticker'])

    })
    return(
        <div>
            {/* <h1>{props?.data['Ticker'][0]}</h1> */}
        {/* <h1>{Object.keys(x).length}</h1>     */}
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 mt-5">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                          <th scope="col" className="px-6 py-3">
                              Ticker
                          </th>
                          <th scope="col" className="px-6 py-3">
                              Price
                          </th>
                          <th scope="col" className="px-6 py-3">
                              EV/EBITDA
                          </th>
                          <th scope="col" className="px-6 py-3">
                                EV/EBITDA Percentile
                          </th>
                          <th scope="col" className="px-6 py-3">
                              EV/GP
                          </th>
                          <th scope="col" className="px-6 py-3">
                                EV/GP Percentile
                          </th>
                          <th scope="col" className="px-6 py-3">
                                PB Percentile
                          </th>
                          <th scope="col" className="px-6 py-3">
                                PE Percentile
                          </th>
                          <th scope="col" className="px-6 py-3">
                                PS Percentile
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Price-to-Book Ratio
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Price-to-Earnings Ratio
                          </th>
                          <th scope="col" className="px-6 py-3">
                          Price-to-Sales Ratio
                          </th>
                          <th scope="col" className="px-6 py-3">
                            RV Score
                          </th>
                          <th scope="col" className="px-6 py-3">
                              Number of Shares to Buy
                          </th>
                      </tr>
                  </thead>
                  <tbody>                    
                   
                    {Object.keys(x).length > 0 && Object.keys(x['Ticker']).map(function(i, index) {
                        return (
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={index}>
                                <Link href={"/stock/" + props.data['Ticker'][i]}>
                                    <a>
                                    <th scope="row" className="underline px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                                        {props.data['Ticker'][i]}
                                    </th>
                                    </a>
                                </Link>
                                <td className="px-6 py-4">
                                {props.data['Price'][i]}
                                </td>
                                <td className="px-6 py-4">
                                {props.data['EV/EBITDA'][i].toFixed(2)}
                                </td>
                                <td className="px-6 py-4">
                                {props.data['EV/EBITDA Percentile'][i].toFixed(2)}
                                </td>
                                <td className="px-6 py-4">
                                {props.data['EV/GP'][i].toFixed(2)}
                                </td>
                                <td className="px-6 py-4">
                                {props.data['EV/GP Percentile'][i].toFixed(2)}
                                </td>
                                <td className="px-6 py-4">
                                {props.data['PB Percentile'][i].toFixed(2)}
                                </td>
                                <td className="px-6 py-4">
                                {props.data['PE Percentile'][i].toFixed(2)}
                                </td>
                                <td className="px-6 py-4">
                                {props.data['PS Percentile'][i].toFixed(2)}
                                </td>
                                <td className="px-6 py-4">
                                {props.data['Price-to-Book Ratio'][i].toFixed(2)}
                                </td>
                                <td className="px-6 py-4">
                                {props.data['Price-to-Earnings Ratio'][i].toFixed(2)}
                                </td>
                                <td className="px-6 py-4">
                                {props.data['Price-to-Sales Ratio'][i].toFixed(2)}
                                </td>
                                <td className="px-6 py-4">
                                    {props.data['RV Score'][i].toFixed(2)}
                                </td>
                                <td className="px-6 py-4">
                                {props.data['Number of Shares to Buy'][i]}
                                </td>
                            </tr>                        
                        )
                    })}


                     
                  </tbody>
              </table>
        </div>
        </div>
    )
}