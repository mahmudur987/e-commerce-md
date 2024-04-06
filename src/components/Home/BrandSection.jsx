import Image from "next/image";
import Link from "next/link";
import { useGetAllBrands } from "../../utils/products";
import ErrorComponent from "../Error/ErrorComponent";
import LoadingSpinner from "../Loader/LoadingSpinar";
export default function BrandSection({ className, sectionTitle }) {
  const { data, isLoading, isError, error } = useGetAllBrands();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <ErrorComponent message={error ? error.message : "Error "} />;
  }
  return (
    <div data-aos="fade-up" className={`w-full ${className || ""}`}>
      <div className="container-x mx-auto">
        <div className=" section-title flex justify-between items-center mb-5">
          <div>
            <h1 className="sm:text-3xl text-xl font-600 text-qblacktext">
              {sectionTitle}
            </h1>
          </div>
        </div>
        <div className="grid lg:grid-cols-6 sm:grid-cols-4 grid-cols-2">
          {data &&
            !isError &&
            !isLoading &&
            data.map((x) => (
              <Link
                href={`/all-products/?brand=${x.name}`}
                className="item"
                key={x.id}
              >
                <div className="w-full h-[130px] bg-white border border-primarygray flex justify-center items-center relative">
                  {x.image ? (
                    <Image
                      layout="fill"
                      objectFit="scale-down"
                      src={x.image ? x.image : `/assets/images/brand-1.png`}
                      alt="logo"
                    />
                  ) : (
                    <h3 className="font-bold">{x.name}</h3>
                  )}
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}
