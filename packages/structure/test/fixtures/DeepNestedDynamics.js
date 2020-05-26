const { attributes } = require('../../src');

const Vehicle = attributes({
  year: {
    type: Number,
    required: true,
  },
})(class Vehicle {});

const UserPersonalInformation = attributes(
  {
    name: String,
    vehicle: 'Vehicle',
  },
  {
    dynamics: {
      Vehicle: () => Vehicle,
    },
  },
)(class UserPersonalInformation {});


const AutoRiskProfile = attributes(
  {
    userPersonalInformation: {
      type: 'UserPersonalInformation',
      required: true,
    },
  },
  {
    dynamics: {
      UserPersonalInformation: () => UserPersonalInformation,
    },
  },
)(class AutoRiskProfile {});

const autoRiskProfile = AutoRiskProfile.buildStrict({
  userPersonalInformation: new UserPersonalInformation({
    name: 'a',
    vehicle: new Vehicle({
      year: 2018,
    }),
  }),
});