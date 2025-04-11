"use client";

import { useEffect, useState } from "react";
import { getAllSeats, BookSeats, ResetSeatsCall } from "../../functions/seats.js";
// import { BookSeats } from "../../functions/book.js";
import { toast } from "sonner"

interface Seat {
    id: number;
    seat_number: number;
    is_booked: boolean;
    booked_by: number | null;
    booked_at: string | null;
}

export default function Dashboard() {
    const [seats, setSeats] = useState<Seat[]>([]);
    const [numToBook, setNumToBook] = useState("");
    const [bookedCount, setBookedCount] = useState(0);

    useEffect(() => {
        fetchSeats();
    }, []);

    const fetchSeats = async () => {
        try {
            const data = await getAllSeats();
            setSeats(data);
            console.log("Seats data:", data);
            setBookedCount(data.filter((seat: Seat) => seat.is_booked).length);
        } catch (error) {
            console.error("Error fetching seats:", error);
        }
    };

    const handleReset = async() => {
        // Optional: Integrate backend reset API
       try {
        const response = await ResetSeatsCall();
        console.log("Reset response:", response); 
        setNumToBook("");
        toast.success("Reset successful");
        fetchSeats();
       } catch (error) {
        toast.error("Reset failed");
        console.error("Reset error:", error);
       }
        
    };

    const handleBook = async () => {
        const count = parseInt(numToBook);

        try {
            const response = await BookSeats(count);
            setNumToBook("");
            toast.success("Booking successful");
            console.log("Booking successful:", response);

            await fetchSeats();
        } catch (error: unknown) {
            let message = "Something went wrong during booking.";
            if (error instanceof Error) {
              message = error.message;
            } else if (typeof error === "object" && error !== null && "message" in error) {
              message = String((error as { message: string }).message);
            }
          
            toast.error(`Booking failed: ${message}`);
          }
    };

    return (
        <div className="min-h-screen flex flex-col items-center p-6 bg-gray-100">
            <h1 className="text-2xl font-semibold mb-6">Ticket Booking</h1>
            <div className="flex flex-col lg:flex-row gap-10 w-full max-w-6xl justify-between">
                {/* Seats grid */}
                <div className="grid grid-cols-7 gap-3 bg-white p-6 rounded-md shadow-md">
                    {seats
                        .sort((a, b) => a.seat_number - b.seat_number)
                        .map((seat) => (
                            <div
                                key={seat.seat_number}
                                className={`w-10 h-10 flex items-center justify-center rounded text-white font-medium ${seat.is_booked ? "bg-red-500" : "bg-green-500"
                                    }`}
                            >
                                {seat.seat_number}
                            </div>
                        ))}
                </div>

                {/* Booking Form */}
                <div className="flex flex-col gap-4">
                    <div>
                        <label className="block font-semibold mb-1">Book Seats</label>
                        <div className="flex gap-2">
                            <input
                                type="number"
                                className="border p-2 rounded w-40"
                                placeholder="Enter number of seats"
                                value={numToBook}
                                onChange={(e) => setNumToBook(e.target.value)}
                            />
                            <button
                                onClick={handleBook}
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                            >
                                Book
                            </button>
                        </div>
                    </div>
                    <button
                        onClick={handleReset}
                        className="bg-blue-400 text-white px-4 py-2 rounded hover:bg-blue-500 w-full"
                    >
                        Reset Booking
                    </button>

                    <div className="mt-4 flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 bg-red-500 rounded"></div>
                            <span>Booked Seats = {bookedCount}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 bg-green-500 rounded"></div>
                            <span>Available Seats = {80 - bookedCount}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
