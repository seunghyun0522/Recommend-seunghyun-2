// document
//   .getElementById("analyzeButton")
//   .addEventListener("click", analyzeButtonHandler);

// function analyzeButtonHandler() {
//   chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
//     const currentTab = tabs[0];
//     submitNumber = document.getElementById("submitNumber").value;
//     const onUpdatedCallback = function (tabId, info) {
//       if (info.status === "complete") {
//         chrome.tabs.onUpdated.removeListener(onUpdatedCallback);
//         executeScriptOnTab(
//           currentTab.id,
//           scrapeTargetData,
//           handleScriptResults
//         );
//       }
//     };
//     chrome.tabs.onUpdated.addListener(onUpdatedCallback);

//     const targetURL = "https://www.acmicpc.net/source/" + submitNumber;
//     if (currentTab.url !== targetURL) {
//       chrome.tabs.update({ url: targetURL });
//     } else {
//       executeScriptOnTab(currentTab.id, scrapeTargetData, handleScriptResults);
//     }
//   });
// }

// function executeScriptOnTab(tabId, scriptFunction, callback) {
//   chrome.scripting.executeScript(
//     {
//       target: { tabId: tabId },
//       func: scriptFunction,
//     },
//     callback
//   );
// }

// function scrapeTargetData() {
//   //코드
//   let lines = document.querySelector("body").innerText.split("\n");
//   let codeLines = [];

//   let startIdx = 0;
//   for (let i = 0; i < lines.length; i++) {
//     if (lines[i].startsWith("1")) {
//       startIdx = i + 1;
//       break;
//     }
//   }

//   let endIdx = 0;
//   for (let i = startIdx + 1; i < lines.length; i++) {
//     if (lines[i].startsWith("복사다운로드")) {
//       endIdx = i - 1;
//       break;
//     }
//     if (lines[i].startsWith("소스 코드 공개")) {
//       endIdx = i - 1;
//       break;
//     }
//   }

//   for (let i = startIdx; i <= endIdx; i += 2) {
//     codeLines.push(lines[i]);
//   }

//   //접근할 수 없는 코드의 경우
//   if (codeLines.length == 0) {
//     return "접근할 수 없는 제출 번호입니다.";
//   }

//   //접근할 수 있는 코드의 경우
//   else {
//     let targetData = [];
//     targetData.push(codeLines.join("\n"));
//     targetData.push(document.querySelector("tbody").innerText.split("\t")[2]);

//     //맞았습니다!!
//     const submitResult = document
//       .querySelector("tbody")
//       .innerText.split("\t")[4];
//     if (submitResult == "맞았습니다!!") {
//       targetData.push(document.querySelector("tbody").innerText.split("\t")[5]);
//       targetData.push(document.querySelector("tbody").innerText.split("\t")[6]);
//       targetData.push(document.querySelector("tbody").innerText.split("\t")[7]);
//     }

//     return targetData.join("\t");
//   }
// }

// function handleScriptResults(results) {
//   if (chrome.runtime.lastError) {
//     console.error(chrome.runtime.lastError);
//     return;
//   }

//   if (results && results[0]) {
//     let targetData = results[0].result.split("\t");

//     if (targetData.length == 5) {
//       //맞았습니다!!
//       const requestData = {
//         number: targetData[1],
//         time: targetData[3],
//         memory: targetData[2],
//         language: targetData[4],
//         code: targetData[0],
//       };

//       fetch("http://localhost:8080/analysis", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(requestData),
//       })
//         .then((response) => {
//           return response.json();
//         })
//         .then((data) => {
//           showResponse(data.data);
//         });
//     } else {
//       //그 와
//       const requestData = {
//         number: targetData[1],
//         code: targetData[0],
//       };

//       fetch("http://localhost:8080/analysis2", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(requestData),
//       })
//         .then((response) => {
//           console.log("위위쪽" + response);
//           return response.json();
//         })
//         .then((data) => {
//           console.log("위쪽" + data);
//           showHint(data.data); //힌트 api response 보고 수정해줘야 함
//         });
//     }
//   }
// }

// function handleScriptResults2(results) {
//   console.log(results[0]);

//   if (result) {
//     console.log("code");
//   } else {
//     console.log("hint");
//   }
// }

// function showHint(data) {
//   console.log(data);
//   document.getElementById("hint").innerText = data.contents;
// }

