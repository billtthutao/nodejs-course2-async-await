const axios = require('axios');

const getExchangeRate = async (to) => {
  try{
    var response = await axios.get('http://data.fixer.io/api/latest?access_key=c88441bdcf3740afb2a39cdeffcd9f7b&format=1');
    //return response.data.rates[to];
    const rate = response.data.rates[to];
  
    if(rate){
      return rate;
    }else {
      throw new Error();
    }
  }catch(e){
    throw new Error(`Unable to get rate for ${to}.`);
  }
  //return axios.get('http://data.fixer.io/api/latest?access_key=c88441bdcf3740afb2a39cdeffcd9f7b&format=1')
  //.then((response) => {
  //  return response.data.rates[to];
  //});
};

const getCountries = async (currency) => {
  try{
  var response = await axios.get(`https://restcountries.eu/rest/v2/currency/${currency}`);
  return response.data.map((country) => country.name);
  }catch(e){
    throw new Error(`Unable to get countries using ${currency}.`);
  } 
  //return axios.get(`https://restcountries.eu/rest/v2/currency/${currency}`)
  //       .then((response) => {
  //         return response.data.map((country) => country.name);
  //       });
};

getExchangeRate('CNY').then((rate) => {
  console.log(rate);
}).catch((e) => {
  console.log(e);
});

getCountries('CNY').then((countries) => {
  console.log(countries);
}).catch((e) => {
  console.log(e);
});


const convert = async (to,amt) => {
  var rate = await getExchangeRate(to);
  var countries = await getCountries(to);

  var total = rate * amt;

  return `${amt} EUR is worth ${total} ${to}. You can spend these in following countries: ${countries.join(',')}`;
};

convert('CNY',10).then((status) => {
  console.log(status);
}).catch((e) => {
  console.log(e.message);
});
 
//convert('xxx',10).then((status) => {
//  console.log(status);
//}).catch((e) => {
//  console.log(e.message);
//});
