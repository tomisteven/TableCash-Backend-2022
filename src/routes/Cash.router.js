import {Router} from 'express';
import{ 
    getCash,
    createCash,
    createMesActual,
    editarAño,
    eliminarAño,
    addConsumo,
    editSaldo,
    getMes
} from '../controllers/Cash.controller';


const router = Router()

//rutas de la aplicacion
router.get('/', getCash);
router.post('/Cash', createCash);
router.post('/Cash/mesActual/:id', createMesActual);
router.delete('/Cash/:id', eliminarAño);

router.post('/Cash/:id_anio/:id_mes/consumo', addConsumo);

router.put('/Cash/:id_anio/:id_mes/saldo', editSaldo);

router.get('/Cash/mes/:id_anio/:id_mes', getMes);



export default router;