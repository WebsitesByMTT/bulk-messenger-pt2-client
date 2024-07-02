import { getCurrentUser } from "../server/utils";

export const trimMessage = (message, maxLength = 20) => {
  return message.length > maxLength
    ? message.substring(0, maxLength) + "..."
    : message;
};

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  // Format the date and time separately
  const formattedDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const formattedTime = date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true, // Use 12-hour format
  });

  return { formattedDate, formattedTime };
};

export const getCurrenUserDetail = async () => {
  const user = await getCurrentUser();
  return user;
};

export const sortData = (
  column,
  data,
  filteredData,
  setFilteredData,
  createdAtSortOrder,
  setCreatedAtSortOrder
) => {
  const dataToSort = filteredData.length > 0 ? filteredData : data;

  const sortedData = [...dataToSort].sort((a, b) => {
    const dateA = new Date(a[column]).getTime();
    const dateB = new Date(b[column]).getTime();
    const sortOrder = createdAtSortOrder;

    return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
  });

  setFilteredData(sortedData);
  setCreatedAtSortOrder(createdAtSortOrder === "asc" ? "desc" : "asc");
};
