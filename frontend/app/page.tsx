import Image from "next/image"
export default function Home() {
  return <main className="flex flex-col text-center justify-center items-center">HOME PAGE
  <Image alt="travel-image" width={1000} height={1000} src="https://images.unsplash.com/photo-1539635278303-d4002c07eae3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
  </main>;
}