export default function LoadingSpinner () {
    return (
        <div className="flex items-center justify-center">
            <div className="loader"></div>
            <style jsx>{`
                .loader {
                    border: 4px solid rgb(255, 255, 255);
                    border-top: 4px solid #3498db; /* Change this color as needed */
                    border-radius: 50%;
                    width: 50px;  /* Match the size of your button */
                    height: 50px; /* Match the size of your button */
                    animation: spin 1s linear infinite;
                }

                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    )
}