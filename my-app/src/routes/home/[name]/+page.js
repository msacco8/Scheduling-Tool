
/** @type {import('./$types').PageLoad} */
export function load({ params }) {
    return {
        username: params.name
    };
}