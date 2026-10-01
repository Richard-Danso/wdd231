export async function fetchItems(url = 'data/items.json') {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP Error status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Fetch Error:', error);
        return [];
    }
}