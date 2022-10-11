import Link from 'next/link';
import { Layout } from '../../components/layout';
import neighborhoods from '../api/lists/neighborhoods';

// export async function getData() {
//   const response = await fetch(/* external API endpoint */)
//   const jsonData = await response.json()
//   return jsonData
// }

// export default async function handler(req, res) {
//   const jsonData = await getData()
//   res.status(200).json(jsonData)
// }

function Menu() {
  console.log(neighborhoods);
  return (
    <>
      <ul>
        <li>
          <Link href="/neighborhoods/downtown">
            <a>Downtown</a>
          </Link>
        </li>
        <li>
          <Link href="/neighborhoods/midtown">
            <a>Midtown</a>
          </Link>
        </li>
      </ul>
    </>
  );
}

export default function Neighborhoods() {
  return (
    <>
      <Layout children={<Menu />}></Layout>
    </>
  );
}
