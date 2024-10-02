// import React, { useState } from "react";
// import axios from "axios"; // Asegurate de tener axios instalado
// import {clientId} from '../keys/keys.js'
// function ImageUploader() {
//   const [file, setFile] = useState();
//     const onFileChange = (event) => {
//         // Updating the state
//         setFile({ file: event.target.files[0] });
//     };
//     const onFileUpload = async () => {
//         // Client ID
//             const auth = "Client-ID " + clientId;
 
//         // Creating an object of formData
//         const formData = new FormData();
 
//         // Adding our image to formData
//         formData.append("file", file);
//         const result =  await fetch("https://api.imgur.com/3/image/", {
//           // API Endpoint
//           method: "POST", // HTTP Method
//           body: formData, // Data to be sent
//           headers: {
//               // Setting header
//               Authorization: auth,
//               Accept: "application/json",
//           },
//       }).then(
//             (res) =>
//               console.log(res.json())  
//           )
//           .catch(
//               (err) => alert("Failed") && console.log(err)
//           );
//       const data = await result.json()
//       console.log(data);
//     };
//     return (
//         <>
//             <input
//                 name="file"
//                 type="file"
//                 onChange={onFileChange}
//             />
//             <button onClick={onFileUpload}>Upload</button>
//         </>
//     );
// }

// export default ImageUploader;
import React, { useState } from "react";
//import { clientId } from '../keys/keys.js';

function ImageUploader() {
  const [file, setFile] = useState(null);
  const [responseJson, setResponseJson] = useState(null); // Para almacenar la respuesta

  const onFileChange = (event) => {
      setFile(event.target.files[0]);
  };

  const onFileUpload = async () => {
      if (!file) {
          alert("Please select a file first");
          return;
      }

      try {
          const auth = "Client-ID " + clientId;
          const formData = new FormData();
          formData.append("image", file); // El campo correcto para la API de Imgur

          const response = await fetch("https://api.imgur.com/3/image/", {
              method: "POST",
              body: formData,
              headers: {
                  Authorization: auth,
                  Accept: "application/json",
              },
          });

          const data = await response.json();
          setResponseJson(data); // Almacena el JSON en el estado
          console.log(data); // También lo muestra en la consola

      } catch (err) {
          alert("Failed to upload image");
          console.log(err);
      }
  };

  return (
      <>
          <input
              name="file"
              type="file"
              onChange={onFileChange}
          />
          <button onClick={onFileUpload}>Upload</button>

          {/* Mostrar el JSON de la respuesta si existe */}
          {responseJson && (
              <pre>
                  {JSON.stringify(responseJson, null, 2)}
              </pre>
          )}
      </>
  );
}

export default ImageUploader;
