// const url = "http://localhost:8080/problem?id=wwqw58";
// fetch(url)
//   .then((response) => {
//     return response.json();
//   })
//   .then((data) => {
//     const apiData = data.data;
//     const tableBody = document.getElementById("dataBody");

//     apiData.forEach((item) => {
//       const row = createRow(item);
//       tableBody.appendChild(row);
//     });
//   })
//   .catch((error) => {
//     console.error("Error fetching data:", error);
//   });

function tableSetting(array) {
  let data1 = {
    data1: [
      {
        number: 9206,
        name: "나무 말고 꽃",
        tier: 19,
        algorithm: "['미적분학', '수학', '수치해석']",
        time_condition: 1,
        memory_condition: 128,
        submission_count: 1204,
        answer_submission_count: 204,
        answered_people_count: 79,
        correct_rate: 11.809,
        avg_try: 8.47,
      },
      {
        number: 27740,
        name: "시프트 연산",
        tier: 12,
        algorithm: "['브루트포스 알고리즘', '해 구성하기', '그리디 알고리즘']",
        time_condition: 2,
        memory_condition: 512,
        submission_count: 783,
        answer_submission_count: 168,
        answered_people_count: 129,
        correct_rate: 27.273,
        avg_try: 3.67,
      },
      {
        number: 1166,
        name: "선물",
        tier: 8,
        algorithm: "['이분 탐색']",
        time_condition: 2,
        memory_condition: 128,
        submission_count: 5570,
        answer_submission_count: 1307,
        answered_people_count: 841,
        correct_rate: 20.786,
        avg_try: 4.81,
      },
    ],
  };
  const tierDict = {
    6: "Silver5",
    7: "Silver4",
    8: "Silver3",
    9: "Silver2",
    10: "Silver1",
    11: "Gold5",
    12: "Gold4",
    13: "Gold3",
    14: "Gold2",
    15: "Gold1",
    16: "Platinum5",
    17: "Platinum4",
    18: "Platinum3",
    19: "Platinum2",
    20: "Platinum1",
    21: "Diamond5",
    22: "Diamond4",
  };

  // 데이터 필터링
  let apiData1 = data1.data1.filter((item) => {
    let algorithms = JSON.parse(item.algorithm.replace(/'/g, '"'));
    return array.some((algo) => algorithms.includes(algo));
  });

  console.log(apiData1);
  const tableBody = document.getElementById("dataBody");
  // 기존 데이터 삭제
  tableBody.innerHTML = "";
  apiData1.forEach((item) => {
    const row = createRow(item);
    tableBody.appendChild(row);
  });

  function createRow(item) {
    const row = document.createElement("tr");

    const toggleButton = document.createElement("button");
    toggleButton.textContent = "Toggle";
    let algorithmVisible = false;

    toggleButton.addEventListener("click", (event) => {
      event.stopPropagation();
      algorithmVisible = !algorithmVisible;
      const algorithmCell = row.querySelector(".algorithm-cell");
      if (algorithmVisible) {
        algorithmCell.style.display = "table-cell";
      } else {
        algorithmCell.style.display = "none";
      }
    });

    row.addEventListener("click", () => {
      window.open(`https://www.acmicpc.net/problem/${item.number}`, "_blank");
    });

    const idCell = createCell(item.number, "center");
    row.appendChild(idCell);

    const nameTierContainer = document.createElement("td");
    nameTierContainer.style.display = "flex";
    nameTierContainer.style.alignItems = "center";
    nameTierContainer.style.justifyContent = "center"; // 가로 방향 가운데 정렬
    nameTierContainer.style.textAlign = "center";

    const nameTierSpan = document.createElement("span");
    const tierNumber = item.tier;
    nameTierSpan.textContent = item.name;
    const tierImg = document.createElement("img");
    tierImg.src = `https://static.solved.ac/tier_small/${tierNumber}.svg`;
    tierImg.alt = `Tier ${tierNumber}`;
    tierImg.style.width = "20px";
    tierImg.style.height = "20px";
    nameTierContainer.appendChild(tierImg);

    nameTierContainer.appendChild(nameTierSpan);

    row.appendChild(nameTierContainer);

    const algorithmCell = createCell(item.algorithm, "center");
    algorithmCell.classList.add("algorithm-cell");
    algorithmCell.style.display = "none";
    row.appendChild(algorithmCell);

    const toggleCell = document.createElement("td");
    toggleCell.appendChild(toggleButton);
    toggleCell.style.textAlign = "center";
    row.appendChild(toggleCell);
    applyTierColor(row, tierNumber);
    return row;
  }

  function createCell(text, align) {
    const cell = document.createElement("td");
    cell.textContent = text;
    cell.style.textAlign = align;
    return cell;
  }

  function applyTierColor(row, tierNumber) {
    const toggleButton = row.querySelector("button");

    if (tierDict[tierNumber] && tierDict[tierNumber].startsWith("Silver")) {
      row.style.color = "rgb(56, 84, 110)";
      toggleButton.style.color = "rgb(56, 84, 110)";
      toggleButton.style.border = "1px solid rgb(56, 84, 110)";
    } else if (
      tierDict[tierNumber] &&
      tierDict[tierNumber].startsWith("Gold")
    ) {
      row.style.color = "rgb(210, 133, 0)";
      toggleButton.style.color = "rgb(210, 133, 0)";
      toggleButton.style.border = "1px solid rgb(210, 133, 0)";
    } else if (
      tierDict[tierNumber] &&
      tierDict[tierNumber].startsWith("Platinum")
    ) {
      row.style.color = "rgb(0, 199, 139)";
      toggleButton.style.color = "rgb(0, 199, 139)";
      toggleButton.style.border = "1px solid rgb(0, 199, 139)";
    } else if (
      tierDict[tierNumber] &&
      tierDict[tierNumber].startsWith("Diamond")
    ) {
      row.style.color = "rgb(0, 158, 229)";
      toggleButton.style.color = "rgb(0, 158, 229)";
      toggleButton.style.border = "1px solid rgb(0, 158, 229)";
    }
    toggleButton.addEventListener("mouseover", () => {
      if (tierDict[tierNumber] && tierDict[tierNumber].startsWith("Silver")) {
        toggleButton.style.backgroundColor = "rgb(56, 84, 110)";
        toggleButton.style.color = "white";
      } else if (
        tierDict[tierNumber] &&
        tierDict[tierNumber].startsWith("Gold")
      ) {
        toggleButton.style.backgroundColor = "rgb(210, 133, 0)";
        toggleButton.style.color = "white";
      } else if (
        tierDict[tierNumber] &&
        tierDict[tierNumber].startsWith("Platinum")
      ) {
        toggleButton.style.backgroundColor = "rgb(0, 199, 139)";
        toggleButton.style.color = "white";
      } else if (
        tierDict[tierNumber] &&
        tierDict[tierNumber].startsWith("Diamond")
      ) {
        toggleButton.style.backgroundColor = "rgb(0, 158, 229)";
        toggleButton.style.color = "white";
      }
    });

    toggleButton.addEventListener("mouseout", () => {
      if (tierDict[tierNumber] && tierDict[tierNumber].startsWith("Silver")) {
        toggleButton.style.backgroundColor = "transparent";
        toggleButton.style.color = "rgb(56, 84, 110)"; // 기존 티어 색상으로 텍스트 색 원복
      } else if (
        tierDict[tierNumber] &&
        tierDict[tierNumber].startsWith("Gold")
      ) {
        toggleButton.style.backgroundColor = "transparent";
        toggleButton.style.color = "rgb(210, 133, 0)"; // 기존 티어 색상으로 텍스트 색 원복
      } else if (
        tierDict[tierNumber] &&
        tierDict[tierNumber].startsWith("Platinum")
      ) {
        toggleButton.style.backgroundColor = "transparent";
        toggleButton.style.color = "rgb(0, 199, 139)"; // 기존 티어 색상으로 텍스트 색 원복
      } else if (
        tierDict[tierNumber] &&
        tierDict[tierNumber].startsWith("Diamond")
      ) {
        toggleButton.style.backgroundColor = "transparent";
        toggleButton.style.color = "rgb(0, 158, 229)"; // 기존 티어 색상으로 텍스트 색 원복
      }
    });
  }
}

const algorithms = {
  전체: -1,
  수학: 2515,
  구현: 2033,
  "다이나믹 프로그래밍": 1687,
  "자료 구조": 1468,
  "그래프 이론": 1414,
  "그리디 알고리즘": 922,
  문자열: 825,
  "브루트포스 알고리즘": 812,
  "그래프 탐색": 807,
  정렬: 728,
  정수론: 631,
  트리: 581,
  "세그먼트 트리": 530,
  "애드 혹": 505,
  기하학: 466,
  "이분 탐색": 452,
  "너비 우선 탐색": 411,
  "누적 합": 392,
  시뮬레이션: 358,
  사칙연산: 352,
  조합론: 349,
  "해 구성하기": 321,
  "깊이 우선 탐색": 305,
  "많은 조건 분기": 295,
  비트마스킹: 267,
  백트래킹: 232,
  데이크스트라: 227,
  "최단 경로": 205,
  "해시를 사용한 집합과 맵": 205,
  "분할 정복": 185,
  "분리 집합": 183,
  스위핑: 169,
  "소수 판정": 167,
  "우선순위 큐": 165,
  "트리에서의 다이나믹 프로그래밍": 165,
  "트리를 사용한 집합과 맵": 164,
  "분할 정복을 이용한 거듭제곱": 150,
  "게임 이론": 148,
  "두 포인터": 143,
  "매개 변수 탐색": 142,
  파싱: 129,
  스택: 128,
  "느리게 갱신되는 세그먼트 트리": 125,
  "최대 유량": 124,
  "에라토스테네스의 체": 114,
  "비트필드를 이용한 다이나믹 프로그래밍": 113,
  "오프라인 쿼리": 103,
  재귀: 101,
  "배낭 문제": 96,
  확률론: 94,
  "임의 정밀도 / 큰 수 연산": 91,
  "값 / 좌표 압축": 91,
  "유클리드 호제법": 89,
  "이분 매칭": 77,
  "최소 스패닝 트리": 74,
  "볼록 껍질": 73,
  "플로이드–워셜": 71,
  "강한 연결 요소": 70,
  "최소 공통 조상": 68,
  선형대수학: 67,
  "위상 정렬": 65,
  "포함 배제의 원리": 59,
  "고속 푸리에 변환": 56,
  트라이: 55,
  "모듈로 곱셈 역원": 55,
  "희소 배열": 54,
  덱: 52,
  "슬라이딩 윈도우": 52,
  "방향 비순환 그래프": 51,
  "런타임 전의 전처리": 49,
  "선분 교차 판정": 48,
  "작은 집합에서 큰 집합으로 합치는 테크닉": 48,
  해싱: 46,
  "제곱근 분할법": 45,
  "오일러 경로 테크닉": 45,
  "최소 비용 최대 유량": 44,
  "스프라그–그런디 정리": 43,
  kmp: 42,
  "접미사 배열과 lcp 배열": 42,
  "볼록 껍질을 이용한 최적화": 42,
  센트로이드: 41,
  "heavy-light 분할": 36,
  미적분학: 35,
  "가장 긴 증가하는 부분 수열: o(n log n)": 35,
  "센트로이드 분할": 35,
  "페르마의 소정리": 34,
  "순열 사이클 분할": 32,
  "기댓값의 선형성": 32,
  "최대 유량 최소 컷 정리": 31,
  "중간에서 만나기": 30,
  큐: 30,
  "피타고라스 정리": 29,
  "2-sat": 29,
  "가우스 소거법": 27,
  무작위화: 26,
  "비트 집합": 24,
  "단절점과 단절선": 23,
  "퍼시스턴트 세그먼트 트리": 22,
  "삼분 탐색": 21,
  "중국인의 나머지 정리": 21,
  "오일러 피 함수": 21,
  "오일러 경로": 20,
  "다각형의 넓이": 20,
  "3차원 기하학": 20,
  휴리스틱: 20,
  "다차원 세그먼트 트리": 20,
  "mo's": 19,
  "볼록 다각형 내부의 점 판정": 18,
  "벨만–포드": 18,
  "확장 유클리드 호제법": 18,
  "연결 리스트": 17,
  "병렬 이분 탐색": 17,
  "스플레이 트리": 17,
  "분할 정복을 사용한 최적화": 17,
  "0-1 너비 우선 탐색": 16,
  "이분 그래프": 16,
  선인장: 15,
  "이중 연결 요소": 15,
  "링크/컷 트리": 14,
  "비둘기집 원리": 13,
  "외판원 순회 문제": 13,
  "정규 표현식": 12,
  "회전하는 캘리퍼스": 12,
  "평면 그래프": 12,
  "벌리캠프–매시": 12,
  "머지 소트 트리": 12,
  물리학: 12,
  매내처: 12,
  "폴라드 로": 11,
  "아호-코라식": 11,
  "커넥션 프로파일을 이용한 다이나믹 프로그래밍": 10,
  "뫼비우스 반전 공식": 10,
  "밀러–라빈 소수 판별법": 10,
  "오일러 지표 (χ=v-e+f)": 10,
  수치해석: 9,
  키타마사: 8,
  "덱을 이용한 구간 최댓값 트릭": 8,
  "덱을 이용한 다이나믹 프로그래밍": 8,
  "함수 개형을 이용한 최적화": 7,
  "뤼카 정리": 7,
  통계학: 7,
  헝가리안: 6,
  쌍대성: 6,
  "반평면 교집합": 6,
  "이산 로그": 6,
  "탑 트리": 6,
  "부분집합의 합 다이나믹 프로그래밍": 6,
  서큘레이션: 6,
  "오프라인 동적 연결성 판정": 6,
  "쌍대 그래프": 6,
  "트리 압축": 6,
  "aliens 트릭": 6,
  "자릿수를 이용한 다이나믹 프로그래밍": 5,
  "선형 계획법": 5,
  "라빈–카프": 5,
  "트리 동형 사상": 5,
  "춤추는 링크": 5,
  "최소 외접원": 5,
  "홀의 결혼 정리": 5,
  "생성 함수": 5,
  z: 5,
  매트로이드: 5,
  "크누스 x": 4,
  "utf-8 입력 처리": 4,
  히르쉬버그: 4,
  "일반적인 매칭": 4,
  "데카르트 트리": 4,
  "4차원 이상의 기하학": 4,
  "보로노이 다이어그램": 3,
  "오목 다각형 내부의 점 판정": 3,
  로프: 3,
  "크누스 최적화": 3,
  "안정 결혼 문제": 3,
  "베이즈 정리": 3,
  "단조 큐를 이용한 최적화": 3,
  "트리 분할": 3,
  "다항식 보간법": 3,
  "차분 공격": 3,
  차수열: 2,
  "": 2,
  "양방향 탐색": 2,
  "그린 정리": 2,
  "번사이드 보조정리": 2,
  "접미사 트리": 2,
  "다중 대입값 계산": 2,
  "담금질 기법": 2,
  "함수형 그래프": 2,
  "보이어–무어 다수결 투표": 1,
  "도미네이터 트리": 1,
  "회문 트리": 1,
  "도형에서의 불 연산": 1,
  "현 그래프": 1,
  "유향 최소 신장 트리": 1,
  "스토어–바그너": 1,
  "이산 제곱근": 1,
  "델로네 삼각분할": 1,
  "하켄부시 게임": 1,
  "픽의 정리": 1,
  "린드스트롬–게셀–비엔노 보조정리": 1,
  "지수승강 보조정리": 1,
  "플러드 필": 1,
};

// 알고리즘 목록을 생성하는 함수
function generateAlgorithmList() {
  const algorithmListDiv = document.getElementById("algorithmList");

  for (const [algorithm, value] of Object.entries(algorithms)) {
    const div = document.createElement("div");
    div.classList.add("algorithmItem"); // 추가한 클래스를 div에 추가

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.value = algorithm;
    checkbox.id = algorithm.replace(/\s/g, ""); // 공백 제거한 문자열을 ID로 사용
    checkbox.onchange = handleCheckboxChange;

    const label = document.createElement("label");
    label.htmlFor = algorithm.replace(/\s/g, "");
    label.appendChild(document.createTextNode(`${algorithm} (${value})`));

    div.appendChild(checkbox);
    div.appendChild(label);
    algorithmListDiv.appendChild(div);
  }
}
// 체크박스 변경을 처리하는 함수
function handleCheckboxChange() {
  const selectedAlgorithmList = document.getElementById(
    "selectedAlgorithmList"
  );
  const algorithm = this.value;

  if (this.checked) {
    // 체크된 경우 선택된 알고리즘 목록에 추가
    const listItem = document.createElement("span");

    // 삭제 버튼 생성
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "x";
    deleteButton.onclick = function () {
      // 해당 알고리즘 아이템 제거
      const itemToRemove = this.parentNode; // 클릭한 버튼의 부모 요소 (리스트 아이템)
      if (itemToRemove) {
        selectedAlgorithmList.removeChild(itemToRemove);
      }

      // 체크박스 해제
      const checkbox = document.getElementById(algorithm.replace(/\s/g, ""));
      if (checkbox) {
        checkbox.checked = false;
      }
    };

    // 알고리즘 이름 추가
    listItem.textContent = algorithm + "";

    // 삭제 버튼을 리스트 아이템의 첫 번째 자식으로 추가
    listItem.insertBefore(deleteButton, listItem.firstChild);

    listItem.id = `${algorithm.replace(/\s/g, "")}ListItem`;
    selectedAlgorithmList.appendChild(listItem); // 리스트 아이템 추가
  } else {
    // 체크 해제된 경우 선택된 알고리즘 목록에서 제거
    const listItem = document.getElementById(
      `${algorithm.replace(/\s/g, "")}ListItem`
    );
    if (listItem) {
      selectedAlgorithmList.removeChild(listItem);
    }
  }
}

// 검색 기능을 담당하는 함수
function searchAlgorithms() {
  const input = document.getElementById("searchInput");
  const filter = input.value.toUpperCase();
  const algorithmListDiv = document.getElementById("algorithmList");
  const checkboxes = algorithmListDiv.getElementsByTagName("input");
  const labels = algorithmListDiv.getElementsByTagName("label");

  for (let i = 0; i < checkboxes.length; i++) {
    const algorithm = checkboxes[i].value.toUpperCase();
    if (algorithm.indexOf(filter) > -1) {
      checkboxes[i].style.display = "";
      labels[i].style.display = "";
      checkboxes[i].nextSibling.style.display = ""; // 다음 형제 요소 (라벨)도 표시
    } else {
      checkboxes[i].style.display = "none";
      labels[i].style.display = "none";
      checkboxes[i].nextSibling.style.display = "none"; // 다음 형제 요소 (라벨) 숨김
    }
  }
}

// 페이지 로드 시 알고리즘 목록을 생성
window.onload = function () {
  generateAlgorithmList();
};
// 테이블 토글 함수
function toggleTable() {
  const array = [];
  const table = document.getElementById("dataTable");
  if (table.style.display === "none") {
    table.style.display = "table";
  } else {
    table.style.display = "none";
  }

  // 선택된 알고리즘을 배열에 저장
  const selectedAlgorithmList = document.getElementById(
    "selectedAlgorithmList"
  );
  const selectedAlgorithms = selectedAlgorithmList.getElementsByTagName("span");

  for (let i = 0; i < selectedAlgorithms.length; i++) {
    array.push(selectedAlgorithms[i].textContent.trim().slice(1));
  }
  console.log(array);
  tableSetting(array);
}