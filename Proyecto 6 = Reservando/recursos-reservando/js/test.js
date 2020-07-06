var expect = chai.expect;

//Test reservarHorario(horario)
describe('Test de funcion reservarHorario(horarioReservado) restaurant.js', function() {
    it('Se elimina del listado', function() {
        //Utilizo el segundo restaurant
        var testHorarios = listado.restaurantes[1];

        //Se elimina el horario
        testHorarios.reservarHorario('15:00');
    
        expect(testHorarios.horarios[0]).to.equal('12:30');
        expect(testHorarios.horarios[1]).to.equal('14:30');
        expect(testHorarios.horarios.length).to.equal(2);
    });

    it('Testeamos que los horarios existan o sean validos', function() {
        var testHorarios = listado.restaurantes[0];

        testHorarios.reservarHorario('12:00');

        expect(testHorarios.horarios[0]).to.equal('13:00');
        expect(testHorarios.horarios[1]).to.equal('15:30');
        expect(testHorarios.horarios[2]).to.equal('18:00');
    });

    it('Testeamos que se actue correctamente si no se ingresa un horario', function() {
        var testHorarios = listado.restaurantes[2];

        testHorarios.reservarHorario();

        expect(testHorarios.horarios[0]).to.equal('11:30');
        expect(testHorarios.horarios[1]).to.equal('12:00');
        expect(testHorarios.horarios[2]).to.equal('22:30');
        expect(testHorarios.horarios.length).to.equal(3);
    });
});

describe('Test de funcion obtenerPuntuacion() restaurant.js', function() {

    it('Testeamos el promedio existente', function(){
        //Restaurant Just Salad
        expect(listado.restaurantes[11].obtenerPuntuacion()).to.equal(5);

        //Restaurant The Counter
        expect(listado.restaurantes[12].obtenerPuntuacion()).to.equal(7);
    });

    it('Da 0 como resultado si el restaurante no tiene calificacion', function() {
        
        listado.restaurantes[0].calificaciones = [];
        expect(listado.restaurantes[0].obtenerPuntuacion()).to.equal(0);
    });
});

describe('Test de funcion calificar(nuevaCalificacion) restaurant.js', function(){
    it('La calificacion debe ser valida', function(){

        //Valor vacio no valido
        listado.restaurantes[0].calificar();
        expect(listado.restaurantes[0].calificaciones.length).to.equal(0);

        //Un valor distinto de un numero tampoco es valido
        listado.restaurantes[0].calificar('Hola');
        expect(listado.restaurantes[0].calificaciones.length).to.equal(0);        

        //Esto es valido
        listado.restaurantes[0].calificar(8);
        expect(listado.restaurantes[0].calificaciones.length).to.equal(1);
    });
});

describe('Test de funcion buscarRestaurant(id) listado.js', function() {

    it('Encuentra el restaurant mediante su id', function() {
        var testRestaurant = listado.buscarRestaurante(3);
        expect(testRestaurant.nombre).to.be.equal('Burgermeister');
    });

    it('No encuentra el restaurant si no existe su id', function() {
        expect(listado.buscarRestaurante(1234)).to.equal('No se ha encontrado ningún restaurant');
      });

  });

describe('Test de funcion obtenerRestaurantes() listado.js', function(){
    var restaurantObtenido = listado.obtenerRestaurantes('Ensalada', 'París', '11:00');

    it('Debe obtener el restaurant correspondiente a los filtros', function(){
        expect(restaurantObtenido[0].nombre).to.equal('Chez Moi');
    });

    it('Funciona filtrando solo el rubro', function(){
        expect(restaurantObtenido[0].rubro).to.equal('Ensalada');
    });

    it('Funciona filtrando solo la ubicacion', function(){
        expect(restaurantObtenido[0].ubicacion).to.equal('París');
    });

    it('Funciona filtrando solo la hora', function(){
        expect(restaurantObtenido[0].horarios[0]).to.equal('11:00');
    });

});

describe('Test de funcion precioBase() reserva.js', function() {
    it('El calculo de precio base debe ser correcto', function() {
      expect(listaReservas[0].precioBase()).to.equal(2800);
      expect(listaReservas[1].precioBase()).to.equal(300);
    });
});

describe('Test de funcion precioFinal() reserva.js', function() {
    it('El calculo de precio final debe ser correcto', function() {
      expect(listaReservas[0].precioFinal()).to.equal(2310);
      expect(listaReservas[1].precioFinal()).to.equal(100);
    });
});


