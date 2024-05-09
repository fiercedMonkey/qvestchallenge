import { useEffect, useState } from "react";
import Link from "next/link";

export type Lecturer = {
  id: number;
  firstName: string;
  lastName: string;
};
const Home = () => {
  const [lecturers, setLecturers] = useState<Lecturer[]>([]);
  useEffect(() => {
    if (lecturers.length < 1) {
      fetch("http://localhost:3001/lecturer")
        .then((response) => response.json())
        .then((data) => setLecturers(data))
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  });

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">
            Lecturers
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all the lecturers for our trainings.
          </p>
        </div>
        <button className="mt-6 inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
          <Link
            href={{
              pathname: "/lecturer/add",
            }}
          >
            Add
          </Link>
        </button>
      </div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                  >
                    ID
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Firstname
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Lastname
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {lecturers.map((lecturer) => (
                  <tr key={lecturer.id}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                      {lecturer.id}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {lecturer.firstName}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {lecturer.lastName}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
