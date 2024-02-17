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
  return data.administrasi?.[key] || 0;
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
  const statusSuara = data.status_suara;
  const statusAdm = data.status_adm;
  return (
    <div className="md:p-8 p-2 border-2 md:border-4 border-black flex flex-col space-y-4">
      <table
        id={`uraian-suara-${tpsNumber}`}
        className="table-auto border border-slate-900 w-full"
      >
        <tbody>
          <tr>
            <td
              className="border border-slate-700 text-2xl font-bold bg-yellow-500"
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
            <td className="border border-slate-700">Suara sah</td>
            <td className="border border-slate-700">{suaraSah}</td>
          </tr>
          <tr>
            <td className="border border-slate-700">
              Pengguna hak pilih dalam DPTb
            </td>
            <td className="border border-slate-700">{penggunaDptBJ}</td>
            <td className="border border-slate-700">Suara tidak sah</td>
            <td className="border border-slate-700">{suaraTidakSah}</td>
          </tr>
          <tr>
            <td className="border border-slate-700">
              Pengguna hak pilih dalam DPK
            </td>
            <td className="border border-slate-700">{penggunaNonDptJ}</td>
            <td className="border border-slate-700">Total suara</td>
            <td className="border border-slate-700">{suaraTotal}</td>
          </tr>
          <tr>
            <td className="border border-slate-700">
              Total pengguna hak pilih
            </td>
            <td className="border border-slate-700">{penggunaTotalJ}</td>
            <td className="border border-slate-700"> </td>
            <td className="border border-slate-700"> </td>
          </tr>
        </tbody>
      </table>
      <table
        id={`uraian-pilpres-${tpsNumber}`}
        className="table-auto w-full border border-slate-900"
      >
        <tbody>
          <tr>
            <td
              className="border border-slate-700 font-bold text-xl bg-green-300"
              colSpan={4}
            >
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
        </tbody>
      </table>
      <table
        id={`uraian-fotochasil-${tpsNumber}`}
        className="table-auto border border-slate-900"
      >
        <tbody>
          <tr>
            <td
              className="border border-slate-700 font-bold bg-blue-400"
              colSpan={4}
            >
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
        </tbody>
      </table>
      <table
        id={`uraian-fotochasil-${tpsNumber}`}
        className="table-auto border border-slate-900"
      >
        <tbody>
          <tr>
            <td
              className="border border-slate-700 font-bold bg-blue-400"
              colSpan={2}
            >
              STATUS VERIFIKASI SISTEM
            </td>
          </tr>
          <tr>
            <td className="border border-slate-700">Status Suara</td>
            <td
              className={
                statusSuara
                  ? "border border-slate-700 bg-green-300"
                  : "border border-slate-700 bg-red-300"
              }
            >
              {/* if true show TUNTAS, if false show PENDING */}
              {statusSuara ? "TUNTAS" : "PENDING"}
            </td>
          </tr>
          <tr>
            <td className="border border-slate-700">Status Administrasi</td>
            <td
              className={
                statusAdm
                  ? "border border-slate-700 bg-green-300"
                  : "border border-slate-700 bg-red-300"
              }
            >
              {statusAdm ? "TUNTAS" : "PENDING"}
            </td>
          </tr>
        </tbody>
      </table>
      <p className="text-sm">
        Last update: {lastUpdate}, diperbarui oleh sistem KPU{" "}
        {Math.round((Date.now() - new Date(lastUpdate).getTime()) / 3600000)}{" "}
        jam yang lalu
      </p>
      <p className="text-sm truncate">
        API Endpoint:{" "}
        https://sirekap-obj-data.kpu.go.id/pemilu/hhcw/ppwp/35/3515/351510/3515102020/35151020200
        {tpsNumber}.json
      </p>
    </div>
  );
}
