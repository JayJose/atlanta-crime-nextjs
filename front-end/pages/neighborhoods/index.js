import { supabase } from '../../lib/supabase';
import Link from 'next/link';
import { Layout } from '../../components/layout';

export const getStaticProps = async () => {
  const { data: neighborhoods } = await supabase
    .from('dim_neighborhoods')
    .select('id')
    .order('id', { ascending: true });

  return {
    props: {
      neighborhoods
    }
  };
};

function Menu({ data }) {
  return (
    <>
      <ul>
        {data.map((e) => (
          <li key={e.id}>
            <Link key={e.id} href={`/neighborhoods/${e.id}`}>
              <a>{e.id}</a>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}

export default function Neighborhoods(props) {
  return (
    <>
      <Layout>
        <Menu data={props.neighborhoods} />
      </Layout>
    </>
  );
}
