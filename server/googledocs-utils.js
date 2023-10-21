const { google } = require("googleapis");

export function copyDoc(auth, docID, newTitle) {
  const request = {
    name: newTitle
  };

  const drive = google.drive({ version: "v3", auth });

  const promise = new Promise((resolve, reject) => {
    drive.files.copy(
      {
        fileId: docID,
        resource: request
      },
      (err, res) => {
        if (err) {
          console.log(err);
          reject(err);
          return;
        }

        // console.log(res);
        resolve(res.data.id);
      }
    );
  });

  return promise;
}

export function getDoc(auth, doc) {
  const docs = google.docs({ version: "v1", auth });

  const promise = new Promise((resolve, reject) => {
    docs.documents.get(
      {
        documentId: doc
      },
      (err, res) => {
        if (err) {
          reject(err);
          console.log("The API returned an error: " + err);
          return;
        }
        resolve(res);
      }
    );
  });
  return promise;
}

export function updateDoc(auth, doc, requests) {
  const docs = google.docs({ version: "v1", auth });

  const promise = new Promise((resolve, reject) => {
    docs.documents.batchUpdate(
      {
        documentId: doc,
        resource: {
          requests
        }
      },
      (err, data) => {
        if (err) {
          reject(err);
          return console.log("The API returned an error: " + err);
        }
        resolve(data);
      }
    );
  });
  return promise;
}

export function deleteFile(auth, idDoc) {
  const promise = new Promise((resolve, reject) => {
    const drive = google.drive({ version: "v3", auth });
    drive.files.delete(
      {
        fileId: idDoc
      },
      (err, res) => {
        if (err) {
          console.log(err);
          reject(err);
          return;
        }

        resolve(res);
      }
    );
  });
  return promise;
}

export function downloadFile(auth, idDoc, mimeType) {
  const promise = new Promise((resolve, reject) => {
    const drive = google.drive({ version: "v3", auth });
    drive.files.export(
      {
        fileId: idDoc,
        mimeType: mimeType
      },
      { responseType: "arraybuffer" },
      function(err, response) {
        if (err) {
          console.log(err);
          reject(err);
          return;
        }

        resolve(response);
      }
    );
  });
  return promise;
}
