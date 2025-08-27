import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

function ApprovedPage() {
    const [status, setStatus] = useState("Logging in...");
    const { handleApproved } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const approveToken = async () => {
            const params = new URLSearchParams(window.location.search);
            const requestToken = params.get('request_token');
            const approved = params.get('approved');

            if (approved && requestToken) {
                await handleApproved(requestToken);
                setStatus("Success! Redirecting...");
                setTimeout(() => navigate('/'), 1500);
            } else {
                setStatus("Login failed or was denied. Redirecting...");
                setTimeout(() => navigate('/'), 2000);
            }
        };

        approveToken();
    }, [handleApproved, navigate]);

    return (
        <div style={{ textAlign: 'center', padding: '4rem' }}>
            <h2>{status}</h2>
        </div>
    );
}

export default ApprovedPage;