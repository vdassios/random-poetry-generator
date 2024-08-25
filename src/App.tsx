import { useState, useEffect } from "react";
import { useDebounce, usePrevious } from "./hooks";
import "./App.css";
import {
  socketConnectionHandler,
  subscribeToSymbol,
  unsubFromSymbol,
} from "./socket";
import { mapToAlphabet, snapToUnit } from "./utils";

interface App {
  symbol: string;
}

interface TradeData {
  c: string[];
  p: number;
  s: string;
  t: number;
  v: number;
}

interface TradeObject {
  data?: TradeData[];
  type: string;
}

const socketResponseHandler = (msg: MessageEvent) => {
  const data: TradeObject = JSON.parse(msg.data);
  // We sometimes get a { type: 'ping'} msg with no data field
  const RANDOM_PRICE = Math.random();
  const prices = data.data?.map((d: TradeData) => d.p) ?? [RANDOM_PRICE];
  const avgPrice = prices.reduce((acc, item) => acc + item) / prices.length;
  return { avgPrice };
};
const App = ({ symbol }: App) => {
  const [price, setPrice] = useState(0);

  useEffect(() => {
    const socket = socketConnectionHandler();
    subscribeToSymbol(socket, symbol);

    // Here we need to set state. Either via zustand or inside the component
    socket.onmessage = (msg: MessageEvent) => {
      const { avgPrice } = socketResponseHandler(msg);
      setPrice(avgPrice);
    };

    return () => {
      unsubFromSymbol(socket, symbol);
    };
  }, [symbol]);

  const prevPrice = usePrevious(price);
  const priceDiff = Math.abs(price - prevPrice);
  const unitDiff = snapToUnit(priceDiff);
  const debouncedLetters = useDebounce(mapToAlphabet(unitDiff), 400);

  return (
    <ul className="price-list">
      <div className="price-container">
        <li className="price-list-item">
          <p className="price-text">previous average price for {symbol}:</p>
          <p className="price">{prevPrice}</p>
        </li>
        <li className="price-list-item">
          <p className="price-text">current average price for {symbol}:</p>
          <p className="price">{price}</p>
        </li>
      </div>
      <div className="price-container">
        <li className="price-list-item">
          <p className="price-text"> price difference:</p>
          <p className="price">{priceDiff}</p>
        </li>
        <li className="price-list-item">
          <p className="price-text">unitary price difference is</p>
          <p className="price">{unitDiff}</p>
        </li>
      </div>
      <div className="price-container">
        <li className="price-list-item">
          <p className="price-text">
            {" "}
            unitary difference coerced to letters is
          </p>
          <p className="price">{mapToAlphabet(unitDiff)}</p>
        </li>
      </div>
      <div className="price-container">
        <li className="price-list-item">
          <p className="price-text">conjured letters</p>
          <p className="letters">{debouncedLetters}</p>
        </li>
      </div>
    </ul>
  );
};

export default App;
