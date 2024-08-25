// TODO do not expose this
const API_KEY = "cr1sl59r01qnqk1bi9e0cr1sl59r01qnqk1bi9eg";
const FINNHUB_WSS_URL = `wss://ws.finnhub.io?token=${API_KEY}`;

export const socketConnectionHandler = () => {
  const socket = new WebSocket(FINNHUB_WSS_URL);

  socket.onerror = (error) => {
    console.error("WebSocket error:", error);
  };

  return socket;
};

export const subscribeToSymbol = (socket: WebSocket, symbol: string) => {
  socket.onopen = () => {
    console.log("Connected successfully");
    console.log("Subscribed to ", symbol, " successfully");
    socket.send(JSON.stringify({ type: "subscribe", symbol }));
  };
};

export const unsubFromSymbol = (socket: WebSocket, symbol: string) => {
  socket.onopen = () => {
    console.log("Unsubscribed from ", symbol, " successfully");
    socket.send(JSON.stringify({ type: "unsubscribe", symbol }));
  };
};
