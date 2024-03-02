import { REPLFunction } from "./REPLFunction";

// --------------------
// Mode Handling
// --------------------

type Mode = "brief" | "verbose";
let currentMode: Mode = "brief"; // Default is 'brief'

export const modeHandler: REPLFunction = async () => {
  currentMode = currentMode === "brief" ? "verbose" : "brief";
  return `Mode switched to ${currentMode}`;
};

export function getCurrentMode(): "brief" | "verbose" {
  return currentMode;
}

// --------------------
// Load File Handling
// --------------------

const mockedCsvDatabase: Record<string, string> = {
  csv1: "id,name,value\n1,Item1,100\n2,Item2,150",
  csv2: "id,name,value\n3,Item3,200\n4,Item4,250",
};

async function mockLoadCsvFile(filePath: string): Promise<string> {
  const csvContent = mockedCsvDatabase[filePath];
  if (!csvContent) {
    throw new Error(`CSV file not found: ${filePath}`);
  }
  return csvContent;
}

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

// --------------------
// View Handling
// --------------------

let currentCsvData: string | null = null;

export function setCurrentCsvData(csvData: string) {
  currentCsvData = csvData;
}


export const viewHandler: REPLFunction = async (): Promise<
  String | String[][]
> => {
  if (currentCsvData === null) {
    return "No CSV data is currently loaded.";
  }

  // Convert the CSV data into an array of arrays
  return currentCsvData.split("\n").map((row) => row.split(","));
};

// --------------------
// Search Handling
// --------------------

function searchCsvData(
  csvData: string,
  columnQuery: string,
  searchValue: string
): string[][] | string {
  
  const results = "id,name,value\n1,Item1,100";
  const arrayedRows = results.split("\n").map((row) => row.split(","));

  return arrayedRows;
}

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