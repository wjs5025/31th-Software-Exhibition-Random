const fs = require("fs");
const input = fs
  .readFileSync("./추첨자명단")
  .toString()
  .split("\n")
  .map((el) => el.trim());

// 난수 생성 함수
createRandomNumber = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

// 날짜 및 시간 출력
const KST = new Date(new Date().getTime() + 9 * 60 * 60 * 1000)
  .toISOString()
  .replace("T", " ");

const min = 0; // 랜덤 값의 최소
const max = input.length - 1; // 랜덤 값의 최대
const result = []; // 결과 저장 배열
let cnt = 0; // 현재 뽑기 수행 횟수
let time = 6;

// 중복 없이 랜덤 뽑기
function drawing() {
  clearInterval(countDown);

  while (cnt < 3) {
    let random_number = createRandomNumber(min, max);
    if (result.includes(input[random_number])) {
      random_number = createRandomNumber(min, max);
    } else {
      {
        result.push(input[random_number]);
        cnt += 1;
      }
    }
  }
  console.log(KST);
  console.log(result.join("\n"));
}

// 카운트 다운 함수
function timer() {
  time -= 1;
  console.log(`${time}초 후 결과가 발표됩니다.`);
}

// 카운트 다운 실행
let countDown = setInterval(timer, 1000);

// 6초 후 뽑기 실행
setTimeout(drawing, 5999);
