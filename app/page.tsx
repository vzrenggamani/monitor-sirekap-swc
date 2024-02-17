"use client";
import { DataTPS } from "@/app/dataTPS";

export default function Page() {
  const tpsNumbers = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
    "13",
    "14",
  ];

  return (
    <main className="container mx-auto">
      <header className="py-8">
        <h1 className="text-3xl">
          External Monitoring SIREKAP KPU 2024 desa Sawocangkring
        </h1>
        <p>
          Disclaimer, Dashboard Monitoring Independen, data diperoleh melalui{" "}
          <a
            className="text-blue-600 underline font-medium"
            href="https://sirekap-obj-data.kpu.go.id/pemilu/hhcw/ppwp/35/3515/351510/3515102006.json"
          >
            API SIREKAP KPU
          </a>
          . Data dapat berubah sewaktu-waktu tanpa pemberitahuan dan berbeda
          dengan data resmi KPU. Data ini hanya untuk kepentingan monitoring
          independen.
        </p>
        <small>
          Laboratorium Analitik Data,{" "}
          <a href="https://renggaprakosonugroho.my.id">
            <b>Rengga Prakoso Nugroho (rengganugroho@um.ac.id)</b>
          </a>
        </small>
        <p className="pt-2">
          {" "}
          <a
            className="text-blue-600 underline font-medium"
            href="https://kawalpemilu.org/h/3515102020"
          >
            Tautan Monitoring Kawal Pemilu Desa Sawocangkring
          </a>
        </p>
      </header>
      {tpsNumbers.map((tpsNumber) => (
        <DataTPS key={tpsNumber} tpsNumber={tpsNumber} />
      ))}
    </main>
  );
}