const data = {
  bigO: "O(NlogN)",
  spaceComplexDegree: " O(N)",
  whatAlgo: " Sorting",
  compareOtherBigOCode:
    "\"#include <iostream>\n#include <list>\n#include <vector>\n#include <algorithm>\n#include <string>\n#include <cstring>\nusing namespace std;\n\nstruct Student {\n\tchar name[11];\n\tint kor, eng, math;\n\n\tconst bool operator<(const Student& a) const {\n\t\tif (kor != a.kor) return kor > a.kor;\n\t\tif (eng != a.eng) return eng < a.eng;\n\t\tif (math != a.math) return math > a.math;\n\t\treturn strcmp(name, a.name) < 0;\n\t\t// string 에서는 compare 사용 string1.compare(string2)\n\t}\n};\n\nint main() {\n\tstd::cin.tie(nullptr)->sync_with_stdio(false);\n\tint N, x, y;\n\tcin >> N;\n\tStudent *stu = new Student[N];\n\tfor (int i = 0; i < N; i++) {\n\t\tcin >> stu[i].name >> stu[i].kor >> stu[i].eng >> stu[i].math;\n\t}\n\tstring ans;\n\tans.reserve(N * 11);\n\tstd::sort(stu, stu + N);\n\tfor (int i = 0; i < N; i++) {\n\t\tans.append(stu[i].name);\n\t\tans.push_back('\\n');\n\t}\n\tstd::cout << ans;\n\tdelete[] stu;\n\treturn 0;\n}\"",
  compareOtherBigO:
    "이전 코드의 시간 복잡도는 O(NlogN)이고, 새로운 코드의 시간 복잡도도 O(NlogN)입니다. 하지만, 새로운 코드는 문자열을 사용하여 메모리를 더 사용하고, string 객체를 생성하여 추가적인 메모리를 할당합니다. 따라서, 새로운 코드의 공간 복잡도는 O(N)입니다.",
  compareOtherSpaceComplexDegreeCode:
    "\"#include <iostream>\n#include <list>\n#include <vector>\n#include <algorithm>\n#include <string>\n#include <cstring>\nusing namespace std;\n\nstruct Student {\n\tchar name[11];\n\tint kor, eng, math;\n\n\tconst bool operator<(const Student& a) const {\n\t\tif (kor != a.kor) return kor > a.kor;\n\t\tif (eng != a.eng) return eng < a.eng;\n\t\tif (math != a.math) return math > a.math;\n\t\treturn strcmp(name, a.name) < 0;\n\t\t// string 에서는 compare 사용 string1.compare(string2)\n\t}\n};\n\nint main() {\n\tstd::cin.tie(nullptr)->sync_with_stdio(false);\n\tint N, x, y;\n\tcin >> N;\n\tStudent *stu = new Student[N];\n\tfor (int i = 0; i < N; i++) {\n\t\tcin >> stu[i].name >> stu[i].kor >> stu[i].eng >> stu[i].math;\n\t}\n\tstring ans;\n\tans.reserve(N * 11);\n\tstd::sort(stu, stu + N);\n\tfor (int i = 0; i < N; i++) {\n\t\tans.append(stu[i].name);\n\t\tans.push_back('\\n');\n\t}\n\tstd::cout << ans;\n\tdelete[] stu;\n\treturn 0;\n}\"",
  compareOtherSpaceComplexDegree:
    '이전 코드와 이후 코드를 항목 수로 비교하여 공간 복잡도를 설명하면 다음과 같습니다:\n\n이전 코드:\n- Vector "v": N개의 구조체(STU)를 저장하기 위해 사용됩니다.\n- String "name": 각 STU 구조체에 저장된 학생 이름을 저장하기 위해 사용됩니다.\n\n이후 코드:\n- 배열 "stu": N개의 구조체(Student)를 저장하기 위해 동적으로 할당됩니다.\n- String "ans": 정렬된 학생 이름을 저장하기 위해 사용되며, 최대 N * 11개의 문자를 저장할 수 있는 공간을 미리 예약합니다.\n\n따라서, 이전 코드와 비교하여 이후 코드는 구조체 배열을 동적으로 할당하고, 문자열을 예약된 크기로 사용하기 때문에 더 많은 공간을 사용합니다.',
};

