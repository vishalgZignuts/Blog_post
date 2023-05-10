// // Data Fetching

// // 1. Server Side Rendering (SSR)
// // 2. Static Site Generation (SSG)
// // 3. Incremental Static Generation (ISR)


// async function Page({params}) {
//     const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${params.id}`,
//     //1. {cache: 'no-store'}  //SSR
//     //2. normal SSG
//     //3. {next: { revalidate: 10 }}  //combine the benefits of SSR & SSG together in 'ISR'
//     //In ISR data will be cached but it will done specific time intervals
//     );


//     const data = await res.json();
// }