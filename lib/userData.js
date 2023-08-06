import { getToken } from "./authenticate";

async function makeRequest(url, method) {
    const token = getToken();
    const res = await fetch(url, {
        method: method,
        headers: {
            'authorization': `JWT ${token}`
        },
    });

    const data = await res.json();

    if (res.status === 200) {
        return data;
    } else {
        return [];
    }
}

export async function getFavourites() {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/favourites`;
    return makeRequest(url, 'GET');
}

export async function addToFavourites(id) {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/favourites/${id}`;
    return makeRequest(url, 'PUT');
}

export async function removeFromFavourites(id) {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/favourites/${id}`;
    return makeRequest(url, 'DELETE');
}

export async function getHistory() {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/history`;
    return makeRequest(url, 'GET');
}

export async function addToHistory(id) {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/history/${id}`;
    return makeRequest(url, 'PUT');
}

export async function removeFromHistory(id) {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/history/${id}`;
    return makeRequest(url, 'DELETE');
}