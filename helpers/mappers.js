module.exports = {
  apartmentPropertyToBoolean
}

function integerToBoolean(int) {
  return int == 1 ? true : false;
};

function apartmentPropertyToBoolean(apartment) {
  return {
      ...apartment,
      sittingroom: integerToBoolean(apartment.sittingroom),
  };
};