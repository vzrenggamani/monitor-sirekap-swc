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
    <main className="container mx-auto px-5">
      <header className="py-8">
        <h1 className="text-3xl font-bold py-2">
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
      <div className="grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-8">
        {tpsNumbers.map((tpsNumber) => (
          <DataTPS key={tpsNumber} tpsNumber={tpsNumber} />
        ))}
      </div>
      <footer className="py-8">
        <p>
          Data diambil dari{" "}
          <a
            className="text-blue-600 underline font-medium"
            href="https://sirekap-obj-data.kpu.go.id/pemilu/hhcw/ppwp/35/3515/351510/3515102006.json"
          >
            API SIREKAP KPU
          </a>
        </p>
        <small>
          Laboratorium Analitik Data,{" "}
          <a href="https://renggaprakosonugroho.my.id">
            <b>Rengga Prakoso Nugroho (rengganugroho@um.ac.id)</b>
          </a>
        </small>
      </footer>
    </main>
  );
}
