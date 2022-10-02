//importamos base de datos
import  Cash  from '../models/Cash';


const getCash = async (req, res) => {
    const cash = await Cash.find();
    res.json(cash);
}

const getMes = async (req, res) => {
    const {id_anio, id_mes} = req.params;
    const cash = await Cash.findById(id_anio)
    const mes = cash.meses.id(id_mes);
    res.json(mes);
}

const createCash = async (req, res) => {
    const año = new Date().getFullYear();
    const cash = new Cash({
        anio: año,
    });
    await cash.save();
    res.json(cash);
}

const createMesActual = async (req, res) => {
    const {id} = req.params;
    const {mes, } = req.body;
    const cash = await Cash.findById(id);
    cash.meses.push({
        mes,
        saldo: 0,
        saldoRestante: saldo,
        consumos: []
    });
    await cash.save();
    res.json(cash);
}

const getMeses = async (req, res) => {
    const {id_anio} = req.params;
    const cash = await Cash.findById(id_anio);
    res.json(cash.meses);
}

const editSaldo = async (req, res) => {
    const {id_anio, id_mes} = req.params;
    const {saldo, gastoTotal} = req.body;
    const cash = await Cash.findById(id_anio);
    const mes = cash.meses.id(id_mes);
    mes.saldo = saldo;
    mes.saldoRestante = saldo;
    await cash.save();
    res.json(cash.meses);
}

const editSaldoRestante = async (req, res) => {
    const {id_anio, id_mes} = req.params;
    const {saldoRestante} = req.body;
    const cash = await Cash.findById(id_anio);
    const mes = cash.meses.id(id_mes);
    mes.saldoRestante = saldoRestante;
    await cash.save();
    res.json(cash.meses);
}

const eliminarAño = async (req, res) => {
    const {id} = req.params;
    const cash = await Cash.findByIdAndDelete(id);
    res.json(cash);    
}

const eliminarItemMes = async (req, res) => {
    const {id_anio, id_mes, id_pay} = req.params
    const cash = await Cash.findById(id_anio);
    const mes = cash.meses.id(id_mes);
    const item = mes.consumos.id(id_pay);
    //si es un pago
    if (item.ingreso == false) {
        mes.saldoRestante = mes.saldoRestante + item.precio;
        mes.gastoTotal = mes.gastoTotal - item.precio;
        cash.total = cash.total - item.precio;
        mes.saldo = mes.saldo + item.precio;
    }else{
        mes.saldo = mes.saldo - item.precio;
        mes.saldoRestante = mes.saldoRestante - item.precio;
    }
    item.remove();
    await cash.save();
    res.json(cash.meses);
}



const addConsumo = async (req, res) => { 
    const {id_anio, id_mes } = req.params;
    const cash = await Cash.findById(id_anio);
    const mes = cash.meses.id(id_mes);
    mes.consumos.push(req.body);
    if (req.body.ingreso == false) {
        cash.total = cash.total + req.body.precio;
        mes.saldoRestante -= req.body.precio;
        mes.gastoTotal = mes.gastoTotal + req.body.precio;
    }
    else {
        mes.saldo = mes.saldo + req.body.precio;
        mes.saldoRestante = mes.saldoRestante + req.body.precio;
    }
    await cash.save();
    res.json(cash.meses);
}

const editGastoGeneral = async (req, res) => {
    const {id_anio, id_mes} = req.params;
    const {gastoTotal} = req.body;
    const cash = await Cash.findById(id_anio);
    const mes = cash.meses.id(id_mes);
    mes.gastoTotal = gastoTotal;
    await cash.save();
    res.json(cash.meses);
}
const editGastoGeneralAnual = async (req, res) => {
    const {id_anio} = req.params;
    const {total} = req.body;
    const cash = await Cash.findById(id_anio);
    cash.total = total;
    await cash.save();
    res.json(cash.meses);
}


export {
    getCash,
    createCash,
    createMesActual,
    eliminarAño,
    addConsumo,
    editSaldo,
    getMes,
    getMeses,
    editGastoGeneral,
    editGastoGeneralAnual,
    eliminarItemMes,
    editSaldoRestante
}