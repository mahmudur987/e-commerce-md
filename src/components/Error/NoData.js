// NoDataToShow.js

const NoDataToShow = ({ message }) => {
    return (
        <div className="flex justify-center items-center h-full">
            <p className="text-lg text-red-600">{message ? message : "No data "}</p>
        </div>
    );
};

export default NoDataToShow;
