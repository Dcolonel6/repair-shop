import React from "react";
import { AiFillDelete } from "react-icons/ai";
import { MdEdit } from "react-icons/md";

const Table = ({
  data,
  headers,
  deleteHandler,
  clickHandlerEdit,  
  editable = true,
}) => {
  const headersTHs = headers.map((header, index) => {
    return (
      <th
        scope="col"
        className="text-sm font-bold text-gray-900 px-6 py-4 text-left"
        key={index}
      >
        {header.length > 0
          ? `${header[0].toUpperCase()}${header.slice(1).toLowerCase()}`
          : header}
      </th>
    );
  });

  const trsWithData = data.map((row, rowIndx) => {
    const { id } = row;
    const tds = Object.entries(row).map(([prope, value], index) => {
      return prope !== "id" ? (
        <td
          key={`${rowIndx}-${value}-${index}`}
          className="text-sm text-gray-900 font-normal px-6 py-4 whitespace-nowrap"
        >
          {value}
        </td>
      ) : null;
    });

    return (
      <tr key={`${id}-${rowIndx}`} className="border-b">
        {tds}
        <td
          key={`${rowIndx}"-delete"`}
          className="text-lg text-red-600 font-normal px-6 py-4 whitespace-nowrap"
        >
          {editable && (
            <AiFillDelete
              onClick={(e) => {
                e.stopPropagation();
                deleteHandler(id);
              }}
            />
          )}
        </td>
        <td
          key={`${rowIndx}"-edit"`}
          className="text-lg text-teal-600 font-normal px-6 py-4 whitespace-nowrap"
        >
          {editable && (
            <MdEdit
              onClick={(e) => {
                e.stopPropagation();
                clickHandlerEdit(row);
              }}
            />
          )}
        </td>
      </tr>
    );
  });

  return (
    <>
      <table className="min-w-full">
        <thead className="border-b">
          <tr>{headersTHs}</tr>
        </thead>
        <tbody>{trsWithData}</tbody>
      </table>
    </>
  );
};

export default Table;