document.getElementById("analyzeButton").addEventListener("click", function () {
  // 버튼 클릭 시 loader 표시
  document.querySelector(".loader").style.display = "block";

  // 3초 후에 showResponse 함수 호출
  setTimeout(showResponse, 3000);
});
function showResponse() {
  document.querySelector(".loader").style.display = "none";

  const showMoreButton1 = document.getElementById("showMoreButton1");
  const codeSections1 = document.querySelectorAll(".code-section1");
  showMoreButton1.innerText = "see more";
  showMoreButton1.style.marginLeft = "20px";
  showMoreButton1.style.fontSize = "10px";
  showMoreButton1.style.border = "1px solid var(--border-color)";
  showMoreButton1.style.padding = "8px";
  showMoreButton1.style.borderRadius = "15px";
  showMoreButton1.style.boxShadow = "0px 4px 4px 0px rgba(0, 0, 0, 0.25)";
  showMoreButton1.style.cursor = "pointer";

  showMoreButton1.addEventListener("click", function () {
    codeSections1.forEach((section) => section.classList.toggle("show-more"));
  });
  // 버튼 생성
  const showMoreButton2 = document.getElementById("showMoreButton2");
  const codeSections2 = document.querySelectorAll(".code-section2");
  showMoreButton2.innerText = "see more";
  showMoreButton2.style.marginLeft = "30px";
  showMoreButton2.style.fontSize = "10px";
  showMoreButton2.style.border = "1px solid var(--border-color)";
  showMoreButton2.style.padding = "8px";
  showMoreButton2.style.borderRadius = "15px";
  showMoreButton2.style.boxShadow = "0px 4px 4px 0px rgba(0, 0, 0, 0.25)";
  showMoreButton2.style.cursor = "pointer";
  showMoreButton2.addEventListener("click", function () {
    codeSections2.forEach((section) => section.classList.toggle("show-more"));
  });
  const createLabelDiv = (text) => {
    const labelDiv = document.createElement("div");
    labelDiv.innerText = text;
    labelDiv.style.marginBottom = "5px"; // Add margin-bottom to the div
    labelDiv.style.display = "flex"; // Set display to flex for horizontal layout
    labelDiv.style.justifyContent = "space-between"; // Arrange content with space-between
    labelDiv.style.alignItems = "center"; // Center align items vertically
    return labelDiv;
  };

  // Insert labels before the content set by innerText
  const timeComplexityDiv = document.getElementById("timeComplexity");
  const spanTimeComplexity = createLabelDiv("Time");
  timeComplexityDiv.parentNode.insertBefore(
    spanTimeComplexity,
    timeComplexityDiv
  );

  const spaceComplexityDiv = document.getElementById("spaceComplexity");
  const spanSpaceComplexity = createLabelDiv("Space");
  spaceComplexityDiv.parentNode.insertBefore(
    spanSpaceComplexity,
    spaceComplexityDiv
  );

  const algorithmDiv = document.getElementById("algorithm");
  const spanAlgorithm = createLabelDiv("Algorithm");
  algorithmDiv.parentNode.insertBefore(spanAlgorithm, algorithmDiv);

  // Set text content using innerText
  document.getElementById("timeComplexity").innerText = data.bigO;
  document.getElementById("spaceComplexity").innerText =
    data.spaceComplexDegree;
  document.getElementById("algorithm").innerText = data.whatAlgo;

  // Apply styles to the div elements (timeComplexity, spaceComplexity, algorithm)
  [timeComplexityDiv, spaceComplexityDiv, algorithmDiv].forEach((div) => {
    div.style.width = "50px"; // Set a fixed width
    div.style.height = "50px"; // Set a fixed height
    div.style.border = "1px solid #ccc";
    div.style.display = "flex";

    div.style.justifyContent = "center";
    div.style.alignItems = "center";
    div.style.padding = "10px";
    div.style.fontSize = "10px";
    div.style.borderRadius = "15px";
    div.style.textAlign = "center";
    div.style.marginBottom = "15px";
    div.style.boxShadow = "0px 4px 4px 0px rgba(0, 0, 0, 0.25)";
  });

  // Add class to the parent container
  document.getElementById("peronsalAnalyze").classList.add("styled-text");

  // Set text and add class for other elements
  document.getElementById("bestTimeComplexityTitle").innerText =
    "bestTimeComplexity";
  document.getElementById("bestTimeComplexityCode").innerText =
    data.compareOtherBigOCode;
  document.getElementById("bestTimeComplexityWords").innerText =
    data.compareOtherBigO;
  document.getElementById("bestTimeComplexity").classList.add("styled-text");
  document.getElementById("bestSpaceComplexityTitle").innerText =
    "bestSpaceComplexity";
  document.getElementById("bestSpaceComplexityCode").innerText =
    data.compareOtherBigOCode;
  document.getElementById("bestSpaceComplexityWords").innerText =
    data.compareOtherSpaceComplexDegree;

  document.getElementById("bestSpaceComplexity").classList.add("styled-text");
}
