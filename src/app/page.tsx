"use client";

import React from "react";
import { data } from "../../data";
import { dataProp } from "../../data";
import Card from "@/components/card";
import { useState, useEffect } from "react";

const HomePage = () => {

  const [dataList, setDataList] = useState<dataProp[]>(data);
  const [dataTable, setDataTable] = useState<dataProp[]>([]);

  // Function Add Card To Table
  const AddToTable = (item: dataProp) => {
    setDataTable((prev) => [...prev, item]);
    setDataList(dataList.filter((data) => data.name !== item.name));
  };

  // Function Remove Card From Table 
  const RemoveCard = (item: dataProp) => {
    setDataTable(dataTable.filter((data) => data.name !== item.name));
    setDataList((prev) => [...prev, item]);
  };

  // Auto Remove Card ----> remove item อันล่าสุดที่เพิ่มเข้าไปใน Table ก่อน
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (dataTable.length > 0) {
        const lastItem = dataTable[dataTable.length - 1];  // dataTable[ตัวสุดท้าย]
        setDataTable((prev) => prev.slice(0, -1));   // ตัดตัวสุดท้ายออก
        setDataList((prev) => [...prev, lastItem]);
      }
    }, 5000); // remove every 5 sec

    return () => {
      clearInterval(intervalId);
    };
  }, [dataList]);

  console.log("Data in Table", dataTable);

  return (
    <div className="h-screen overflow-hidden p-10 flex flex-col md:flex-row gap-8">
      {/**Items List */}
      <div className="md:w-2/5">
        <div className="flex flex-wrap gap-3">
          {dataList.map((item, index) => (
            <div key={index} onClick={() => AddToTable(item)}>
              <Card name={item.name} />
            </div>
          ))}
        </div>
      </div>

      {/**Table Colums */}
      <div className="md:w-3/5 h-full border rounded-xl flex ">
        {/**Vegetable */}
        <div className="w-1/2">
          <h1 className="py-5 text-2xl font-bold  text-center">Vegetables</h1>
          <div className="flex items-center flex-col gap-3 mt-5">
            {dataTable
              .filter((item) => item.type === "Vegetable")
              .map((item, index) => (
                <div key={index} onClick={() => RemoveCard(item)}>
                  <Card name={item.name} />
                </div>
              ))}
          </div>
        </div>

        {/** Fruits */}
        <div className="w-1/2 border-l">
          <h1 className="py-5 text-2xl font-bold text-center">Fruits</h1>
          <div className="flex items-center flex-col gap-3 mt-5">
            {dataTable
              .filter((item) => item.type === "Fruit")
              .map((item, index) => (
                <div key={index} onClick={() => RemoveCard(item)}>
                  <Card name={item.name} />
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
