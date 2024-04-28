import { useState } from "react";
import toast from "react-hot-toast";
import useGetConversations from "./useGetConversations.js";

const useDeleteConversation = () => {
    const { setConversations } = useGetConversations();
    const [loading, setLoading] = useState(false);

    const deleteConversation = async (conversationId) => {
        setLoading(true);
        try {
            const res = await fetch(`/api/message/delete/${conversationId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const data = await res.json();
            if (res.ok) {
                toast.success(data.message);
                setConversations(prevConversations => prevConversations.filter((conv) => conv._id !== conversationId));
            } else {
                throw new Error(data.message || "Failed to delete conversation");
            }
        } catch (error) {
            console.log("Error in deleting conversation", error);
            toast.error(error.message || "Failed to delete conversation");
        } finally {
            setLoading(false);
        }
    };

    return { loading, deleteConversation };
};

export default useDeleteConversation;
