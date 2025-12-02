export default async function BuyItem(userId: number, itemId: number, itemPrice: number) {
	try {
	  const res = await fetch("http://localhost:4000/buy", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ userId, itemId, itemPrice }),
	  });

	  const data = await res.json();

	  if (res.ok) {
		alert(`Purchase successful: ${data.message}`);
	  } else {
		alert(`Purchase failed: ${data.error}`);
	  }
	} catch (err) {
	  console.error(err);
	  alert("Something went wrong!");
	}
}
