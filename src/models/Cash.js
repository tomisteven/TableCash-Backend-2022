import {Schema, model} from 'mongoose';


const Cash = new Schema({
    meses : [
        {
            mes : {
                type : String,
                default : '',
            },
            saldo : {
                type : Number,
                default : 0,
            },
            saldoRestante : {
                type : Number,
                default : 0,
            },
            gastoTotal : {
                type : Number,
                default : 0,
            },
            consumos : [
                {
                    fecha : {
                        type : Date,
                        default : Date.now()
                    },
                    precio : {
                        type : Number,
                        default : 0,
                    },
                    nombre : {  
                        type : String,
                        default : 'Consumo',

                    },
                    ingreso : {
                        type : Boolean,
                        default : false,
                    },
                }
            ]
        }
    ],
    total : {
        type : Number,
        default : 0,
        required : false,
    },
    anio : {
        type : Number,
        default : 0,
        required : false,
    },
});


export default model('Cash', Cash);

    