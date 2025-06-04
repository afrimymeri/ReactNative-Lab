import axios from 'axios';

const BASE_URL = 'https://react-native-987cb-default-rtdb.firebaseio.com';

export const getItems = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/items.json`);
        const items = [];
        for (const key in response.data) {
            items.push({
                id: key,
                ...response.data[key]
            });
        }
        return items;
    } catch (error) {
        throw error;
    }
};

export const addItem = async (item) => {
    try {
        const response = await axios.post(`${BASE_URL}/items.json`, item);
        return {
            id: response.data.name,
            ...item
        };
    } catch (error) {
        throw error;
    }
};

export const updateItem = async (id, item) => {
    try {
        await axios.put(`${BASE_URL}/items/${id}.json`, item);
        return {
            id,
            ...item
        };
    } catch (error) {
        throw error;
    }
};

export const deleteItem = async (id) => {
    try {
        await axios.delete(`${BASE_URL}/items/${id}.json`);
        return id;
    } catch (error) {
        throw error;
    }
};

export const signUpUser = async (userData) => {
    try {
        // Check if user with same email already exists
        const response = await axios.get(`${BASE_URL}/users.json`);
        const users = response.data;
        
        const existingUser = Object.values(users).find(user => user.email === userData.email);
        if (existingUser) {
            throw new Error('User with this email already exists');
        }

        const newUser = {
            ...userData,
            createdAt: new Date().toISOString()
        };

        const signUpResponse = await axios.post(`${BASE_URL}/users.json`, newUser);
        return {
            id: signUpResponse.data.name,
            ...newUser
        };
    } catch (error) {
        throw error;
    }
};

export const signInUser = async (email, password) => {
    try {
        const response = await axios.get(`${BASE_URL}/users.json`);
        const users = response.data;
        
        // Find user with matching email and password
        const userKey = Object.keys(users).find(key => 
            users[key].email === email && users[key].password === password
        );
        
        if (!userKey) {
            throw new Error('Invalid email or password');
        }

        const user = users[userKey];
        return {
            id: userKey,
            ...user
        };
    } catch (error) {
        throw error;
    }
};

export const testingNETAPIs = async () => {
    try {
        const response = await axios.get('http://localhost:5234/weatherforecast');
        if (!response.data || !Array.isArray(response.data)) {
            throw new Error('Invalid response from the API');
        }
        return response.data;
    } catch (error) {
        throw error;
    }
};

