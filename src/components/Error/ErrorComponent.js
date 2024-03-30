const ErrorComponent = ({ message }) => {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-4xl font-bold text-red-500 mb-4">Error : {message}</h1>
            <p className="text-lg text-gray-800">Oops! Something went wrong.</p>
            <p className="text-lg text-gray-800">Please try again later.</p>
        </div>
    );
};

export default ErrorComponent;
