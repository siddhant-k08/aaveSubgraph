import { useEffect, useState } from 'react';
import { createClient } from 'urql';
import './App.css';

function App() {
  const [flashloans, setFlashloans] = useState([]);

  const QueryURL = "https://gateway-arbitrum.network.thegraph.com/api/a4fdd4918028f9f66ff0cd6b4e753eb9/subgraphs/id/C2zniPn45RnLDGzVeGZCx2Sw3GXrbc9gL4ZfL8B8Em2j";

  const client = createClient({
    url: QueryURL
  });

  const query = `{
    flashloans(first: 10, orderBy: timestamp, orderDirection: desc) {
      id
      amount
      amountUSD
      gasPrice
      gasLimit
      gasUsed
      feeAmount
      feeAmountUSD
      asset {
        id
        name
        symbol
        lastPriceUSD
      }
      hash
      timestamp
      blockNumber
    }
  }`

  useEffect(() => {
    const getFlashloans = async () => {
      const { data } = await client.query(query).toPromise();
      setFlashloans(data.flashloans);
    };
    getFlashloans();
  }, []);

  return (
    <>
      <div>
        <h1>FlashLoans Information</h1>
        {flashloans !== null && flashloans.length > 0 && flashloans.map((flashloan) => {
          return (
            <div key={flashloan.id}>
              <div>ID: {flashloan.id}</div><br/>
              <div>Amount: {flashloan.amount}</div><br/>
              <div>Amount in USD: {flashloan.amountUSD}</div><br/>
              <div>Gas Price: {flashloan.gasPrice}</div><br/>
              <div>Gas Limit: {flashloan.gasLimit}</div><br/>
              <div>Gas Used: {flashloan.gasUsed}</div><br/>
              <div>Fee Amount: {flashloan.feeAmount}</div><br/>
              <div>Fee Amount in USD: {flashloan.feeAmountUSD}</div><br/>
              <div>Asset ID: {flashloan.asset.id}</div><br/>
              <div>Asset Name:{flashloan.asset.name}</div><br/>
              <div>Asset Symbol: {flashloan.asset.symbol}</div><br/>
              <div>Asset Last Price in USD: {flashloan.asset.lastPriceUSD}</div><br/>
              <div>Hash: {flashloan.hash}</div><br/>
              <div>Timestamp: {flashloan.timestamp}</div><br/>
              <div>BlockNumber: {flashloan.blockNumber}</div><br/><br/>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default App;