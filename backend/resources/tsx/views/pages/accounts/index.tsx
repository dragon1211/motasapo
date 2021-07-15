import React from 'react';
import ReactDOM from 'react-dom';
import GlobalNav from '../../layout/GlobalNav';

const Account = () => {
	return (
        <GlobalNav />
	)
}
if(document.getElementById('account')){
	ReactDOM.render(
		<Account />,
		document.getElementById('account')
	)
	
}


if(document.getElementById('account')){

	ReactDOM.render(
		<GlobalNav />,
		document.getElementById('account')
		)
	}

// import React from 'react';
// import ReactDOM from 'react-dom';
// import { QueryClient, QueryClientProvider } from 'react-query';
// import GlobalNav from '../../layout/GlobalNav';

// const Account = () => {

//     const queryClient = new QueryClient({
//         defaultOptions: {
//             queries: {
//                 retry: false
//             },
//             mutations: {
//                 retry: false
//             }
//         }
//     })
// 	return (
//         <>
//             {/* <GlovalNav /> */}
//             <QueryClientProvider client={queryClient}>
//                 <GlobalNav />
//             </QueryClientProvider>
//         </>
// 	)
// }

// ReactDOM.render(
// 	<Account />,
// 	document.getElementById('account')
// )
