const API_KEY = '';

async function createUser(email, password) {
    axois.post('' + API_KEY
        ,{
            email: email,
            password: password,
            returnSecureToken: true,
        }
    );
}
