const converterCelciusParaFahrenheit = (celcius: number): number => celcius * 1.8 + 32;

const temperaturaEmCelcius = 30;

const temperaturaEmFahrenheit = converterCelciusParaFahrenheit(temperaturaEmCelcius);

console.log(`Temperatura em Fahrenheit: ${temperaturaEmFahrenheit}`);