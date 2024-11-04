import React, { useState } from "react";

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
