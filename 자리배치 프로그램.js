const fs = require("fs");
const teams = fs
  .readFileSync("./팀명단")
  .toString()
  .split("\n")
  .map((el) => el.trim());

// 결과를 저장할 Map 만들기
const result_map = new Map();
teams.forEach((team) => result_map.set(team, 0));

const numbers = [];

// 난수 생성 함수
createRandomNumber = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

// 각 팀에 중복되지 않는 번호 할당
result_map.forEach((value, key, map) => {
  let newNumber = createRandomNumber(1, 13);

  while (true) {
    if (numbers.includes(newNumber)) newNumber = createRandomNumber(1, 13);
    else {
      map.set(key, newNumber);
      numbers.push(newNumber);
      break;
    }
  }
});

// 날짜 및 시간 출력
const KST = new Date(new Date().getTime() + 9 * 60 * 60 * 1000)
  .toISOString()
  .replace("T", " "); // utc로 변환된 값을 한국 시간으로 변환시키기 위해 9시간(밀리세컨드)를 더함

// 결과 출력
console.log(KST);
console.log(result_map);
