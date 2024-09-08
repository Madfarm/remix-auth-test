import type { MetaFunction } from "@remix-run/node";


export const meta: MetaFunction = () => {
  return [
    { title: "remix-auth Test" },
    { name: "description", content: "Testing remix-auth and some component libraries" },
  ];
};

export default function Index() {
  return (
    <div>
      <h1>Hello, homepage</h1>
    </div>
  );
}
