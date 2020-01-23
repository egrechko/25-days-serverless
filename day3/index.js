module.exports.hello = async () => {
  return {
    statusCode: 200,
    body: JSON.stringify('Welcome to the users API.')
  }
}