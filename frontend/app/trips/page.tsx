async function getData() {
  const res = await fetch("http://127.0.0.1:8000/api");
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function Trips() {
  const data = await getData();
  console.log(data);

  return (
    <main>
      <div className="container mx-auto py-8">
        <h1 className="text-2xl text-center font-bold mb-4">All Trips</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.map((item, index) => {
            return (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-2 text-black">
                  {item.title}
                </h2>
                <p className="text-gray-600 mb-4">Place:{item.place}</p>
                <p className="text-gray-600 mb-4">Price: ${item.price}</p>
                <p className="text-gray-600 mb-4">
                  Starting Time: {item.starting_time}
                </p>
                <p className="text-gray-600 mb-4">
                  Description: {item.description}
                </p>
                {/* <p className="text-gray-600 mb-4">Description: {item.user}</p> */}
                <p className="text-gray-600 mb-4">
                  Duration: {item.duration} days
                </p>
                <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
                  Add to Cart
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
