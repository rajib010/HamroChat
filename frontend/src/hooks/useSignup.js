import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext.jsx";

const useSignup = () => {
  const [loading, setLoading] = useState(false);

  // from context
  const { setAuthUser } = useAuthContext();

  const signup = async ({ fullName, userName, email, password, confirmPassword, gender }) => {
    const success = handleInputErrors({ fullName, email, userName, password, confirmPassword, gender });
    if (!success) return;
    setLoading(true);
    try {
      const res = await fetch("/api/auth/signup", { 
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, userName, email, password, confirmPassword, gender })
      });

      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
      localStorage.setItem("chat-user", JSON.stringify(data));

      //context
      setAuthUser(data); 
      console.log(data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, signup };
};

export default useSignup;

function handleInputErrors({ fullName, userName, email, password, confirmPassword, gender }) {
  if (!fullName || !userName || !email || !password || !confirmPassword || !gender) {
    toast.error("Please fill in all the fields");
    return false;
  }
  if (password !== confirmPassword) {
    toast.error("Password does not match");
    return false;
  }
  if (password.length < 6) {
    toast.error("Password must not be less than 6 characters");
    return false;
  }

  return true;
}
