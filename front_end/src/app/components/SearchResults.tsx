// components/SearchResults.tsx
import styles from '../../styles/SearchResults.module.css';

interface SearchResult {
  id: number;
  RecallDate: string;
  Title: string;
  Description: string;
  Model: string;
  Manufacturer: string;
  Hazards: string;
  Remedies: string;
  year: number;
  // Add other properties as needed based on your data
}

interface SearchResultsProps {
  results: SearchResult[];
  loading: boolean;
}

export default function SearchResults({ results, loading }: SearchResultsProps) {
  if (loading) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex flex-col items-center justify-center py-8">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-gray-600">Searching for recalls...</p>
        </div>
      </div>
    );
  }

  if (results.length === 0) {
    return (
<div className="bg-white p-6 rounded-lg shadow-md">
        <div className="text-center py-8">
          <h3 className="text-lg font-medium text-gray-700 mb-2">No recalls found</h3>
          <p className="text-gray-500">Try adjusting your search filters to find more results.</p>
        </div>
      </div>
    );
  }

  return (
       <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Search Results ({results.length} recall found)</h2>

              {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Title
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Description
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                RecallDate
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Hazards
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Remedies
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Manufacturer
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Model
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Year
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {results.map((recall) => (
              <tr key={recall.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {recall.Title}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {recall.Description}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {recall.RecallDate}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {recall.Hazards}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {recall.Remedies || 'N/A'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {recall.Manufacturer ||'N/A'}
                </td>
                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {recall.Model ||'N/A'}
                </td>
                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {recall.year ||'N/A'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

        {/* Mobile Cards View */}
      <div className="md:hidden space-y-4">
        {results.map((recall) => (
          <div key={recall.id} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-semibold text-gray-800 text-lg">{recall.Title}</h3>
                <p className="text-sm text-gray-600">{recall.Description}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex flex-col">
                <span className="text-gray-500 text-xs">Hazard</span>
                <span className="font-medium">{recall.Hazards || 'N/A'}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-gray-500 text-xs">Remedies</span>
                <span className="font-medium">
                  {recall.Remedies || 'N/A'}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
     
    </div>
  );
}