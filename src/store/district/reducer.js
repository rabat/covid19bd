import districts from '../../districts.json';

const initialData = {
  selected: districts.find(d => d.district === 'Dhaka'),
  all: districts
};

const reducer = (state = initialData, { type, data }) => {
  switch (type) {
    case 'SET_SELECTED_DISTRICT':
      return {
        ...state,
        selected: data
      };
    default:
      return state;
  }
};

export default reducer;
