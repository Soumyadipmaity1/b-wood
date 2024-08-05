
const movieCast = [
  { name: "Actor ", role: "Lead" },
  { name: "Actor ", role: "Supporting" },

  { name: "Actor ", role: "Supporting" },
  { name: "Actor ", role: "Supporting" },
  { name: "Actor ", role: "Supporting" },
  { name: "Actor ", role: "Supporting" },

  { name: "Actor ", role: "Supporting" },
  { name: "Actor ", role: "Cameo" },
];

const CrewTable = () => {
  return (
    <div className="flex-col flex sm:flex-col  mt-20 text-center justify-center sm:mt-10">
        <h1 className="text-2xl font-semibold text-white text-center ">Crew List</h1>
      <table className="table-auto border-b mt-10  border-gray-200">
        <thead>
          <tr>
            <th className="border-b border-gray-300 px-4 text-lg text-lime-300 py-2">Name</th>
            <th className="border-b border-gray-300 px-4 text-lg text-lime-300 py-2">Role</th>
          </tr>
        </thead>
        <tbody>
          {movieCast.map((member, index) => (
            <tr key={index}>
              <td className="border-b border-gray-300 px-4 py-2">{member.name}</td>
              <td className="border-b border-gray-300 px-4 py-2">{member.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
 
export default CrewTable;