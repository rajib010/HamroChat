import React,{ useEffect, useState } from "react";
import toast from "react-hot-toast";

const useGetConversations = () => {
	const [loading, setLoading] = useState(false);
	const [conversations, setConversations] = useState([]);

	useEffect(() => {
		const getConversations = async () => {
			setLoading(true);
			try {
				// const res = await fetch("http://localhost:8000/api/users"); //returns an empty array but shows the components

				 const res = await fetch("api/users"); //returns an object but an empty array for the first four times , doesnot shows the components


				//respnse is comming late from the backend
				const data = await res.json();
				if (data.error) {
					console.log("Hello world");
					throw new Error(data.error);
				}
				// console.log(data.data.filteredUsers);
				if (data.data.filteredUsers) {
					setConversations(data.data.filteredUsers);
				  }  
				// setConversations(data);
			} catch (error) {
				toast.error(error.message);
			} finally {
				setLoading(false);
			}
		};

		getConversations();
	}, []);

	return { loading, conversations };
};
export default useGetConversations;