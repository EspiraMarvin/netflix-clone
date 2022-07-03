import { CheckIcon } from '@heroicons/react/solid'
import { Product } from '@stripe/firestore-stripe-payments'
import React from 'react'

interface Props {
    products: Product[],
    selectedPlan: Product | null
}

function Table({ products, selectedPlan }:Props) {
  return (
    <table>
        <tbody className="divide-y divide[gray]">
            <tr className="tableRow">
                <td className="tableDataTitle">Monthly price</td>
                {products.map(product => (
                    <td 
                      key={product.id} 
                      className={`tableDataFeature 
                      ${selectedPlan?.id === product.id ? "text-[#e50914]" : "text-[gray]"}`}
                    >

                        USD {product.prices[0].unit_amount! / 100}
                    </td>
                ))}
            </tr>

            <tr className="tableRow">
                <td className="tableDataTitle">Video Quality</td>
                {products.map(product => (
                    <td 
                      key={product.id}
                      className={`tableDataFeature 
                      ${selectedPlan?.id === product.id ? "text-[#e50914]" : "text-[gray]"}`}
                    >
                        {product.metadata.videoQuality}
                    </td>
                ))}
            </tr>

            <tr className="tableRow">
                <td className="tableDataTitle">Resolution</td>
                {products.map(product => (
                    <td 
                      key={product.id}
                      className={`tableDataFeature 
                      ${selectedPlan?.id === product.id ? "text-[#e50914]" : "text-[gray]"}`}
                    >
                        {product.metadata.resolution}
                    </td>
                ))}
            </tr>

            <tr className="tableRow">
                <td className="tableDataTitle">
                Watch on your TV, computer, mobile phone and tablet
                </td>
                {products.map(product => (
                    <td 
                      key={product.id}
                      className={`tableDataFeature 
                      ${selectedPlan?.id === product.id ? "text-[#e50914]" : "text-[gray]"}`}
                    >
                        {product.metadata.portability === "true" &&
                         (<CheckIcon className="inline-block w-8 h-8" />)
                        }
                    </td>
                ))}
            </tr>

        </tbody>
        
    </table>
  )
}

export default Table