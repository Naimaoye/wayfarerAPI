const correctTripDetails = {
    bus_id: 179,
    origin: 'yaba',
    destination: 'ikoyi',
    trip_date: 'December 17, 1995 03:24:00',
    fare: 4300,
  };
  
  const conflictTripDetails = {
    bus_id: 179,
    origin: 'yaba',
    destination: 'ikoyi',
    trip_date: 'December 17, 1995 03:24:00',
    fare: 4300,
  };
  
  const undefinedTripBusId = {
    origin: 'yaba',
    destination: 'ikoyi',
    trip_date: 'December 17, 1995 03:24:00',
    fare: 4300,
  };
  
  const incorrectTripBusId = {
    bus_id: 3000,
    origin: 'yaba',
    destination: 'ikoyi',
    trip_date: 'December 17, 1995 03:24:00',
    fare: 4300,
  };
  
  const undefinedTripFare = {
    bus_id: 3000,
    origin: 'yaba',
    destination: 'ikoyi',
    trip_date: 'December 17, 1995 03:24:00',
  };
  
  const undefinedTripOrigin = {
    bus_id: 179,
    destination: 'ikoyi',
    trip_date: 'December 17, 1995 03:24:00',
    fare: 4300,
  };
  
  const undefinedTripDestination = {
    bus_id: 179,
    origin: 'yaba',
    trip_date: 'December 17, 1995 03:24:00',
    fare: 4300,
  };
  
  const undefinedTripDate = {
    bus_id: 179,
    origin: 'yaba',
    destination: 'ikoyi',
    fare: 4300,
  };
  
  const correctBusDetails = {
    number_plate: 'BILY-2348',
    manufacturer: 'Toyota',
    model: 'camry',
    year: '2015',
    capacity: 18,
  };
  
  const undefinedNumberPlate = {
    manufacturer: 'Toyota',
    model: 'Big Daddy',
    year: '2015',
    capacity: 18,
  };
  
  const undefinedBusManufacturer = {
    number_plate: 'BILR-2348',
    model: 'Big Daddy',
    year: '2015',
    capacity: 18,
  };
  
  const undefinedBusModel = {
    number_plate: 'BILR-2348',
    manufacturer: 'Toyota',
    year: '2015',
    capacity: 18,
  };
  
  const undefinedBusYear = {
    number_plate: 'BILR-2348',
    manufacturer: 'Toyota',
    model: 'Big Daddy',
    capacity: 18,
  };
  
  const undefinedBusCapacity = {
    number_plate: 'BILR-2348',
    manufacturer: 'Toyota',
    model: 'Big Daddy',
    year: '2015',
  };
  
  export {
    correctTripDetails, undefinedTripBusId, incorrectTripBusId, undefinedTripOrigin,
    undefinedTripDestination, undefinedTripDate, undefinedTripFare, correctBusDetails,
    undefinedNumberPlate, undefinedBusManufacturer, undefinedBusModel, undefinedBusYear,
    undefinedBusCapacity, conflictTripDetails,
  };
  