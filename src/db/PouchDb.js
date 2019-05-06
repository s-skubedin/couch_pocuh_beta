// import PouchDB from  'pouchdb-browser';
// export const localDB = new PouchDB('news_pouchDB');
// export const remoteDB = new PouchDB('http://localhost:5984/news');


// export const getAllNews = () => {
//   const news = [];
//     return localDB.allDocs({
//     include_docs: true
//   }).then(response => {
//     console.log(response.rows);
//     for (let i = 0; i < response.rows.length; i++)
//       news.push(response.rows[i].doc)
//     return news;
//   }).catch(err => console.log(err))
// }
//
// export const saveNews = item => {
//   return  localDB.post({
//     _id: `${Math.round(Math.random() * 10000000)}${Date.now()}`,
//     item,
//     created: Date.now()
//   })
//     .then(response => console.log(response))
//     .catch(err => console.log(err))
// }
//
// export const updateNews = (id, newItem) => {
//   localDB.get(id)
//     .then(doc =>
//       localDB.put({
//         _id: id,
//         _rev: doc._rev,
//         item: newItem
//       }))
//     .then(response => {
//     })
//     .catch(err => {
//     })
// }
//
// export const deleteNews = id => {
//   return localDB.get(id)
//     .then(doc => localDB.remove(doc))
//     .then(response => {})
//     .then(error => {console.log(error)})
// };