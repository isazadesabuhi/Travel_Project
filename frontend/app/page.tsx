export default function Home() {
  return <main className="flex text-center justify-center items-center">HOME PAGE</main>;
}

// export async function getStaticProps() {
//   // Call an external API endpoint to get posts.
//   // You can use any data fetching library
//   const res = await fetch("http://localhost:3000/");
//   const trips = await res.json();

//   // By returning { props: { posts } }, the Blog component
//   // will receive `posts` as a prop at build time
//   return {
//     props: {
//       trips,
//     },
//   };
