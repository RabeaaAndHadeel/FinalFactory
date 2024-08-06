// import React from 'react'

// export default function Client(formData,setFormData) {
//   return (
//     <div className="form-container">
//        <div className="form-group">
//             <label htmlFor='id'> הכניס ת.ז לקוח :</label>
//             <input 
//               type="text" 
//               id="id" 
//               placeholder="Enter your id" autoComplete="off" 
//               value={formData.id}
//               onChange={(e)=>{
//                 setFormData({...formData,id:e.target.value})
//               }}
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor='name'> הכניס שם לקוח: </label>
//             <input 
//               type="text" 
//               id="name" 
//               placeholder="Enter your name" autoComplete="off" 
//               value={formData.name}
//               onChange={(e)=>{
//                 setFormData({...formData,name:e.target.value})
//               }}
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor='family'> הכניס שם משפחה:</label>
//             <input 
//               type="text" 
//               id="family" 
//               placeholder="Enter your family" autoComplete="off" 
//               value={formData.family}
//                onChange={(e)=>{
//                 setFormData({...formData,family:e.target.value})
//               }}
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor='address'> הכניס כתובת:</label>
//             <input 
//               type="text" 
//               id="address" 
//               placeholder="Enter your address" autoComplete="off" 
//               value={formData.address}
//                onChange={(e)=>{
//                 setFormData({...formData,address:e.target.value})
//               }}
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor='phone'> הכניס מספר טלפון:</label>
//             <input 
//               type="text" 
//               id="phone" 
//               placeholder="Enter your phone" autoComplete="off" 
//               value={formData.phone}
//                onChange={(e)=>{
//                 setFormData({...formData,phone:e.target.value})
//               }}
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor='email'> הכניס מייל:</label>
//             <input 
//               type="text" 
//               id="email" 
//               placeholder="Enter your email" autoComplete="off" 
//               value={formData.email}
//                onChange={(e)=>{
//                 setFormData({...formData,email:e.target.value})
//               }}
//             />
//           </div>
//     </div>
//   )
// }
import React from 'react';

export default function Client({ formData, setFormData }) {
  return (
    <div className="form-container">
      <div className="form-group">
        <label htmlFor='id'> הכניס ת.ז לקוח :</label>
        <input 
          type="text" 
          id="id" 
          placeholder="Enter your id" autoComplete="off" 
          value={formData.id}
          onChange={(e) => setFormData({ ...formData, id: e.target.value })}
        />
      </div>
      <div className="form-group">
        <label htmlFor='name'> הכניס שם לקוח: </label>
        <input 
          type="text" 
          id="name" 
          placeholder="Enter your name" autoComplete="off" 
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
      </div>
      <div className="form-group">
        <label htmlFor='family'> הכניס שם משפחה:</label>
        <input 
          type="text" 
          id="family" 
          placeholder="Enter your family" autoComplete="off" 
          value={formData.family}
          onChange={(e) => setFormData({ ...formData, family: e.target.value })}
        />
      </div>
      <div className="form-group">
        <label htmlFor='address'> הכניס כתובת:</label>
        <input 
          type="text" 
          id="address" 
          placeholder="Enter your address" autoComplete="off" 
          value={formData.address}
          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
        />
      </div>
      <div className="form-group">
        <label htmlFor='phone'> הכניס מספר טלפון:</label>
        <input 
          type="text" 
          id="phone" 
          placeholder="Enter your phone" autoComplete="off" 
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        />
      </div>
      <div className="form-group">
        <label htmlFor='email'> הכניס מייל:</label>
        <input 
          type="text" 
          id="email" 
          placeholder="Enter your email" autoComplete="off" 
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
      </div>
    </div>
  );
}
