var Reserva = function(horario, cantidadPersonas, precioPersona, codigoDescuento) {
    this.horario = horario;
    this.cantidadPersonas = cantidadPersonas;
    this.precioPersona = precioPersona;
    this.codigoDescuento = codigoDescuento;
}

Reserva.prototype.precioBase = function() {
    return this.cantidadPersonas * this.precioPersona;
}

Reserva.prototype.precioFinal = function() {
    var precioBase = this.precioBase();
    var adicional = this.adicionales(precioBase);
    var descuento = this.descuentos(precioBase);
    return  precioBase + adicional - descuento;
};

Reserva.prototype.adicionales = function(base) {
    return this.adicionalWeekend(base) + this.adicionalHorario(base);
};

Reserva.prototype.adicionalHorario = function(base) {
    var minutos = (this.horario.getHours() * 60) + this.horario.getMinutes();

    if ((minutos >= 780 && minutos < 840) || (minutos >= 1200 && minutos < 1260)){
        return base * 5 / 100;
    };

    return 0;
};

Reserva.prototype.adicionalWeekend = function(base) {
    var diaSemana = this.horario.getUTCDay();

    if (diaSemana === 0 || diaSemana === 5 || diaSemana === 6){
        return base * 10 / 100;
    };

    return 0;
};


Reserva.prototype.descuentos = function(base) {
    return this.descuentoDeGrupo(base) + this.descuentosCodigo(base);
}

Reserva.prototype.descuentoDeGrupo = function(base) {
    var descuento = 0;

    if (this.cantidadPersonas >= 4 && this.cantidadPersonas < 6){
        descuento = 5;
    } else if (this.cantidadPersonas >= 6 && this.cantidadPersonas < 8) {
        descuento = 10;
    } else if (this.cantidadPersonas >= 8){
        descuento = 15;
    }

    return base * descuento / 100;
}

Reserva.prototype.descuentosCodigo = function(base) {
    var descuento = 0;

    if (this.codigoDescuento === 'DES15'){
        descuento = base * 15 /100 ;
    } else if (this.codigoDescuento === 'DES200') {
        descuento = 200;
    } else if (this.codigoDescuento === 'DES1'){
        descuento = this.precioPersona;
    }

    return descuento;
};

var listaReservas  = [
    new Reserva (new Date(2018, 7, 24, 11, 00), 8, 350, "DES1"),
    new Reserva (new Date(2018, 7, 27, 14, 00), 2, 150, "DES200"),
];