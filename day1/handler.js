'use strict';

module.exports.dreidel = async event => {
  const options = ['נ (Nun)', 'ג (Gimmel)', 'ה (Hay)', 'ש (Shin)'];

  const result = options[Math.floor(Math.random()*options.length)];
  
  return {
    statusCode: 200,
    body: JSON.stringify(`You spun ${result}`)
  }
}
