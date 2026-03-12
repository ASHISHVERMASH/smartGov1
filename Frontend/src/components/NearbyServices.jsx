import React from "react";

const NearbyServices = () => {

    const openNearby = (type) => {

        if (!navigator.geolocation) {
            alert("Geolocation is not supported by your browser");
            return;
        }

        navigator.geolocation.getCurrentPosition(

            (position) => {

                const lat = position.coords.latitude;
                const lng = position.coords.longitude;

                console.log("User Location:", lat, lng);

                const mapUrl =
                    `https://www.google.com/maps/search/${type}/?api=1&query=${lat},${lng}`;

                window.open(mapUrl, "_blank");

            },

            (error) => {

                alert("Location access denied. Please allow location permission.");

                console.error(error);

            },

            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0
            }

        );
    };

    return (
        <div className="bg-white dark:bg-slate-900 p-6 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm">

            <h3 className="font-bold text-slate-800 dark:text-white mb-4">
                Nearby Government Services
            </h3>

            <div className="space-y-3 text-sm">

                <button
                    onClick={() => openNearby("police station")}
                    className="w-full flex justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800 hover:bg-blue-50"
                >
                    <span>🚓 Police Station</span>
                    <span className="font-bold">Find</span>
                </button>

                <button
                    onClick={() => openNearby("hospital")}
                    className="w-full flex justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800 hover:bg-red-50"
                >
                    <span>🚑 Hospital</span>
                    <span className="font-bold">Find</span>
                </button>

                <button
                    onClick={() => openNearby("fire station")}
                    className="w-full flex justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800 hover:bg-orange-50"
                >
                    <span>🔥 Fire Station</span>
                    <span className="font-bold">Find</span>
                </button>

                <button
                    onClick={() => openNearby("municipal office")}
                    className="w-full flex justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800 hover:bg-indigo-50"
                >
                    <span>🏛 Municipal Office</span>
                    <span className="font-bold">Find</span>
                </button>

            </div>

        </div>
    );
};

export default NearbyServices;