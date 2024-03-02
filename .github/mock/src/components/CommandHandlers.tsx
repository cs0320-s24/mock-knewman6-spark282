import { REPLFunction } from "./REPLFunction";

// --------------------
// Mode Handling
// --------------------

/**
 * Mode Handling
 * Defines the two possible modes and the current mode of the application.
 * Provides functionality to switch between 'brief' and 'verbose' modes.
 */
type Mode = "brief" | "verbose";
let currentMode: Mode = "brief"; // Default is 'brief'

// Handler function to toggle between 'brief' and 'verbose' modes.
export const modeHandler: REPLFunction = async () => {
  currentMode = currentMode === "brief" ? "verbose" : "brief";
  return `Mode switched to ${currentMode}`;
};

// Helper function to get the current mode.
export function getCurrentMode(): "brief" | "verbose" {
  return currentMode;
}

/**
 * Load File Handling
 * Contains a mocked database of CSV files for simulation and functions to load CSV content.
 */

// Mocked database of CSV files. The keys represent file paths and the values are the CSV contents.
const mockedCsvDatabase: Record<string, string> = {
  csv1: "id,name,value\n1,Item1,100\n2,Item2,150",
  csv2: "id,name,value\n3,Item3,200\n4,Item4,250",
};

// Function that simulates loading a CSV file's content from the mocked database.
async function mockLoadCsvFile(filePath: string): Promise<string> {
  const csvContent = mockedCsvDatabase[filePath];
  if (!csvContent) {
    throw new Error(`CSV file not found: ${filePath}`);
  }
  return csvContent;
}

// Handler function to load CSV file content. It validates the argument and returns the content or an error message.
export const loadFileHandler: REPLFunction = async (
  args: Array<string>
): Promise<string> => {
  if (args.length !== 1) {
    return "Error: Please provide exactly one file path as the argument.";
  }

  const filePath = args[0];
  try {
    const content = await mockLoadCsvFile(filePath);
    setCurrentCsvData(content);
    return `CSV content from ${filePath} loaded successfully.`;
  } catch (error) {
    return `Error: ${(error as Error).message}`;
  }
};

/**
 * View Handling
 * Provides functionality to view the currently loaded CSV data.
 */

// Variable to store the currently loaded CSV data.
let currentCsvData: string | null = null;

// Function to set the currently loaded CSV data.
export function setCurrentCsvData(csvData: string) {
  currentCsvData = csvData;
}

// Handler function to view the current CSV data. Returns the data as an array of arrays or a message if no data is loaded.
export const viewHandler: REPLFunction = async (): Promise<
  String | String[][]
> => {
  if (currentCsvData === null) {
    return "No CSV data is currently loaded.";
  }

  return currentCsvData.split("\n").map((row) => row.split(","));
};

/**
 * Search Handling
 * Provides functionality to search within the currently loaded CSV data.
 */

// Function to search within the CSV data based on a column query and a search value. Returns the search results.
function searchCsvData(
  csvData: string,
  columnQuery: string,
  searchValue: string
): string[][] | string {
  const results = "id,name,value\n1,Item1,100";
  const arrayedRows = results.split("\n").map((row) => row.split(","));

  return arrayedRows;
}

// Handler function to perform a search on the current CSV data. Returns the search results or an error message.
export const searchHandler: REPLFunction = async (
  args: Array<string>
): Promise<String | String[][]> => {
  if (currentCsvData === null) {
    return "No CSV data is currently loaded.";
  }

  if (args.length !== 2) {
    return "Error: Please provide a column and a value to search for.";
  }

  try {
    const searchResults = searchCsvData(currentCsvData, args[0], args[1]);
    return searchResults; //To be changed with backend when connected
  } catch (error) {
    return (error as Error).message;
  }
};
