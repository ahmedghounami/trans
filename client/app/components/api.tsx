export default async function Api() {
    const users = await fetch('http://localhost:3000/users')
        .then((res) => res.json())
        .catch((err) => console.error(err));
    const messages = await fetch('http://localhost:3000/messages')
        .then((res) => res.json())
        .catch((err) => console.error(err));
    const user = await fetch('http://localhost:3000/user')
        .then((res) => res.json())
        .catch((err) => console.error(err));
    return {
        users
    };
}
