import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useUrl from '../Hooks/useUrl';
import Loader from '../Components/Loader';
import { ArrowLeft , CalendarCheck2, Copy  , ExternalLink , MousePointer, Paperclip } from 'lucide-react';


//  <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Data for Shortcode: {shortcode}</h1>

//       <p><strong>Original URL:</strong> {getdataperurl.originalUrl}</p>
//       <p><strong>Short URL:</strong> {getdataperurl.shortUrl}</p>
//       <p><strong>Total Clicks:</strong> {getdataperurl.totalClicks}</p>

//       <h2 className="text-xl font-semibold mt-4 mb-2">Click Details:</h2>
//       {getdataperurl.clicks && getdataperurl.clicks.length > 0 ? (
//         getdataperurl.clicks.map((click, index) => (
//           <div key={index} className="mb-2 p-2 border rounded">
//             <p><strong>IP Address:</strong> {click.ipAddress}</p>
//             <p><strong>Clicked At:</strong> {new Date(click.createdAt).toLocaleString()}</p>
//           </div>
//         ))
//       ) : (
//         <p>No click data found.</p>
//       )}
//     </div>
function Data() {
  const { shortcode } = useParams();
  const { getDataofEach, getdataperurl  , initialData , fetchInitialData} = useUrl();

  useEffect(() => {
    if (shortcode) {
      getDataofEach(shortcode);
      fetchInitialData();
    }
  }, [shortcode ]);

  if (!getdataperurl) {
    return <Loader />;
  }
  
  if (getdataperurl.error) {
    return <p>Error: {getdataperurl.error}</p>;
  }

  
  return (
   <>
   <div className='flex- '>
    <div className=' flex items-center gap-4 ml-10 mt-10 duration-200 hover:bg-gray-200 p-2 rounded-md'> 
      <ArrowLeft  size={16} />
      <h1 className='font-semibold'>Back to Dashboard</h1>
    </div>
   </div>

   {/* card showing orignal url and short url */}
   <div className='felx-row border-1 border-gray-300 m-10 rounded-xl shadow-sm'>
    <div className='flex    px-4 pt-8 '>
        <div className=''>
          <h1 className='text-3xl '>Link Analytics</h1>
          <p className="text-gray-500 text-sm mt-2">
            Created {" "}
            {Array.isArray(initialData)
              ? (initialData.find(item => item.shortcode === shortcode)?.createdAt || "N/A")
              : "N/A"}
          </p>
        </div>
    </div>


    <div>
         {/* OrignalURl */}
         <div className='p-4 bg-gray-100 m-4 text-gray-500 text-sm mb-4 rounded-2xl'>
          <h1>
            Original URL
          </h1>
            <div className='flex justify-between'>
                <p className='flex-[0.5] text-black mt-3'> {getdataperurl.originalUrl} </p>
                <div className='flex gap-2 items-center'>
                  <div className='bg-white p-2 border-1 border-gray-200 rounded-md duration-200 hover:bg-gray-200'>
                    <Copy  size={16} color='#000' strokeWidth={2}/>
                  </div>
                  <div className='bg-white p-2 border-1 border-gray-200 rounded-md duration-200 hover:bg-gray-200'>
                    <ExternalLink size={16} color='#000'  />
                  </div>
                  

                </div>
            </div>
         </div>
        {/* shortUrl */}

        <div className='p-4 bg-gray-200 m-4 text-gray-500 text-sm mb-4 rounded-2xl '>
          <h1>
            Short URL
          </h1>
            <div className='flex justify-between '>
                <p className='flex-[0.5] text-black mt-3 bg-gray-50 p-2 text-base font-semibold'> {getdataperurl.shortUrl} </p>
                <div className='flex gap-2 items-center'>
                  <div className='bg-white p-2 border-1 border-gray-200 rounded-md duration-200 hover:bg-gray-200'>
                    <Copy  size={16} color='#000' strokeWidth={2}/>
                  </div>
                  <div className='bg-white p-2 border-1 border-gray-200 rounded-md duration-200 hover:bg-gray-200'>
                    <ExternalLink size={16} color='#000'  />
                  </div>
                  

                </div>
            </div>
         </div>
              
    </div>
    
   </div>

  <div className='grid grid-cols-3 md:grid-cols-3 gap-6 mb-10 mx-10'>
    <div className="p-4 bg-white rounded-xl border border-gray-200 flex items-center justify-between">
      <div className="text-left">
        <p className="text-gray-500 text-sm">Total Clicks</p>
        <p className="text-3xl font-semibold">{getdataperurl.totalClicks}</p>
      </div>
      <div>
      <MousePointer size={32} strokeWidth={1.7}  />
      </div>
    </div>

    <div className="p-4 bg-white rounded-xl border border-gray-200 flex items-center justify-between">
      <div className="text-left">
        <p className="text-gray-500 text-sm">Unique Referrers</p>
        <p className="text-3xl font-semibold">{getdataperurl.clicks.length}</p>
      </div>
      <div>
      <Paperclip size={32} strokeWidth={1.7} />
      </div>
    </div>

    

    <div className="p-4 bg-white rounded-xl border border-gray-200 flex items-center justify-between">
      <div className="text-left">
        <p className="text-gray-500 text-sm">Days Active</p>
        <p className="text-3xl font-semibold">
          {(() => {
            const createdAt = Array.isArray(initialData)
              ? initialData.find(item => item.shortcode === shortcode)?.createdAt
              : null;

            if (!createdAt) return "N/A";

            const createdDate = new Date(createdAt);
            const today = new Date();
            const diffTime = today - createdDate;
            const daysDifference = Math.floor(diffTime / (1000 * 60 * 60 * 24));

            return daysDifference;
          })()}
        </p>
      </div>
      <div>
        <CalendarCheck2 size={32} strokeWidth={1.7} />
      </div>
    </div>

  </div>

  <div className='border-1 border-gray-200 m-10 pt-4 pb-10 px-4 shadow-sm rounded-xl'>
    <div>
      <h1 className='text-gray-700'> Recent Clicks</h1>
    </div>
    <div>
      {getdataperurl.clicks && getdataperurl.clicks.length > 0 ? (
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white  border-gray-200 rounded-lg border-0 ">
          <thead>
            <tr className="bg-white">
              <th className="py-2 px-4 text-left border-b border-gray-200 font-medium">Timestamp</th>
              <th className="py-2 px-4 text-left border-b border-gray-200 font-medium">IP Address</th>
            </tr>
          </thead>
          <tbody>
            {getdataperurl.clicks.map((click, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b border-gray-300">
                  {new Date(click.createdAt).toLocaleString()}
                </td>
                <td className="py-2 px-4 border-b border-gray-300">{click.ipAddress}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    ) : (
      <p className="text-gray-500">No click data found.</p>
    )}
    </div>

  </div>

   </>
  );
}

export default Data;