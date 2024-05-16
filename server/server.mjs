import { connectMongo } from './Functions/ConnectMongo.mjs';
import { initServer } from './Functions/createServer.mjs';
import { startEvents, startListeners } from './events/index.mjs';

connectMongo();

const { server, io } = initServer();
startEvents(io);
startListeners(server);