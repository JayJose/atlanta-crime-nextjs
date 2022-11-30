import { MyHeader } from '../components/chakra/header';

export function Chart() {
  return <div className="chart">CHART</div>;
}

export function BigChart() {
  return (
    <div className="chart" id="bigChart">
      BIGCHART
    </div>
  );
}

export function Table() {
  return <div className="table">TABLE</div>;
}

export default function Dash() {
  return (
    <>
      <MyHeader></MyHeader>
      <div className="page">
        <div className="layout">
          <BigChart />
          <Chart />
          <Chart />
          <Chart />
          <Table />
        </div>
      </div>
    </>
  );
}
