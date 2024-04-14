// import React, { useState } from 'react';
// import axios from 'axios';
// import routes from '../routes';

// const Context = React.createContext();

// const ApiProvider = ({ children }) => {
//   const createChannel = async (channel) => {
//     const res = await axios.post(routes.channelsPath(), channel, { headers: getAuthHeader() });
//     return res.data;
//   };

//   return (
//     <Context.Provider value={{ createChannel }}>
//       {children}
//     </Context.Provider>
//   );
// };

// export default ApiProvider;
