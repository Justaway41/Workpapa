import {
  placeholdersJob,
  placeholdersContact,
  placeholdersEducation
} from "./constants";
const util = require("util");
const fs = require("fs");
import {
  getDoc,
  updateDoc,
  copyDoc,
  downloadFile,
  deleteFile
} from "./googledocs-utils";
import { templates } from "./resume-templates";
import { authorize } from "./googledocs-api";

function htmlToDocText(text) {
  text = text.replace(/<[^>]*>/g, "");
  let instances = 0;
  for (let i = 0; i < text.length - 1; i++) {
    if (text.substring(0, i + 1) === "\n") {
      instances++;
    } else {
      break;
    }
  }
  text = text.substring(instances, text.length);

  instances = 0;
  for (let i = text.length; i > 0; i--) {
    if (text.substring(i - 1, i) === "\n") {
      instances++;
    } else {
      break;
    }
  }
  text = text.substring(0, text.length - instances);
  return text;
}

function configureRequests(resumeData) {
  // console.log(resumeData);
  let requests = getContactRequests(resumeData.contact);
  requests = requests.concat(getExperienceRequests(resumeData.experience));
  requests = requests.concat(getEducationRequests(resumeData.education));
  requests.push({
    replaceAllText: {
      containsText: {
        text: "{{summary}}",
        matchCase: true
      },
      replaceText: htmlToDocText(resumeData.summary)
    }
  });

  return requests;
}

function getContactRequests(contact) {
  let requests = [];
  for (const r of placeholdersContact) {
    requests.push({
      replaceAllText: {
        containsText: {
          text: `{{${r.placeholder}}}`,
          matchCase: true
        },
        replaceText: contact[r.field]
      }
    });
  }
  return requests;
}

function getExperienceRequests(experience) {
  let requests = [];
  for (let i = 0; i < experience.length; i++) {
    const e = experience[i];
    for (const r of placeholdersJob) {
      let text = e[r.field];
      if (r.field === "responsibilities") {
        text = htmlToDocText(e[r.field]);
      }
      requests.push({
        replaceAllText: {
          containsText: {
            text: `{{${r.placeholder}${i}}}`,
            matchCase: true
          },
          replaceText: text
        }
      });
    }
  }

  return requests;
}

function getEducationRequests(education) {
  let requests = [];
  for (let i = 0; i < education.length; i++) {
    const e = education[i];
    for (const r of placeholdersEducation) {
      requests.push({
        replaceAllText: {
          containsText: {
            text: `{{${r.placeholder}${i}}}`,
            matchCase: true
          },
          replaceText: e[r.field]
        }
      });
    }
  }

  return requests;
}

function setup1(content, experiences) {
  const { start, end } = getTagData(content, "exp", true);

  const exp = content.slice(start, end + 1);

  let requests = [];

  let lastIndex = exp[exp.length - 1].endIndex;

  for (let i = 1; i < experiences.length; i++) {
    for (let j = 1; j < exp.length - 1; j++) {
      const e = exp[j];
      // logNested(e);

      for (const p of e.paragraph.elements) {
        const diff = p.endIndex - p.startIndex;
        requests.push({
          insertText: {
            text: p.textRun.content.replace(/\d/g, i),
            location: {
              index: lastIndex
            }
          }
        });

        if (p.textRun.textStyle) {
          requests.push({
            updateTextStyle: {
              textStyle: p.textRun.textStyle,
              fields: "*",
              range: {
                startIndex: lastIndex,
                endIndex: lastIndex + diff
              }
            }
          });
        }

        if (e.paragraph.bullet) {
          requests.push({
            createParagraphBullets: {
              range: {
                startIndex: lastIndex,
                endIndex: lastIndex + diff
              },
              bulletPreset: "BULLET_DISC_CIRCLE_SQUARE"
            }
          });

          requests.push({
            deleteParagraphBullets: {
              range: {
                startIndex: lastIndex + diff,
                endIndex: lastIndex + diff
              }
            }
          });

          if (e.paragraph.paragraphStyle) {
            requests.push({
              updateParagraphStyle: {
                paragraphStyle: e.paragraph.paragraphStyle,
                fields: "*",
                range: {
                  startIndex: lastIndex,
                  endIndex: lastIndex + diff
                }
              }
            });
          }
        }

        lastIndex = lastIndex + diff;
      }
    }
  }
  //   console.log(util.inspect(requests, { showHidden: false, depth: null }));

  return requests;
}

