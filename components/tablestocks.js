import { useState, useEffect } from 'react';
import Link from 'next/link'

export default function Tablestocks(props){
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
                              One-Month Price Return
                          </th>
                          <th scope="col" className="px-6 py-3">
                              One-Month Return Percentile
                          </th>
                          <th scope="col" className="px-6 py-3">
                              Six-Month Price Return
                          </th>
                          <th scope="col" className="px-6 py-3">
                              Six-Month Return Percentile
                          </th>
                          <th scope="col" className="px-6 py-3">
                              One-Year Price Return
                          </th>
                          <th scope="col" className="px-6 py-3">
                              One-Year Return Percentile
                          </th>
                          <th scope="col" className="px-6 py-3">
                              HQM Score
                          </th>
                          <th scope="col" className="px-6 py-3">
                              Number of Shares to Buy
                          </th>
                      </tr>
                  </thead>
                  <tbody>                    
                   
                    {Object.keys(x).length > 0 && Object.keys(x['Ticker']).map(function(i, index) {
                        return (
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
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
                                {props.data['One-Month Price Return'][i].toFixed(2)}
                                </td>
                                <td className="px-6 py-4">
                                {props.data['One-Month Return Percentile'][i].toFixed(2)}
                                </td>
                                <td className="px-6 py-4">
                                {props.data['Six-Month Price Return'][i].toFixed(2)}
                                </td>
                                <td className="px-6 py-4">
                                {props.data['Six-Month Return Percentile'][i].toFixed(2)}
                                </td>
                                <td className="px-6 py-4">
                                {props.data['One-Year Price Return'][i].toFixed(2)}
                                </td>
                                <td className="px-6 py-4">
                                {props.data['One-Year Return Percentile'][i].toFixed(2)}
                                </td>
                                <td className="px-6 py-4">
                                {props.data['HQM Score'][i].toFixed(2)}
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