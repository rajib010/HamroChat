import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useGetConversations = () => {
	const [loading, setLoading] = useState(false);
	const [conversations, setConversations] = useState([]);

	useEffect(() => {
		const getConversations = async () => {
			setLoading(true);
			try {
				const res = await fetch("api/users");
				const data = await res.json();
				if (data.error) {
					// console.log("Hello world");
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