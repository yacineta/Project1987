import  express  from 'express';
import  colors from 'colors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from './config/db.js';
import autRoutes from './routes/authRoutes.js'
import categoryRoutes from './routes/categoryRoutes.js';
import productRoutes from './routes/productRoutes.js';

import cors from 'cors';


dotenv.config();

connectDB();


const app = express();


app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use('/api/v1/auth',autRoutes);
app.use('/api/v1/category',categoryRoutes);
app.use('/api/v1/product',productRoutes);


// app.get('/', (req ,res) => {
//     res.send( 
//    "<h1>Welcom to MERN STACK Project</h1>" 
//     );
// } );

const PORT = process.env.PORT  || 3001;

app.listen(PORT, () =>{
    console.log(`Server running in ${process.env.DEV_MODE} in port http//localhost:${PORT}`.bgCyan.white);
});