function setup2(content, educations) {
  const { start, end } = getTagData(content, "education", true);

  const exp = content.slice(start, end + 1);
  let requests = [];

  let lastIndex = exp[exp.length - 1].endIndex;

  for (let i = 1; i < educations.length; i++) {
    for (let j = 1; j < exp.length - 1; j++) {
      const e = exp[j];
      for (const p of e.paragraph.elements) {
        const diff = p.endIndex - p.startIndex;
        requests.push({
          insertText: {
            text: p.textRun.content.replace(/\d/g, i),
            location: {
              index: lastIndex
            }
          }
        });

        if (p.textRun.textStyle) {
          requests.push({
            updateTextStyle: {
              textStyle: p.textRun.textStyle,
              fields: "*",
              range: {
                startIndex: lastIndex,
                endIndex: lastIndex + diff
              }
            }
          });
        }

        lastIndex = lastIndex + diff;
      }
    }
  }

  //   console.log(util.inspect(requests, { showHidden: false, depth: null }));

  return requests;
}

function getTagData(content, tag, getIndex) {
  let start;
  let end;
  if (getIndex) {
    start = content.findIndex(
      c =>
        c.paragraph &&
        c.paragraph.elements.find(
          r => r.textRun && r.textRun.content.includes(`{{${tag}}}`)
        )
    );
    end = content.findIndex(
      c =>
        c.paragraph &&
        c.paragraph.elements.find(
          r => r.textRun && r.textRun.content.includes(`{{/${tag}}}`)
        )
    );
  } else {
    start = content.find(
      c =>
        c.paragraph &&
        c.paragraph.elements.find(
          r => r.textRun && r.textRun.content.includes(`{{${tag}}}`)
        )
    );
    end = content.find(
      c =>
        c.paragraph &&
        c.paragraph.elements.find(
          r => r.textRun && r.textRun.content.includes(`{{/${tag}}}`)
        )
    );
  }

  return {
    start: start,
    end: end
  };
}

function getCleanupRequests(content, tags) {
  let requests = [];
  for (const t of tags) {
    const { start, end } = getTagData(content, t);

    requests.push({
      deleteContentRange: {
        range: {
          startIndex: end.startIndex,
          endIndex: end.endIndex
        }
      }
    });

    requests.push({
      deleteContentRange: {
        range: {
          startIndex: start.startIndex,
          endIndex: start.endIndex
        }
      }
    });
  }

  return requests;
}

export function postResume(resumeData, callback) {
  const template = templates.find(t => t.id === resumeData.template.id);
  if (!template) {
    console.log("no template return");
    callback("Unable to find template", null);
    return;
  }

  // Load client secrets from a local file.
  fs.readFile("credentials.json", (err, content) => {
    if (err) {
      callback("Server error", null);
      console.log("Error loading client secret file:", err);
      return;
    }
    // Authorize a client with credentials, then call the Google Docs API.
    authorize(JSON.parse(content), async auth => {
      try {
        const idDoc = await createNewDoc(
          auth,
          template.idGoogleDoc,
          resumeData
        );
        callback(null, idDoc);
      } catch (error) {
        callback("Unable to create doc", null);
      }
    });
  });
}

async function createNewDoc(auth, idDoc, resumeData) {
  try {
    idDoc = await copyDoc(
      auth,
      idDoc,
      `${resumeData.contact.firstname}${resumeData.contact.lastname}Resume`
    );
    let res = await getDoc(auth, idDoc);

    let requests = setup2(res.data.body.content, resumeData.education);
    requests = requests.concat(
      setup1(res.data.body.content, resumeData.experience)
    );
    // logNested(requests);

    if (requests.length > 0) {
      await updateDoc(auth, idDoc, requests);
    }

    res = await getDoc(auth, idDoc);

    requests = getCleanupRequests(res.data.body.content, ["education", "exp"]);
    await updateDoc(auth, idDoc, requests);

    requests = configureRequests(resumeData);
    // logNested(requests);
    await updateDoc(auth, idDoc, requests);

    return idDoc;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

function logNested(data) {
  console.log(util.inspect(data, { showHidden: false, depth: null }));
}

export async function streamFile(auth, idDoc, res, fileName, fileType) {
  let mimeType;
  switch (fileType) {
    case 'docx':
      mimeType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
      break;
    case 'pdf':
      mimeType = 'application/pdf';
      break;
    default:
      res.status(400).send('Unsupported file type');
      break;
  }

  let response;
  try {
    response = await downloadFile(auth, idDoc, mimeType);
  } catch (error) {
    res.status(400).send(error);
    return;
  }

  // res.setHeader(
  //   "Content-Type",
  //   mimeType
  // );
  // res.setHeader("Content-Disposition", `attachment; filename=${fileName}.${fileType}`);

  // console.log(response.data);
  res.send(Buffer.from(response.data).toString("base64"));

  deleteFile(auth, idDoc);
}
