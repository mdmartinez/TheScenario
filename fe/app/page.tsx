"use client";

import { useEffect, useState } from "react";
import { Table } from "@/app/components/table";
import { CreateDataForm } from "@/app/components/create-form";
import { FormValues } from "@/app/utils/validation";

export default function Index() {
  const [data, setData] = useState<FormValues | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`http://localhost:3000/api/data`);

      if (!response.ok) {
        throw new Error(`error fetching data: ${response.status}`);
      }

      const result: FormValues = await response.json();
      setData(Array.isArray(result) ? result : null);
    } catch (e) {
      console.error("Fetch error:", e);
      setError(e instanceof Error ? e.message : "An unknown error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = (id: string) => {
    setData((prevData: any) => {
      if (!Array.isArray(prevData)) return prevData;
      return prevData.filter((item) => item._id !== id);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <CreateDataForm fetchData={fetchData} />
        {data && Array.isArray(data) && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Submitted Data</h2>
            {isLoading ? (
              <div>Loading...</div>
            ) : error ? (
              <div>Error: {error}</div>
            ) : (
              <Table data={data} onDelete={handleDelete} reset={fetchData} />
            )}
          </div>
        )}
      </div>
    </main>
  );
}
