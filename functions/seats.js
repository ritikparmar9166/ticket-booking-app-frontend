export const getAllSeats = async () => {
    try {
      // Extract token from cookies
      const token = document.cookie
        .split('; ')
        .find(row => row.startsWith('token='))
        ?.split('=')[1];
  
      if (!token) {
        throw new Error("Authentication token not found in cookies.");
      }
      console.log("Token:", token); 
  
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/reservation/get-all-seats`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`, 
        },
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const responseData = await response.json();
      console.log("Seats data response:", responseData);
  
      return responseData;
    } catch (error) {
      console.error("Error fetching seats data:", error);
      throw error;
    }
  };

  
export const BookSeats = async (count) => {
    try {
      const token = document.cookie
        .split('; ')
        .find(row => row.startsWith('token='))
        ?.split('=')[1];
  
      if (!token) {
        throw new Error("Authentication token not found in cookies.");
      }
      console.log("Token:", token); 
  
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/reservation/reserve`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`, 
        },
        body: JSON.stringify({ "seatsRequested": count, "userId": 6}), 
      });
      

      console.log("Response:", response);
      if (!response.ok) {
        const errorData = await response.json(); // expects { message: "...error msg..." }
        throw new Error(errorData.message || "Something went wrong.");
      }
  
      const responseData = await response.json();
      console.log("Seats data response:", responseData);
  
      return responseData;
    } catch (error) {
      console.error("Error fetching seats data:", error);
      throw error;
    }
};
// ResetSeatsCall

export const ResetSeatsCall = async () => {
    try {
      const token = document.cookie
        .split('; ')
        .find(row => row.startsWith('token='))
        ?.split('=')[1];
  
      if (!token) {
        throw new Error("Authentication token not found in cookies.");
      }
      console.log("Token:", token); 
  
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/reservation/reset-seats`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`, 
        }, 
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const responseData = await response.json();
      console.log("Seats data response:", responseData);
  
      return responseData;
    } catch (error) {
      console.error("Error fetching seats data:", error);
      throw error;
    }
};