
export const SignUpCall = async (data) => {
    try {
      console.log("SignUpCall function triggered");
      console.log(`${process.env.NEXT_PUBLIC_API_BASE_URL}/signUp`);
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/signUp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
    
      if (!response.ok) {
        // console.log("rgsgrg")
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const responseData = await response.json();
        console.log("Sign up response:", responseData); 
      
      return responseData;
    } catch (error) {
      console.error("Error during sign up:", error);
      throw error;
    }
  };
  
  export const SignInCall = async (data) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/signIn`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
    
      if (!response.ok) {
        // console.log("rgsgrg")
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const responseData = await response.json();
        console.log("Sign up response:", responseData); 
      
      return responseData;
    } catch (error) {
      console.error("Error during sign up:", error);
      throw error;
    }
  };
  
  