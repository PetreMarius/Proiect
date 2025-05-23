import { getRecords } from "@/utils/recordsFunctions";
import React, { useEffect, useState } from "react";
import Spinner from "./Spinner";
import { deleteRecord } from "@/utils/recordsFunctions";
import { useRouter } from "next/router";

const MainPage = () => {
    const router = useRouter();
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true); 

    const fetchRecords = async () => {
        try {
            const response = await getRecords();
            setData(response);
            setIsLoading(false);
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    };

    const handleDeleteRecord = async (id) => {
        try {
            const response = await deleteRecord(id);
            if (response?.acknowledged) {
                const newData = data.filter((el) => el._id !== id);
                setData(newData);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleEditRecord = (id) => {
        router.push(`/edit?id=${id}`);
    };

    const handleToggleCompletion = async (id) => {
        console.log("Toggle completion for", id);
    };

    useEffect(() => {
        fetchRecords();
    }, []);

    if (isLoading) return <Spinner />;

    return (
        <div className="container mx-auto px-4 py-6">
            <h1 className="text-center font-bold text-4xl mb-8">Lista ta de sarcini personalizată</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {data?.map((record) => (
                    <div 
                        key={record._id} 
                        className="bg-white p-4 rounded-2xl shadow-lg border border-gray-200 flex flex-col justify-between min-h-[200px]"
                    >
                        <div>
                            <h5 className="mb-2 text-lg font-bold text-gray-900">
                                {record.title}
                            </h5>
                            <p className="mb-3 text-gray-700 text-sm">
                                {record.content}
                            </p>
                        </div>
                        <div className="flex flex-col gap-2 mt-2">
                            <button
                                type="button"
                                onClick={() => handleEditRecord(record._id)} 
                                className="bg-[#0077b6] hover:bg-[#023e8a] text-white font-semibold rounded-md px-3 py-1.5 text-sm"
                            >
                                Actualizare sarcină
                            </button>
                            <button 
                                type="button" 
                                onClick={() => handleDeleteRecord(record._id)}
                                className="bg-[#ffafcc] hover:bg-[#ff8fa3] text-white font-semibold rounded-md px-3 py-1.5 text-sm"
                            >
                                Ștergere sarcină
                            </button>
                            <button
                                type="button"
                                onClick={() => handleToggleCompletion(record._id)}
                                className={`text-white font-semibold rounded-md px-3 py-1.5 text-sm ${record.completed ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'}`}
                            >
                                {record.completed ? 'Sarcină completă' : 'Sarcină incompletă'}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MainPage;
