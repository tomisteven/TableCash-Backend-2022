import {Router} from 'express';
import{ 
    getCash,
    createCash,
    createMesActual,
    editarAño,
    eliminarAño,
    addConsumo,
    editSaldo,
    getMes,
    getMeses,
    editGastoGeneral,
    editGastoGeneralAnual,
    eliminarItemMes,
    editSaldoRestante
} from '../controllers/Cash.controller';


const router = Router()

//rutas de la aplicacion
router.get('/', getCash);
router.get('/Cash/mes/:id_anio/:id_mes', getMes);
router.get('/Cash/meses/:id_anio', getMeses);

router.post('/Cash', createCash);
router.post('/Cash/mesActual/:id', createMesActual);
router.post('/Cash/:id_anio/:id_mes/consumo', addConsumo);

router.delete('/Cash/:id', eliminarAño);
router.delete('/Cash/:id_anio/:id_mes/:id_pay', eliminarItemMes);

router.put('/Cash/:id_anio/:id_mes/saldo', editSaldo);
router.put('/Cash/editgasto/:id_anio/:id_mes', editGastoGeneral);
router.put('/Cash/editgasto/:id_anio', editGastoGeneralAnual);
router.put('/Cash/editrestante/:id_anio/:id_mes', editSaldoRestante);

export default router;