'use strict';

const AWS = require('aws-sdk');

AWS.config.update({
  region: "localhost",
  endpoint: "http://localhost:8000"
});

const dynamoDb = new AWS.DynamoDB.DocumentClient();

// get all
module.exports.getUsers = async () => {
  const params = {
    TableName: 'usersTable'
  };

  console.log('Scanning database...');

  try {
    const data = await dynamoDb.scan(params).promise();
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data.Items)
    }
  } catch (error) {
    console.error(error);
  }
};

// get single
module.exports.get = (event, context, callback) => {
  const params = {
    TableName: 'usersTable',
    Key: {
      "email": event.pathParameters.email
    },
    ReturnValues: 'ALL_NEW'
  };

  console.log('Getting single user...');

  // get user from database
  dynamoDb.get(params, (error, data) => {
    if (error) {
      console.error(error);
      callback(null, {
        statusCode: '400',
        body: JSON.stringify('Could not query user')
      });
    }

    console.log("Succesfully got user", JSON.stringify(data, null, 2));

    callback(null, {
      statusCode: 200,
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data.Item)
    });
    
  });

};

module.exports.add = async (event, context) => {
  const { email } = JSON.parse(event.body);

  if ( typeof(email) !== 'string' ) {
    console.error('Validation Error');

    return {
      statusCode: 400,
      headers: { 'Content-Type': 'text/plain' },
      body: 'Couldn\'t create the user.'
    };
  }

  const params = {
    TableName: 'usersTable',
    Item: {
      "email": email
    }
  }

  console.log('\n==================');
  console.log('Adding new user...');
  console.log('==================\n');

  try {
    const data = await dynamoDb.put(params).promise();
    console.log('User added successfuly');
    return {
      statusCode: 200,
      body: JSON.stringify(email)
    };
  } catch (error) {
    console.error('Failed to add user');
    return {
      statusCode: 400,
      error: `Could not post: ${error.stack}`
    };
  }
};

// update user

// delete user

module.exports.get = (event, context, callback) => {
  const params = {
    TableName: 'usersTable',
    Key: {
      "email": event.pathParameters.email
    }
  };

  console.log('Getting single user...');

  dynamoDb.get(params, (error) => {
    if (error) {
      console.error(error);
      callback(null, {
        statusCode: '400',
        body: JSON.stringify('Could not query user')
      });
    }

    console.log("Succesfully got user", JSON.stringify(data, null, 2));

    callback(null, {
      statusCode: 200,
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data.Item)
    });
    
  });

};