var in_client_id = '962e0cefad5146f3ab60fc5dab9d2d55',
    in_client_secret = '672147035b154239a13fca41a587971c',
    in_redirect_uri = 'http://localhost:3000/auth/callback/',
    in_auth_url = 'https://api.instagram.com/oauth/authorize/?client_id='
                  + in_client_id + '&redirect_uri='
                  + in_redirect_uri + '&response_type=code';


module.exports = {
  port: process.env.PORT || 3000,
  instagram: {
    client_id: in_client_id,
    client_secret: in_client_secret,
    redirect_uri: in_redirect_uri,
    auth_url: in_auth_url
  }
};

