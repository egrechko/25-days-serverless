'use strict';

// brew coffee reminder
function brewCoffee() {
  // Run business logic in here.
  // Send email with AWS SES or SMS with Twilio

  return 'Begin brewing the coffee & set aside 4 empty cups';
}

// pour coffee reminder
function pourCoffee() {
  return 'Pour 2 cups of coffee';
}

// deliver coffee reminder
function deliverCoffee() {
  return 'Deliver 2 cups of coffee';
}

// light candles reminder
function lightCandles() {
  return 'Light your candles';
}


// module exports section

module.exports.brewCoffee = async () => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: brewCoffee()
    })
  }
};

module.exports.pourCoffee = async () => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: pourCoffee()
    })
  }
};

module.exports.deliverCoffee = async () => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: deliverCoffee()
    })
  }
};

module.exports.lightCandles = async () => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: lightCandles()
    })
  }
};
