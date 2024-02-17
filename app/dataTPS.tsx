import useSWR from "swr";

interface DataTPSProps {
  tpsNumber: string;
}

interface kpuData {
  chart: {
    100025: number;
    100026: number;
    100027: number;
  };
  images: string[];
  administrasi: {
    suara_sah: number;
    suara_total: number;
    pemilih_dpt_j: number;
    pemilih_dpt_l: number;
    pemilih_dpt_p: number;
    pengguna_dpt_j: number;
    pengguna_dpt_l: number;
    pengguna_dpt_p: number;
    pengguna_dptb_j: number;
    pengguna_dptb_l: number;
    pengguna_dptb_p: number;
    suara_tidak_sah: number;
    pengguna_total_j: number;
    pengguna_total_l: number;
    pengguna_total_p: number;
    pengguna_non_dpt_j: number;
    pengguna_non_dpt_l: number;
    pengguna_non_dpt_p: number;
  };
  psu: null | any;
  ts: string;
  status_suara: boolean;
  status_adm: boolean;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());
const getAdministrasiData = (
  data: kpuData,
  key: keyof kpuData["administrasi"]
) => {
  return data.administrasi?.[key] || "tidak ada data";
};

export function DataTPS({ tpsNumber }: DataTPSProps) {
  const { data, error } = useSWR<kpuData>(
    `https://sirekap-obj-data.kpu.go.id/pemilu/hhcw/ppwp/35/3515/351510/3515102020/35151020200${tpsNumber}.json`,
    fetcher
  );

  if (error) return <div>Failed to load data for TPS {tpsNumber}</div>;
  if (!data) return <div>Loading data for TPS {tpsNumber}...</div>;

  const suaraSah = getAdministrasiData(data, "suara_sah");
  const suaraTotal = getAdministrasiData(data, "suara_total");
  const suaraTidakSah = getAdministrasiData(data, "suara_tidak_sah");
  const penggunaDptJ = getAdministrasiData(data, "pengguna_dpt_j");
  const penggunaDptBJ = getAdministrasiData(data, "pengguna_dptb_j");
  const penggunaTotalJ = getAdministrasiData(data, "pengguna_total_j");
  const penggunaNonDptJ = getAdministrasiData(data, "pengguna_non_dpt_j");
  const paslon1 = data.chart ? data.chart["100025"] : 0;
  const paslon2 = data.chart ? data.chart["100026"] : 0;
  const paslon3 = data.chart ? data.chart["100027"] : 0;
  const totalPaslon = paslon1 + paslon2 + paslon3;
  const lastUpdate = data.ts;
  return (
    <table className="table-auto mb-8 border border-slate-900">
      <tbody>
        <tr>
          <td
            className="border border-slate-700 text-2xl font-bold"
            colSpan={4}
          >
            TPS {tpsNumber}
          </td>
        </tr>
        <tr>
          <td className="border border-slate-700">
            Pengguna hak pilih dalam DPT
          </td>
          <td className="border border-slate-700">{penggunaDptJ}</td>
          <td className="border border-slate-700">Seluruh suara sah</td>
          <td className="border border-slate-700">{suaraSah}</td>
        </tr>
        <tr>
          <td className="border border-slate-700">
            Pengguna hak pilih dalam DPTb
          </td>
          <td className="border border-slate-700">{penggunaDptBJ}</td>
          <td className="border border-slate-700">Jumlah suara tidak sah</td>
          <td className="border border-slate-700">{suaraTidakSah}</td>
        </tr>
        <tr>
          <td className="border border-slate-700">
            Pengguna hak pilih dalam DPK
          </td>
          <td className="border border-slate-700">{penggunaNonDptJ}</td>
          <td className="border border-slate-700">
            SELURUH SUARA SAH DAN SUARA TIDAK SAH
          </td>
          <td className="border border-slate-700">{suaraTotal}</td>
        </tr>
        <tr>
          <td className="border border-slate-700">Pengguna hak pilih</td>
          <td className="border border-slate-700">{penggunaTotalJ}</td>
          <td className="border border-slate-700"> </td>
          <td className="border border-slate-700"> </td>
        </tr>
        <tr>
          <td className="border border-slate-700 font-bold text-xl" colSpan={4}>
            SUARA PILPRES
          </td>
        </tr>
        <tr>
          <td className="border border-slate-700">PASLON 1</td>
          <td className="border border-slate-700">PASLON 2</td>
          <td className="border border-slate-700">PASLON 3</td>
          <td className="border border-slate-700">TOTAL</td>
        </tr>
        <tr>
          <td className="border border-slate-700">{paslon1}</td>
          <td className="border border-slate-700">{paslon2}</td>
          <td className="border border-slate-700">{paslon3}</td>
          <td className="border border-slate-700">{totalPaslon}</td>
        </tr>
        <tr>
          <td className="border border-slate-700" colSpan={4}>
            HASIL PINDAI C.HASIL
          </td>
        </tr>
        {/* return the images */}
        <tr className="border border-slate-700">
          {data.images.map((image) => (
            <td key={image}>
              <img
                className="w-1/4 h-1/4 object-cover"
                key={image}
                src={image}
                alt={image}
                onClick={() => {
                  window.open(image);
                }}
              />
            </td>
          ))}
        </tr>
        <tr>
          <td className="border border-slate-700" colSpan={4}>
            {/* give information how long since last update */}
            Last update: {lastUpdate}, diperbarui oleh sistem KPU{" "}
            {Math.round(
              (Date.now() - new Date(lastUpdate).getTime()) / 3600000
            )}{" "}
            jam yang lalu
          </td>
        </tr>
      </tbody>
    </table>
  );
}
